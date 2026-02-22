// Vercel Serverless Function for Admin Users Management
import bcrypt from 'bcryptjs';
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Require authentication for all methods
  const user = authenticateToken(req.headers.authorization);
  if (!user) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    if (req.method === 'GET') {
      // Get all admin users
      const users = await sql`
        SELECT id, username, created_at
        FROM admin_users
        ORDER BY created_at DESC
      `;
      return res.json({ users });
    }

    if (req.method === 'POST') {
      // Add new admin user
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
      }

      // Check if user already exists
      const existingUsers = await sql`
        SELECT * FROM admin_users WHERE username = ${username}
      `;

      if (existingUsers.length > 0) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      // Insert new user
      const result = await sql`
        INSERT INTO admin_users (username, password_hash)
        VALUES (${username}, ${passwordHash})
        RETURNING id
      `;

      return res.json({
        success: true,
        message: 'User created successfully',
        userId: result[0].id
      });
    }

    if (req.method === 'DELETE') {
      // Delete admin user - userId is passed as query parameter
      const { userId } = req.query;

      if (!userId) {
        return res.status(400).json({ error: 'User ID required' });
      }

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
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Admin users error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
