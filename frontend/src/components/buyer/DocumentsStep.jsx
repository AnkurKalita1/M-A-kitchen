import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Upload, FileText, Check, Loader2, X } from 'lucide-react';
import { buyerAPI } from '../../services/api';

const DOCUMENT_TYPES = [
  { 
    id: 'proof_of_funds', 
    label: 'Proof of Funds', 
    required: true,
    accept: '.pdf,.doc,.docx',
    maxSize: 10,
    description: 'PDF, DOC, DOCX (Max 10MB)'
  },
  { 
    id: 'company_registration', 
    label: 'Proof of Incorporation / Company Registration', 
    required: false,
    accept: '.pdf,.doc,.docx',
    maxSize: 10,
    description: 'Certificate of incorporation, registration docs etc. (Max 10MB)'
  },
  { 
    id: 'corporate_deck', 
    label: 'Corporate Overview Deck', 
    required: false,
    accept: '.pdf,.ppt,.pptx',
    maxSize: 20,
    description: 'PDF, PPT, PPTX (Max 20MB)'
  },
  { 
    id: 'income_statement', 
    label: 'Income Statement (P&L)', 
    required: false,
    accept: '.pdf,.xls,.xlsx',
    maxSize: 10,
    description: 'PDF, XLS, XLSX (Max 10MB)'
  },
  { 
    id: 'balance_sheet', 
    label: 'Balance Sheet', 
    required: false,
    accept: '.pdf,.xls,.xlsx',
    maxSize: 10,
    description: 'PDF, XLS, XLSX (Max 10MB)'
  },
  { 
    id: 'cash_flow_statement', 
    label: 'Cash Flow Statement', 
    required: false,
    accept: '.pdf,.xls,.xlsx',
    maxSize: 10,
    description: 'PDF, XLS, XLSX (Max 10MB)'
  },
  { 
    id: 'nda', 
    label: 'NDA for Information Exchange', 
    required: false,
    accept: '.pdf,.doc,.docx',
    maxSize: 10,
    description: 'Signed NDA document (PDF, DOC, DOCX)'
  },
  { 
    id: 'other_collaterals', 
    label: 'Other Collaterals', 
    required: false,
    accept: '*',
    maxSize: 20,
    description: 'Marketing materials, case studies, additional decks, etc.'
  },
];

function DocumentsStep({ buyerId, documents: initialDocuments, onSubmit, onBack }) {
  const [documents, setDocuments] = useState(initialDocuments || []);
  const [uploading, setUploading] = useState(null);

  // Update parent formData when documents change (but don't navigate)
  useEffect(() => {
    if (onSubmit && documents.length >= 0) {
      onSubmit(documents);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documents]);

  const handleFileUpload = async (documentType, file) => {
    const docType = DOCUMENT_TYPES.find(dt => dt.id === documentType);
    
    if (file.size > docType.maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${docType.maxSize}MB`);
      return;
    }

    try {
      setUploading(documentType);
      const response = await buyerAPI.uploadDocument(buyerId, documentType, file);
      
      setDocuments((prev) => [
        ...prev.filter((doc) => doc.documentType !== documentType),
        response.data.document,
      ]);
      
      toast.success('Document uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.response?.data?.error?.message || 'Failed to upload document');
    } finally {
      setUploading(null);
    }
  };

  const handleRemoveDocument = (documentId) => {
    setDocuments((prev) => prev.filter((doc) => doc.documentId !== documentId));
    toast.info('Document removed');
  };

  const handleFileDrop = (e, documentType) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(documentType, file);
    }
  };

  const renderUploadArea = (docType) => {
    const uploaded = documents.find((doc) => doc.documentType === docType.id);
    const isUploading = uploading === docType.id;

    return (
      <div key={docType.id} className="w-full">
        {/* Label outside the upload field */}
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {docType.label}
          {docType.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {/* Upload field */}
        <div
          onDrop={(e) => handleFileDrop(e, docType.id)}
          onDragOver={(e) => e.preventDefault()}
          className={`
            border-2 border-dashed rounded-lg transition-all min-h-[140px] flex flex-col w-full
            ${uploaded 
              ? 'border-green-300 bg-green-50' 
              : 'border-gray-300 hover:border-blue-400 bg-gray-50'
            }
          `}
        >
          {uploaded ? (
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <FileText className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-sm text-gray-600 truncate">{uploaded.fileName}</p>
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 ml-auto" />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveDocument(uploaded.documentId)}
                className="text-red-500 hover:text-red-700 flex-shrink-0 ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="cursor-pointer block flex-1 flex flex-col justify-center p-4">
              <input
                type="file"
                className="hidden"
                accept={docType.accept}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    handleFileUpload(docType.id, file);
                  }
                }}
                disabled={isUploading}
              />
              <div className="flex flex-col items-center justify-center">
                {isUploading ? (
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-2" />
                ) : (
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                )}
                <p className="text-sm text-gray-600 text-center mb-1">
                  Drop file here or click to upload
                </p>
                <p className="text-xs text-gray-500 text-center">{docType.description}</p>
              </div>
            </label>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6" id="step-form">
      {/* Step Header */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Document Uploads <span className="text-red-500">*</span></h2>
        </div>
      </div>

      {/* Line 1: 2 document fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderUploadArea(DOCUMENT_TYPES[0])} {/* Proof of Funds */}
        {renderUploadArea(DOCUMENT_TYPES[1])} {/* Proof of Incorporation / Company Registration */}
      </div>

      {/* Line 2: 2 document fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderUploadArea(DOCUMENT_TYPES[2])} {/* Corporate Overview Deck */}
        {renderUploadArea(DOCUMENT_TYPES[6])} {/* NDA for Information Exchange */}
      </div>

      {/* Line 3: 3 document fields - Financials Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          Financials
        </h3>
        <p className="text-xs text-gray-600 mb-4">
          Add key financial statements as attachments.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {renderUploadArea(DOCUMENT_TYPES[3])} {/* Income Statement (P&L) */}
          {renderUploadArea(DOCUMENT_TYPES[4])} {/* Balance Sheet */}
          {renderUploadArea(DOCUMENT_TYPES[5])} {/* Cash Flow Statement */}
        </div>
      </div>

      {/* Line 4: 1 document field */}
      <div>
        {renderUploadArea(DOCUMENT_TYPES[7])} {/* Other Collaterals */}
      </div>
    </div>
  );
}

export default DocumentsStep;
