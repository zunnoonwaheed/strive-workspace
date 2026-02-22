// Vercel Serverless Function for Sessions
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Require authentication
  const user = authenticateToken(req.headers.authorization);
  if (!user) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);

    const sessions = await sql`
      SELECT s.id, s.session_id, s.user_email, s.user_phone,
             s.first_message_at, s.last_message_at,
             COUNT(c.id) as message_count
      FROM sessions s
      LEFT JOIN conversations c ON s.session_id = c.session_id
      GROUP BY s.id, s.session_id, s.user_email, s.user_phone,
               s.first_message_at, s.last_message_at
      ORDER BY s.last_message_at DESC
    `;

    return res.json({ sessions });
  } catch (error) {
    console.error('Sessions error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
