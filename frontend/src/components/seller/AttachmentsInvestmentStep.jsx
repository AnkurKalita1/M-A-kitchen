import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FileText, Upload, X, Loader2 } from 'lucide-react';
import { sellerAPI } from '../../services/api';

const INVESTMENT_TYPES = [
  'Equity',
  'Debt',
  'Convertible Debt',
  'Mezzanine',
  'Strategic Partnership',
  'Joint Venture',
  'Merger',
  'Acquisition',
  'Other'
];

const MAX_FILE_SIZE_10MB = 10 * 1024 * 1024; // 10MB
const MAX_FILE_SIZE_20MB = 20 * 1024 * 1024; // 20MB

function AttachmentsInvestmentStep({ data, sellerId, onSubmit, loading }) {
  // File states
  const [resourceSkillsetFile, setResourceSkillsetFile] = useState(null);
  const [resourceSkillsetPreview, setResourceSkillsetPreview] = useState(data.resourceSkillsetUrl || null);
  const [resourceSkillsetUploading, setResourceSkillsetUploading] = useState(false);
  const [isDraggingResourceSkillset, setIsDraggingResourceSkillset] = useState(false);

  const [projectionsFiles, setProjectionsFiles] = useState([]);
  const [projectionsUploading, setProjectionsUploading] = useState(false);
  const [isDraggingProjections, setIsDraggingProjections] = useState(false);

  const [incomeStatementFile, setIncomeStatementFile] = useState(null);
  const [incomeStatementPreview, setIncomeStatementPreview] = useState(data.incomeStatementUrl || null);
  const [incomeStatementUploading, setIncomeStatementUploading] = useState(false);
  const [isDraggingIncomeStatement, setIsDraggingIncomeStatement] = useState(false);

  const [balanceSheetFile, setBalanceSheetFile] = useState(null);
  const [balanceSheetPreview, setBalanceSheetPreview] = useState(data.balanceSheetUrl || null);
  const [balanceSheetUploading, setBalanceSheetUploading] = useState(false);
  const [isDraggingBalanceSheet, setIsDraggingBalanceSheet] = useState(false);

  const [cashFlowFile, setCashFlowFile] = useState(null);
  const [cashFlowPreview, setCashFlowPreview] = useState(data.cashFlowUrl || null);
  const [cashFlowUploading, setCashFlowUploading] = useState(false);
  const [isDraggingCashFlow, setIsDraggingCashFlow] = useState(false);

  const [pitchDeckFile, setPitchDeckFile] = useState(null);
  const [pitchDeckPreview, setPitchDeckPreview] = useState(data.pitchDeckUrl || null);
  const [pitchDeckUploading, setPitchDeckUploading] = useState(false);
  const [isDraggingPitchDeck, setIsDraggingPitchDeck] = useState(false);

  const [businessCollateralsFiles, setBusinessCollateralsFiles] = useState([]);
  const [businessCollateralsUploading, setBusinessCollateralsUploading] = useState(false);
  const [isDraggingBusinessCollaterals, setIsDraggingBusinessCollaterals] = useState(false);

  const [valuationFile, setValuationFile] = useState(null);
  const [valuationPreview, setValuationPreview] = useState(data.valuationUrl || null);
  const [valuationUploading, setValuationUploading] = useState(false);
  const [isDraggingValuation, setIsDraggingValuation] = useState(false);

  const [ndaFile, setNdaFile] = useState(null);
  const [ndaPreview, setNdaPreview] = useState(data.ndaUrl || null);
  const [ndaUploading, setNdaUploading] = useState(false);
  const [isDraggingNda, setIsDraggingNda] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      investmentSought: data.investmentSought || '',
      investmentType: data.investmentType || '',
    },
  });

  const validateFile = (file, maxSize, allowedTypes, typeLabel) => {
    if (!file) return false;

    if (allowedTypes && !allowedTypes.includes(file.type)) {
      toast.error(`Invalid file type. Only ${typeLabel} files are allowed.`);
      return false;
    }

    if (file.size > maxSize) {
      toast.error(`File size must be less than ${maxSize / 1024 / 1024}MB`);
      return false;
    }

    return true;
  };

  const handleResourceSkillsetChange = (file) => {
    if (!validateFile(file, MAX_FILE_SIZE_20MB, null, 'document')) return;
    setResourceSkillsetFile(file);
    setResourceSkillsetPreview(URL.createObjectURL(file));
  };

  const handleProjectionsChange = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => validateFile(file, MAX_FILE_SIZE_20MB, null, 'document'));
    setProjectionsFiles(prev => [...prev, ...validFiles]);
  };

  const handleIncomeStatementChange = (file) => {
    const allowedTypes = ['application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (!validateFile(file, MAX_FILE_SIZE_10MB, allowedTypes, 'PDF, XLS, XLSX')) return;
    setIncomeStatementFile(file);
    setIncomeStatementPreview(URL.createObjectURL(file));
  };

  const handleBalanceSheetChange = (file) => {
    const allowedTypes = ['application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (!validateFile(file, MAX_FILE_SIZE_10MB, allowedTypes, 'PDF, XLS, XLSX')) return;
    setBalanceSheetFile(file);
    setBalanceSheetPreview(URL.createObjectURL(file));
  };

  const handleCashFlowChange = (file) => {
    const allowedTypes = ['application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (!validateFile(file, MAX_FILE_SIZE_10MB, allowedTypes, 'PDF, XLS, XLSX')) return;
    setCashFlowFile(file);
    setCashFlowPreview(URL.createObjectURL(file));
  };

  const handlePitchDeckChange = (file) => {
    const allowedTypes = ['application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
    if (!validateFile(file, MAX_FILE_SIZE_20MB, allowedTypes, 'PDF, PPT, PPTX')) return;
    setPitchDeckFile(file);
    setPitchDeckPreview(URL.createObjectURL(file));
  };

  const handleBusinessCollateralsChange = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => validateFile(file, MAX_FILE_SIZE_20MB, null, 'document'));
    setBusinessCollateralsFiles(prev => [...prev, ...validFiles]);
  };

  const handleValuationChange = (file) => {
    if (!validateFile(file, MAX_FILE_SIZE_20MB, null, 'document')) return;
    setValuationFile(file);
    setValuationPreview(URL.createObjectURL(file));
  };

  const handleNdaChange = (file) => {
    if (!validateFile(file, MAX_FILE_SIZE_20MB, null, 'document')) return;
    setNdaFile(file);
    setNdaPreview(URL.createObjectURL(file));
  };

  const createFileUploadArea = (
    label,
    placeholder,
    description,
    file,
    preview,
    uploading,
    isDragging,
    onDragOver,
    onDragLeave,
    onDrop,
    onChange,
    onRemove,
    accept,
    multiple = false
  ) => {
    return (
      <div>
        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
          {label}
        </label>
        {preview || (file && !multiple) ? (
          <div className="relative w-full">
            <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {file?.name || 'File uploaded'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {file?.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Uploaded'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onRemove}
                  className="bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : multiple && Array.isArray(file) && file.length > 0 ? (
          <div className="space-y-2">
            {file.map((f, idx) => (
              <div key={idx} className="border-2 border-gray-300 rounded-lg p-3 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{f.name}</p>
                    <p className="text-xs text-gray-500">{(f.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (label.includes('Projections')) {
                      setProjectionsFiles(prev => prev.filter((_, i) => i !== idx));
                    } else if (label.includes('Collaterals')) {
                      setBusinessCollateralsFiles(prev => prev.filter((_, i) => i !== idx));
                    }
                  }}
                  className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <label
            className={`
              flex flex-col items-center justify-center w-full h-32 sm:h-40 border-2 border-dashed rounded-lg cursor-pointer transition-all
              ${
                isDragging
                  ? 'border-blue-500 bg-blue-100'
                  : 'border-gray-300 bg-gray-50 hover:border-blue-500 hover:bg-blue-50'
              }
              ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            {uploading ? (
              <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 mb-2 animate-spin text-blue-500" />
            ) : (
              <Upload className={`w-6 h-6 sm:w-8 sm:h-8 mb-2 transition-colors ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
            )}
            <span className="text-xs sm:text-sm font-medium text-gray-700 mb-1 px-2 text-center">
              {placeholder}
            </span>
            <span className="text-xs text-gray-500 px-2 text-center">
              {description}
            </span>
            <input
              type="file"
              accept={accept}
              multiple={multiple}
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  if (multiple) {
                    onChange(files);
                  } else {
                    onChange(files[0]);
                  }
                }
              }}
              className="hidden"
              disabled={uploading}
            />
          </label>
        )}
      </div>
    );
  };

  const handleFormSubmit = (formData) => {
    onSubmit({
      ...formData,
      resourceSkillsetFile,
      projectionsFiles,
      incomeStatementFile,
      balanceSheetFile,
      cashFlowFile,
      pitchDeckFile,
      businessCollateralsFiles,
      valuationFile,
      ndaFile,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 sm:space-y-6" id="step-form">
      {/* Step Header */}
      <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900">Attachments & Investment Details</h2>
        </div>
      </div>

      {/* Resource-skillset map */}
      {createFileUploadArea(
        'Resource-skillset map',
        'Drop file here or click to upload',
        'Upload resource / skillset document',
        resourceSkillsetFile,
        resourceSkillsetPreview,
        resourceSkillsetUploading,
        isDraggingResourceSkillset,
        (e) => { e.preventDefault(); setIsDraggingResourceSkillset(true); },
        (e) => { e.preventDefault(); setIsDraggingResourceSkillset(false); },
        (e) => {
          e.preventDefault();
          setIsDraggingResourceSkillset(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleResourceSkillsetChange(file);
        },
        handleResourceSkillsetChange,
        () => {
          setResourceSkillsetFile(null);
          setResourceSkillsetPreview(null);
        },
        '*',
        false
      )}

      {/* Forward looking projections */}
      {createFileUploadArea(
        'Forward looking projections (next 3 years)',
        'Drop files here or click to upload',
        'Upload projections (you can add multiple files)',
        projectionsFiles,
        null,
        projectionsUploading,
        isDraggingProjections,
        (e) => { e.preventDefault(); setIsDraggingProjections(true); },
        (e) => { e.preventDefault(); setIsDraggingProjections(false); },
        (e) => {
          e.preventDefault();
          setIsDraggingProjections(false);
          const files = e.dataTransfer.files;
          if (files && files.length > 0) handleProjectionsChange(files);
        },
        handleProjectionsChange,
        () => setProjectionsFiles([]),
        '*',
        true
      )}

      {/* Financials Section */}
      <div className="pt-4 sm:pt-6 border-t border-gray-200">
        <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-4 sm:mb-6">
          Financials (will be shared securely with qualified investors)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {createFileUploadArea(
            'Income Statement (P&L)',
            'Drop file here or click to upload',
            'PDF, XLS, XLSX (Max 10MB)',
            incomeStatementFile,
            incomeStatementPreview,
            incomeStatementUploading,
            isDraggingIncomeStatement,
            (e) => { e.preventDefault(); setIsDraggingIncomeStatement(true); },
            (e) => { e.preventDefault(); setIsDraggingIncomeStatement(false); },
            (e) => {
              e.preventDefault();
              setIsDraggingIncomeStatement(false);
              const file = e.dataTransfer.files?.[0];
              if (file) handleIncomeStatementChange(file);
            },
            handleIncomeStatementChange,
            () => {
              setIncomeStatementFile(null);
              setIncomeStatementPreview(null);
            },
            '.pdf,.xls,.xlsx',
            false
          )}

          {createFileUploadArea(
            'Balance Sheet',
            'Drop file here or click to upload',
            'PDF, XLS, XLSX (Max 10MB)',
            balanceSheetFile,
            balanceSheetPreview,
            balanceSheetUploading,
            isDraggingBalanceSheet,
            (e) => { e.preventDefault(); setIsDraggingBalanceSheet(true); },
            (e) => { e.preventDefault(); setIsDraggingBalanceSheet(false); },
            (e) => {
              e.preventDefault();
              setIsDraggingBalanceSheet(false);
              const file = e.dataTransfer.files?.[0];
              if (file) handleBalanceSheetChange(file);
            },
            handleBalanceSheetChange,
            () => {
              setBalanceSheetFile(null);
              setBalanceSheetPreview(null);
            },
            '.pdf,.xls,.xlsx',
            false
          )}

          {createFileUploadArea(
            'Cash Flow Statement',
            'Drop file here or click to upload',
            'PDF, XLS, XLSX (Max 10MB)',
            cashFlowFile,
            cashFlowPreview,
            cashFlowUploading,
            isDraggingCashFlow,
            (e) => { e.preventDefault(); setIsDraggingCashFlow(true); },
            (e) => { e.preventDefault(); setIsDraggingCashFlow(false); },
            (e) => {
              e.preventDefault();
              setIsDraggingCashFlow(false);
              const file = e.dataTransfer.files?.[0];
              if (file) handleCashFlowChange(file);
            },
            handleCashFlowChange,
            () => {
              setCashFlowFile(null);
              setCashFlowPreview(null);
            },
            '.pdf,.xls,.xlsx',
            false
          )}
        </div>
      </div>

      {/* Pitch / Investor Deck */}
      {createFileUploadArea(
        'Pitch / Investor Deck',
        'Drop file here or click to upload',
        'PDF, PPT, PPTX (Max 20MB)',
        pitchDeckFile,
        pitchDeckPreview,
        pitchDeckUploading,
        isDraggingPitchDeck,
        (e) => { e.preventDefault(); setIsDraggingPitchDeck(true); },
        (e) => { e.preventDefault(); setIsDraggingPitchDeck(false); },
        (e) => {
          e.preventDefault();
          setIsDraggingPitchDeck(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handlePitchDeckChange(file);
        },
        handlePitchDeckChange,
        () => {
          setPitchDeckFile(null);
          setPitchDeckPreview(null);
        },
        '.pdf,.ppt,.pptx',
        false
      )}

      {/* Business Collaterals */}
      {createFileUploadArea(
        'Business Collaterals',
        'Drop files here or click to upload',
        'Upload small-size brochures, case studies, etc.',
        businessCollateralsFiles,
        null,
        businessCollateralsUploading,
        isDraggingBusinessCollaterals,
        (e) => { e.preventDefault(); setIsDraggingBusinessCollaterals(true); },
        (e) => { e.preventDefault(); setIsDraggingBusinessCollaterals(false); },
        (e) => {
          e.preventDefault();
          setIsDraggingBusinessCollaterals(false);
          const files = e.dataTransfer.files;
          if (files && files.length > 0) handleBusinessCollateralsChange(files);
        },
        handleBusinessCollateralsChange,
        () => setBusinessCollateralsFiles([]),
        '*',
        true
      )}

      {/* Investment Sought and Investment Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
            Investment Sought
          </label>
          <input
            type="text"
            className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="e.g., $5M - $10M"
            {...register('investmentSought')}
          />
          {errors.investmentSought && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.investmentSought.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
            Investment Type
          </label>
          <select
            className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            {...register('investmentType')}
          >
            <option value="">Select investment type</option>
            {INVESTMENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.investmentType && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.investmentType.message}</p>
          )}
        </div>
      </div>

      {/* Valuation */}
      {createFileUploadArea(
        'Valuation',
        'Drop file here or click to upload',
        'Valuation report',
        valuationFile,
        valuationPreview,
        valuationUploading,
        isDraggingValuation,
        (e) => { e.preventDefault(); setIsDraggingValuation(true); },
        (e) => { e.preventDefault(); setIsDraggingValuation(false); },
        (e) => {
          e.preventDefault();
          setIsDraggingValuation(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleValuationChange(file);
        },
        handleValuationChange,
        () => {
          setValuationFile(null);
          setValuationPreview(null);
        },
        '*',
        false
      )}

      {/* NDA for Information exchange */}
      {createFileUploadArea(
        'NDA for Information exchange',
        'Drop file here or click to upload',
        'Signed NDA document',
        ndaFile,
        ndaPreview,
        ndaUploading,
        isDraggingNda,
        (e) => { e.preventDefault(); setIsDraggingNda(true); },
        (e) => { e.preventDefault(); setIsDraggingNda(false); },
        (e) => {
          e.preventDefault();
          setIsDraggingNda(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleNdaChange(file);
        },
        handleNdaChange,
        () => {
          setNdaFile(null);
          setNdaPreview(null);
        },
        '*',
        false
      )}
    </form>
  );
}

export default AttachmentsInvestmentStep;

