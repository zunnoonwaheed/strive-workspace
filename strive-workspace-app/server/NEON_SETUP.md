# Neon Database Setup Guide

## Quick Setup (Recommended)

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/zunnoonwaheed-gmailcoms-projects/server
   - Click on the "Storage" tab
   - Click "Create Database"
   - Select "Neon" (Postgres)
   - Click "Continue" and follow the prompts

2. **Vercel will automatically:**
   - Create a Neon Postgres database
   - Add the `DATABASE_URL` environment variable
   - Redeploy your project

3. **Done!** Your database will be persistent and never lose data.

## Manual Setup (Alternative)

If you prefer to set it up manually:

1. **Create Neon Account:**
   - Go to: https://neon.tech
   - Sign up for free

2. **Create Database:**
   - Create a new project
   - Copy the connection string (looks like: `postgresql://user:password@host/database`)

3. **Add to Vercel:**
   ```bash
   echo "your_connection_string" | vercel env add DATABASE_URL production
   vercel --prod
   ```

## What Changed

- ✅ Migrated from SQLite to Neon Postgres
- ✅ Data now persists permanently
- ✅ No more data loss on serverless function restarts
- ✅ Better performance and scalability
