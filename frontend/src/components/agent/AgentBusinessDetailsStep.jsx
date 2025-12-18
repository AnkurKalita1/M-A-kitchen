import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Briefcase } from 'lucide-react';

const AGENT_TYPES = [
  'M&A Advisor',
  'Investment Banker',
  'Business Broker',
  'Corporate Finance Advisor',
  'Transaction Advisory',
  'Valuation Expert',
  'Other',
];

const BUSINESS_SPECIALITIES = [
  'Commission/fee based advisor',
  'Post Merger Integration',
  'M&A',
  'Fund raising',
  'Due Diligence',
  'Debt Advisory',
  'Hedge Funds',
  'Cryptocurrency',
  'Commodity trading',
  'Private Equity',
  'Venture Capital',
  'Sale of stressed assets',
  'Valuation Expert',
  'All',
];

const ENTITY_TYPES = [
  'Sole Proprietorship',
  'Partnership',
  'Limited Liability Company (LLC)',
  'Corporation',
  'S Corporation',
  'C Corporation',
  'Non-Profit Organization',
  'Other',
];

const INDUSTRY_SECTORS = [
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
  'Food & Beverage',
  'Hospitality',
  'Transportation & Logistics',
  'Media & Entertainment',
  'Telecommunications',
  'Agriculture',
  'Pharmaceuticals',
  'Biotechnology',
  'Consumer Goods',
  'Professional Services',
  'Other',
];

function AgentBusinessDetailsStep({ data, onSubmit, loading }) {
  const [selectedSpecialities, setSelectedSpecialities] = useState(
    data.businessSpeciality || []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      agentType: data.agentType || '',
      entityType: data.entityType || '',
      industrySector: data.industrySector || '',
      servicesOffered: data.servicesOffered || '',
      yearEstablished: data.yearEstablished || '',
    },
  });

  const toggleSpeciality = (speciality) => {
    if (speciality === 'All') {
      if (selectedSpecialities.includes('All')) {
        setSelectedSpecialities([]);
      } else {
        setSelectedSpecialities(['All']);
      }
    } else {
      if (selectedSpecialities.includes(speciality)) {
        setSelectedSpecialities(selectedSpecialities.filter((s) => s !== speciality && s !== 'All'));
      } else {
        setSelectedSpecialities([...selectedSpecialities.filter((s) => s !== 'All'), speciality]);
      }
    }
  };

  const handleFormSubmit = (formData) => {
    console.log('Raw form data:', formData);
    console.log('Selected specialities:', selectedSpecialities);

    if (selectedSpecialities.length === 0) {
      console.error('No specialities selected');
      return;
    }

    // Ensure required fields have values
    if (!formData.agentType || !formData.entityType || !formData.industrySector) {
      console.error('Missing required fields:', {
        agentType: formData.agentType,
        entityType: formData.entityType,
        industrySector: formData.industrySector,
      });
      return;
    }

    const submitData = {
      agentType: formData.agentType,
      entityType: formData.entityType,
      industrySector: formData.industrySector,
      businessSpeciality: selectedSpecialities,
      servicesOffered: formData.servicesOffered || '',
      yearEstablished: formData.yearEstablished || '',
    };

    console.log('AgentBusinessDetailsStep - Submitting data:', submitData);
    
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 sm:space-y-6" id="step-form">
      {/* Step Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-start gap-2 sm:gap-3 mb-2">
          <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
          <h2 className="text-lg sm:text-xl text-gray-900 font-semibold">Agent & Business Details</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Agent Type */}
          <div>
            <label className="label text-sm sm:text-base">
              Agent Type <span className="text-red-500">*</span>
            </label>
            <select
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              {...register('agentType', { required: 'Agent type is required' })}
            >
              <option value="">Select agent type</option>
              {AGENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.agentType && <p className="error-text text-xs sm:text-sm">{errors.agentType.message}</p>}
          </div>

          {/* Type of Entity */}
          <div>
            <label className="label text-sm sm:text-base">
              Type of Entity <span className="text-red-500">*</span>
            </label>
            <select
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              {...register('entityType', { required: 'Entity type is required' })}
            >
              <option value="">Select entity type</option>
              {ENTITY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.entityType && <p className="error-text text-xs sm:text-sm">{errors.entityType.message}</p>}
          </div>

          {/* Services Offered */}
          <div>
            <label className="label text-sm sm:text-base">Services Offered</label>
            <textarea
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              rows="4"
              placeholder="Describe your advisory services"
              {...register('servicesOffered')}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Industry Sector */}
          <div>
            <label className="label text-sm sm:text-base">
              Industry Sector <span className="text-red-500">*</span>
            </label>
            <select
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              {...register('industrySector', { required: 'Industry sector is required' })}
            >
              <option value="">Select industry sector</option>
              {INDUSTRY_SECTORS.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
            {errors.industrySector && <p className="error-text text-xs sm:text-sm">{errors.industrySector.message}</p>}
          </div>

          {/* Year Established */}
          <div>
            <label className="label text-sm sm:text-base">Year Established</label>
            <input
              type="text"
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              placeholder="e.g., 2010"
              {...register('yearEstablished', {
                pattern: {
                  value: /^(19|20)\d{2}$/,
                  message: 'Please enter a valid year (e.g., 2010)',
                },
              })}
            />
            {errors.yearEstablished && (
              <p className="error-text text-xs sm:text-sm">{errors.yearEstablished.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Business Speciality - Full Width */}
      <div className="pt-4 sm:pt-6 border-t border-gray-200">
        <label className="label text-sm sm:text-base mb-3 sm:mb-4 block">
          Business Speciality
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
          {BUSINESS_SPECIALITIES.map((speciality) => (
            <button
              key={speciality}
              type="button"
              onClick={() => toggleSpeciality(speciality)}
              className={`
                px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all border
                ${
                  selectedSpecialities.includes(speciality) || 
                  (speciality !== 'All' && selectedSpecialities.includes('All'))
                    ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:text-blue-600'
                }
              `}
            >
              {speciality}
            </button>
          ))}
        </div>
        {selectedSpecialities.length === 0 && (
          <p className="error-text text-xs sm:text-sm mt-2">Please select at least one speciality</p>
        )}
      </div>
    </form>
  );
}

export default AgentBusinessDetailsStep;

