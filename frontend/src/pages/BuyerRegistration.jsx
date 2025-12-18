import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { User, Target, TrendingUp, FileText, CheckCircle, Loader2 } from 'lucide-react';
import OrganizationContactDetailsStep from '../components/buyer/OrganizationContactDetailsStep';
import InvestorTypeEntityDetailsStep from '../components/buyer/InvestorTypeEntityDetailsStep';
import InvestmentMetricsStep from '../components/buyer/InvestmentMetricsStep';
import DocumentsStep from '../components/buyer/DocumentsStep';
import TermsAndConditionsStep from '../components/shared/TermsAndConditionsStep';
import ProgressBar from '../components/shared/ProgressBar';
import { buyerAPI } from '../services/api';

const STEPS = [
  { id: 1, name: 'Organization & Contact Details', icon: User },
  { id: 2, name: 'Investor Type & Entity Details', icon: Target },
  { id: 3, name: 'Investment Metrics', icon: TrendingUp },
  { id: 4, name: 'Document Uploads', icon: FileText },
  { id: 5, name: 'Terms & Privacy', icon: CheckCircle },
];

function BuyerRegistration() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('plan');
  const tier = searchParams.get('tier');
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Organization & Contact Details
    organizationName: '',
    fullName: '',
    email: '',
    phone: '',
    parentOrganization: '',
    hqAddress: '',
    headquarters: '',
    contactPerson: '',
    linkedinProfile: '',
    contactDetails: '',
    organizationLogo: null,
    organizationLogoUrl: '',
    
    // Step 2: Investor Type & Entity Details
    investorType: '',
    entityType: '',
    buyerSize: '',
    strategicInvestorSector: '',
    offices: '',
    geographicalPresence: '',
    headcount: '',
    geographyPreferences: [],
    
    // Step 3: Investment Metrics
    averageInvestmentTicketSize: '',
    annualTurnover: '',
    ebitda: '',
    ebitdaMargin: '',
    netProfit: '',
    aum: '',
    fundSize: '',
    investmentTillDate: '',
    investmentHistory: '',
    
    // Step 4: Documents
    documents: [],
    
    // Step 5: Terms & Conditions
    acceptedTerms: false,
    
    // Value Added Offerings
    selectedOfferings: [],
    totalPayable: 0,
    
    // System fields
    buyerId: null,
    marketplaceId: null,
    subscriptionPlan: planId,
    subscriptionTier: tier,
  });

  useEffect(() => {
    if (!planId || !tier) {
      toast.error('Please select a subscription plan first');
      navigate('/subscription?role=buyer');
    }
  }, [planId, tier, navigate]);

  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePersonalCompanySubmit = async (data) => {
    try {
      setLoading(true);
      
      // Split fullName into firstName and lastName
      const nameParts = data.fullName?.trim().split(/\s+/) || [];
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      // Normalize LinkedIn URL to valid URI format
      let linkedinProfile = data.linkedinProfile?.trim() || '';
      if (linkedinProfile && !linkedinProfile.match(/^https?:\/\//i)) {
        linkedinProfile = `https://${linkedinProfile}`;
      }
      
      // Build payload matching backend schema
      const payload = {
        firstName,
        lastName,
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        organizationName: data.organizationName.trim(),
        hqLocation: data.headquarters?.trim() || '',
        hqAddress: data.hqAddress?.trim() || '',
        contactPerson: data.contactPerson?.trim() || '',
        parentOrganization: data.parentOrganization?.trim() || '',
        contactDetails: data.contactDetails?.trim() || '',
      };
      
      // Add optional fields only if provided
      if (linkedinProfile) {
        payload.linkedinProfile = linkedinProfile;
      }
      
      const response = await buyerAPI.register(payload);

      if (!response.buyerId || !response.marketplaceId) {
        throw new Error('Invalid response from server: missing buyerId or marketplaceId');
      }
      
      // Upload organization logo if provided
      let organizationLogoUrl = '';
      if (data.organizationLogo) {
        try {
          const logoResponse = await buyerAPI.uploadDocument(
            response.buyerId, 
            'organization_logo', 
            data.organizationLogo
          );
          organizationLogoUrl = logoResponse.data?.signedUrl || '';
          toast.success('Organization logo uploaded successfully!');
        } catch (logoError) {
          console.error('Logo upload error:', logoError);
          toast.warning('Failed to upload logo, but you can continue registration');
        }
      }
      
      updateFormData({
        ...data,
        buyerId: response.buyerId,
        marketplaceId: response.marketplaceId,
        organizationLogoUrl,
      });

      toast.success('Step 1 completed!');
      handleNext();
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
        toast.error('Network error: Please check if the backend server is running on port 5001');
      } else {
        const errorMessage = error.response?.data?.error?.message || 
                            error.response?.data?.message || 
                            error.message || 
                            'Failed to register';
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInvestorTypeEntitySubmit = async (data) => {
    try {
      setLoading(true);
      
      if (formData.buyerId) {
        await buyerAPI.updateBuyer(formData.buyerId, {
          investorType: data.investorType?.trim() || '',
          entityType: data.entityType?.trim() || '',
          buyerSize: data.buyerSize?.trim() || '',
          strategicInvestorSector: data.strategicInvestorSector?.trim() || '',
          offices: data.offices?.trim() || '',
          geographicalPresence: data.geographicalPresence?.trim() || '',
          headcount: data.headcount?.trim() || '',
          geographyPreferences: Array.isArray(data.geographyPreferences)
            ? data.geographyPreferences
            : data.geographyPreferences?.split(',').filter(Boolean) || [],
        });
      }
      
      updateFormData(data);
      toast.success('Step 2 completed!');
      handleNext();
    } catch (error) {
      console.error('Error updating investor type & entity details:', error);
      const errorMessage = error.response?.data?.error?.message || 
                          error.response?.data?.message || 
                          error.message || 
                          'Failed to save information';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInvestmentMetricsSubmit = async (data) => {
    try {
      setLoading(true);
      
      if (formData.buyerId) {
        await buyerAPI.updateBuyer(formData.buyerId, {
          averageInvestmentTicketSize: data.averageInvestmentTicketSize?.trim() || '',
          annualTurnover: data.annualTurnover?.trim() || '',
          ebitda: data.ebitda?.trim() || '',
          ebitdaMargin: data.ebitdaMargin?.trim() || '',
          netProfit: data.netProfit?.trim() || '',
          aum: data.aum?.trim() || '',
          fundSize: data.fundSize?.trim() || '',
          investmentTillDate: data.investmentTillDate?.trim() || '',
          investmentHistory: data.investmentHistory?.trim() || '',
        });
      }
      
      updateFormData(data);
      toast.success('Step 3 completed!');
      handleNext();
    } catch (error) {
      console.error('Error updating investment metrics:', error);
      const errorMessage = error.response?.data?.error?.message || 
                          error.response?.data?.message || 
                          error.message || 
                          'Failed to save information';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentsSubmit = (documents) => {
    updateFormData({ documents });
    // Don't auto-navigate - let user click "Next Step" button
  };

  const handleTermsAccept = () => {
    // Just update the form data to mark terms as accepted
    updateFormData({ acceptedTerms: true });
  };

  const handleContinueToVAO = () => {
    // Navigate to Value Added Offerings page
    navigate(`/value-added-offerings?buyerId=${formData.buyerId}&plan=${planId}&tier=${tier}`);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <OrganizationContactDetailsStep
            data={formData}
            onSubmit={handlePersonalCompanySubmit}
            loading={loading}
          />
        );
      case 2:
        return (
          <InvestorTypeEntityDetailsStep
            data={formData}
            onSubmit={handleInvestorTypeEntitySubmit}
            onBack={handleBack}
            loading={loading}
          />
        );
      case 3:
        return (
          <InvestmentMetricsStep
            data={formData}
            onSubmit={handleInvestmentMetricsSubmit}
            onBack={handleBack}
            loading={loading}
          />
        );
      case 4:
        return (
          <DocumentsStep
            buyerId={formData.buyerId}
            documents={formData.documents}
            onSubmit={handleDocumentsSubmit}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <TermsAndConditionsStep
            onAccept={handleTermsAccept}
            onBack={handleBack}
            loading={loading}
            userType="Buyer"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-3 sm:p-4" style={{ backgroundColor: '#5D3FD3' }}>
      <div className="w-full max-w-6xl mx-auto py-4 sm:py-6 md:py-8">
        {/* Header with Logo - Centered */}
        <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col items-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg mb-3 sm:mb-4">
            <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2 px-2 text-center">Buyer / Investor Registration</h2>
          <p className="text-white/90 text-xs sm:text-sm text-center max-w-2xl px-4">
            Complete your profile to access tailored investment deals and matchmaking
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar 
          steps={STEPS} 
          currentStep={currentStep}
          stepInfo={
            currentStep === 1 ? "✨ Let's start with your organization details" :
            currentStep === 2 ? "✨ Tell us what type of investor you are" :
            currentStep === 3 ? "✨ Share your key investment metrics" :
            currentStep === 4 ? "✨ Almost done! Just a few documents" :
            currentStep === 5 ? "✨ Review and accept our terms" :
            null
          }
        />

        {/* Form Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
          {renderStep()}
        </div>

        {/* Navigation Buttons - Outside Form */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-4 sm:mt-6">
          {currentStep === 1 ? (
            <button
              type="button"
              onClick={() => window.history.back()}
              className="btn-secondary flex items-center justify-center gap-2 text-sm sm:text-base px-4 py-2.5 sm:py-2.5 w-full sm:w-auto"
            >
              ← Back to Role Selection
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
              className="btn-secondary flex items-center justify-center gap-2 text-sm sm:text-base px-4 py-2.5 sm:py-2.5 w-full sm:w-auto"
            >
              ← Previous Step
            </button>
          )}
          {currentStep === 5 ? (
            <button
              type="button"
              onClick={handleContinueToVAO}
              disabled={!formData.acceptedTerms || loading}
              className="btn-primary flex items-center justify-center gap-2 text-sm sm:text-base px-4 py-2.5 sm:py-2.5 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Continue to VAO Selection →
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (currentStep === 4) {
                  // For DocumentsStep, manually navigate to next step
                  const requiredTypes = ['proof_of_funds'];
                  const uploadedTypes = formData.documents?.map((doc) => doc.documentType) || [];
                  const missingRequired = requiredTypes.filter((type) => !uploadedTypes.includes(type));
                  
                  if (missingRequired.length > 0) {
                    toast.error('Please upload all required documents');
                    return;
                  }
                  handleNext();
                } else {
                  // For other steps, submit the form
                  const form = document.querySelector('#step-form');
                  if (form) {
                    form.requestSubmit();
                  }
                }
              }}
              disabled={loading}
              className="btn-primary flex items-center justify-center gap-2 text-sm sm:text-base px-4 py-2.5 sm:py-2.5 w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  → Next Step
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default BuyerRegistration;
