import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

// Get database URL from environment variable
const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL or POSTGRES_URL environment variable is not set!');
}

// Create SQL client
const sql = neon(DATABASE_URL);

// Initialize database tables
export const initDatabase = async () => {
  try {
    console.log('🔄 Initializing database...');

    // Create conversations table
    await sql`
      CREATE TABLE IF NOT EXISTS conversations (
        id SERIAL PRIMARY KEY,
        session_id TEXT NOT NULL,
        user_message TEXT NOT NULL,
        bot_response TEXT NOT NULL,
        user_email TEXT,
        user_phone TEXT,
        intent_topic TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create admin_users table
    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create sessions table
    await sql`
      CREATE TABLE IF NOT EXISTS sessions (
        id SERIAL PRIMARY KEY,
        session_id TEXT UNIQUE NOT NULL,
        user_email TEXT,
        user_phone TEXT,
        first_message_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_message_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create index on session_id for faster queries
    await sql`
      CREATE INDEX IF NOT EXISTS idx_conversations_session_id
      ON conversations(session_id)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_conversations_created_at
      ON conversations(created_at DESC)
    `;

    // Check if admin user exists
    const adminUsers = await sql`
      SELECT * FROM admin_users WHERE username = 'admin'
    `;

    if (adminUsers.length === 0) {
      const passwordHash = await bcrypt.hash('admin123', 10);
      await sql`
        INSERT INTO admin_users (username, password_hash)
        VALUES ('admin', ${passwordHash})
      `;
      console.log('✅ Default admin user created: admin / admin123');
    }

    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
};

// Database helper functions
export const db = {
  // Run a query (INSERT, UPDATE, DELETE)
  run: async (query, params = []) => {
    try {
      // Convert SQLite-style queries to Postgres
      let pgQuery = query;
      let pgParams = params;

      // Handle INSERT with RETURNING
      if (query.includes('INSERT INTO')) {
        pgQuery = query.replace(/\?/g, (match, offset) => {
          const index = query.substring(0, offset).split('?').length;
          return `$${index}`;
        }) + ' RETURNING *';
      } else {
        // Replace ? with $1, $2, etc.
        let paramIndex = 1;
        pgQuery = query.replace(/\?/g, () => `$${paramIndex++}`);
      }

      const result = await sql.unsafe(pgQuery, pgParams);

      return {
        lastID: result[0]?.id,
        changes: result.length
      };
    } catch (error) {
      console.error('Database run error:', error);
      throw error;
    }
  },

  // Get a single row
  get: async (query, params = []) => {
    try {
      // Replace ? with $1, $2, etc.
      let paramIndex = 1;
      const pgQuery = query.replace(/\?/g, () => `$${paramIndex++}`);

      const result = await sql.unsafe(pgQuery, params);
      return result[0] || null;
    } catch (error) {
      console.error('Database get error:', error);
      throw error;
    }
  },

  // Get all rows
  all: async (query, params = []) => {
    try {
      // Replace ? with $1, $2, etc.
      let paramIndex = 1;
      const pgQuery = query.replace(/\?/g, () => `$${paramIndex++}`);

      const result = await sql.unsafe(pgQuery, params);
      return result;
    } catch (error) {
      console.error('Database all error:', error);
      throw error;
    }
  }
};

export default db;
