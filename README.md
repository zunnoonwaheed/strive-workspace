# Strive Workspaces

Professional coworking space application built with React + Vite.

## Project Structure

The main application is located in the `strive-workspace-app` directory.

## Environment Variables

Copy `.env.example` to `strive-workspace-app/.env.local` and add your API keys:

```
VITE_GROK_API_KEY=your_groq_api_key_here
```

## Development

```bash
cd strive-workspace-app
npm install
npm run dev
```

## Deployment

This project is configured to deploy on Vercel. Make sure to add the `VITE_GROK_API_KEY` environment variable in your Vercel project settings.
