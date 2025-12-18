import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ChefHat, User, Building2, FileText, CreditCard, CheckCircle } from 'lucide-react';
import { buyerAPI } from '../services/api';

function Dashboard() {
  const { buyerId } = useParams();
  const [buyer, setBuyer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuyer = async () => {
      try {
        const response = await buyerAPI.getBuyer(buyerId);
        setBuyer(response.data);
      } catch (error) {
        console.error('Error fetching buyer:', error);
        toast.error('Failed to load buyer information');
      } finally {
        setLoading(false);
      }
    };

    if (buyerId) {
      fetchBuyer();
    }
  }, [buyerId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#5D3FD3' }}>
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!buyer) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#5D3FD3' }}>
        <div className="card max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Buyer Not Found</h1>
          <p className="text-gray-600">The buyer information could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: '#5D3FD3' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="card mb-6">
          <div className="flex items-center gap-4">
            {buyer.organizationLogoUrl ? (
              <img 
                src={buyer.organizationLogoUrl} 
                alt="Organization Logo" 
                className="w-16 h-16 object-contain border-2 border-gray-200 rounded-xl p-2 bg-white"
              />
            ) : (
              <ChefHat className="w-16 h-16 text-primary-600" />
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome, {buyer.firstName} {buyer.lastName}!
              </h1>
              <p className="text-gray-600 mt-1">
                {buyer.organizationName && (
                  <span className="mr-4">{buyer.organizationName}</span>
                )}
                Marketplace ID: <span className="font-semibold">{buyer.marketplaceId}</span>
              </p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Personal Info */}
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-6 h-6 text-primary-600" />
              <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">Email:</span>
                <p className="font-medium text-gray-900">{buyer.email}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Phone:</span>
                <p className="font-medium text-gray-900">{buyer.phone}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Job Title:</span>
                <p className="font-medium text-gray-900">{buyer.jobTitle}</p>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              {buyer.organizationLogoUrl ? (
                <img 
                  src={buyer.organizationLogoUrl} 
                  alt="Organization Logo" 
                  className="w-12 h-12 object-contain border border-gray-200 rounded-lg p-1"
                />
              ) : (
                <Building2 className="w-6 h-6 text-primary-600" />
              )}
              <h2 className="text-xl font-bold text-gray-900">Company Information</h2>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">Organization:</span>
                <p className="font-medium text-gray-900">{buyer.organizationName || buyer.companyName}</p>
              </div>
              {buyer.parentOrganization && (
                <div>
                  <span className="text-sm text-gray-600">Parent Organization:</span>
                  <p className="font-medium text-gray-900">{buyer.parentOrganization}</p>
                </div>
              )}
              <div>
                <span className="text-sm text-gray-600">Headquarters:</span>
                <p className="font-medium text-gray-900">{buyer.hqLocation || buyer.headquarters || 'N/A'}</p>
              </div>
              {buyer.linkedinProfile && (
                <div>
                  <span className="text-sm text-gray-600">LinkedIn:</span>
                  <a 
                    href={buyer.linkedinProfile} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Subscription Info */}
        <div className="card mb-6">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-bold text-gray-900">Subscription Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <span className="text-sm text-gray-600">Plan:</span>
              <p className="font-bold text-xl text-primary-600">{buyer.subscriptionTier}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Status:</span>
              <p className="font-medium text-green-600 capitalize">{buyer.subscriptionStatus}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Member Since:</span>
              <p className="font-medium text-gray-900">
                {new Date(buyer.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-bold text-gray-900">Uploaded Documents</h2>
          </div>
          <div className="space-y-3">
            {buyer.documents && buyer.documents.length > 0 ? (
              buyer.documents.map((doc) => (
                <div
                  key={doc.documentId}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{doc.documentType.replace('_', ' ')}</p>
                    <p className="text-sm text-gray-600">{doc.fileName}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              ))
            ) : (
              <p className="text-gray-600">No documents uploaded yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

