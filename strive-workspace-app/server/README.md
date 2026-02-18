# Strive Chatbot Backend

Backend server for storing and managing chatbot conversations.

## Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Default Admin Credentials

- Username: `admin`
- Password: `admin123`

**Important:** Change these credentials in production!

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login

### Conversations
- `POST /api/conversations` - Save a conversation
- `GET /api/conversations` - Get all conversations (requires auth)
- `GET /api/sessions` - Get all chat sessions (requires auth)
- `GET /api/sessions/:sessionId/conversations` - Get conversations for a session (requires auth)
- `GET /api/stats` - Get statistics (requires auth)

## Environment Variables

Create a `.env` file in the server directory:

```
PORT=3001
JWT_SECRET=your-secret-key-change-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
GROK_API_KEY=your-grok-api-key
```

## Database

The server uses SQLite database (`chatbot.db`) which is automatically created on first run.

Tables:
- `conversations` - Stores all chatbot conversations
- `sessions` - Tracks unique user sessions
- `admin_users` - Stores admin user credentials

## Access Admin Panel

Once the server is running, access the admin panel at:
`http://localhost:5173/admin`

Make sure both the frontend (port 5173) and backend (port 3001) are running.
