import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ChefHat, User, Building2, FileText, CreditCard, CheckCircle } from 'lucide-react';
import PersonalInfoStep from '../components/registration/PersonalInfoStep';
import CompanyInfoStep from '../components/registration/CompanyInfoStep';
import DocumentsStep from '../components/registration/DocumentsStep';
import SubscriptionStep from '../components/registration/SubscriptionStep';
import PaymentStep from '../components/registration/PaymentStep';
import ProgressBar from '../components/registration/ProgressBar';
import { buyerAPI } from '../services/api';

const STEPS = [
  { id: 1, name: 'Personal Info', icon: User },
  { id: 2, name: 'Company Info', icon: Building2 },
  { id: 3, name: 'Documents', icon: FileText },
  { id: 4, name: 'Subscription', icon: CreditCard },
  { id: 5, name: 'Payment', icon: CheckCircle },
];

function BuyerRegistration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Company Info
    companyName: '',
    companyWebsite: '',
    industry: '',
    companySize: '',
    jobTitle: '',
    yearsOfExperience: '',
    linkedinProfile: '',
    
    // Investment Preferences
    investmentRange: { min: 0, max: 0 },
    sectorsOfInterest: [],
    geographicPreference: [],
    
    // Legal
    acceptedTerms: false,
    acceptedNDA: false,
    
    // System fields
    buyerId: null,
    marketplaceId: null,
    documents: [],
    subscriptionTier: '',
  });

  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePersonalInfoSubmit = async (data) => {
    try {
      setLoading(true);
      
      // Register buyer with minimal data (only personal info)
      const response = await buyerAPI.register({
        ...data
      });

      updateFormData({
        ...data,
        buyerId: response.data.buyerId,
        marketplaceId: response.data.marketplaceId,
      });

      toast.success('Registration initiated successfully!');
      handleNext();
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.error?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  const handleCompanyInfoSubmit = async (data) => {
    try {
      setLoading(true);
      
      // Update buyer information in backend
      if (formData.buyerId) {
        await buyerAPI.updateBuyer(formData.buyerId, data);
      }
      
      updateFormData(data);
      handleNext();
    } catch (error) {
      console.error('Error updating company info:', error);
      toast.error(error.response?.data?.error?.message || 'Failed to save company information');
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentsSubmit = (documents) => {
    updateFormData({ documents });
    handleNext();
  };

  const handleSubscriptionSelect = (tier) => {
    updateFormData({ subscriptionTier: tier });
    handleNext();
  };

  const handlePaymentComplete = () => {
    toast.success('🎉 Registration completed successfully!');
    setTimeout(() => {
      navigate(`/dashboard/${formData.buyerId}`);
    }, 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={formData}
            onSubmit={handlePersonalInfoSubmit}
            loading={loading}
          />
        );
      case 2:
        return (
          <CompanyInfoStep
            data={formData}
            onSubmit={handleCompanyInfoSubmit}
            onBack={handleBack}
            loading={loading}
          />
        );
      case 3:
        return (
          <DocumentsStep
            buyerId={formData.buyerId}
            documents={formData.documents}
            onSubmit={handleDocumentsSubmit}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <SubscriptionStep
            selectedTier={formData.subscriptionTier}
            onSelect={handleSubscriptionSelect}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <PaymentStep
            buyerId={formData.buyerId}
            subscriptionTier={formData.subscriptionTier}
            onComplete={handlePaymentComplete}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ChefHat className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            M&A Kitchen
          </h1>
          <p className="text-white/90 text-lg">
            Buyer Registration - Where Deals Come to Life
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar steps={STEPS} currentStep={currentStep} />

        {/* Form Card */}
        <div className="card mt-8">
          {renderStep()}
        </div>

        {/* Marketplace ID Display */}
        {formData.marketplaceId && (
          <div className="mt-4 text-center">
            <p className="text-white text-sm">
              Your Marketplace ID: <span className="font-bold">{formData.marketplaceId}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BuyerRegistration;

