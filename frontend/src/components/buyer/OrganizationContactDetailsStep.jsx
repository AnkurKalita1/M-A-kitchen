import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Building2, Upload, X } from 'lucide-react';

function OrganizationContactDetailsStep({ data, onSubmit, loading }) {
  const [sameAsHQ, setSameAsHQ] = useState(false);
  const [logoPreview, setLogoPreview] = useState(data.organizationLogoUrl || null);
  const [logoFile, setLogoFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      organizationName: data.organizationName || '',
      fullName: data.fullName || '',
      email: data.email || '',
      parentOrganization: data.parentOrganization || '',
      hqAddress: data.hqAddress || '',
      contactPerson: data.contactPerson || '',
      linkedinProfile: data.linkedinProfile || '',
      phone: data.phone || '',
      headquarters: data.headquarters || '',
      contactDetails: data.contactDetails || '',
    },
  });

  const hqAddress = watch('hqAddress');

  const handleSameAsHQChange = (checked) => {
    setSameAsHQ(checked);
    if (checked) {
      setValue('contactDetails', hqAddress || '');
    } else {
      setValue('contactDetails', '');
    }
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

  const onSubmitForm = (formData) => {
    // Normalize LinkedIn URL - add https:// if missing
    let normalizedLinkedIn = formData.linkedinProfile?.trim() || '';
    if (normalizedLinkedIn && !normalizedLinkedIn.startsWith('http://') && !normalizedLinkedIn.startsWith('https://')) {
      normalizedLinkedIn = `https://${normalizedLinkedIn}`;
    }

    onSubmit({ 
      ...formData, 
      linkedinProfile: normalizedLinkedIn,
      organizationLogo: logoFile 
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 sm:space-y-6" id="step-form">
      {/* Step Header */}
      <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900">Organization & Contact Details</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Organization Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Organization Inc."
              {...register('organizationName', { required: 'Organization name is required' })}
            />
            {errors.organizationName && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.organizationName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="John Doe"
              {...register('fullName', { required: 'Full name is required' })}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="john@company.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Parent Organization (if any)
            </label>
            <input
              type="text"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Parent / Holding company"
              {...register('parentOrganization')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">HQ Address</label>
            <input
              type="text"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="123 Business Street, Suite 100"
              {...register('hqAddress')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Person</label>
            <input
              type="text"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Primary contact name"
              {...register('contactPerson')}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Organization Logo
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1.5">LinkedIn Profile</label>
            <input
              type="text"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="https://www.linkedin.com/in/username"
              {...register('linkedinProfile', {
                validate: (value) => {
                  if (!value || value.trim() === '') {
                    return true;
                  }
                  
                  const trimmedValue = value.trim();
                  
                  if (!trimmedValue.toLowerCase().includes('linkedin.com')) {
                    return 'Please enter a valid LinkedIn profile URL';
                  }
                  
                  try {
                    let uriToTest = trimmedValue;
                    if (!uriToTest.startsWith('http://') && !uriToTest.startsWith('https://')) {
                      uriToTest = `https://${uriToTest}`;
                    }
                    new URL(uriToTest);
                    return true;
                  } catch (e) {
                    return 'Please enter a valid LinkedIn profile URL';
                  }
                },
              })}
            />
            {errors.linkedinProfile && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.linkedinProfile.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="+1 (555) 000-0000"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
                  message: 'Invalid phone number format',
                },
              })}
            />
            {errors.phone && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Headquarters</label>
            <input
              type="text"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="City, Country"
              {...register('headquarters')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Details</label>
            <div className="mb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sameAsHQ}
                  onChange={(e) => handleSameAsHQChange(e.target.checked)}
                  className="w-4 h-4 sm:w-4 sm:h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-xs sm:text-sm text-gray-700">Same as HQ Address</span>
              </label>
            </div>
            <textarea
              rows={4}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
              placeholder="Contact address / details"
              {...register('contactDetails')}
              disabled={sameAsHQ}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default OrganizationContactDetailsStep;

