import { useForm } from 'react-hook-form';
import { TrendingUp } from 'lucide-react';

const INDUSTRY_SECTORS = [
  'Aerospace & Defense',
  'Agriculture',
  'Automotive & Assembly',
  'Chemicals',
  'Consumer Packaged Goods',
  'Education',
  'Electric Power & Natural Gas',
  'Engineering, Construction & Building Materials',
  'Financial Services',
  'Healthcare',
  'Industrials & Electronics',
  'Life Sciences',
  'Metals & Mining',
  'Oil & Gas',
  'Packaging & Paper',
  'Private Capital',
  'Public Sector',
  'Real Estate',
  'Retail',
  'Semiconductors',
  'Social Sector',
  'Technology, Media & Telecommunications',
  'Travel, Logistics & Infrastructure',
  'Hospitality',
  'IT/Software',
  'New Age Tech',
  'Renewable Energy',
  'Robotics',
  'Manufacturing',
  'Gaming',
  'Electronics & HiTech',
  'Others'
];

const OFFERING_CATEGORIES = [
  'Products',
  'Services',
  'Other'
];

const TURNOVER_RANGES = [
  'Micro Enterprise - Annual Turnover < 5 M$',
  'Small Enterprise - Annual Turnover (5 - 100 M$)',
  'Medium Enterprise - Annual Turnover (100 M$ - 1 B$)',
  'Large Enterprise - Annual Turnover > 1 B$',
  'Individual - Net Worth'
];

const ENTITY_TYPES = [
  'Public Limited',
  'Private Limited',
  'Incorporation',
  'S-Corp',
  'C-Corp',
  'Limited Liability Partnership',
  'LLC',
  'Sole Proprietorship',
  'Joint Venture',
  'One Person Company',
  'Not for Profit(NGO)',
  'Listed',
  'Unlisted',
  'Parent',
  'Holding',
  'Subsidiary',
  'Affiliate',
  'Associate',
  'Other'
];

function BusinessFinancialOverviewStep({ data, onSubmit, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      industrySector: data.industrySector || '',
      offeringCategory: data.offeringCategory || '',
      annualTurnover: data.annualTurnover || '',
      ebitda: data.ebitda || '',
      netProfit: data.netProfit || '',
      entityType: data.entityType || '',
      yearEstablished: data.yearEstablished || '',
      mrr: data.mrr || '',
      ebitdaMargin: data.ebitdaMargin || '',
      productServicesSplit: data.productServicesSplit || '',
    },
  });

  const handleFormSubmit = (formData) => {
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 sm:space-y-6" id="step-form">
      {/* Step Header */}
      <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900">Business & Financial Overview (Last 3 Years)</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
              Industry Sector <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              {...register('industrySector', { required: 'Industry sector is required' })}
            >
              <option value="">Select industry sector</option>
              {INDUSTRY_SECTORS.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
            {errors.industrySector && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.industrySector.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
              Offering / Portfolio (Category)
            </label>
            <select
              className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              {...register('offeringCategory')}
            >
              <option value="">Select</option>
              {OFFERING_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.offeringCategory && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.offeringCategory.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
              Annual Turnover / ARR (for last 3 years) <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              {...register('annualTurnover', { required: 'Annual turnover is required' })}
            >
              <option value="">Select range</option>
              {TURNOVER_RANGES.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
            {errors.annualTurnover && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.annualTurnover.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
              EBITDA (for last 3 years) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="e.g., $2M"
              {...register('ebitda', { required: 'EBITDA is required' })}
            />
            {errors.ebitda && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.ebitda.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
              Net Profit <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="e.g., $1.5M"
              {...register('netProfit', { required: 'Net profit is required' })}
            />
            {errors.netProfit && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.netProfit.message}</p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
              Type of Entity <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              {...register('entityType', { required: 'Entity type is required' })}
            >
              <option value="">Select entity type</option>
              {ENTITY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.entityType && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.entityType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
              Year Established <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="e.g., 2010"
              {...register('yearEstablished', { 
                required: 'Year established is required',
                pattern: {
                  value: /^(19|20)\d{2}$/,
                  message: 'Please enter a valid year (e.g., 2010)'
                }
              })}
            />
            {errors.yearEstablished && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.yearEstablished.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
              MRR (if any)
            </label>
            <input
              type="text"
              className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="e.g., $100K"
              {...register('mrr')}
            />
            {errors.mrr && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.mrr.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
              EBITDA Margin <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="e.g., 20%"
              {...register('ebitdaMargin', { required: 'EBITDA margin is required' })}
            />
            {errors.ebitdaMargin && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.ebitdaMargin.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
              Product vs Services business split (if any)
            </label>
            <input
              type="text"
              className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="e.g., 70/30"
              {...register('productServicesSplit')}
            />
            {errors.productServicesSplit && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.productServicesSplit.message}</p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default BusinessFinancialOverviewStep;

