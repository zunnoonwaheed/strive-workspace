// Vercel Serverless Function for Session Conversations
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
    const { sessionId } = req.query;
    const sql = neon(process.env.DATABASE_URL);

    const conversations = await sql`
      SELECT * FROM conversations
      WHERE session_id = ${sessionId}
      ORDER BY created_at ASC
    `;

    return res.json({ conversations });
  } catch (error) {
    console.error('Get session conversations error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
