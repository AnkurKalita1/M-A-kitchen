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
  REGULAR_QUARTERLY: {
    name: 'Regular (Quarterly)',
    duration: '3 months',
    price: 99900, // $999 USD in cents (999 * 100)
    currency: 'USD',
    features: [
      'Exploratory access to marketplace for chosen Industry vertical',
      'No live auction discounts',
      'Access to Buyers/Sellers within 1 Industry vertical (chosen while subscribing)',
      'No access to Agents',
      'No discounts on Value Added Offerings (VAOs)',
      'No Auto upgrade to next version of application platform on version update',
      'Low priority marketplace listing (low visibility)'
    ]
  },
  SILVER_QUARTERLY: {
    name: 'Silver (Quarterly)',
    duration: '3 months',
    price: 599900, // $5999 USD in cents
    currency: 'USD',
    features: [
      'Complimentary access to all Sellers, Buyers & Agents within 2 Industry segments in marketplace',
      '5% discount on Live Auction Event tickets for 2 events each',
      'Auto upgrade to next version of application platform on version update',
      'Medium priority listing amongst Sellers, Buyers and Agents (med visibility)',
      '1% discount on purchase of Value-Added Offerings (VAOs)',
      'Dashboard Analytics view of marketplace'
    ]
  },
  GOLD_QUARTERLY: {
    name: 'Gold (Quarterly)',
    duration: '3 months',
    price: 1299900, // $12999 USD in cents
    currency: 'USD',
    features: [
      'Complimentary access to all Sellers, Buyers & Agents within 6 Industry segments in marketplace',
      '15% discount on Live Auction Event tickets for 4 events each',
      'Auto upgrade to next version of application platform on version update',
      'High priority listing amongst Sellers, Buyers and Agents (high visibility)',
      '7% discount on purchase of Value-Added Offerings (VAOs)',
      '24% discount on Subscription Renewal',
      'High priority in Live Auction Event bookings (balcony seats)',
      'Dashboard Analytics view of marketplace'
    ]
  },
  REGULAR_HALFYEARLY: {
    name: 'Regular (Half-Yearly)',
    duration: '6 months',
    price: 299900, // $2999 USD in cents
    currency: 'USD',
    features: [
      'Complimentary access to all Sellers, Buyers & Agents within 1 Industry segment in marketplace',
      '1% discount on Live Auction Event ticket for 1 event'
    ]
  }
};








