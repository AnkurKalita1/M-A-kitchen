import axios from 'axios';

// Use relative URL in production (same origin), absolute in development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.PROD ? '/api' : 'http://localhost:5001/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });
    return Promise.reject(error);
  }
);

// Buyer API
export const buyerAPI = {
  register: async (data) => {
    try {
      const response = await api.post('/buyer/register', data);
      // Backend returns: { success: true, data: { buyerId, marketplaceId } }
      // Extract the data object for easier access
      if (response.data?.success && response.data?.data) {
        return response.data.data;
      }
      return response.data;
    }
     catch (error) {
      // Re-throw with more context for network errors
      if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
        const networkError = new Error('Cannot connect to backend server. Please ensure the server is running on port 5001');
        networkError.code = 'ERR_NETWORK';
        throw networkError;
      }
      throw error;
    }
  },

  getBuyer: async (buyerId) => {
    const response = await api.get(`/buyer/${buyerId}`);
    return response.data;
  },

  updateBuyer: async (buyerId, data) => {
    const response = await api.put(`/buyer/${buyerId}`, data);
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

  createPaymentOrder: async (data) => {
    const response = await api.post('/buyer/payment/create-order', data);
    return response;
  },

  verifyPayment: async (paymentData) => {
    const response = await api.post('/buyer/payment/verify', paymentData);
    // Backend returns: { success: true, data: { marketplaceId, defaultPassword, ... } }
    if (response.data?.success && response.data?.data) {
      return response.data.data;
    }
    return response.data;
  },

  updateSubscription: async (buyerId, subscriptionTier) => {
    const response = await api.put(`/buyer/${buyerId}/subscription`, {
      subscriptionTier,
    });
    return response.data;
  },
};

// Agent API
export const agentAPI = {
  register: async (data) => {
    const response = await api.post('/agent/register', data);
    return response.data;
  },

  getAgent: async (agentId) => {
    const response = await api.get(`/agent/${agentId}`);
    return response.data;
  },

  updateAgent: async (agentId, data) => {
    const response = await api.put(`/agent/${agentId}`, data);
    return response.data;
  },

  uploadDocument: async (agentId, documentType, file) => {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('documentType', documentType);

    const response = await api.post(`/agent/${agentId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  createPaymentOrder: async (agentId, subscriptionTier) => {
    const response = await api.post('/agent/payment/create-order', {
      agentId,
      subscriptionTier,
    });
    return response.data;
  },

  verifyPayment: async (paymentData) => {
    const response = await api.post('/agent/payment/verify', paymentData);
    // Backend returns: { success: true, data: { marketplaceId, defaultPassword, ... } }
    if (response.data?.success && response.data?.data) {
      return response.data.data;
    }
    return response.data;
  },

  updateSubscription: async (agentId, subscriptionTier) => {
    const response = await api.put(`/agent/${agentId}/subscription`, {
      subscriptionTier,
    });
    return response.data;
  },
};

// Seller API
export const sellerAPI = {
  register: async (data) => {
    try {
      const response = await api.post('/seller/register', data);
      // Backend returns: { success: true, data: { sellerId, marketplaceId } }
      // Extract the data object for easier access
      if (response.data?.success && response.data?.data) {
        return response.data.data;
      }
      return response.data;
    } catch (error) {
      // Re-throw with more context for network errors
      if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
        const networkError = new Error('Cannot connect to backend server. Please ensure the server is running on port 5001');
        networkError.code = 'ERR_NETWORK';
        throw networkError;
      }
      throw error;
    }
  },

  getSeller: async (sellerId) => {
    const response = await api.get(`/seller/${sellerId}`);
    if (response.data?.success && response.data?.data) {
      return response.data.data;
    }
    return response.data;
  },

  updateSeller: async (sellerId, data) => {
    const response = await api.put(`/seller/${sellerId}`, data);
    if (response.data?.success && response.data?.data) {
      return response.data.data;
    }
    return response.data;
  },

  uploadDocument: async (sellerId, documentType, file) => {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('documentType', documentType);

    const response = await api.post(`/seller/${sellerId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.data?.success && response.data?.data) {
      return response.data.data;
    }
    return response.data;
  },

  createPaymentOrder: async (sellerId, subscriptionTier) => {
    const response = await api.post('/seller/payment/create-order', {
      sellerId,
      subscriptionTier,
    });
    if (response.data?.success && response.data?.data) {
      return response.data.data;
    }
    return response.data;
  },

  verifyPayment: async (paymentData) => {
    const response = await api.post('/seller/payment/verify', paymentData);
    if (response.data?.success && response.data?.data) {
      return response.data.data;
    }
    return response.data;
  },
};

// Health check
export const healthCheck = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;

