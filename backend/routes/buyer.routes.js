import express from 'express';
import multer from 'multer';
import { 
  registerBuyer, 
  getBuyer, 
  updateBuyer,
  uploadDocument,
  createPaymentOrder,
  verifyPayment,
  updateSubscription
} from '../controllers/buyer.controller.js';

const router = express.Router();
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

// Buyer registration flow
router.post('/register', registerBuyer);
router.get('/:buyerId', getBuyer);
router.put('/:buyerId', updateBuyer); // Update buyer information

// Document upload
router.post('/:buyerId/upload', upload.single('document'), uploadDocument);

// Payment flow
router.post('/payment/create-order', createPaymentOrder);
router.post('/payment/verify', verifyPayment);
router.put('/:buyerId/subscription', updateSubscription);

export default router;

