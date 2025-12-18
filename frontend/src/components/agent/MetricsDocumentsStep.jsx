import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Upload, FileText, Check, Loader2, X } from 'lucide-react';
import { agentAPI } from '../../services/api';

const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
];

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

function MetricsDocumentsStep({ data, agentId, onSubmit, loading }) {
  const [corporateOverviewFile, setCorporateOverviewFile] = useState(null);
  const [corporateOverviewPreview, setCorporateOverviewPreview] = useState(data.corporateOverviewUrl || null);
  const [corporateOverviewUploading, setCorporateOverviewUploading] = useState(false);
  const [ndaFile, setNdaFile] = useState(null);
  const [ndaPreview, setNdaPreview] = useState(data.ndaUrl || null);
  const [ndaUploading, setNdaUploading] = useState(false);
  const [isDraggingCorporate, setIsDraggingCorporate] = useState(false);
  const [isDraggingNda, setIsDraggingNda] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      averageFeePerAssignment: data.averageFeePerAssignment || '',
      finraLicenses: data.finraLicenses || '',
      secRegistration: data.secRegistration || '',
      sellSideTransactions: data.sellSideTransactions || '',
      buySideTransactions: data.buySideTransactions || '',
      advisoryFeeAccrued: data.advisoryFeeAccrued || '',
      crossBorderTransactions: data.crossBorderTransactions || '',
      iposConducted: data.iposConducted || '',
      listedEntitiesEngaged: data.listedEntitiesEngaged || '',
    },
  });

  const validateAndSetFile = (file, type) => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast.error('Invalid file type. Only PDF, PPT, and PPTX files are allowed.');
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size must be less than 20MB');
      return false;
    }

    return true;
  };

  const handleCorporateOverviewChange = async (file) => {
    if (!file || !validateAndSetFile(file, 'corporate_overview')) return;

    setCorporateOverviewFile(file);
    setCorporateOverviewPreview(URL.createObjectURL(file));

    // Upload immediately if agentId is available, otherwise it will be uploaded on form submit
    if (agentId) {
      try {
        setCorporateOverviewUploading(true);
        const response = await agentAPI.uploadDocument(agentId, 'corporate_overview', file);
        if (response.data?.signedUrl) {
          setCorporateOverviewPreview(response.data.signedUrl);
        }
        toast.success('Corporate Overview Deck uploaded successfully!');
      } catch (error) {
        console.error('Upload error:', error);
        toast.warning('File selected but upload will be completed on form submission');
      } finally {
        setCorporateOverviewUploading(false);
      }
    }
  };

  const handleNdaChange = async (file) => {
    if (!file || !validateAndSetFile(file, 'nda')) return;

    setNdaFile(file);
    setNdaPreview(URL.createObjectURL(file));

    // Upload immediately if agentId is available, otherwise it will be uploaded on form submit
    if (agentId) {
      try {
        setNdaUploading(true);
        const response = await agentAPI.uploadDocument(agentId, 'nda', file);
        if (response.data?.signedUrl) {
          setNdaPreview(response.data.signedUrl);
        }
        toast.success('NDA document uploaded successfully!');
      } catch (error) {
        console.error('Upload error:', error);
        toast.warning('File selected but upload will be completed on form submission');
      } finally {
        setNdaUploading(false);
      }
    }
  };

  const handleDragOver = (e, type) => {
    e.preventDefault();
    if (type === 'corporate') {
      setIsDraggingCorporate(true);
    } else {
      setIsDraggingNda(true);
    }
  };

  const handleDragLeave = (e, type) => {
    e.preventDefault();
    if (type === 'corporate') {
      setIsDraggingCorporate(false);
    } else {
      setIsDraggingNda(false);
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    if (type === 'corporate') {
      setIsDraggingCorporate(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleCorporateOverviewChange(file);
    } else {
      setIsDraggingNda(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleNdaChange(file);
    }
  };

  const handleRemoveCorporateOverview = () => {
    setCorporateOverviewFile(null);
    setCorporateOverviewPreview(null);
  };

  const handleRemoveNda = () => {
    setNdaFile(null);
    setNdaPreview(null);
  };

  const handleFormSubmit = (formData) => {
    // Build metrics data object, only including non-empty values
    const metricsData = {};
    
    // Only add fields that have actual values
    if (formData.averageFeePerAssignment?.trim()) {
      metricsData.averageFeePerAssignment = formData.averageFeePerAssignment.trim();
    }
    if (formData.finraLicenses?.trim()) {
      metricsData.finraLicenses = formData.finraLicenses.trim();
    }
    if (formData.secRegistration?.trim()) {
      metricsData.secRegistration = formData.secRegistration.trim();
    }
    if (formData.sellSideTransactions?.trim()) {
      metricsData.sellSideTransactions = formData.sellSideTransactions.trim();
    }
    if (formData.buySideTransactions?.trim()) {
      metricsData.buySideTransactions = formData.buySideTransactions.trim();
    }
    if (formData.advisoryFeeAccrued?.trim()) {
      metricsData.advisoryFeeAccrued = formData.advisoryFeeAccrued.trim();
    }
    if (formData.crossBorderTransactions?.trim()) {
      metricsData.crossBorderTransactions = formData.crossBorderTransactions.trim();
    }
    if (formData.iposConducted?.trim()) {
      metricsData.iposConducted = formData.iposConducted.trim();
    }
    if (formData.listedEntitiesEngaged?.trim()) {
      metricsData.listedEntitiesEngaged = formData.listedEntitiesEngaged.trim();
    }

    const submitData = {
      ...metricsData,
      corporateOverviewFile: corporateOverviewFile,
      ndaFile: ndaFile,
    };

    console.log('MetricsDocumentsStep - Submitting data:', submitData);
    console.log('Metrics data (for backend):', metricsData);
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 sm:space-y-6" id="step-form">
      {/* Step Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-start gap-2 sm:gap-3 mb-2">
          <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
          <h2 className="text-lg sm:text-xl text-gray-900 font-semibold">Metrics & Documents</h2>
        </div>
      </div>

      {/* Metrics Fields - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Average Fee per Assignment */}
          <div>
            <label className="label text-sm sm:text-base">Average Fee per Assignment</label>
            <input
              type="text"
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              placeholder="e.g., $50K"
              {...register('averageFeePerAssignment')}
            />
          </div>

          {/* FINRA Licenses */}
          <div>
            <label className="label text-sm sm:text-base">FINRA Licenses (for US Advisors)</label>
            <input
              type="text"
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              placeholder="FINRA license numbers"
              {...register('finraLicenses')}
            />
          </div>

          {/* No. of Sell-side Transactions */}
          <div>
            <label className="label text-sm sm:text-base">No. of Sell-side Transactions</label>
            <input
              type="text"
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              placeholder="Number of sell-side deals"
              {...register('sellSideTransactions')}
            />
          </div>

          {/* Total no. of Cross-border Transactions */}
          <div>
            <label className="label text-sm sm:text-base">Total no. of Cross-border Transactions</label>
            <input
              type="text"
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              placeholder="International deals"
              {...register('crossBorderTransactions')}
            />
          </div>

          {/* Total no. of IPO's conducted with locations */}
          <div>
            <label className="label text-sm sm:text-base">Total no. of IPO's conducted with locations</label>
            <input
              type="text"
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              placeholder="e.g., 5 IPOs (NYSE, NASDAQ, BSE)"
              {...register('iposConducted')}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* SEC Registration */}
          <div>
            <label className="label text-sm sm:text-base">SEC Registration (for US Advisors)</label>
            <input
              type="text"
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              placeholder="SEC registration number"
              {...register('secRegistration')}
            />
          </div>

          {/* No. of Buy-side Transactions */}
          <div>
            <label className="label text-sm sm:text-base">No. of Buy-side Transactions</label>
            <input
              type="text"
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              placeholder="Number of buy-side deals"
              {...register('buySideTransactions')}
            />
          </div>

          {/* Total Advisory Fee Accrued till date */}
          <div>
            <label className="label text-sm sm:text-base">Total Advisory Fee Accrued till date</label>
            <input
              type="text"
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              placeholder="e.g., $5M lifetime"
              {...register('advisoryFeeAccrued')}
            />
          </div>

          {/* Total no. of Listed Entities Engaged */}
          <div>
            <label className="label text-sm sm:text-base">Total no. of Listed Entities Engaged</label>
            <input
              type="text"
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              placeholder="Number of public companies advised"
              {...register('listedEntitiesEngaged')}
            />
          </div>
        </div>
      </div>

      {/* File Upload Sections - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-gray-200">
        {/* Corporate Overview Deck */}
        <div>
          <label className="label text-sm sm:text-base mb-3">Corporate Overview Deck</label>
          {corporateOverviewPreview ? (
            <div className="relative w-full">
              <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {corporateOverviewFile?.name || 'Corporate Overview Deck'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {corporateOverviewFile?.size ? `${(corporateOverviewFile.size / 1024 / 1024).toFixed(2)} MB` : 'Uploaded'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveCorporateOverview}
                    className="bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <label
              className={`
                flex flex-col items-center justify-center w-full h-40 sm:h-48 border-2 border-dashed rounded-lg cursor-pointer transition-all
                ${
                  isDraggingCorporate
                    ? 'border-blue-500 bg-blue-100'
                    : 'border-gray-300 bg-gray-50 hover:border-blue-500 hover:bg-blue-50'
                }
                ${corporateOverviewUploading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              onDragOver={(e) => handleDragOver(e, 'corporate')}
              onDragLeave={(e) => handleDragLeave(e, 'corporate')}
              onDrop={(e) => handleDrop(e, 'corporate')}
            >
              {corporateOverviewUploading ? (
                <Loader2 className="w-8 h-8 mb-3 animate-spin text-blue-500" />
              ) : (
                <Upload className={`w-8 h-8 mb-3 transition-colors ${isDraggingCorporate ? 'text-blue-500' : 'text-gray-400'}`} />
              )}
              <span className="text-sm sm:text-base font-medium text-gray-700 mb-1 px-2 text-center">
                Drop file here or click to upload
              </span>
              <span className="text-xs sm:text-sm text-gray-500 px-2 text-center">
                PDF, PPT, PPTX (Max 20MB)
              </span>
              <input
                type="file"
                accept=".pdf,.ppt,.pptx"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleCorporateOverviewChange(file);
                }}
                className="hidden"
                disabled={corporateOverviewUploading}
              />
            </label>
          )}
        </div>

        {/* NDA for Information exchange */}
        <div>
          <label className="label text-sm sm:text-base mb-3">NDA for Information exchange</label>
          {ndaPreview ? (
            <div className="relative w-full">
              <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {ndaFile?.name || 'NDA Document'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {ndaFile?.size ? `${(ndaFile.size / 1024 / 1024).toFixed(2)} MB` : 'Uploaded'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Signed NDA document</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveNda}
                    className="bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <label
              className={`
                flex flex-col items-center justify-center w-full h-40 sm:h-48 border-2 border-dashed rounded-lg cursor-pointer transition-all
                ${
                  isDraggingNda
                    ? 'border-blue-500 bg-blue-100'
                    : 'border-gray-300 bg-gray-50 hover:border-blue-500 hover:bg-blue-50'
                }
                ${ndaUploading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              onDragOver={(e) => handleDragOver(e, 'nda')}
              onDragLeave={(e) => handleDragLeave(e, 'nda')}
              onDrop={(e) => handleDrop(e, 'nda')}
            >
              {ndaUploading ? (
                <Loader2 className="w-8 h-8 mb-3 animate-spin text-blue-500" />
              ) : (
                <Upload className={`w-8 h-8 mb-3 transition-colors ${isDraggingNda ? 'text-blue-500' : 'text-gray-400'}`} />
              )}
              <span className="text-sm sm:text-base font-medium text-gray-700 mb-1 px-2 text-center">
                Drop file here or click to upload
              </span>
              <span className="text-xs sm:text-sm text-gray-500 px-2 text-center">
                PDF, PPT, PPTX (Max 20MB)
              </span>
              <p className="text-xs text-gray-500 mt-1 px-2 text-center">Signed NDA document</p>
              <input
                type="file"
                accept=".pdf,.ppt,.pptx"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleNdaChange(file);
                }}
                className="hidden"
                disabled={ndaUploading}
              />
            </label>
          )}
        </div>
      </div>
    </form>
  );
}

export default MetricsDocumentsStep;

