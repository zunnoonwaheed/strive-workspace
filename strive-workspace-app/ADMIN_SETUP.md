# Admin Panel Setup Guide

## Quick Start

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Start Backend Server

```bash
cd server
npm start
```

The server will run on `http://localhost:3001`

### 3. Start Frontend (in a new terminal)

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Access Admin Panel

Navigate to: `http://localhost:5173/admin`

**Default Login Credentials:**
- Username: `admin`
- Password: `admin123`

## Features

### Admin Panel Features:
- ✅ View all chatbot conversations
- ✅ View chat sessions grouped by user
- ✅ Search conversations
- ✅ View statistics (total conversations, sessions, etc.)
- ✅ See user contact information (email/phone) when provided
- ✅ View intent topics for each conversation

### Backend Features:
- ✅ SQLite database (automatically created)
- ✅ JWT authentication
- ✅ RESTful API endpoints
- ✅ Session tracking
- ✅ Conversation storage

## API Endpoints

- `POST /api/admin/login` - Admin login
- `POST /api/conversations` - Save conversation (used by chatbot)
- `GET /api/conversations` - Get all conversations (requires auth)
- `GET /api/sessions` - Get all sessions (requires auth)
- `GET /api/sessions/:sessionId/conversations` - Get conversations for a session
- `GET /api/stats` - Get statistics (requires auth)

## Database

The database file `chatbot.db` will be automatically created in the `server` directory on first run.

**Tables:**
- `conversations` - All chatbot conversations
- `sessions` - User session tracking
- `admin_users` - Admin user accounts

## Security Notes

⚠️ **Important:** Change the default admin password in production!

To change the admin password:
1. Update `server/.env` file
2. Or manually update the database using SQLite

## Troubleshooting

### Backend won't start
- Make sure port 3001 is not in use
- Check that all dependencies are installed: `cd server && npm install`

### Can't access admin panel
- Make sure backend is running on port 3001
- Check browser console for CORS errors
- Verify you're accessing `http://localhost:5173/admin`

### Conversations not saving
- Check backend server is running
- Check browser console for errors
- Verify API URL in ChatBot.jsx matches your backend URL

## Development

For development with auto-reload:
```bash
cd server
npm run dev
```

This will restart the server automatically when files change.
