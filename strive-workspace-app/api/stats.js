// Vercel Serverless Function for Stats
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

    const totalConversationsResult = await sql`SELECT COUNT(*) as count FROM conversations`;
    const totalSessionsResult = await sql`SELECT COUNT(*) as count FROM sessions`;
    const conversationsTodayResult = await sql`
      SELECT COUNT(*) as count FROM conversations
      WHERE DATE(created_at) = CURRENT_DATE
    `;
    const uniqueUsersResult = await sql`
      SELECT COUNT(DISTINCT session_id) as count FROM sessions
    `;

    return res.json({
      totalConversations: parseInt(totalConversationsResult[0].count),
      totalSessions: parseInt(totalSessionsResult[0].count),
      conversationsToday: parseInt(conversationsTodayResult[0].count),
      uniqueUsers: parseInt(uniqueUsersResult[0].count)
    });
  } catch (error) {
    console.error('Stats error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
