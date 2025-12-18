# M&A Kitchen - Buyer Registration System

A comprehensive buyer registration platform for M&A Kitchen, featuring multi-step onboarding, document uploads, subscription tiers, and Razorpay payment integration.

## 🚀 Features

- **Multi-Step Registration Flow**
  - Personal Information
  - Company Information & Investment Preferences
  - Document Uploads (PDF, PPT, XLS/XLSX)
  - Subscription Tier Selection
  - Secure Payment with Razorpay

- **Subscription Tiers**
  - 3 months (Quarterly subscription)
  - Regular= 999 USD per user
  - Silver = 5999 USD per user
  - Gold = 12999 USD per user
 
  - 6 months (half-yearly subscription)
  - Regular= 2999 USD per user , 

- **Marketplace ID Generation**
  - Auto-generated buyer IDs: `BUY-YYYY-XXXXXX`

- **Document Management**
  - Secure S3 storage
  - Multiple document types support
  - Real-time upload progress

## 🏗️ Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Hook Form** for form management
- **Axios** for API calls
- **Lucide React** for icons
- **React Toastify** for notifications

### Backend
- **Node.js** with Express
- **AWS SDK v3** (DynamoDB & S3)
- **Razorpay** for payments
- **Joi** for validation
- **Multer** for file uploads

### Infrastructure
- **DynamoDB Local** (via Docker)
- **LocalStack** (for S3 emulation)
- **Docker Compose** for local services

## 📋 Prerequisites

- Node.js 18+ 
- Docker Desktop
- Git

## 🛠️ Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Navigate to project directory
cd "M&A kitchen Buyer"

# Install all dependencies (root, backend, and frontend)
npm run setup
```

### 2. Configure Environment Variables

```bash
# Copy backend environment template
cp backend/.env.example backend/.env
```
 
Edit `backend/.env` and add your Razorpay credentials:

```env
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 3. Start Local AWS Services (DynamoDB & S3)

```bash
# Start Docker containers for DynamoDB Local and LocalStack

docker-compose up -d
```

Wait for services to be ready (~10 seconds).

### 4. Initialize Database

```bash
# Create DynamoDB tables and S3 buckets
npm run init-db
```

You should see:
```
✅ Table MAKitchen-Buyers created successfully
✅ Bucket ma-kitchen-documents created successfully
```

### 5. Start the Application

```bash
# Start both backend and frontend concurrently
npm run dev
```

This will start:
- **Backend API**: http://localhost:5000
- **Frontend**: http://localhost:5173

## 🎯 Usage

1. Open your browser and navigate to `http://localhost:5173`

2. Complete the buyer registration:
   - **Step 1**: Enter personal information
   - **Step 2**: Provide company details and investment preferences
   - **Step 3**: Upload required documents (Proof of Funds, Company Registration, Identity Proof)
   - **Step 4**: Select a subscription tier
   - **Step 5**: Complete payment via Razorpay

3. After successful payment, you'll be redirected to your dashboard

## 📁 Project Structure

```
M&A kitchen Buyer/
├── backend/
│   ├── config/          # AWS and Razorpay configuration
│   ├── controllers/     # Business logic
│   ├── routes/          # API routes
│   ├── validators/      # Input validation schemas
│   ├── scripts/         # Database initialization
│   ├── server.js        # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   │   └── registration/  # Registration step components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service layer
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── docker-compose.yml   # Local AWS services
├── package.json         # Root scripts
└── README.md
```

## 🔧 API Endpoints

### Health Check
- `GET /api/health` - System health status

### Buyer Registration
- `POST /api/buyer/register` - Register new buyer
- `GET /api/buyer/:buyerId` - Get buyer details
- `POST /api/buyer/:buyerId/upload` - Upload document
- `PUT /api/buyer/:buyerId/subscription` - Update subscription

### Payment
- `POST /api/buyer/payment/create-order` - Create Razorpay order
- `POST /api/buyer/payment/verify` - Verify payment signature

## 🧪 Testing

### Test Backend Health

```bash
curl http://localhost:5000/api/health
```

### Test Frontend

Open `http://localhost:5173` in your browser

## 🗄️ Database Schema

### Buyers Table (`MAKitchen-Buyers`)

**Primary Key**: `buyerId` (String)

**Global Secondary Indexes**:
- `EmailIndex` on `email`
- `MarketplaceIdIndex` on `marketplaceId`

**Attributes**:
- Personal info: firstName, lastName, email, phone
- Company info: companyName, industry, companySize, jobTitle, etc.
- Investment preferences: investmentRange, sectorsOfInterest, geographicPreference
- Documents: Array of uploaded documents
- Subscription: tier, status, paymentId
- Timestamps: createdAt, updatedAt

## 📦 S3 Bucket Structure

```
ma-kitchen-documents/
└── buyers/
    └── {buyerId}/
        ├── proof_of_funds-{timestamp}.pdf
        ├── company_registration-{timestamp}.pdf
        └── identity_proof-{timestamp}.pdf
```

## 🔐 Security Features

- Input validation with Joi
- File type and size restrictions
- Razorpay signature verification
- Secure S3 signed URLs
- CORS configuration
- Environment variable protection

## 🚦 Available Scripts

```bash
npm run setup       # Install all dependencies
npm run dev         # Start both backend and frontend
npm run backend     # Start backend only
npm run frontend    # Start frontend only
npm run start-db    # Start Docker containers
npm run stop-db     # Stop Docker containers
npm run init-db     # Initialize database and S3
```

## 🐳 Docker Services

### DynamoDB Local
- Port: 8000
- Endpoint: http://localhost:8000
- Data persisted in: `./data/dynamodb`

### LocalStack (S3)
- Port: 4566
- Endpoint: http://localhost:4566
- Data persisted in: `./data/localstack`

## 🔄 Development Workflow

1. Make code changes
2. Backend hot-reloads automatically (nodemon)
3. Frontend hot-reloads automatically (Vite HMR)
4. No need to restart services during development

## 🚀 Deployment Notes

### Moving to Production DynamoDB & S3

1. Update `backend/.env`:
```env
DYNAMODB_ENDPOINT=  # Leave empty for AWS
S3_ENDPOINT=        # Leave empty for AWS
AWS_REGION=ap-south-2  # Your AWS region (Hyderabad)
AWS_ACCESS_KEY_ID=your_actual_key
AWS_SECRET_ACCESS_KEY=your_actual_secret
```

2. Create production tables:
```bash
# Run init-db script against production
NODE_ENV=production npm run init-db
```

3. Deploy backend to GoDaddy or any Node.js hosting
4. Deploy frontend to GoDaddy static hosting or Vercel/Netlify

## 📝 Environment Variables Reference

### Backend (.env)

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Backend port | 5000 | No |
| `NODE_ENV` | Environment | development | No |
| `AWS_REGION` | AWS region | ap-south-2 | Yes |
| `AWS_ACCESS_KEY_ID` | AWS access key | test | Yes |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | test | Yes |
| `DYNAMODB_ENDPOINT` | DynamoDB endpoint | http://localhost:8000 | Local only |
| `S3_ENDPOINT` | S3 endpoint | http://localhost:4566 | Local only |
| `S3_BUCKET_NAME` | S3 bucket name | ma-kitchen-documents | Yes |
| `RAZORPAY_KEY_ID` | Razorpay key | - | Yes |
| `RAZORPAY_KEY_SECRET` | Razorpay secret | - | Yes |
| `FRONTEND_URL` | Frontend URL | http://localhost:5173 | Yes |

## 🐛 Troubleshooting

### Docker containers not starting
```bash
docker-compose down
docker-compose up -d
```

### Database initialization fails
```bash
# Check if containers are running
docker ps

# Check logs
docker logs ma-kitchen-dynamodb
docker logs ma-kitchen-s3
```

### Port already in use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

### Cannot upload files
- Check LocalStack is running: `docker ps`
- Verify S3 bucket exists: `npm run init-db`
- Check file size < 10MB
- Verify file type (PDF, PPT, XLS/XLSX only)

## 📧 Support

For issues or questions, please contact the M&A Kitchen development team.

## 📄 License

Proprietary - M&A Kitchen © 2025

---

**Built with ❤️ for M&A Kitchen**

