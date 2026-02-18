import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db, { initDatabase } from './database.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

app.use(cors());
app.use(express.json());

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

    let query = 'SELECT * FROM conversations WHERE 1=1';
    const params = [];

    if (session_id) {
      query += ' AND session_id = ?';
      params.push(session_id);
    }

    if (search) {
      query += ' AND (user_message LIKE ? OR bot_response LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const conversations = await db.all(query, params);
    const total = await db.get('SELECT COUNT(*) as count FROM conversations WHERE 1=1' + (session_id ? ' AND session_id = ?' : '') + (search ? ' AND (user_message LIKE ? OR bot_response LIKE ?)' : ''), 
      session_id ? [session_id] : search ? [`%${search}%`, `%${search}%`] : []);

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
      SELECT s.*, COUNT(c.id) as message_count
      FROM sessions s
      LEFT JOIN conversations c ON s.session_id = c.session_id
      GROUP BY s.session_id
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

// Start server after database initialization
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Admin panel will be available at http://localhost:5173/admin`);
    console.log(`🔐 Default admin credentials: admin / admin123`);
  });
}).catch(err => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});
