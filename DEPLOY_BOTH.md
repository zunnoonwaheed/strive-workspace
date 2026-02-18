# 🚀 DEPLOY FRONTEND & BACKEND TO VERCEL

## ✅ STEP 1: DEPLOY FRONTEND (2 minutes)

### Copy and paste this URL in your browser:
```
https://vercel.com/import/git?s=https://github.com/zunnoonwaheed/strive-workspace
```

### On the Vercel page:
1. **Select your repository**: Click on "strive-workspace"
2. **Click "Import"**

3. **Configure project**:
   - **Project Name**: `strive-frontend`
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: Click "Edit" → Select **`strive-workspace-app`**
   - **Build Command**: npm run build (auto)
   - **Output Directory**: dist (auto)
   - **Install Command**: npm install (auto)

4. **Skip environment variables** (for now)

5. **Click "Deploy"**

6. **Wait 2-3 minutes**

7. **COPY YOUR FRONTEND URL**
   - Example: `https://strive-frontend-abc123.vercel.app`
   - **SAVE THIS URL!**

---

## ✅ STEP 2: DEPLOY BACKEND (3 minutes)

### Copy and paste this URL in your browser:
```
https://vercel.com/import/git?s=https://github.com/zunnoonwaheed/strive-workspace
```

### On the Vercel page:
1. **Select your repository**: Click on "strive-workspace" (yes, same repo)
2. **Click "Import"**

3. **Configure project**:
   - **Project Name**: `strive-backend`
   - **Framework Preset**: Other
   - **Root Directory**: Click "Edit" → Select **`strive-workspace-app/server`**
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
   - **Install Command**: npm install (auto)

4. **Add Environment Variables** (IMPORTANT!):

   Click "Add Environment Variables":

   **Variable 1:**
   - Name: `NODE_ENV`
   - Value: `production`

   **Variable 2:**
   - Name: `JWT_SECRET`
   - Value: `strive-secret-jwt-2025`

5. **Click "Deploy"**

6. **Wait 2-3 minutes**

7. **COPY YOUR BACKEND URL**
   - Example: `https://strive-backend-xyz789.vercel.app`
   - **SAVE THIS URL!**

---

## ✅ STEP 3: CONNECT FRONTEND TO BACKEND (1 minute)

1. Go to: **https://vercel.com/zunnoonwaheed-gmailcoms-projects**

2. **Click on** the **"strive-frontend"** project

3. Click **"Settings"** (top menu)

4. Click **"Environment Variables"** (left sidebar)

5. Click **"Add New"** and add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://YOUR-BACKEND-URL.vercel.app/api`

   **IMPORTANT**: Replace `YOUR-BACKEND-URL` with the actual backend URL from Step 2

   Example: `https://strive-backend-xyz789.vercel.app/api`

6. Click **"Save"**

7. Go to **"Deployments"** tab

8. Click the **⋮** (three dots) on the latest deployment

9. Click **"Redeploy"**

10. **Uncheck** "Use existing Build Cache"

11. Click **"Redeploy"**

12. Wait 2 minutes

---

## ✅ STEP 4: TEST YOUR DEPLOYMENT

### Test Frontend:
Visit: `https://your-frontend-url.vercel.app`

### Test Admin Panel:
1. Visit: `https://your-frontend-url.vercel.app/admin`
2. Login with:
   - **Username**: `admin`
   - **Password**: `admin123`

### Test Chatbot:
1. Click the chat button on your website
2. Send a message
3. Check admin panel to see if conversation was saved

---

## 📋 YOUR DEPLOYMENT URLS

After completing all steps, you'll have:

| Service | URL |
|---------|-----|
| **Frontend** | `https://strive-frontend-XXXXX.vercel.app` |
| **Backend** | `https://strive-backend-XXXXX.vercel.app` |
| **Admin Panel** | `https://strive-frontend-XXXXX.vercel.app/admin` |

---

## 🆘 TROUBLESHOOTING

### "404: DEPLOYMENT_NOT_FOUND"
- This means you haven't deployed yet
- Follow Steps 1 and 2 above to create the deployments

### Build fails
- Check Root Directory is correct:
  - Frontend: `strive-workspace-app`
  - Backend: `strive-workspace-app/server`

### Admin panel shows no data
- Make sure you added `VITE_API_URL` to frontend environment variables
- Make sure the URL ends with `/api`
- Redeploy frontend after adding the variable

---

## ⚠️ IMPORTANT NOTES

1. **Database on Vercel won't persist** - Serverless functions reset on each deployment
2. For production with persistent data, deploy backend to **Render** instead
3. Keep frontend on Vercel, but move backend to Render for real data storage

---

## 🎯 QUICK SUMMARY

1. ✅ Deploy frontend (Root: `strive-workspace-app`)
2. ✅ Deploy backend (Root: `strive-workspace-app/server`, add 2 env vars)
3. ✅ Add backend URL to frontend env vars
4. ✅ Redeploy frontend
5. ✅ Test at `/admin`

**Total time: ~8 minutes**

---

## 📞 NEED HELP?

If you're still getting errors, check:
- Vercel build logs (click on the deployment to see logs)
- Make sure you selected the correct root directories
- Ensure environment variables are added correctly
