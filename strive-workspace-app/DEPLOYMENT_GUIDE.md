# Deployment Guide for Strive Workspace App

## Quick Deployment Steps

### Frontend Deployment on Vercel (5 minutes)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/new
   - Sign in with your GitHub account

2. **Import Your Repository**
   - Click "Import Project"
   - Select `zunnoonwaheed/strive-workspace` repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `strive-workspace-app` (click "Edit" and select this folder)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   Click "Environment Variables" and add:
   ```
   Name: VITE_API_URL
   Value: (leave empty for now, we'll add after backend deployment)
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for deployment to complete
   - Copy the deployment URL (e.g., `https://strive-workspace-app.vercel.app`)

---

### Backend Deployment on Vercel (Option 1 - Recommended for quick start)

**Note**: For production with persistent database, use Render/Railway instead.

1. **Create a new Vercel project for backend**
   - Visit: https://vercel.com/new
   - Import the same repository
   - **Root Directory**: `strive-workspace-app/server`

2. **Configure as Node.js API**
   - Add environment variables:
   ```
   NODE_ENV=production
   JWT_SECRET=your-super-secret-jwt-key-12345
   ```

3. **Add vercel.json in server directory** (already created)

4. **Deploy** and copy the backend URL

---

### Backend Deployment on Render (Option 2 - Recommended for production)

**Render provides persistent storage for SQLite database**

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com
   - Sign in with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `zunnoonwaheed/strive-workspace`
   - Click "Connect"

3. **Configure Service**
   ```
   Name: strive-chatbot-backend
   Region: Choose closest to you
   Branch: main
   Root Directory: strive-workspace-app/server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

4. **Add Environment Variables**
   ```
   NODE_ENV=production
   JWT_SECRET=your-super-secret-jwt-key-change-this-12345
   PORT=10000
   ```

5. **Add Persistent Disk** (Important!)
   - Scroll to "Disk"
   - Click "Add Disk"
   - Name: `strive-db`
   - Mount Path: `/app/data`
   - Size: 1 GB

6. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment
   - Copy the backend URL (e.g., `https://strive-chatbot-backend.onrender.com`)

---

### Connect Frontend to Backend

1. **Go back to Vercel Frontend Project**
   - Visit your frontend project dashboard
   - Go to "Settings" → "Environment Variables"

2. **Update Environment Variable**
   ```
   Name: VITE_API_URL
   Value: https://your-backend-url.onrender.com/api
   ```
   (Replace with your actual backend URL)

3. **Redeploy Frontend**
   - Go to "Deployments"
   - Click the 3-dot menu on latest deployment
   - Click "Redeploy"
   - Check "Use existing Build Cache" = NO
   - Click "Redeploy"

---

## Testing Your Deployment

1. **Visit your frontend URL**: `https://strive-workspace-app.vercel.app`
2. **Test the chatbot** - it should save conversations
3. **Test admin panel**:
   - Go to `https://strive-workspace-app.vercel.app/admin`
   - Login with: `admin` / `admin123`
   - View conversations and statistics

---

## Deployment URLs

Once deployed, update these:

- **Frontend**: `https://your-frontend.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **Admin Panel**: `https://your-frontend.vercel.app/admin`

---

## Default Admin Credentials

- **Username**: `admin`
- **Password**: `admin123`

**⚠️ IMPORTANT**: Change these credentials immediately after first login!

---

## Troubleshooting

### Frontend shows "Network Error"
- Check VITE_API_URL environment variable is set correctly
- Ensure backend URL includes `/api` at the end
- Redeploy frontend after changing environment variables

### Backend not responding
- Check Render logs for errors
- Verify environment variables are set
- Ensure persistent disk is mounted at `/app/data`

### Database resets on each deployment
- Make sure persistent disk is configured (Render only)
- Verify mount path is `/app/data`

---

## Alternative: Railway Deployment (Easiest)

Railway offers the simplest deployment for both frontend and backend:

1. Visit: https://railway.app
2. "Start a New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect and deploy both services
5. Add environment variables in Railway dashboard

