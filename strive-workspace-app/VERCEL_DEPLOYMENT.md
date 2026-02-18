# Deploy Both Frontend & Backend on Vercel

## 🚀 Part 1: Deploy Frontend (3 minutes)

### Step 1: Open Vercel
- Go to: **https://vercel.com/new**
- Sign in with GitHub (if not already)

### Step 2: Import Repository
1. You'll see "Import Git Repository"
2. Search for: **`strive-workspace`** or **`zunnoonwaheed/strive-workspace`**
3. Click **"Import"** on that repository

### Step 3: Configure Frontend
```
Project Name: strive-workspace-frontend
Framework Preset: Vite (should auto-detect)
Root Directory: strive-workspace-app (Click "Edit" → Select this folder)
Build Command: npm run build (auto-filled)
Output Directory: dist (auto-filled)
Install Command: npm install (auto-filled)
```

### Step 4: Environment Variables (Skip for now)
- Click **"Deploy"** without adding variables
- We'll add the backend URL later

### Step 5: Wait for Deployment
- Wait 2-3 minutes
- **Copy the URL** (e.g., `https://strive-workspace-frontend.vercel.app`)
- Keep this URL handy!

---

## 🔧 Part 2: Deploy Backend (3 minutes)

### Step 1: Create New Project
- Go back to: **https://vercel.com/new**
- Find the same repository: **`zunnoonwaheed/strive-workspace`**
- Click **"Import"** again (yes, same repo!)

### Step 2: Configure Backend
```
Project Name: strive-workspace-backend
Framework Preset: Other
Root Directory: strive-workspace-app/server (Click "Edit" → Select this folder)
Build Command: (leave empty)
Output Directory: (leave empty)
Install Command: npm install (auto-filled)
```

### Step 3: Add Environment Variables
Click **"Environment Variables"** and add these:

```
Name: NODE_ENV
Value: production

Name: JWT_SECRET
Value: strive-super-secret-jwt-key-12345-change-this

Name: PORT
Value: 3000
```

### Step 4: Deploy Backend
- Click **"Deploy"**
- Wait 2-3 minutes
- **Copy the backend URL** (e.g., `https://strive-workspace-backend.vercel.app`)

---

## 🔗 Part 3: Connect Frontend to Backend (2 minutes)

### Step 1: Update Frontend Environment Variable
1. Go to Vercel Dashboard: **https://vercel.com/dashboard**
2. Click on your **frontend project** (`strive-workspace-frontend`)
3. Go to **"Settings"** tab
4. Click **"Environment Variables"** on the left

### Step 2: Add Backend URL
```
Name: VITE_API_URL
Value: https://your-backend-url.vercel.app/api
```
**Replace** `your-backend-url.vercel.app` with the actual backend URL from Part 2

Example:
```
VITE_API_URL=https://strive-workspace-backend.vercel.app/api
```

### Step 3: Redeploy Frontend
1. Go to **"Deployments"** tab
2. Click the **3-dot menu (⋮)** on the latest deployment
3. Click **"Redeploy"**
4. **Uncheck** "Use existing Build Cache"
5. Click **"Redeploy"**
6. Wait 2 minutes

---

## ✅ Part 4: Test Your Deployment

### Test Frontend
1. Visit: `https://your-frontend-url.vercel.app`
2. The website should load
3. Try the chatbot

### Test Admin Panel
1. Visit: `https://your-frontend-url.vercel.app/admin`
2. Login:
   - Username: `admin`
   - Password: `admin123`
3. You should see the admin dashboard

### Test Backend API
1. Visit: `https://your-backend-url.vercel.app/api/stats`
2. You should see an authentication error (this is correct!)
3. The chatbot should be able to save conversations

---

## 📊 Your Deployment URLs

After deployment, you'll have:

| Service | URL |
|---------|-----|
| **Frontend** | `https://strive-workspace-frontend.vercel.app` |
| **Backend API** | `https://strive-workspace-backend.vercel.app/api` |
| **Admin Panel** | `https://strive-workspace-frontend.vercel.app/admin` |

---

## ⚠️ Important Notes

### About Vercel Serverless Backend
- Vercel backend runs on serverless functions
- **Database will NOT persist** between deployments with SQLite
- For production with persistent data, use **Render.com** for backend instead

### If you need persistent database:
1. Keep frontend on Vercel ✅
2. Move backend to Render (follow DEPLOYMENT_GUIDE.md)
3. Update `VITE_API_URL` to point to Render backend

---

## 🔍 Monitoring & Logs

### View Backend Logs
1. Go to: https://vercel.com/dashboard
2. Click on **backend project**
3. Click **"Logs"** tab
4. See all API requests and responses

### View Conversations
1. Visit your frontend: `/admin`
2. Login with admin credentials
3. View all chatbot conversations

---

## 🎉 That's it!

Both your frontend and backend are now deployed on Vercel!

**Next Steps:**
- Test all features
- Change admin password
- Consider moving backend to Render for persistent storage
