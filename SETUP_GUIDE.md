# Quick Setup Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm run setup
```

### Step 2: Configure Razorpay
1. Get your Razorpay API keys from: https://dashboard.razorpay.com/app/keys
2. Edit `backend/.env` and replace:
   - `RAZORPAY_KEY_ID=your_actual_key`
   - `RAZORPAY_KEY_SECRET=your_actual_secret`

### Step 3: Start Docker Services
```bash
npm run start-db
```

### Step 4: Initialize Database
```bash
npm run init-db
```

### Step 5: Start Application
```bash
npm run dev
```

### Step 6: Open Browser
Navigate to: **http://localhost:5173**

## ✅ Verify Installation

1. **Backend Health Check**
   ```bash
   curl http://localhost:5000/api/health
   ```
   Should return: `{"status":"healthy",...}`

2. **Frontend**
   Open http://localhost:5173 - you should see the registration page

3. **DynamoDB**
   ```bash
   docker logs ma-kitchen-dynamodb
   ```
   Should show "Ready to accept connections"

4. **S3 (LocalStack)**
   ```bash
   docker logs ma-kitchen-s3
   ```
   Should show "Ready"

## 🎯 Test the Flow

1. Fill in personal information
2. Enter company details
3. Upload at least 3 required documents
4. Select a subscription tier
5. Complete test payment with Razorpay

**Test Card Details (Razorpay Test Mode)**:
- Card Number: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date

## 🛑 Common Issues

**Issue**: `docker: command not found`
- **Solution**: Install Docker Desktop from https://www.docker.com/products/docker-desktop

**Issue**: `Port 5000 already in use`
- **Solution**: `lsof -ti:5000 | xargs kill -9`

**Issue**: Database initialization fails
- **Solution**: 
  ```bash
  npm run stop-db
  npm run start-db
  # Wait 10 seconds
  npm run init-db
  ```

**Issue**: Payment fails
- **Solution**: Verify Razorpay credentials in `backend/.env`

## 📞 Need Help?

Check the full README.md for detailed documentation.

