import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db, { initDatabase } from './database-postgres.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Configure CORS for production
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://strive-workspace-app.vercel.app',
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    // Allow any vercel.app subdomain for preview deployments
    if (allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Initialize database on startup
let dbInitialized = false;
const ensureDbInitialized = async () => {
  if (!dbInitialized) {
    await initDatabase();
    dbInitialized = true;
  }
};

// Ensure database is initialized for all requests
app.use(async (req, res, next) => {
  try {
    await ensureDbInitialized();
    next();
  } catch (error) {
    console.error('Database initialization error:', error);
    res.status(500).json({ error: 'Database initialization failed' });
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Admin login endpoint
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const user = await db.get('SELECT * FROM admin_users WHERE username = ?', [username]);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });

    res.json({ token, username: user.username });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Save conversation endpoint
app.post('/api/conversations', async (req, res) => {
  try {
    const { session_id, user_message, bot_response, user_email, user_phone, intent_topic } = req.body;

    if (!session_id || !user_message || !bot_response) {
      return res.status(400).json({ error: 'session_id, user_message, and bot_response are required' });
    }

    // Insert conversation
    await db.run(
      `INSERT INTO conversations (session_id, user_message, bot_response, user_email, user_phone, intent_topic)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [session_id, user_message, bot_response, user_email || null, user_phone || null, intent_topic || null]
    );

    // Update or create session
    const session = await db.get('SELECT * FROM sessions WHERE session_id = ?', [session_id]);
    if (session) {
      await db.run('UPDATE sessions SET last_message_at = CURRENT_TIMESTAMP, user_email = COALESCE(?, user_email), user_phone = COALESCE(?, user_phone) WHERE session_id = ?',
        [user_email || null, user_phone || null, session_id]);
    } else {
      await db.run('INSERT INTO sessions (session_id, user_email, user_phone) VALUES (?, ?, ?)',
        [session_id, user_email || null, user_phone || null]);
    }

    res.json({ success: true, message: 'Conversation saved' });
  } catch (error) {
    console.error('Save conversation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all conversations (admin only)
app.get('/api/conversations', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 50, session_id, search } = req.query;
    const offset = (page - 1) * limit;

    // JOIN with sessions to always get the complete email/phone (captured over time)
    let query = `
      SELECT c.id, c.session_id, c.user_message, c.bot_response, c.intent_topic, c.created_at,
             COALESCE(s.user_email, c.user_email) AS user_email,
             COALESCE(s.user_phone, c.user_phone) AS user_phone
      FROM conversations c
      LEFT JOIN sessions s ON c.session_id = s.session_id
      WHERE 1=1`;
    const params = [];

    if (session_id) {
      query += ' AND c.session_id = ?';
      params.push(session_id);
    }

    if (search) {
      query += ' AND (c.user_message LIKE ? OR c.bot_response LIKE ? OR s.user_email LIKE ? OR s.user_phone LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY c.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const conversations = await db.all(query, params);

    let countQuery = 'SELECT COUNT(*) as count FROM conversations c LEFT JOIN sessions s ON c.session_id = s.session_id WHERE 1=1';
    const countParams = [];
    if (session_id) { countQuery += ' AND c.session_id = ?'; countParams.push(session_id); }
    if (search) {
      countQuery += ' AND (c.user_message LIKE ? OR c.bot_response LIKE ? OR s.user_email LIKE ? OR s.user_phone LIKE ?)';
      countParams.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }
    const total = await db.get(countQuery, countParams);

    res.json({
      conversations,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: total.count,
        totalPages: Math.ceil(total.count / limit)
      }
    });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all sessions (admin only)
app.get('/api/sessions', authenticateToken, async (req, res) => {
  try {
    const sessions = await db.all(`
      SELECT s.id, s.session_id, s.user_email, s.user_phone,
             s.first_message_at, s.last_message_at,
             COUNT(c.id) as message_count
      FROM sessions s
      LEFT JOIN conversations c ON s.session_id = c.session_id
      GROUP BY s.id, s.session_id, s.user_email, s.user_phone,
               s.first_message_at, s.last_message_at
      ORDER BY s.last_message_at DESC
    `);

    res.json({ sessions });
  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get conversations by session (admin only)
app.get('/api/sessions/:sessionId/conversations', authenticateToken, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const conversations = await db.all(
      'SELECT * FROM conversations WHERE session_id = ? ORDER BY created_at ASC',
      [sessionId]
    );

    res.json({ conversations });
  } catch (error) {
    console.error('Get session conversations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get statistics (admin only)
app.get('/api/stats', authenticateToken, async (req, res) => {
  try {
    const totalConversations = await db.get('SELECT COUNT(*) as count FROM conversations');
    const totalSessions = await db.get('SELECT COUNT(*) as count FROM sessions');
    const conversationsToday = await db.get(`
      SELECT COUNT(*) as count FROM conversations 
      WHERE DATE(created_at) = DATE('now')
    `);
    const uniqueUsers = await db.get(`
      SELECT COUNT(DISTINCT session_id) as count FROM sessions
    `);

    res.json({
      totalConversations: totalConversations.count,
      totalSessions: totalSessions.count,
      conversationsToday: conversationsToday.count,
      uniqueUsers: uniqueUsers.count
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all admin users (admin only)
app.get('/api/admin/users', authenticateToken, async (req, res) => {
  try {
    const users = await db.all('SELECT id, username, created_at FROM admin_users ORDER BY created_at DESC');
    res.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add new admin user (admin only)
app.post('/api/admin/users', authenticateToken, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // Check if user already exists
    const existingUser = await db.get('SELECT * FROM admin_users WHERE username = ?', [username]);
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await db.run('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)', [username, passwordHash]);
    
    res.json({ success: true, message: 'User created successfully', userId: result.lastID });
  } catch (error) {
    console.error('Add user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete admin user (admin only)
app.delete('/api/admin/users/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;

    // Get user to check if it's admin
    const user = await db.get('SELECT * FROM admin_users WHERE id = ?', [userId]);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prevent deleting admin user
    if (user.username === 'admin') {
      return res.status(400).json({ error: 'Cannot delete admin user' });
    }

    // Prevent deleting yourself
    if (user.id === req.user.id) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    await db.run('DELETE FROM admin_users WHERE id = ?', [userId]);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Clear all conversations and sessions (admin only)
app.delete('/api/admin/clear-data', authenticateToken, async (req, res) => {
  try {
    await db.run('DELETE FROM conversations');
    await db.run('DELETE FROM sessions');
    res.json({ success: true, message: 'All conversations and sessions cleared' });
  } catch (error) {
    console.error('Clear data error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Claude AI chatbot endpoint (proxy to avoid CORS and protect API key)
app.post('/api/chatbot/message', async (req, res) => {
  try {
    const { messages, systemPrompt, temperature = 0.85, maxTokens = 300 } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
    if (!CLAUDE_API_KEY) {
      console.error('❌ CLAUDE_API_KEY not found in environment');
      return res.status(500).json({ error: 'Claude API not configured' });
    }

    console.log('🤖 Proxying request to Claude API...');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: maxTokens,
        temperature: temperature,
        system: systemPrompt || 'You are a helpful AI assistant.',
        messages: messages
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Claude API error:', response.status, errorText);
      return res.status(response.status).json({ error: 'Claude API request failed', details: errorText });
    }

    const data = await response.json();
    console.log('✅ Claude API response received');

    res.json({
      success: true,
      response: data.content[0].text
    });
  } catch (error) {
    console.error('❌ Chatbot message error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Strive Workspace Backend API',
    version: '1.0.0'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Admin panel will be available at http://localhost:5173/admin`);
    console.log(`🔐 Default admin credentials: admin / admin123`);
  });
}

// Export for Vercel serverless
export default app;
