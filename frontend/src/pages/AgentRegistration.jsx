import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ChefHat, User, Briefcase, FileText, CreditCard, CheckCircle, Loader2 } from 'lucide-react';
import ProfessionalExperienceStep from '../components/agent/ProfessionalExperienceStep';
import AgentBusinessDetailsStep from '../components/agent/AgentBusinessDetailsStep';
import FinancialsScaleStep from '../components/agent/FinancialsScaleStep';
import MetricsDocumentsStep from '../components/agent/MetricsDocumentsStep';
import TermsAndConditionsStep from '../components/shared/TermsAndConditionsStep';
import ProgressBar from '../components/shared/ProgressBar';
import { agentAPI } from '../services/api';

const STEPS = [
  { id: 1, name: 'Organisation & Contact', icon: User },
  { id: 2, name: 'Agent & Business Details', icon: Briefcase },
  { id: 3, name: 'Financials & Scale', icon: FileText },
  { id: 4, name: 'Metrics & Documents', icon: CreditCard },
  { id: 5, name: 'Terms & Conditions', icon: FileText },
];

function AgentRegistration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    
    // Organization Info
    organizationName: '',
    headquarter: '',
    hqAddress: '',
    contactPersonnel: '',
    linkedinProfile: '',
    organizationLogo: null,
    organizationLogoUrl: '',
    phones: [''],
    emails: [''],
    
    // Agent & Business Details
    agentType: '',
    businessSpeciality: [],
    entityType: '',
    industrySector: '',
    servicesOffered: '',
    yearEstablished: '',
    
    // Financials & Scale
    annualTurnover: '',
    employeesOnPayroll: '',
    employeesOnContract: '',
    geographicalPresence: '',
    offices: '',
    subsidiariesParent: '',
    totalTransactions: '',
    topCustomersGeography: '',
    topCustomersRevenue: '',
    
    // Metrics & Documents
    averageFeePerAssignment: '',
    finraLicenses: '',
    secRegistration: '',
    sellSideTransactions: '',
    buySideTransactions: '',
    advisoryFeeAccrued: '',
    crossBorderTransactions: '',
    iposConducted: '',
    listedEntitiesEngaged: '',
    corporateOverviewFile: null,
    corporateOverviewUrl: '',
    ndaFile: null,
    ndaUrl: '',
    
    // Legal
    acceptedTerms: false,
    acceptedNDA: false,
    
    // System fields
    agentId: null,
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

  const handleProfessionalExperienceSubmit = async (data) => {
    try {
      setLoading(true);
      
      // Prepare registration payload (exclude logo file)
      const { organizationLogo, ...registrationData } = data;
      
      // Register agent with organization, personal and professional data
      const response = await agentAPI.register(registrationData);

      if (!response.data?.agentId || !response.data?.marketplaceId) {
        throw new Error('Invalid response from server: missing agentId or marketplaceId');
      }

      // Upload organization logo if provided
      let organizationLogoUrl = '';
      if (data.organizationLogo) {
        try {
          const logoResponse = await agentAPI.uploadDocument(
            response.data.agentId,
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
        agentId: response.data.agentId,
        marketplaceId: response.data.marketplaceId,
        organizationLogoUrl,
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

  const handleAgentBusinessDetailsSubmit = async (data) => {
    try {
      setLoading(true);
      
      console.log('Agent Business Details Submit - Data:', data);
      console.log('Current agentId:', formData.agentId);
      
      // Update agent information in backend
      if (formData.agentId) {
        const response = await agentAPI.updateAgent(formData.agentId, data);
        console.log('Update response:', response);
      }
      
      updateFormData(data);
      handleNext();
    } catch (error) {
      console.error('Error updating agent business details:', error);
      console.error('Error response:', error.response);
      toast.error(error.response?.data?.error?.message || 'Failed to save business details');
    } finally {
      setLoading(false);
    }
  };

  const handleFinancialsScaleSubmit = async (data) => {
    try {
      setLoading(true);
      
      console.log('Financials & Scale Submit - Data:', data);
      
      // Update agent information in backend
      if (formData.agentId) {
        await agentAPI.updateAgent(formData.agentId, data);
      }
      
      updateFormData(data);
      handleNext();
    } catch (error) {
      console.error('Error updating financials & scale:', error);
      toast.error(error.response?.data?.error?.message || 'Failed to save financials & scale information');
    } finally {
      setLoading(false);
    }
  };

  const handleMetricsDocumentsSubmit = async (data) => {
    try {
      setLoading(true);
      
      console.log('Metrics & Documents Submit - Full Data:', data);
      
      const { corporateOverviewFile, ndaFile, ...metricsData } = data;
      
      console.log('Extracted metrics data:', metricsData);
      console.log('Corporate overview file:', corporateOverviewFile);
      console.log('NDA file:', ndaFile);
      console.log('Current agentId:', formData.agentId);
      
      // Update agent information in backend (only if there are fields to update)
      if (formData.agentId) {
        // metricsData should already only contain non-empty values from the component
        if (Object.keys(metricsData).length > 0) {
          console.log('Updating agent with metrics data:', metricsData);
          try {
            await agentAPI.updateAgent(formData.agentId, metricsData);
            console.log('Metrics updated successfully');
          } catch (updateError) {
            console.error('Error updating metrics:', updateError);
            // Don't throw - allow document uploads to proceed
            toast.warning('Some metrics may not have been saved, but you can continue');
          }
        } else {
          console.log('No metrics data to update, skipping backend update');
        }
        
        // Upload documents if provided
        if (corporateOverviewFile) {
          try {
            console.log('Uploading corporate overview file...');
            console.log('File details:', {
              name: corporateOverviewFile.name,
              type: corporateOverviewFile.type,
              size: corporateOverviewFile.size,
              isFile: corporateOverviewFile instanceof File
            });
            
            if (!(corporateOverviewFile instanceof File)) {
              console.error('Corporate overview file is not a File object:', corporateOverviewFile);
              toast.warning('Invalid file format for Corporate Overview Deck');
            } else {
              const corporateResponse = await agentAPI.uploadDocument(
                formData.agentId,
                'corporate_overview',
                corporateOverviewFile
              );
              console.log('Corporate overview response:', corporateResponse);
              // Response structure: { success: true, data: { document: {...}, signedUrl: "..." } }
              const corporateUrl = corporateResponse?.data?.signedUrl || corporateResponse?.signedUrl || '';
              if (corporateUrl) {
                updateFormData({ corporateOverviewUrl: corporateUrl });
                toast.success('Corporate Overview Deck uploaded successfully!');
              } else {
                console.warn('No signedUrl in corporate overview response');
              }
            }
          } catch (error) {
            console.error('Corporate overview upload error:', error);
            console.error('Error response:', error.response?.data);
            toast.error(error.response?.data?.error?.message || 'Failed to upload Corporate Overview Deck');
          }
        }
        
        if (ndaFile) {
          try {
            console.log('Uploading NDA file...');
            console.log('File details:', {
              name: ndaFile.name,
              type: ndaFile.type,
              size: ndaFile.size,
              isFile: ndaFile instanceof File
            });
            
            if (!(ndaFile instanceof File)) {
              console.error('NDA file is not a File object:', ndaFile);
              toast.warning('Invalid file format for NDA document');
            } else {
              const ndaResponse = await agentAPI.uploadDocument(
                formData.agentId,
                'nda',
                ndaFile
              );
              console.log('NDA response:', ndaResponse);
              // Response structure: { success: true, data: { document: {...}, signedUrl: "..." } }
              const ndaUrl = ndaResponse?.data?.signedUrl || ndaResponse?.signedUrl || '';
              if (ndaUrl) {
                updateFormData({ ndaUrl: ndaUrl });
                toast.success('NDA document uploaded successfully!');
              } else {
                console.warn('No signedUrl in NDA response');
              }
            }
          } catch (error) {
            console.error('NDA upload error:', error);
            console.error('Error response:', error.response?.data);
            toast.error(error.response?.data?.error?.message || 'Failed to upload NDA document');
          }
        }
      } else {
        console.error('No agentId available, cannot update backend');
        toast.error('Agent ID not found. Please refresh and try again.');
        return;
      }
      
      // Update form data with metrics
      updateFormData(metricsData);
    handleNext();
    } catch (error) {
      console.error('Error updating metrics & documents:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      toast.error(error.response?.data?.error?.message || error.message || 'Failed to save metrics & documents');
    } finally {
      setLoading(false);
    }
  };

  const handleTermsAccept = () => {
    // Just update the form data to mark terms as accepted
    updateFormData({ acceptedTerms: true });
  };

  const handleContinueToVAO = () => {
    // Navigate to Value Added Offerings page
    const searchParams = new URLSearchParams(window.location.search);
    const plan = searchParams.get('plan') || 'regular-6';
    const tier = searchParams.get('tier') || 'regular';
    navigate(`/value-added-offerings?agentId=${formData.agentId}&plan=${plan}&tier=${tier}`);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProfessionalExperienceStep
            data={formData}
            onSubmit={handleProfessionalExperienceSubmit}
            loading={loading}
          />
        );
      case 2:
        return (
          <AgentBusinessDetailsStep
            data={formData}
            onSubmit={handleAgentBusinessDetailsSubmit}
            loading={loading}
          />
        );
      case 3:
        return (
          <FinancialsScaleStep
            data={formData}
            onSubmit={handleFinancialsScaleSubmit}
            loading={loading}
          />
        );
      case 4:
        return (
          <MetricsDocumentsStep
            data={formData}
            agentId={formData.agentId}
            onSubmit={handleMetricsDocumentsSubmit}
            loading={loading}
          />
        );
      case 5:
        return (
          <TermsAndConditionsStep
            acceptedTerms={formData.acceptedTerms}
            acceptedNDA={formData.acceptedNDA}
            onSubmit={handleTermsAccept}
            userType="Agent"
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
            <ChefHat className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2 px-2 text-center">Agent / Advisor Registration</h2>
          <p className="text-white/90 text-xs sm:text-sm text-center max-w-2xl px-4">
            Join our network of investment professionals and advisors
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar 
          steps={STEPS} 
          currentStep={currentStep}
          stepInfo={
            currentStep === 1 ? "✨ Let's start with your organisation & contact details" :
            currentStep === 2 ? "✨ Tell us how you operate and what you specialise in" :
            currentStep === 3 ? "✨ Share your scale and coverage" :
            currentStep === 4 ? " ✨ Add performance metrics & documents" :
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
                // For all steps, submit the form
                const form = document.querySelector('#step-form');
                if (form) {
                  form.requestSubmit();
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

        {/* Marketplace ID Display */}
        {formData.marketplaceId && (
          <div className="mt-4 text-center px-4">
            <p className="text-white text-xs sm:text-sm">
              Your Marketplace ID: <span className="font-bold">{formData.marketplaceId}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AgentRegistration;

