// Vercel Serverless Function for Deleting Admin User
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
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Require authentication
  const user = authenticateToken(req.headers.authorization);
  if (!user) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const { userId } = req.query;
    const sql = neon(process.env.DATABASE_URL);

    // Get user to check if it's admin
    const users = await sql`SELECT * FROM admin_users WHERE id = ${userId}`;
    const userToDelete = users[0];

    if (!userToDelete) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prevent deleting admin user
    if (userToDelete.username === 'admin') {
      return res.status(400).json({ error: 'Cannot delete admin user' });
    }

    // Prevent deleting yourself
    if (parseInt(userToDelete.id) === parseInt(user.id)) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    await sql`DELETE FROM admin_users WHERE id = ${userId}`;
    return res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
