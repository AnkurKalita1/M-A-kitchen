import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Upload, X, Building2 } from 'lucide-react';

function ProfessionalExperienceStep({ data, onSubmit, loading }) {
  const [logoPreview, setLogoPreview] = useState(data.organizationLogoUrl || null);
  const [logoFile, setLogoFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [phones, setPhones] = useState(data.phones || ['']);
  const [emails, setEmails] = useState(data.emails || ['']);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // Organization Details
      organizationName: data.organizationName || '',
      headquarter: data.headquarter || '',
      hqAddress: data.hqAddress || '',
      contactPersonnel: data.contactPersonnel || '',
      linkedinProfile: data.linkedinProfile || '',
    },
  });

  const addPhone = () => {
    setPhones([...phones, '']);
  };

  const removePhone = (index) => {
    if (phones.length > 1) {
      setPhones(phones.filter((_, i) => i !== index));
    }
  };

  const updatePhone = (index, value) => {
    const updated = [...phones];
    updated[index] = value;
    setPhones(updated);
  };

  const addEmail = () => {
    setEmails([...emails, '']);
  };

  const removeEmail = (index) => {
    if (emails.length > 1) {
      setEmails(emails.filter((_, i) => i !== index));
    }
  };

  const updateEmail = (index, value) => {
    const updated = [...emails];
    updated[index] = value;
    setEmails(updated);
  };

  const validateAndSetLogo = (file) => {
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Logo file size should not exceed 5MB');
      return;
    }
    
    setLogoFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    validateAndSetLogo(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    validateAndSetLogo(file);
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
  };

  const handleFormSubmit = (formData) => {
    // Normalize LinkedIn URL - add https:// if missing
    let normalizedLinkedIn = formData.linkedinProfile?.trim() || '';
    if (normalizedLinkedIn && !normalizedLinkedIn.startsWith('http://') && !normalizedLinkedIn.startsWith('https://')) {
      normalizedLinkedIn = `https://${normalizedLinkedIn}`;
    }

    onSubmit({
      ...formData,
      linkedinProfile: normalizedLinkedIn,
      phones: phones.filter(p => p.trim() !== ''),
      emails: emails.filter(e => e.trim() !== ''),
      organizationLogo: logoFile,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 sm:space-y-6" id="step-form">
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-start gap-2 sm:gap-3 mb-2">
          <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
          <h2 className="text-lg sm:text-xl text-gray-900">Organization & Contact Details</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Column - Organization Fields */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="label text-sm sm:text-base">
              Organisation Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              placeholder="Organization Inc."
              {...register('organizationName', { required: 'Organisation name is required' })}
            />
            {errors.organizationName && <p className="error-text text-xs sm:text-sm">{errors.organizationName.message}</p>}
          </div>

          <div>
            <label className="label text-sm sm:text-base">
              Headquarter <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              placeholder="City, Country"
              {...register('headquarter', { required: 'Headquarter location is required' })}
            />
            {errors.headquarter && <p className="error-text text-xs sm:text-sm">{errors.headquarter.message}</p>}
          </div>

          <div>
            <label className="label text-sm sm:text-base">
              HQ Address <span className="text-red-500">*</span>
            </label>
            <textarea
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              rows="3"
              placeholder="complete office addresss"
              {...register('hqAddress', { required: 'HQ Address is required' })}
            />
            {errors.hqAddress && <p className="error-text text-xs sm:text-sm">{errors.hqAddress.message}</p>}
          </div>
        </div>

        {/* Right Column - Logo and LinkedIn */}
        <div className="space-y-4 sm:space-y-6">
          {/* Organization Logo - Full Width */}
          <div>
            <label className="label text-sm sm:text-base">Logo</label>
            <div className="mt-1">
              {logoPreview ? (
                <div className="relative w-full">
                  <img
                    src={logoPreview}
                    alt="Organization Logo"
                    className="w-full h-32 sm:h-40 md:h-48 object-contain border-2 border-gray-300 rounded-lg bg-white p-2 sm:p-4"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-red-500 text-white rounded-full p-1.5 sm:p-2 hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              ) : (
                <label 
                  className={`flex flex-col items-center justify-center w-full h-32 sm:h-40 md:h-48 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                    isDragging 
                      ? 'border-blue-500 bg-blue-100' 
                      : 'border-gray-300 bg-gray-50 hover:border-blue-500 hover:bg-blue-50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className={`w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 transition-colors ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
                  <span className="text-sm sm:text-base font-medium text-gray-700 mb-1 px-2 text-center">Drop file here or click to upload</span>
                  <span className="text-xs sm:text-sm text-gray-500 px-2 text-center">PNG, JPG, SVG (recommended min. 200x200px)</span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <div>
            <label className="label text-sm sm:text-base">LinkedIn</label>
            <input
              type="text"
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              placeholder="https://linkedin.com/company/your-org"
              {...register('linkedinProfile', {
                validate: (value) => {
                  if (!value || value.trim() === '') {
                    return true; // Optional field
                  }
                  
                  const trimmedValue = value.trim();
                  
                  if (!trimmedValue.toLowerCase().includes('linkedin.com')) {
                    return 'Please enter a valid LinkedIn URL';
                  }
                  
                  try {
                    let uriToTest = trimmedValue;
                    if (!uriToTest.startsWith('http://') && !uriToTest.startsWith('https://')) {
                      uriToTest = `https://${uriToTest}`;
                    }
                    new URL(uriToTest);
                    return true;
                  } catch (e) {
                    return 'Please enter a valid LinkedIn URL';
                  }
                }
              })}
            />
            {errors.linkedinProfile && <p className="error-text text-xs sm:text-sm">{errors.linkedinProfile.message}</p>}
          </div>
        </div>
      </div>

      {/* Contact Details Section - Full Width */}
      <div className="pt-4 sm:pt-6 border-t border-gray-200">
        <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-3 sm:mb-4">Contact Details</h3>
        
        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="label text-sm sm:text-base">
              Contact Personnel <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="input-field w-full text-sm sm:text-base px-3 sm:px-4 py-2.5"
              placeholder="Primary contact person name"
              {...register('contactPersonnel', { required: 'Contact personnel is required' })}
            />
            {errors.contactPersonnel && <p className="error-text text-xs sm:text-sm">{errors.contactPersonnel.message}</p>}
          </div>

          <div>
            <label className="label text-sm sm:text-base">
              Contact Phone(s) <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {phones.map((phone, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="tel"
                    className="input-field flex-1 text-sm sm:text-base px-3 sm:px-4 py-2.5"
                    placeholder="+1 (555) 000-0000 (primary)"
                    value={phone}
                    onChange={(e) => updatePhone(index, e.target.value)}
                    required={index === 0}
                  />
                  {phones.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePhone(index)}
                      className="btn-secondary px-2 sm:px-3 text-xs sm:text-sm py-2.5 whitespace-nowrap"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addPhone}
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                + Add another phone
              </button>
            </div>
          </div>

          <div>
            <label className="label text-sm sm:text-base">
              Email ID(s) <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {emails.map((email, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="email"
                    className="input-field flex-1 text-sm sm:text-base px-3 sm:px-4 py-2.5"
                    placeholder="primary@company.com"
                    value={email}
                    onChange={(e) => updateEmail(index, e.target.value)}
                    required={index === 0}
                  />
                  {emails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEmail(index)}
                      className="btn-secondary px-2 sm:px-3 text-xs sm:text-sm py-2.5 whitespace-nowrap"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addEmail}
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                + Add another email
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProfessionalExperienceStep;

