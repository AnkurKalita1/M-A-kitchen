# M&A Kitchen - Production Setup Guide

## Prerequisites

- Node.js 18+ installed
- AWS Account with Access Keys
- Razorpay Account with API Keys

## Step 1: Extract ZIP File

```bash
# Extract the ZIP file
# Navigate to the extracted folder
cd "M&A kitchen Buyer"
```

## Step 2: Install Dependencies

```bash
npm run setup
```

## Step 3: Create Backend .env File

```bash
cd backend
touch .env
```

Edit `backend/.env` and add:

```env
PORT=5001
NODE_ENV=production
AWS_REGION=ap-south-2
AWS_ACCESS_KEY_ID=your_aws_access_key_id_here
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key_here
S3_BUCKET_NAME=ma-kitchen-documents
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
FRONTEND_URL=http://localhost:5173
```

## Step 4: Create AWS Tables (If Needed)

```bash
cd backend
node scripts/init-db-production.js
```

## Step 5: Start Application

```bash
# From project root folder
npm run dev
```

## Step 6: Access Application

Open browser: `http://localhost:5173`

## Troubleshooting

### Port Already in Use

```bash
# Mac/Linux
lsof -ti:5001 | xargs kill -9
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :5001
taskkill /PID <PID_NUMBER> /F
```

### Reinstall Dependencies

```bash
rm -rf node_modules backend/node_modules frontend/node_modules
npm run setup
```

## Important Notes

- All data is stored in Production AWS (DynamoDB & S3)
- Do NOT set DYNAMODB_ENDPOINT or S3_ENDPOINT in .env
- Keep .env file secure and never commit it

