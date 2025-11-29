# 🚀 Production Deployment Guide

## 📦 Building for Production

### Step 1: Build the Frontend

```bash
cd frontend
npm run build
```

This creates optimized production files in `frontend/dist/`

---

## 🌐 Running Production Build Locally

### Option 1: Using the Production Server (Recommended)

```bash
cd frontend
npm run serve
```

This starts a production server on **http://localhost:3000**

**Features:**
- ✅ Serves static files from `dist/`
- ✅ Proxies API requests to backend (port 5001)
- ✅ Handles React Router (SPA routing)
- ✅ Production-ready

### Option 2: Using Vite Preview

```bash
cd frontend
npm run preview
```

This starts Vite's preview server (usually on port 4173)

---

## 🔧 Configuration

### Environment Variables

**Frontend Server:**
```bash
PORT=3000              # Frontend server port (default: 3000)
API_URL=http://localhost:5001  # Backend API URL
```

**Example:**
```bash
PORT=3000 API_URL=http://localhost:5001 npm run serve
```

---

## 📋 Complete Production Setup

### 1. Build Frontend
```bash
cd frontend
npm run build
```

### 2. Start Backend (if not running)
```bash
cd backend
node server.js
```

### 3. Start Production Frontend Server
```bash
cd frontend
npm run serve
```

### 4. Open Browser
Go to: **http://localhost:3000**

---

## 🌍 Deploying to Production

### Option 1: Deploy to GoDaddy

**Backend:**
1. Upload `backend/` folder to your GoDaddy hosting
2. Set up Node.js environment
3. Install dependencies: `npm install`
4. Set environment variables in GoDaddy panel
5. Start with: `node server.js` or use PM2

**Frontend:**
1. Build: `npm run build`
2. Upload `dist/` folder contents to GoDaddy static hosting
3. Configure server to serve `index.html` for all routes

### Option 2: Deploy to Vercel/Netlify

**Frontend:**
1. Connect your GitHub repo
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add environment variable: `VITE_API_BASE_URL=https://your-backend-url.com/api`

**Backend:**
1. Deploy to Railway, Render, or Heroku
2. Set environment variables
3. Update frontend API URL

### Option 3: Deploy to AWS

**Backend:**
- Deploy to EC2 or Elastic Beanstalk
- Use real DynamoDB and S3 (not local)

**Frontend:**
- Upload `dist/` to S3
- Configure CloudFront for CDN
- Set up API Gateway for backend

---

## ✅ Production Checklist

Before deploying:

- [ ] Build frontend: `npm run build`
- [ ] Test production build locally: `npm run serve`
- [ ] Update API URLs for production
- [ ] Set up production database (DynamoDB)
- [ ] Set up production storage (S3)
- [ ] Configure Razorpay production keys
- [ ] Set up SSL certificates
- [ ] Configure CORS for production domain
- [ ] Set up monitoring/logging
- [ ] Test complete registration flow

---

## 🐛 Troubleshooting

### "Cannot GET /route"
- **Solution**: Make sure server.js serves `index.html` for all routes (already configured)

### API requests failing
- **Solution**: Check `API_URL` environment variable matches your backend URL

### Assets not loading
- **Solution**: Ensure `dist/` folder is in the correct location
- Check that paths in `index.html` are relative (they should be)

### CORS errors
- **Solution**: Update backend CORS to allow your production domain

---

## 📝 Notes

- Production build is optimized and minified
- All React Router routes work correctly
- API proxy handles backend communication
- Static assets are served efficiently

---

**Ready to deploy!** 🚀

