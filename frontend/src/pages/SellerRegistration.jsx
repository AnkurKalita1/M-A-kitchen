import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Building2, TrendingUp, Users, FileText, Briefcase, CheckCircle, Loader2 } from 'lucide-react';
import OrganisationContactDetailsStep from '../components/seller/OrganisationContactDetailsStep';
import BusinessFinancialOverviewStep from '../components/seller/BusinessFinancialOverviewStep';
import OperationsOwnershipStep from '../components/seller/OperationsOwnershipStep';
import CustomersCommercialMetricsStep from '../components/seller/CustomersCommercialMetricsStep';
import AttachmentsInvestmentStep from '../components/seller/AttachmentsInvestmentStep';
import TermsAndConditionsStep from '../components/shared/TermsAndConditionsStep';
import ProgressBar from '../components/shared/ProgressBar';
import { sellerAPI } from '../services/api';

const STEPS = [
  { id: 1, name: 'Organisation & Contact', icon: Building2 },
  { id: 2, name: 'Business & Financial Overview', icon: TrendingUp },
  { id: 3, name: 'Operations & Ownership', icon: Users },
  { id: 4, name: 'Customers & Commercials', icon: Briefcase },
  { id: 5, name: 'Attachments & Investment', icon: FileText },
  { id: 6, name: 'Terms & Conditions', icon: CheckCircle },
];

function SellerRegistration() {
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Organisation & Contact Details
    organizationName: '',
    headquarter: '',
    hqAddress: '',
    contactPersonnel: '',
    phones: [''],
    emails: [''],
    linkedinProfile: '',
    organizationLogo: null,
    organizationLogoUrl: '',
    
    // Step 2: Business & Financial Overview
    industrySector: '',
    offeringCategory: '',
    annualTurnover: '',
    ebitda: '',
    netProfit: '',
    entityType: '',
    yearEstablished: '',
    mrr: '',
    ebitdaMargin: '',
    productServicesSplit: '',
    
    // Step 3: Operations & Ownership
    employeesOnPayroll: '',
    employeesOnContract: '',
    geographicalPresence: '',
    offices: '',
    businessGeographySplit: '',
    geographySplit: [],
    subsidiaries: '',
    investmentsAcquisitions: '',
    capTableShareholding: '',
    coreBusinessModel: '',
    keyDifferentiators: '',
    investorHistory: '',
    
    // Step 4: Customers & Commercial Metrics
    totalClientsUsers: '',
    totalActiveClientsUsers: '',
    avgDealSize: '',
    repeatCustomersPercent: '',
    biggestDealSize: '',
    productPricingPerItem: '',
    typicalPricePerItem: '',
    aum: '',
    assetsUnderManagement: '',
    topCustomers: '',
    partnershipAlliancesChannels: '',
    iprs: '',
    founderProfiles: '',
    cac: '',
    customerAcquisitionCost: '',
    clv: '',
    customerLifetimeValue: '',
    npv: '',
    netPresentValue: '',
    pendingLegalIssues: '',
    legalIssuesDetails: '',
    shortLongTermBorrowings: '',
    
    // Step 5: Attachments & Investment Details
    investmentSought: '',
    investmentType: '',
    resourceSkillsetUrl: '',
    forwardProjectionsUrl: '',
    incomeStatementUrl: '',
    balanceSheetUrl: '',
    cashFlowUrl: '',
    pitchDeckUrl: '',
    businessCollateralsUrl: '',
    valuationUrl: '',
    ndaUrl: '',
    
    // Step 6: Terms & Conditions
    acceptedTerms: false,
    acceptedNDA: false,
    
    // System fields
    sellerId: null,
    marketplaceId: null,
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

  const handleOrganisationContactSubmit = async (data) => {
    try {
      setLoading(true);
      
      // Extract logo file before sending to API
      const { organizationLogo, ...registrationData } = data;
      
      let sellerId = formData.sellerId;
      let marketplaceId = formData.marketplaceId;

      // Register seller if not already registered
      if (!sellerId) {
        const response = await sellerAPI.register(registrationData);
        
        if (!response.sellerId || !response.marketplaceId) {
          throw new Error('Invalid response from server: missing sellerId or marketplaceId');
        }
        
        sellerId = response.sellerId;
        marketplaceId = response.marketplaceId;
        updateFormData({ sellerId, marketplaceId });
      } else {
        // Update existing seller
        await sellerAPI.updateSeller(sellerId, registrationData);
      }

      // Upload logo if provided
      if (organizationLogo) {
        try {
          const logoResponse = await sellerAPI.uploadDocument(
            sellerId, 
            'organization_logo', 
            organizationLogo
          );
          const signedUrl = logoResponse?.signedUrl || logoResponse?.data?.signedUrl || '';
          updateFormData({ organizationLogoUrl: signedUrl });
          toast.success('Organization logo uploaded successfully!');
        } catch (logoError) {
          console.error('Logo upload error:', logoError);
          toast.warning('Failed to upload logo, but you can continue registration');
        }
      }
      
      updateFormData(data);
      toast.success('Step 1 completed!');
      handleNext();
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.error?.message || 
                          error.response?.data?.message || 
                          error.message || 
                          'Failed to register';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBusinessFinancialSubmit = async (data) => {
    try {
      setLoading(true);
      
      if (!formData.sellerId) {
        toast.error('Please complete Step 1 first');
        return;
      }

      await sellerAPI.updateSeller(formData.sellerId, data);
      updateFormData(data);
      toast.success('Step 2 completed!');
      handleNext();
    } catch (error) {
      console.error('Error updating business & financial overview:', error);
      const errorMessage = error.response?.data?.error?.message || 
                          error.response?.data?.message || 
                          error.message || 
                          'Failed to save information';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleOperationsOwnershipSubmit = async (data) => {
    try {
      setLoading(true);
      
      if (!formData.sellerId) {
        toast.error('Please complete Step 1 first');
        return;
      }

      await sellerAPI.updateSeller(formData.sellerId, data);
      updateFormData(data);
      toast.success('Step 3 completed!');
      handleNext();
    } catch (error) {
      console.error('Error updating operations & ownership:', error);
      const errorMessage = error.response?.data?.error?.message || 
                          error.response?.data?.message || 
                          error.message || 
                          'Failed to save information';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomersCommercialMetricsSubmit = async (data) => {
    try {
      setLoading(true);
      
      if (!formData.sellerId) {
        toast.error('Please complete Step 1 first');
        return;
      }

      await sellerAPI.updateSeller(formData.sellerId, data);
      updateFormData(data);
      toast.success('Step 4 completed!');
      handleNext();
    } catch (error) {
      console.error('Error updating customers & commercial metrics:', error);
      const errorMessage = error.response?.data?.error?.message || 
                          error.response?.data?.message || 
                          error.message || 
                          'Failed to save information';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleAttachmentsInvestmentSubmit = async (data) => {
    try {
      setLoading(true);
      
      if (!formData.sellerId) {
        toast.error('Please complete Step 1 first');
        return;
      }

      // Extract file objects from data
      const {
        resourceSkillsetFile,
        projectionsFiles,
        incomeStatementFile,
        balanceSheetFile,
        cashFlowFile,
        pitchDeckFile,
        businessCollateralsFiles,
        valuationFile,
        ndaFile,
        ...formFields
      } = data;

      // Update form fields first
      await sellerAPI.updateSeller(formData.sellerId, formFields);
      updateFormData(formFields);

      // Upload files
      const uploadPromises = [];

      if (resourceSkillsetFile && resourceSkillsetFile instanceof File) {
        uploadPromises.push(
          sellerAPI.uploadDocument(formData.sellerId, 'resource_skillset', resourceSkillsetFile)
            .then(response => {
              const signedUrl = response?.signedUrl || response?.data?.signedUrl || '';
              updateFormData({ resourceSkillsetUrl: signedUrl });
            })
            .catch(err => console.error('Resource skillset upload error:', err))
        );
      }

      if (projectionsFiles && Array.isArray(projectionsFiles) && projectionsFiles.length > 0) {
        projectionsFiles.forEach((file) => {
          if (file instanceof File) {
            uploadPromises.push(
              sellerAPI.uploadDocument(formData.sellerId, 'forward_projections', file)
                .catch(err => console.error('Projections upload error:', err))
            );
          }
        });
      }

      if (incomeStatementFile && incomeStatementFile instanceof File) {
        uploadPromises.push(
          sellerAPI.uploadDocument(formData.sellerId, 'income_statement', incomeStatementFile)
            .then(response => {
              const signedUrl = response?.signedUrl || response?.data?.signedUrl || '';
              updateFormData({ incomeStatementUrl: signedUrl });
            })
            .catch(err => console.error('Income statement upload error:', err))
        );
      }

      if (balanceSheetFile && balanceSheetFile instanceof File) {
        uploadPromises.push(
          sellerAPI.uploadDocument(formData.sellerId, 'balance_sheet', balanceSheetFile)
            .then(response => {
              const signedUrl = response?.signedUrl || response?.data?.signedUrl || '';
              updateFormData({ balanceSheetUrl: signedUrl });
            })
            .catch(err => console.error('Balance sheet upload error:', err))
        );
      }

      if (cashFlowFile && cashFlowFile instanceof File) {
        uploadPromises.push(
          sellerAPI.uploadDocument(formData.sellerId, 'cash_flow_statement', cashFlowFile)
            .then(response => {
              const signedUrl = response?.signedUrl || response?.data?.signedUrl || '';
              updateFormData({ cashFlowUrl: signedUrl });
            })
            .catch(err => console.error('Cash flow upload error:', err))
        );
      }

      if (pitchDeckFile && pitchDeckFile instanceof File) {
        uploadPromises.push(
          sellerAPI.uploadDocument(formData.sellerId, 'pitch_deck', pitchDeckFile)
            .then(response => {
              const signedUrl = response?.signedUrl || response?.data?.signedUrl || '';
              updateFormData({ pitchDeckUrl: signedUrl });
            })
            .catch(err => console.error('Pitch deck upload error:', err))
        );
      }

      if (businessCollateralsFiles && Array.isArray(businessCollateralsFiles) && businessCollateralsFiles.length > 0) {
        businessCollateralsFiles.forEach((file) => {
          if (file instanceof File) {
            uploadPromises.push(
              sellerAPI.uploadDocument(formData.sellerId, 'business_collaterals', file)
                .catch(err => console.error('Business collaterals upload error:', err))
            );
          }
        });
      }

      if (valuationFile && valuationFile instanceof File) {
        uploadPromises.push(
          sellerAPI.uploadDocument(formData.sellerId, 'valuation', valuationFile)
            .then(response => {
              const signedUrl = response?.signedUrl || response?.data?.signedUrl || '';
              updateFormData({ valuationUrl: signedUrl });
            })
            .catch(err => console.error('Valuation upload error:', err))
        );
      }

      if (ndaFile && ndaFile instanceof File) {
        uploadPromises.push(
          sellerAPI.uploadDocument(formData.sellerId, 'nda', ndaFile)
            .then(response => {
              const signedUrl = response?.signedUrl || response?.data?.signedUrl || '';
              updateFormData({ ndaUrl: signedUrl });
            })
            .catch(err => console.error('NDA upload error:', err))
        );
      }

      // Wait for all uploads to complete
      await Promise.all(uploadPromises);

      toast.success('Step 5 completed!');
      handleNext();
    } catch (error) {
      console.error('Error updating attachments & investment details:', error);
      const errorMessage = error.response?.data?.error?.message || 
                          error.response?.data?.message || 
                          error.message || 
                          'Failed to save information';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleTermsAccept = () => {
    updateFormData({ acceptedTerms: true });
  };

  const handleContinueToVAO = () => {
    navigate(`/value-added-offerings?sellerId=${formData.sellerId}`);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <OrganisationContactDetailsStep
            data={formData}
            onSubmit={handleOrganisationContactSubmit}
            loading={loading}
          />
        );
      case 2:
        return (
          <BusinessFinancialOverviewStep
            data={formData}
            onSubmit={handleBusinessFinancialSubmit}
            loading={loading}
          />
        );
      case 3:
        return (
          <OperationsOwnershipStep
            data={formData}
            onSubmit={handleOperationsOwnershipSubmit}
            loading={loading}
          />
        );
      case 4:
        return (
          <CustomersCommercialMetricsStep
            data={formData}
            onSubmit={handleCustomersCommercialMetricsSubmit}
            loading={loading}
          />
        );
      case 5:
        return (
          <AttachmentsInvestmentStep
            data={formData}
            sellerId={formData.sellerId}
            onSubmit={handleAttachmentsInvestmentSubmit}
            loading={loading}
          />
        );
      case 6:
        return (
          <TermsAndConditionsStep
            acceptedTerms={formData.acceptedTerms}
            acceptedNDA={formData.acceptedNDA}
            onSubmit={handleTermsAccept}
            userType="Seller"
          />
        );
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-600">Step {currentStep} - Coming soon</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen p-3 sm:p-4" style={{ backgroundColor: '#5D3FD3' }}>
      <div className="w-full max-w-6xl mx-auto py-4 sm:py-6 md:py-8">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            <h1 className="text-xl sm:text-2xl font-bold text-white">Seller / Business Registration</h1>
          </div>
          <p className="text-white/90 text-xs sm:text-sm">
            List your business to connect with qualified buyers and investors
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar
          steps={STEPS}
          currentStep={currentStep}
          stepInfo={
            currentStep === 1 ? "✨ Let's start with your organisation & contact details" :
            currentStep === 2 ? "+ Tell us how your business is structured financially." :
            currentStep === 3 ? "+ Share operational & ownership information" :
            currentStep === 4 ? "+ Capture customers and commercial metrics" :
            currentStep === 5 ? "+ Upload attachments & investment details" :
            currentStep === 6 ? "✨ Review and accept our terms" :
            null
          }
        />

        {/* Form Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 mt-4 sm:mt-6">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
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
              onClick={handleBack}
              className="btn-secondary flex items-center justify-center gap-2 text-sm sm:text-base px-4 py-2.5 sm:py-2.5 w-full sm:w-auto"
            >
              ← Previous Step
            </button>
          )}
          {currentStep === 6 ? (
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

export default SellerRegistration;

