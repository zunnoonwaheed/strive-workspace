#!/bin/bash

echo "🔧 Strive Workspace - Database Setup"
echo "===================================="
echo ""
echo "Please enter your Neon database connection string:"
echo "(It should look like: postgresql://user:password@host/database)"
echo ""
read -p "DATABASE_URL: " DATABASE_URL

if [ -z "$DATABASE_URL" ]; then
  echo "❌ Error: DATABASE_URL cannot be empty"
  exit 1
fi

echo ""
echo "Adding DATABASE_URL to Vercel..."
echo "$DATABASE_URL" | vercel env add DATABASE_URL production

echo ""
echo "Adding DATABASE_URL to Vercel Preview..."
echo "$DATABASE_URL" | vercel env add DATABASE_URL preview

echo ""
echo "✅ Database URL added successfully!"
echo ""
echo "Now deploying backend..."
cd /Users/mac/Desktop/Strive/strive-workspace-app/server
vercel --prod --yes

echo ""
echo "✅ Deployment complete!"
echo "Your backend is now using Neon Postgres and data will persist permanently."
