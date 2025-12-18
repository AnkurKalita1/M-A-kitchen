import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Building2, Upload, X, Plus, Trash2 } from 'lucide-react';

function OrganisationContactDetailsStep({ data, onSubmit, loading }) {
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
    
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      alert('Logo file size should not exceed 5MB');
      return;
    }
    
    setLogoFile(file);
    
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
    // Normalize LinkedIn URL
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
      {/* Step Header */}
      <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900">Organisation & Contact Details</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
              Organisation Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Your Organisation Name"
              {...register('organizationName', { required: 'Organisation name is required' })}
            />
            {errors.organizationName && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.organizationName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
              Headquarter <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="City, Country"
              {...register('headquarter', { required: 'Headquarter is required' })}
            />
            {errors.headquarter && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.headquarter.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
              HQ Address
            </label>
            <textarea
              className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
              rows="3"
              placeholder="Complete headquarters address"
              {...register('hqAddress')}
            />
            {errors.hqAddress && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.hqAddress.message}</p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Logo Upload */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
              Logo <span className="text-red-500">*</span>
            </label>
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
              <div
                className={`w-full h-32 sm:h-40 md:h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('logo-upload').click()}
              >
                <Upload className={`w-6 h-6 sm:w-8 sm:h-8 mb-2 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
                <p className="text-xs sm:text-sm text-gray-600 text-center px-4">
                  Drop file here or click to upload
                </p>
                <p className="text-xs text-gray-500 text-center px-4 mt-1">
                  PNG, JPG, SVG (recommended min. 200x200px)
                </p>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </div>
            )}
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
              LinkedIn <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="https://www.linkedin.com/company/your-org"
              {...register('linkedinProfile', { 
                required: 'LinkedIn profile is required',
                validate: (value) => {
                  if (!value) return true;
                  const linkedinPattern = /linkedin\.com/i;
                  return linkedinPattern.test(value) || 'Please enter a valid LinkedIn URL';
                }
              })}
            />
            {errors.linkedinProfile && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.linkedinProfile.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Contact Details Section - Full Width */}
      <div className="border-t pt-4 sm:pt-6 mt-4 sm:mt-6">
        <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-3 sm:mb-4">Contact Details</h3>
        
        <div className="space-y-3 sm:space-y-4">
          {/* Contact Personnel */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
              Contact Personnel <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Owner / CEO / Primary contact"
              {...register('contactPersonnel', { required: 'Contact personnel is required' })}
            />
            {errors.contactPersonnel && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.contactPersonnel.message}</p>
            )}
          </div>

          {/* Contact Phone(s) */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
              Contact Phone(s) <span className="text-red-500">*</span>
            </label>
            {phones.map((phone, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="tel"
                  className="flex-1 px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder={index === 0 ? "+1 (555) 000-0000 (Primary)" : "Additional phone"}
                  value={phone}
                  onChange={(e) => updatePhone(index, e.target.value)}
                />
                {phones.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePhone(index)}
                    className="px-3 py-2.5 text-red-600 hover:text-red-700 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addPhone}
              className="flex items-center gap-2 text-sm sm:text-base text-blue-600 hover:text-blue-700 font-medium mt-2"
            >
              <Plus className="w-4 h-4" />
              Add another phone
            </button>
          </div>

          {/* Email ID(s) */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
              Email ID(s) <span className="text-red-500">*</span>
            </label>
            {emails.map((email, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="email"
                  className="flex-1 px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder={index === 0 ? "primary@company.com" : "Additional email"}
                  value={email}
                  onChange={(e) => updateEmail(index, e.target.value)}
                />
                {emails.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEmail(index)}
                    className="px-3 py-2.5 text-red-600 hover:text-red-700 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addEmail}
              className="flex items-center gap-2 text-sm sm:text-base text-blue-600 hover:text-blue-700 font-medium mt-2"
            >
              <Plus className="w-4 h-4" />
              Add another email
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default OrganisationContactDetailsStep;

