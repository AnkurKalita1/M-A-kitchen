import express from 'express';
import multer from 'multer';
import { 
  registerSeller, 
  getSeller, 
  updateSeller,
  uploadDocument,
  createPaymentOrder,
  verifyPayment
} from '../controllers/seller.controller.js';

const router = express.Router();
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024 // 20MB
  }
});

// Seller registration flow
router.post('/register', registerSeller);
router.get('/:sellerId', getSeller);
router.put('/:sellerId', updateSeller); // Update seller information

// Document upload
router.post('/:sellerId/upload', upload.single('document'), uploadDocument);

// Payment flow
router.post('/payment/create-order', createPaymentOrder);
router.post('/payment/verify', verifyPayment);

export default router;


