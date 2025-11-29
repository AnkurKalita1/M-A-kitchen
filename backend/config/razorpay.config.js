import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env file before using environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '..', '.env');
dotenv.config({ path: envPath });

// Initialize Razorpay only if credentials are provided
console.log('🔑 Razorpay Key ID:', process.env.RAZORPAY_KEY_ID ? 'Present' : 'Missing');
console.log('🔑 Razorpay Secret:', process.env.RAZORPAY_KEY_SECRET ? 'Present' : 'Missing');

export const razorpayInstance = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    })
  : null;

if (razorpayInstance) {
  console.log('✅ Razorpay instance initialized successfully');
} else {
  console.log('⚠️  Razorpay instance is NULL - keys missing in .env');
}

export const SUBSCRIPTION_TIERS = {
  REGULAR: {
    name: 'Regular',
    price: 10000, // in paise (₹100)
    features: ['Basic deal access', '5 deals per month', 'Email support']
  },
  SILVER: {
    name: 'Silver',
    price: 50000, // in paise (₹500)
    features: ['Enhanced deal access', '20 deals per month', 'Priority support', 'AI recommendations']
  },
  GOLD: {
    name: 'Gold',
    price: 100000, // in paise (₹1000)
    features: ['Premium deal access', '50 deals per month', '24/7 support', 'Advanced AI insights', 'Auction participation']
  },
  PLATINUM: {
    name: 'Platinum',
    price: 250000, // in paise (₹2500)
    features: ['Unlimited deal access', 'Unlimited deals', 'Dedicated account manager', 'Premium AI insights', 'Priority auction access', 'Custom reports']
  }
};

