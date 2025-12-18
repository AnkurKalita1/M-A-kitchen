import express from 'express';
import multer from 'multer';
import { 
  registerAgent, 
  getAgent, 
  updateAgent,
  uploadDocument,
  createPaymentOrder,
  verifyPayment,
  updateSubscription
} from '../controllers/agent.controller.js';

const router = express.Router();
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

// Agent registration flow
router.post('/register', registerAgent);
router.get('/:agentId', getAgent);
router.put('/:agentId', updateAgent); // Update agent information

// Document upload
router.post('/:agentId/upload', upload.single('document'), uploadDocument);

// Payment flow
router.post('/payment/create-order', createPaymentOrder);
router.post('/payment/verify', verifyPayment);
router.put('/:agentId/subscription', updateSubscription);

export default router;



