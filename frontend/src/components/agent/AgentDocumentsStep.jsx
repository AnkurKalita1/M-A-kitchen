import { useState } from 'react';
import { toast } from 'react-toastify';
import { Upload, FileText, Check, Loader2, X } from 'lucide-react';
import { agentAPI } from '../../services/api';

const DOCUMENT_TYPES = [
  { id: 'identity_proof', label: 'Identity Proof', required: true },
  { id: 'professional_certification', label: 'Professional Certification', required: true },
  { id: 'license_proof', label: 'License Proof', required: true },
  { id: 'other', label: 'Other Documents', required: false },
];

const ALLOWED_TYPES = [
  'application/pdf',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

function AgentDocumentsStep({ agentId, documents: initialDocuments, onSubmit }) {
  const [documents, setDocuments] = useState(initialDocuments || []);
  const [uploading, setUploading] = useState(null);

  const handleFileUpload = async (documentType, file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('Invalid file type. Only PDF, PPT, and XLS/XLSX files are allowed.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    try {
      setUploading(documentType);
      const response = await agentAPI.uploadDocument(agentId, documentType, file);
      
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

  const handleContinue = () => {
    const requiredTypes = DOCUMENT_TYPES.filter((dt) => dt.required).map((dt) => dt.id);
    const uploadedTypes = documents.map((doc) => doc.documentType);
    const missingRequired = requiredTypes.filter((type) => !uploadedTypes.includes(type));

    if (missingRequired.length > 0) {
      toast.error('Please upload all required documents');
      return;
    }

    onSubmit(documents);
  };

  const isDocumentUploaded = (documentType) => {
    return documents.some((doc) => doc.documentType === documentType);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Upload Proof Documents</h2>
        <p className="text-gray-600 mt-2">Please upload the required documents (PDF, PPT, XLS/XLSX)</p>
      </div>

      <div className="space-y-4">
        {DOCUMENT_TYPES.map((docType) => {
          const uploaded = documents.find((doc) => doc.documentType === docType.id);
          const isUploading = uploading === docType.id;

          return (
            <div
              key={docType.id}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-gray-400" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {docType.label}
                      {docType.required && <span className="text-red-500 ml-1">*</span>}
                    </h3>
                    {uploaded && (
                      <p className="text-sm text-gray-600 mt-1">
                        {uploaded.fileName} ({(uploaded.size / 1024).toFixed(2)} KB)
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {uploaded ? (
                    <>
                      <Check className="w-6 h-6 text-green-500" />
                      <button
                        type="button"
                        onClick={() => handleRemoveDocument(uploaded.documentId)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </>
                  ) : isUploading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
                  ) : (
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.ppt,.pptx,.xls,.xlsx"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            handleFileUpload(docType.id, file);
                          }
                        }}
                      />
                      <div className="btn-primary flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload
                      </div>
                    </label>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> All uploaded documents are securely stored and encrypted. 
          Only authorized personnel will have access to your documents.
        </p>
      </div>
    </div>
  );
}

export default AgentDocumentsStep;

