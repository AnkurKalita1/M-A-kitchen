import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Real Estate',
  'Energy',
  'Automotive',
  'AEC (Architecture, Engineering, Construction)',
  'Education',
  'Other',
];

const COMPANY_SIZES = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];

const SECTORS = [
  'Technology',
  'Healthcare',
  'Automotive',
  'AEC',
  'Finance',
  'Manufacturing',
  'Retail',
  'Energy',
];

const REGIONS = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East', 'Africa', 'Global'];

function CompanyInfoStep({ data, onSubmit, onBack, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: data.companyName,
      companyWebsite: data.companyWebsite,
      industry: data.industry,
      companySize: data.companySize,
      jobTitle: data.jobTitle,
      yearsOfExperience: data.yearsOfExperience,
      linkedinProfile: data.linkedinProfile,
      investmentMin: data.investmentRange?.min || '',
      investmentMax: data.investmentRange?.max || '',
      sectorsOfInterest: data.sectorsOfInterest || [],
      geographicPreference: data.geographicPreference || [],
    },
  });

  const handleFormSubmit = (formData) => {
    const submissionData = {
      ...formData,
      investmentRange: {
        min: parseFloat(formData.investmentMin),
        max: parseFloat(formData.investmentMax),
      },
      sectorsOfInterest: Array.isArray(formData.sectorsOfInterest) 
        ? formData.sectorsOfInterest 
        : [formData.sectorsOfInterest],
      geographicPreference: Array.isArray(formData.geographicPreference)
        ? formData.geographicPreference
        : [formData.geographicPreference],
    };
    delete submissionData.investmentMin;
    delete submissionData.investmentMax;
    onSubmit(submissionData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Company Information</h2>
        <p className="text-gray-600 mt-2">Tell us about your company and investment preferences</p>
      </div>

      {/* Company Details */}
      <div>
        <label className="label">Company Name *</label>
        <input
          type="text"
          className="input-field"
          placeholder="Acme Corp"
          {...register('companyName', { required: 'Company name is required' })}
        />
        {errors.companyName && <p className="error-text">{errors.companyName.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="label">Company Website</label>
          <input
            type="url"
            className="input-field"
            placeholder="https://acmecorp.com"
            {...register('companyWebsite')}
          />
        </div>

        <div>
          <label className="label">Industry *</label>
          <select
            className="input-field"
            {...register('industry', { required: 'Industry is required' })}
          >
            <option value="">Select industry</option>
            {INDUSTRIES.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          {errors.industry && <p className="error-text">{errors.industry.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="label">Company Size *</label>
          <select
            className="input-field"
            {...register('companySize', { required: 'Company size is required' })}
          >
            <option value="">Select size</option>
            {COMPANY_SIZES.map((size) => (
              <option key={size} value={size}>
                {size} employees
              </option>
            ))}
          </select>
          {errors.companySize && <p className="error-text">{errors.companySize.message}</p>}
        </div>

        <div>
          <label className="label">Job Title *</label>
          <input
            type="text"
            className="input-field"
            placeholder="Managing Director"
            {...register('jobTitle', { required: 'Job title is required' })}
          />
          {errors.jobTitle && <p className="error-text">{errors.jobTitle.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="label">Years of Experience *</label>
          <input
            type="number"
            className="input-field"
            placeholder="10"
            min="0"
            max="70"
            {...register('yearsOfExperience', {
              required: 'Years of experience is required',
              min: { value: 0, message: 'Must be at least 0' },
              max: { value: 70, message: 'Must be less than 70' },
            })}
          />
          {errors.yearsOfExperience && <p className="error-text">{errors.yearsOfExperience.message}</p>}
        </div>

        <div>
          <label className="label">LinkedIn Profile</label>
          <input
            type="url"
            className="input-field"
            placeholder="https://linkedin.com/in/johndoe"
            {...register('linkedinProfile')}
          />
        </div>
      </div>

      {/* Investment Preferences */}
      <div className="border-t pt-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Preferences</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">Minimum Investment ($) *</label>
            <input
              type="number"
              className="input-field"
              placeholder="1000000"
              min="0"
              {...register('investmentMin', {
                required: 'Minimum investment is required',
                min: { value: 0, message: 'Must be at least 0' },
              })}
            />
            {errors.investmentMin && <p className="error-text">{errors.investmentMin.message}</p>}
          </div>

          <div>
            <label className="label">Maximum Investment ($) *</label>
            <input
              type="number"
              className="input-field"
              placeholder="10000000"
              min="0"
              {...register('investmentMax', {
                required: 'Maximum investment is required',
                min: { value: 0, message: 'Must be at least 0' },
              })}
            />
            {errors.investmentMax && <p className="error-text">{errors.investmentMax.message}</p>}
          </div>
        </div>

        <div>
          <label className="label">Sectors of Interest *</label>
          <select
            multiple
            className="input-field h-32"
            {...register('sectorsOfInterest', { required: 'Select at least one sector' })}
          >
            {SECTORS.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
          {errors.sectorsOfInterest && <p className="error-text">{errors.sectorsOfInterest.message}</p>}
        </div>

        <div>
          <label className="label">Geographic Preference *</label>
          <select
            multiple
            className="input-field h-32"
            {...register('geographicPreference', { required: 'Select at least one region' })}
          >
            {REGIONS.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
          {errors.geographicPreference && <p className="error-text">{errors.geographicPreference.message}</p>}
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button type="button" onClick={onBack} className="btn-secondary" disabled={loading}>
          Back
        </button>
        <button type="submit" className="btn-primary flex items-center gap-2" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            'Continue'
          )}
        </button>
      </div>
    </form>
  );
}

export default CompanyInfoStep;

