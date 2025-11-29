# ✅ M&A Kitchen Buyer - Setup Verification

Use this checklist to verify your setup before starting development.

## 📋 Pre-Setup Checklist

### System Requirements
- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Docker Desktop installed and running (`docker --version`)
- [ ] Git installed (`git --version`)

### Accounts & Keys
- [ ] Razorpay account created (https://razorpay.com)
- [ ] Test API keys obtained from Razorpay dashboard
- [ ] Keys format: `rzp_test_xxxxxxxx` and secret key

---

## 🔧 Installation Verification

### Step 1: Dependencies Installed

Run:
```bash
npm run setup
```

Check:
- [ ] Root node_modules created
- [ ] backend/node_modules created
- [ ] frontend/node_modules created
- [ ] No error messages in console

### Step 2: Docker Services Running

Run:
```bash
npm run start-db
```

Check:
```bash
docker ps
```

You should see:
- [ ] `ma-kitchen-dynamodb` (RUNNING)
- [ ] `ma-kitchen-s3` (RUNNING)

Ports should show:
- [ ] `0.0.0.0:8000->8000/tcp` (DynamoDB)
- [ ] `0.0.0.0:4566->4566/tcp` (LocalStack S3)

### Step 3: Database Initialized

Run:
```bash
npm run init-db
```

Expected output:
- [ ] "✅ Table MAKitchen-Buyers created successfully"
- [ ] "✅ Bucket ma-kitchen-documents created successfully"
- [ ] "✨ Database initialization completed successfully!"

### Step 4: Environment Variables Set

Check `backend/.env` file exists and contains:
- [ ] `PORT=5000`
- [ ] `DYNAMODB_ENDPOINT=http://localhost:8000`
- [ ] `S3_ENDPOINT=http://localhost:4566`
- [ ] `RAZORPAY_KEY_ID=rzp_test_xxxxx` (your actual key)
- [ ] `RAZORPAY_KEY_SECRET=xxxxx` (your actual secret)
- [ ] `FRONTEND_URL=http://localhost:5173`

---

## 🚀 Runtime Verification

### Step 5: Start Application

Run:
```bash
npm run dev
```

Check console output:
- [ ] "🚀 M&A Kitchen Backend running on port 5000"
- [ ] "VITE v5.x.x ready in xxx ms"
- [ ] No error messages

### Step 6: Backend Health Check

In a new terminal, run:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-11-28T...",
  "services": {
    "dynamodb": "connected",
    "s3": "connected"
  }
}
```

Check:
- [ ] Status is "healthy"
- [ ] DynamoDB is "connected"
- [ ] S3 is "connected"

### Step 7: Frontend Accessible

Open browser and navigate to:
```
http://localhost:5173
```

You should see:
- [ ] M&A Kitchen logo (Chef Hat)
- [ ] "M&A Kitchen" heading
- [ ] "Buyer Registration - Where Deals Come to Life" text
- [ ] Progress bar with 5 steps
- [ ] "Personal Information" form
- [ ] Purple gradient background
- [ ] No console errors in browser DevTools

---

## 🧪 Functional Testing

### Test 1: Personal Info Submission

Fill in:
- [ ] First Name: "Test"
- [ ] Last Name: "User"
- [ ] Email: "test@example.com"
- [ ] Phone: "1234567890"
- [ ] Click "Continue"

Expected:
- [ ] No validation errors
- [ ] Moves to Step 2 (Company Info)
- [ ] Progress bar shows Step 1 complete (green checkmark)
- [ ] Marketplace ID appears at bottom (BUY-2025-XXXXXX)

### Test 2: Company Info Submission

Fill in:
- [ ] Company Name: "Test Corp"
- [ ] Industry: Select any
- [ ] Company Size: Select any
- [ ] Job Title: "Manager"
- [ ] Years of Experience: 5
- [ ] Investment Min: 1000000
- [ ] Investment Max: 5000000
- [ ] Sectors: Select at least one (Ctrl+Click)
- [ ] Geographic: Select at least one (Ctrl+Click)
- [ ] Click "Continue"

Expected:
- [ ] No validation errors
- [ ] Moves to Step 3 (Documents)
- [ ] Progress bar shows Step 2 complete

### Test 3: Document Upload

For each required document:
- [ ] Click "Upload" button
- [ ] Select a PDF file (< 10MB)
- [ ] See loading spinner
- [ ] See green checkmark when complete
- [ ] File name displayed

After uploading 3 documents:
- [ ] Click "Continue"
- [ ] Moves to Step 4 (Subscription)

### Test 4: Subscription Selection

- [ ] See 4 subscription tiers
- [ ] Each tier shows icon, name, price, features
- [ ] Click on a tier (e.g., Gold)
- [ ] Tier highlights with border
- [ ] Click "Continue to Payment"
- [ ] Moves to Step 5 (Payment)

### Test 5: Payment Flow

- [ ] Order summary displays correct tier and amount
- [ ] Security notices visible
- [ ] "Pay Securely" button enabled
- [ ] Click "Pay Securely"

**Note**: Razorpay will open in test mode

Expected Razorpay popup:
- [ ] Order details shown
- [ ] Amount matches selection
- [ ] Can enter test card: 4111 1111 1111 1111
- [ ] CVV: 123
- [ ] Expiry: 12/25
- [ ] Payment processes successfully

After payment:
- [ ] Success toast notification
- [ ] Redirected to Dashboard

### Test 6: Dashboard View

Dashboard should show:
- [ ] Welcome message with name
- [ ] Marketplace ID (BUY-2025-XXXXXX)
- [ ] "Active" status badge
- [ ] Personal Information card
- [ ] Company Information card
- [ ] Subscription Details card
- [ ] Uploaded Documents list (3 documents)
- [ ] All information correctly displayed

---

## 🔍 API Endpoint Testing

Test all endpoints with curl:

### Health Check
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"healthy", ...}
```

### Register Buyer
```bash
curl -X POST http://localhost:5000/api/buyer/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "companyName": "Test Corp",
    "industry": "Technology",
    "companySize": "51-200",
    "jobTitle": "CEO",
    "yearsOfExperience": 10,
    "investmentRange": {"min": 1000000, "max": 10000000},
    "sectorsOfInterest": ["Technology"],
    "geographicPreference": ["Global"],
    "acceptedTerms": true,
    "acceptedNDA": true
  }'
# Should return: {"success":true, "data":{"buyerId":"...", "marketplaceId":"BUY-2025-..."}}
```

### Get Buyer (use buyerId from previous response)
```bash
curl http://localhost:5000/api/buyer/{buyerId}
# Should return buyer details
```

---

## 🐳 Docker Verification

### Check Docker Containers
```bash
docker ps
```

Both containers should be running:
- [ ] ma-kitchen-dynamodb (healthy)
- [ ] ma-kitchen-s3 (healthy)

### Check DynamoDB
```bash
docker logs ma-kitchen-dynamodb | tail -n 20
```

Should show:
- [ ] "Initializing DynamoDB Local"
- [ ] "Ready to accept connections"

### Check LocalStack (S3)
```bash
docker logs ma-kitchen-s3 | tail -n 20
```

Should show:
- [ ] "Ready"
- [ ] No error messages

### Verify DynamoDB Table
You can use AWS CLI (if installed):
```bash
aws dynamodb list-tables \
  --endpoint-url http://localhost:8000 \
  --region us-east-1
```

Should show:
- [ ] "MAKitchen-Buyers" in table list

---

## 📊 Performance Checks

### Backend Response Time
```bash
time curl http://localhost:5000/api/health
```

Should be:
- [ ] < 200ms response time

### Frontend Load Time
- [ ] Open http://localhost:5173
- [ ] Open browser DevTools (F12) → Network tab
- [ ] Reload page
- [ ] Check "Load" time at bottom

Should be:
- [ ] < 2 seconds for initial load

### File Upload Speed (10MB file)
- [ ] Upload 10MB PDF in Step 3
- [ ] Should complete in < 5 seconds

---

## 🔐 Security Verification

### CORS Check
```bash
curl -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -X OPTIONS \
  http://localhost:5000/api/buyer/register \
  -v
```

Should see:
- [ ] `Access-Control-Allow-Origin: http://localhost:5173`
- [ ] `Access-Control-Allow-Methods` includes POST

### Input Validation
Test with invalid data:
```bash
curl -X POST http://localhost:5000/api/buyer/register \
  -H "Content-Type: application/json" \
  -d '{}'
```

Should return:
- [ ] 400 Bad Request
- [ ] Error message about required fields

---

## 📁 File Structure Verification

Check that all files exist:

```bash
# Root files
ls -la | grep -E '(package.json|docker-compose.yml|README.md)'

# Backend
ls backend/ | grep -E '(package.json|server.js)'
ls backend/config/
ls backend/controllers/
ls backend/routes/
ls backend/validators/
ls backend/scripts/

# Frontend
ls frontend/ | grep -E '(package.json|index.html)'
ls frontend/src/
ls frontend/src/components/registration/
ls frontend/src/pages/
ls frontend/src/services/
```

All directories should exist and contain files.

---

## ✅ Final Checklist

Before starting development, ensure:

**Setup**
- [ ] All dependencies installed
- [ ] Docker services running
- [ ] Database initialized
- [ ] Environment variables configured

**Application**
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Health check passes
- [ ] No console errors

**Functionality**
- [ ] Can complete full registration flow
- [ ] Documents upload successfully
- [ ] Payment integration works
- [ ] Dashboard displays correctly

**Performance**
- [ ] Response times < 200ms
- [ ] Page loads < 2s
- [ ] File uploads < 5s

**Security**
- [ ] CORS configured
- [ ] Input validation working
- [ ] Razorpay keys configured

---

## 🎉 Success Criteria

Your setup is complete when:

✅ You can successfully:
1. Start the application with `npm run dev`
2. Register a new buyer through all 5 steps
3. Upload 3 documents
4. Complete a test payment
5. View the buyer dashboard

✅ All checks above pass

✅ No errors in:
- Terminal console
- Browser console
- Docker logs

---

## 🐛 Troubleshooting Failed Checks

### If health check fails:
```bash
npm run stop-db
npm run start-db
# Wait 10 seconds
npm run init-db
```

### If frontend won't load:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### If backend won't start:
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### If payment fails:
- Check Razorpay keys in `backend/.env`
- Ensure keys start with `rzp_test_`
- Try getting new keys from Razorpay dashboard

---

**All checks passed?** 🎉 You're ready to develop!

See **QUICKSTART.md** for usage instructions.

