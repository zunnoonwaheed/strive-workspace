import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
const sql = neon(DATABASE_URL);

async function testDatabase() {
  try {
    console.log('Testing Neon database connection...');

    // Test simple query
    const result = await sql`SELECT NOW()`;
    console.log('✅ Database connected!', result);

    // Test table creation
    await sql`
      CREATE TABLE IF NOT EXISTS test_table (
        id SERIAL PRIMARY KEY,
        message TEXT
      )
    `;
    console.log('✅ Table created');

    // Test insert
    const inserted = await sql`
      INSERT INTO test_table (message)
      VALUES ('Hello Neon!')
      RETURNING *
    `;
    console.log('✅ Data inserted:', inserted);

    // Test select
    const selected = await sql`SELECT * FROM test_table`;
    console.log('✅ Data selected:', selected);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testDatabase();
