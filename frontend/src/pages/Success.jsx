import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Copy, Download, ArrowRight } from 'lucide-react';
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

  const getTierDescription = (tier) => {
    const descriptions = {
      'Regular': 'You have successfully subscribed to the Regular tier. Enjoy exclusive features and premium access to the M&A Kitchen marketplace.',
      'Silver': 'You have successfully subscribed to the Silver tier. Enjoy exclusive features and premium access to the M&A Kitchen marketplace.',
      'Gold': 'You have successfully subscribed to the Gold tier. Enjoy exclusive features and premium access to the M&A Kitchen marketplace.',
      'Platinum': 'You have successfully subscribed to the Platinum tier. Enjoy exclusive features and premium access to the M&A Kitchen marketplace.'
    };
    return descriptions[tier] || descriptions['Regular'];
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: '#5D3FD3' }}>
      {/* Success Icon - Outside the form */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center">
          <CheckCircle className="w-14 h-14 text-white" />
        </div>
      </div>

      {/* Title - Outside the form */}
      <h1 className="text-2xl sm:text-2xl font-bold text-white text-center mb-3">
        Registration Successful
      </h1>
      <p className="text-lg text-white text-center mb-8">
        Welcome to M&A Kitchen™
      </p>

      {/* White Form Card */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 md:p-10">
        {/* Business Overview */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Business Overview</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 mb-1">Company Name</p>
              <p className="text-base font-semibold text-gray-900">{userData.organizationName || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">User Role</p>
              <p className="text-base font-semibold text-gray-900">{userRole}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Subscription Tier</p>
              <p className="text-base font-semibold text-gray-900">{displayTier}</p>
            </div>
          </div>
        </div>

        {/* Login Credentials */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Login Credentials</h2>
          
          {/* Marketplace ID */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={userData.marketplaceId || 'Loading...'}
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900"
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

        {/* Email Confirmation */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Email Confirmation</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
              <span className="text-sm text-gray-700">Invoice Attached</span>
              <span className="text-sm font-semibold text-green-600">Sent</span>
            </div>
            <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
              <span className="text-sm text-gray-700">Payment Receipt</span>
              <span className="text-sm font-semibold text-green-600">Sent</span>
            </div>
            <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
              <span className="text-sm text-gray-700">Terms & Conditions Accepted</span>
              <span className="text-sm font-semibold text-green-600">Sent</span>
            </div>
            <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
              <span className="text-sm text-gray-700">Tier Description</span>
              <span className="text-sm font-semibold text-green-600">Sent</span>
            </div>
          </div>
        </div>

        {/* Tier Description */}
        <div className="mb-8 bg-gray-100 rounded-lg p-4" >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tier Description</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {getTierDescription(displayTier)}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleProceedToLogin}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
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
