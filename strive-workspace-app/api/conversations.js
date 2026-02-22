// Vercel Serverless Function for Conversations
import jwt from 'jsonwebtoken';
import { neon } from '@neondatabase/serverless';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

function authenticateToken(authHeader) {
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    if (req.method === 'POST') {
      // Save conversation (no auth required for chatbot)
      const { session_id, user_message, bot_response, user_email, user_phone, intent_topic } = req.body;

      if (!session_id || !user_message || !bot_response) {
        return res.status(400).json({ error: 'session_id, user_message, and bot_response are required' });
      }

      // Insert conversation
      await sql`
        INSERT INTO conversations (session_id, user_message, bot_response, user_email, user_phone, intent_topic)
        VALUES (${session_id}, ${user_message}, ${bot_response}, ${user_email || null}, ${user_phone || null}, ${intent_topic || null})
      `;

      // Update or create session
      const sessions = await sql`SELECT * FROM sessions WHERE session_id = ${session_id}`;

      if (sessions.length > 0) {
        await sql`
          UPDATE sessions
          SET last_message_at = CURRENT_TIMESTAMP,
              user_email = COALESCE(${user_email || null}, user_email),
              user_phone = COALESCE(${user_phone || null}, user_phone)
          WHERE session_id = ${session_id}
        `;
      } else {
        await sql`
          INSERT INTO sessions (session_id, user_email, user_phone)
          VALUES (${session_id}, ${user_email || null}, ${user_phone || null})
        `;
      }

      return res.json({ success: true, message: 'Conversation saved' });
    }

    if (req.method === 'GET') {
      // Get conversations (auth required)
      const user = authenticateToken(req.headers.authorization);
      if (!user) {
        return res.status(401).json({ error: 'Access token required' });
      }

      const { page = 1, limit = 50, session_id, search } = req.query;
      const offset = (parseInt(page) - 1) * parseInt(limit);

      let query = `
        SELECT c.id, c.session_id, c.user_message, c.bot_response, c.intent_topic, c.created_at,
               COALESCE(s.user_email, c.user_email) AS user_email,
               COALESCE(s.user_phone, c.user_phone) AS user_phone
        FROM conversations c
        LEFT JOIN sessions s ON c.session_id = s.session_id
        WHERE 1=1
      `;

      const params = [];
      if (session_id) {
        query += ` AND c.session_id = $${params.length + 1}`;
        params.push(session_id);
      }

      if (search) {
        query += ` AND (c.user_message ILIKE $${params.length + 1} OR c.bot_response ILIKE $${params.length + 2} OR s.user_email ILIKE $${params.length + 3} OR s.user_phone ILIKE $${params.length + 4})`;
        const searchPattern = `%${search}%`;
        params.push(searchPattern, searchPattern, searchPattern, searchPattern);
      }

      query += ` ORDER BY c.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
      params.push(parseInt(limit), offset);

      const conversations = await sql(query, params);

      // Get total count
      let countQuery = 'SELECT COUNT(*) as count FROM conversations c LEFT JOIN sessions s ON c.session_id = s.session_id WHERE 1=1';
      const countParams = [];

      if (session_id) {
        countQuery += ` AND c.session_id = $${countParams.length + 1}`;
        countParams.push(session_id);
      }

      if (search) {
        countQuery += ` AND (c.user_message ILIKE $${countParams.length + 1} OR c.bot_response ILIKE $${countParams.length + 2} OR s.user_email ILIKE $${countParams.length + 3} OR s.user_phone ILIKE $${countParams.length + 4})`;
        const searchPattern = `%${search}%`;
        countParams.push(searchPattern, searchPattern, searchPattern, searchPattern);
      }

      const totalResult = await sql(countQuery, countParams);
      const total = parseInt(totalResult[0].count);

      return res.json({
        conversations,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / parseInt(limit))
        }
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Conversations error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
