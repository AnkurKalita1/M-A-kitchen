# 🚀 M&A Kitchen Buyer - Quick Start

## Before You Begin

You'll need:
- ✅ Node.js 18+ installed
- ✅ Docker Desktop running
- ✅ Razorpay account (get free test keys at https://razorpay.com)

## Installation (Copy & Paste These Commands)

### 1️⃣ Install Everything
```bash
cd "/Users/ankurkalita/Desktop/coding/M&A kitchen Buyer"
npm run setup
```

### 2️⃣ Add Your Razorpay Keys
```bash
# Open backend/.env in your editor and replace:
# RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
# RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET
# With your actual Razorpay test keys
```

### 3️⃣ Start Database Services
```bash
npm run start-db
```
⏳ Wait 10 seconds for Docker to initialize...

### 4️⃣ Create Database Tables
```bash
npm run init-db
```
You should see: ✅ Table created and ✅ Bucket created

### 5️⃣ Start the App
```bash
npm run dev
```

### 6️⃣ Open Your Browser
Go to: **http://localhost:5173**

---

## 🎮 Test the Registration Flow

1. **Personal Info**: Fill in your details
2. **Company Info**: Add company and investment preferences
3. **Documents**: Upload 3 required documents (PDF/PPT/XLS)
4. **Subscription**: Choose a tier (try Gold)
5. **Payment**: Use Razorpay test card:
   - Card: `4111 1111 1111 1111`
   - CVV: `123`
   - Expiry: `12/25`

## 🎉 Success!

After payment, you'll see your dashboard with:
- Your unique Marketplace ID (BUY-2025-XXXXXX)
- All your information
- Uploaded documents
- Active subscription

## 🔧 Useful Commands

```bash
# Check if services are healthy
curl http://localhost:5000/api/health

# View backend logs
cd backend && npm run dev

# View frontend logs  
cd frontend && npm run dev

# Stop Docker services
npm run stop-db

# Restart everything
npm run stop-db && npm run start-db && npm run init-db && npm run dev
```

## ❓ Something Not Working?

1. **Check Docker is running**: `docker ps` should show 2 containers
2. **Check ports are free**: 
   - Backend: http://localhost:5000/api/health
   - Frontend: http://localhost:5173
3. **Restart Docker**: `npm run stop-db && npm run start-db`
4. **Reinitialize DB**: `npm run init-db`

## 📂 Project Structure at a Glance

```
M&A kitchen Buyer/
├── backend/          → Node.js API (Port 5000)
├── frontend/         → React App (Port 5173)
├── docker-compose.yml → DynamoDB + S3 Local
└── data/            → Local database storage
```

## 🔗 Important URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health
- **DynamoDB Admin**: http://localhost:8000
- **LocalStack**: http://localhost:4566

---

**Ready to deploy to production?** Check out the full README.md for deployment instructions!

