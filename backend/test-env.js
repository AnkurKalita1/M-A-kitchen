import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '.env');

console.log('📁 Looking for .env at:', envPath);

try {
  const envContent = readFileSync(envPath, 'utf8');
  console.log('📄 .env file exists! First few lines:');
  console.log(envContent.split('\n').slice(0, 5).join('\n'));
  console.log('...\n');
} catch (err) {
  console.log('❌ Cannot read .env file:', err.message);
}

dotenv.config({ path: envPath });

console.log('🔑 RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID || 'NOT FOUND');
console.log('🔑 RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET ? 'Found (hidden)' : 'NOT FOUND');
console.log('🔧 PORT:', process.env.PORT || 'NOT FOUND');
console.log('🌍 NODE_ENV:', process.env.NODE_ENV || 'NOT FOUND');



