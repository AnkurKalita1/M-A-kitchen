import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import buyerRoutes from './routes/buyer.routes.js';
import healthRoutes from './routes/health.routes.js';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file with explicit path
const envPath = join(__dirname, '.env');
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('❌ Error loading .env file:', result.error);
} else {
  console.log('✅ .env file loaded from:', envPath);
}

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware - Allow multiple origins including Cursor preview and production
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  process.env.FRONTEND_URL,
  // Production URLs (Vercel, Netlify, etc.)
  /^https:\/\/.*\.vercel\.app$/,
  /^https:\/\/.*\.netlify\.app$/,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    
    // Allow any localhost/127.0.0.1 origin for development
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    
    // Check if origin matches any allowed pattern
    const isAllowed = allowedOrigins.some(ao => {
      if (typeof ao === 'string') {
        return origin === ao || origin.startsWith(ao);
      } else if (ao instanceof RegExp) {
        return ao.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else if (process.env.NODE_ENV === 'development') {
      callback(null, true); // Allow all in development
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/buyer', buyerRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: { message: 'Route not found' } });
});

app.listen(PORT, () => {
  console.log(`🚀 M&A Kitchen Backend running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️  DynamoDB: ${process.env.DYNAMODB_ENDPOINT || 'AWS (us-east-1)'}`);
  console.log(`📦 S3: ${process.env.S3_ENDPOINT || 'AWS (us-east-1)'}`);
  console.log(`🌍 Region: ${process.env.AWS_REGION || 'us-east-1'}`);
});

