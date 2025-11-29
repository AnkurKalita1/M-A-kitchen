# 🎬 M&A Kitchen Buyer - Visual Workflow

## 📋 Setup Checklist

```
[ ] 1. Install dependencies (npm run setup)
[ ] 2. Start Docker services (npm run start-db)
[ ] 3. Add Razorpay keys to backend/.env
[ ] 4. Initialize database (npm run init-db)
[ ] 5. Start application (npm run dev)
[ ] 6. Test registration flow
```

---

## 🔄 Registration Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    M&A KITCHEN BUYER                        │
│                  Registration Workflow                       │
└─────────────────────────────────────────────────────────────┘

    👤 User Opens Registration
            │
            ▼
    ┌───────────────────┐
    │   STEP 1 of 5     │
    │ Personal Info     │
    ├───────────────────┤
    │ • First Name      │
    │ • Last Name       │
    │ • Email           │
    │ • Phone           │
    └────────┬──────────┘
             │ [Continue]
             ▼
    ┌───────────────────┐      ┌──────────────┐
    │   STEP 2 of 5     │      │   BACKEND    │
    │ Company Info      │ ───> │ POST /register│
    ├───────────────────┤      │ Generate ID   │
    │ • Company Name    │      │ BUY-2025-XXX │
    │ • Industry        │ <─── └──────────────┘
    │ • Investment      │
    │ • Preferences     │
    └────────┬──────────┘
             │ [Continue]
             ▼
    ┌───────────────────┐
    │   STEP 3 of 5     │
    │ Documents Upload  │
    ├───────────────────┤      ┌──────────────┐
    │ ✓ Proof of Funds  │ ───> │   S3 LOCAL   │
    │ ✓ Company Reg     │      │ Upload Files │
    │ ✓ Identity Proof  │ <─── │ Get URLs     │
    └────────┬──────────┘      └──────────────┘
             │ [Continue]
             ▼
    ┌───────────────────┐
    │   STEP 4 of 5     │
    │ Subscription      │
    ├───────────────────┤
    │ ○ Regular  ₹100   │
    │ ○ Silver   ₹500   │
    │ ● Gold     ₹1000  │ ← Selected
    │ ○ Platinum ₹2500  │
    └────────┬──────────┘
             │ [Continue to Payment]
             ▼
    ┌───────────────────┐
    │   STEP 5 of 5     │
    │ Payment           │      ┌──────────────┐
    ├───────────────────┤      │  RAZORPAY    │
    │ Amount: ₹1000     │ ───> │ Create Order │
    │ [Pay Securely]    │      │ Process Pay  │
    └────────┬──────────┘      │ Verify Sign  │
             │                  └──────┬───────┘
             │ Payment Success         │
             └─────────────────────────┘
                       │
                       ▼
              ┌────────────────┐
              │   🎉 SUCCESS   │      ┌──────────────┐
              │   Dashboard    │      │  DYNAMODB    │
              ├────────────────┤ <─── │ Update Status│
              │ Marketplace ID │      │ subscription │
              │ BUY-2025-12345 │      │ = "active"   │
              │ Status: Active │      └──────────────┘
              └────────────────┘
```

---

## 🗄️ Data Flow

### 1. Registration → Database

```
User Input (Frontend)
    │
    ▼
Validation (React Hook Form)
    │
    ▼
API Call (Axios)
    │
    ▼
Backend Validation (Joi)
    │
    ▼
Generate Marketplace ID
    │
    ▼
Save to DynamoDB
    │
    ▼
Return Response
    │
    ▼
Update Frontend State
```

### 2. Document Upload → S3

```
User Selects File
    │
    ▼
Validate Type & Size (Frontend)
    │
    ▼
Upload with Multer (Backend)
    │
    ▼
Store in S3 (LocalStack)
    │
    ▼
Generate Signed URL
    │
    ▼
Save Metadata to DynamoDB
    │
    ▼
Display Success (Frontend)
```

### 3. Payment → Verification

```
User Clicks Pay
    │
    ▼
Create Razorpay Order (Backend)
    │
    ▼
Open Razorpay Checkout (Frontend)
    │
    ▼
User Enters Card Details
    │
    ▼
Razorpay Processes Payment
    │
    ▼
Return Payment Details
    │
    ▼
Verify Signature (Backend)
    │
    ▼
Update Subscription Status (DynamoDB)
    │
    ▼
Redirect to Dashboard
```

---

## 🌊 Component Hierarchy

```
App.jsx
│
├── BuyerRegistration.jsx (Main Container)
│   │
│   ├── ProgressBar.jsx
│   │   └── Step Icons (User, Building, File, Card, Check)
│   │
│   ├── PersonalInfoStep.jsx
│   │   └── React Hook Form
│   │       ├── Input: firstName
│   │       ├── Input: lastName
│   │       ├── Input: email
│   │       └── Input: phone
│   │
│   ├── CompanyInfoStep.jsx
│   │   └── React Hook Form
│   │       ├── Input: companyName
│   │       ├── Select: industry
│   │       ├── Select: companySize
│   │       ├── Input: jobTitle
│   │       ├── Number: yearsOfExperience
│   │       ├── Input: investmentMin
│   │       ├── Input: investmentMax
│   │       ├── MultiSelect: sectorsOfInterest
│   │       └── MultiSelect: geographicPreference
│   │
│   ├── DocumentsStep.jsx
│   │   └── For each document type:
│   │       ├── FileUpload Component
│   │       ├── Progress Indicator
│   │       └── Success/Error Message
│   │
│   ├── SubscriptionStep.jsx
│   │   └── For each tier:
│   │       ├── Tier Card
│   │       ├── Icon & Name
│   │       ├── Price
│   │       └── Feature List
│   │
│   └── PaymentStep.jsx
│       ├── Order Summary
│       ├── Security Notice
│       └── Razorpay Button
│
└── Dashboard.jsx (After Success)
    ├── Header (Name + Marketplace ID)
    ├── Personal Info Card
    ├── Company Info Card
    ├── Subscription Card
    └── Documents List
```

---

## 🔄 State Management

```javascript
// Main Form State (BuyerRegistration.jsx)
{
  // Personal
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  
  // Company
  companyName: string,
  industry: string,
  companySize: string,
  jobTitle: string,
  yearsOfExperience: number,
  
  // Investment
  investmentRange: { min: number, max: number },
  sectorsOfInterest: string[],
  geographicPreference: string[],
  
  // System
  buyerId: string,           // Generated by backend
  marketplaceId: string,     // BUY-YYYY-XXXXXX
  documents: Document[],
  subscriptionTier: string,  // REGULAR|SILVER|GOLD|PLATINUM
  
  // UI
  currentStep: number        // 1-5
}
```

---

## 📊 Database Schema

### DynamoDB Table: MAKitchen-Buyers

```javascript
{
  // Primary Key
  buyerId: "uuid-v4",
  
  // Identifiers
  marketplaceId: "BUY-2025-123456",
  email: "john@company.com",
  
  // Personal Info
  firstName: "John",
  lastName: "Doe",
  phone: "+1234567890",
  
  // Company Info
  companyName: "Acme Corp",
  companyWebsite: "https://acme.com",
  industry: "Technology",
  companySize: "51-200",
  jobTitle: "Managing Director",
  yearsOfExperience: 15,
  linkedinProfile: "https://linkedin.com/in/johndoe",
  
  // Investment Preferences
  investmentRange: {
    min: 1000000,
    max: 10000000
  },
  sectorsOfInterest: ["Technology", "Healthcare"],
  geographicPreference: ["North America", "Europe"],
  
  // Documents
  documents: [
    {
      documentId: "uuid",
      documentType: "proof_of_funds",
      fileName: "proof.pdf",
      s3Key: "buyers/uuid/proof_of_funds-123.pdf",
      uploadedAt: "2025-11-28T10:00:00Z",
      size: 1024000,
      mimeType: "application/pdf"
    }
  ],
  
  // Subscription
  subscriptionTier: "GOLD",
  subscriptionStatus: "active",
  paymentId: "pay_abc123",
  
  // Status
  registrationStatus: "complete",
  
  // Timestamps
  createdAt: "2025-11-28T09:00:00Z",
  updatedAt: "2025-11-28T10:30:00Z",
  
  // Legal
  acceptedTerms: true,
  acceptedNDA: true
}
```

### GSI Indexes
- `EmailIndex`: email (HASH)
- `MarketplaceIdIndex`: marketplaceId (HASH)

---

## 🎨 UI Theme

### Colors
- **Primary**: Sky Blue (#0284c7)
- **Background**: Purple Gradient (#667eea → #764ba2)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Headings**: Bold, 2xl-4xl
- **Body**: Regular, sm-base
- **Buttons**: Semibold, base

### Components
- **Cards**: White bg, rounded-xl, shadow-xl
- **Buttons**: Rounded-lg, transition-all
- **Inputs**: Border, focus:ring-2
- **Progress**: Green checkmarks, animated

---

## 🚀 Quick Command Reference

```bash
# Initial Setup
npm run setup                    # Install everything

# Database
npm run start-db                 # Start DynamoDB + S3
npm run stop-db                  # Stop services
npm run init-db                  # Create tables/buckets

# Development
npm run dev                      # Start both frontend + backend
npm run backend                  # Backend only
npm run frontend                 # Frontend only

# Testing
curl http://localhost:5000/api/health   # Backend health
open http://localhost:5173              # Frontend
```

---

## 📦 File Size Limits

- **Documents**: Max 10MB per file
- **Types**: PDF, PPT, PPTX, XLS, XLSX only
- **Required**: 3 documents minimum

---

## 💳 Test Payment Details

**Razorpay Test Mode:**
- Card: `4111 1111 1111 1111`
- CVV: `123`
- Expiry: `12/25`
- Name: Any
- Success: Always succeeds in test mode

---

**Ready to start?** Run `npm run setup` and follow QUICKSTART.md!

