import axios from 'axios';

// Use relative URL in production (same origin), absolute in development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.PROD ? '/api' : 'http://localhost:5001/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Buyer API
export const buyerAPI = {
  register: async (data) => {
    const response = await api.post('/buyer/register', data);
    return response.data;
  },

  getBuyer: async (buyerId) => {
    const response = await api.get(`/buyer/${buyerId}`);
    return response.data;
  },

  uploadDocument: async (buyerId, documentType, file) => {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('documentType', documentType);

    const response = await api.post(`/buyer/${buyerId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  createPaymentOrder: async (buyerId, subscriptionTier) => {
    const response = await api.post('/buyer/payment/create-order', {
      buyerId,
      subscriptionTier,
    });
    return response.data;
  },

  verifyPayment: async (paymentData) => {
    const response = await api.post('/buyer/payment/verify', paymentData);
    return response.data;
  },

  updateSubscription: async (buyerId, subscriptionTier) => {
    const response = await api.put(`/buyer/${buyerId}/subscription`, {
      subscriptionTier,
    });
    return response.data;
  },
};

// Health check
export const healthCheck = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;

