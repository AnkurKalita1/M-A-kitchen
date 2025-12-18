import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Copy, Download, ArrowRight, AlertCircle } from 'lucide-react';
import { buyerAPI, agentAPI, sellerAPI } from '../services/api';
import { toast } from 'react-toastify';

// Map subscription tier to display name
const getSubscriptionTierDisplay = (tier) => {
  if (!tier) return 'Regular';
  const tierMap = {
    'REGULAR_QUARTERLY': 'Regular',
    'REGULAR_HALFYEARLY': 'Regular',
    'SILVER_QUARTERLY': 'Silver',
    'SILVER_HALFYEARLY': 'Silver',
    'SILVER_ANNUAL': 'Silver',
    'GOLD_QUARTERLY': 'Gold',
    'GOLD_HALFYEARLY': 'Gold',
    'GOLD_ANNUAL': 'Gold',
    'PLATINUM_LIFETIME': 'Platinum'
  };
  return tierMap[tier] || 'Regular';
};

// Map to user role display
const getUserRoleDisplay = (buyerId, agentId, sellerId) => {
  if (buyerId) return 'Buyer';
  if (agentId) return 'Agent';
  if (sellerId) return 'Seller';
  return 'User';
};

function Success() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const buyerId = searchParams.get('buyerId');
  const agentId = searchParams.get('agentId');
  const sellerId = searchParams.get('sellerId');
  const subscriptionTier = searchParams.get('subscriptionTier');
  const marketplaceId = searchParams.get('marketplaceId');
  const password = searchParams.get('password');
  const organizationName = searchParams.get('organizationName');

  const [userData, setUserData] = useState({
    marketplaceId: marketplaceId || '',
    defaultPassword: password || '',
    organizationName: organizationName || '',
    subscriptionTier: subscriptionTier || ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If data not in URL params, fetch from backend
    if ((buyerId || agentId || sellerId) && (!marketplaceId || !password)) {
      fetchUserData();
    }
  }, [buyerId, agentId, sellerId, marketplaceId, password]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      let data;
      
      if (buyerId) {
        const response = await buyerAPI.getBuyer(buyerId);
        data = response?.data || response;
      } else if (agentId) {
        const response = await agentAPI.getAgent(agentId);
        data = response?.data || response;
      } else if (sellerId) {
        const response = await sellerAPI.getSeller(sellerId);
        data = response?.data || response;
      }

      if (data) {
        setUserData({
          marketplaceId: data.marketplaceId || '',
          defaultPassword: data.defaultPassword || '',
          organizationName: data.organizationName || '',
          subscriptionTier: data.subscriptionTier || subscriptionTier || ''
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch (error) {
      console.error('Failed to copy:', error);
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleDownloadCredentials = () => {
    const credentials = {
      MarketplaceID: userData.marketplaceId,
      DefaultPassword: userData.defaultPassword,
      OrganizationName: userData.organizationName,
      SubscriptionTier: getSubscriptionTierDisplay(userData.subscriptionTier),
      UserRole: getUserRoleDisplay(buyerId, agentId, sellerId)
    };

    const content = `M&A Kitchen™ - Registration Credentials

Marketplace ID: ${credentials.MarketplaceID}
Default Password (Temporary): ${credentials.DefaultPassword}
Organization Name: ${credentials.OrganizationName}
Subscription Tier: ${credentials.SubscriptionTier}
User Role: ${credentials.UserRole}

Important: You will be required to change this password upon your first login.
Please keep these credentials secure and do not share them with anyone.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MAKitchen_Credentials_${credentials.MarketplaceID}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Credentials downloaded!');
  };

  const handleProceedToLogin = () => {
    navigate('/login');
  };

  const displayTier = getSubscriptionTierDisplay(userData.subscriptionTier);
  const userRole = getUserRoleDisplay(buyerId, agentId, sellerId);

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#5D3FD3' }}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 md:p-10">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-3">
          Registration Successful!
        </h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Welcome to M&A Kitchen™ - The Global Investment Marketplace
        </p>

        {/* Subscription Details */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Subscription Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Subscription Tier</p>
              <p className="text-base font-bold text-gray-900">{displayTier}</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">User Role</p>
              <p className="text-base font-bold text-gray-900">{userRole}</p>
            </div>
          </div>
          {userData.organizationName && (
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Company Name</p>
              <p className="text-base font-bold text-gray-900">{userData.organizationName}</p>
            </div>
          )}
        </div>

        {/* Login Credentials */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Login Credentials</h2>
          
          {/* Marketplace ID */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Marketplace ID</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={userData.marketplaceId || 'Loading...'}
                className="flex-1 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-sm font-semibold text-gray-900"
              />
              <button
                onClick={() => handleCopy(userData.marketplaceId, 'Marketplace ID')}
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                title="Copy Marketplace ID"
              >
                <Copy className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Default Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Default Password (Temporary)</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={userData.defaultPassword || 'Loading...'}
                className="flex-1 px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm font-semibold text-gray-900"
              />
              <button
                onClick={() => handleCopy(userData.defaultPassword, 'Password')}
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                title="Copy Password"
              >
                <Copy className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-900 mb-1">Important Security Notice</p>
              <p className="text-sm text-red-800">
                You will be required to change this password upon your first login. Please keep these credentials secure and do not share them with anyone.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleProceedToLogin}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Proceed to Login
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={handleDownloadCredentials}
            className="flex-1 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Credentials
          </button>
        </div>
      </div>
    </div>
  );
}

export default Success;
