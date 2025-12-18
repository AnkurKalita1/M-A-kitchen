import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Target } from 'lucide-react';

const INVESTOR_TYPES = ['Strategic', 'Financial', 'Institutional', 'Government'];
const ENTITY_TYPES = ['Public Limited', 'Private Limited', 'Incorporation', 'S-Corp', 'C-Corp', 'Limited Liability Partnership', 'LLC', 'Sole Proprietorship', 'Joint Venture', 'One Person Company', 'Not for Profit(NGO)', 'Listed', 'Unlisted', 'Parent', 'Holding', 'Subsidiary', 'Affiliate', 'Associate'];
const BUYER_SIZES = [
  'Micro Enterprise - Annual Turnover < 5 M$',
  'Small Enterprise - Annual Turnover (5 - 100 M$)',
  'Medium Enterprise - Annual Turnover (100 M$ - 1 B$)',
  'Large Enterprise - Annual Turnover > 1 B$',
  'Individual - Net Worth'
];

// Industry sectors for each investor type
const INVESTOR_TYPE_SECTORS = {
  Strategic: [
    'Aerospace & Defense (Including UAVs)',
    'Agriculture',
    'Automotive & Assembly',
    'Chemicals',
    'Consumer Packaged Goods',
    'Education',
    'Electric Power & Natural Gas (Utilities)',
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
  ],
  Financial: [
    'Private Equity',
    'Venture Capital',
    'Angel',
    'Investment Bank',
    'Family Office',
    'Sovereign Wealth Funds',
    'Peer-to-Peer Lending',
    'Crowdfunding',
    'Cryptocurrency trader', 
    'Others'
  ],
  Institutional: [
    'Mutual Funds',
    'FIIs',
    'ETFs',
    'Commodities',
    'Bonds',
    'Real Estate Investment Trust',
    'Charitable Trust',
    'Hedge Funds',
    'Pension Funds',
    'Credit Unions',
    'Philanthropic Foundation',
    'Endowments Funds',
    'Commercial Trusts',
    'Anchor investor',
    'Insurance Funds',
    'Commercial Trusts',
    'Central Banks',
    'Others'
  ],
  Government: [
    'National' ,
    'State',
    'Law Enforcement',
    'Defense',
    'PPP',
    'Government sponsored grands',
    'Government Funds',
    'Others'
  ]
};

const GEOGRAPHY_OPTIONS = ['Canada', 'Americas', 'EMEA', 'UK', 'APJ', 'ANZ', 'Global'];

function InvestorTypeEntityDetailsStep({ data, onSubmit, loading }) {
  const [selectedGeographies, setSelectedGeographies] = useState(
    Array.isArray(data.geographyPreferences) ? data.geographyPreferences :
    data.geographyPreferences ? data.geographyPreferences.split(',').filter(Boolean) : []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      investorType: data.investorType || '',
      entityType: data.entityType || '',
      buyerSize: data.buyerSize || '',
      strategicInvestorSector: data.strategicInvestorSector || '',
      offices: data.offices || '',
      geographicalPresence: data.geographicalPresence || '',
      headcount: data.headcount || '',
      geographyPreferences: data.geographyPreferences || [],
    },
  });

  const investorType = watch('investorType');
  const [availableSectors, setAvailableSectors] = useState([]);

  useEffect(() => {
    if (investorType && INVESTOR_TYPE_SECTORS[investorType]) {
      setAvailableSectors(INVESTOR_TYPE_SECTORS[investorType]);
      setValue('strategicInvestorSector', '');
    } else {
      setAvailableSectors([]);
      setValue('strategicInvestorSector', '');
    }
  }, [investorType, setValue]);

  const toggleGeography = (geo) => {
    const updated = selectedGeographies.includes(geo)
      ? selectedGeographies.filter((g) => g !== geo)
      : [...selectedGeographies, geo];
    setSelectedGeographies(updated);
    setValue('geographyPreferences', updated);
  };

  const onSubmitForm = (formData) => {
    const submissionData = {
      ...formData,
      geographyPreferences: selectedGeographies,
    };
    onSubmit(submissionData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6" id="step-form">
      {/* Step Header */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Investor Type & Entity Details</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Investor Type <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
              {...register('investorType', { required: 'Investor type is required' })}
            >
              <option value="">Select investor type</option>
              {INVESTOR_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.investorType && (
              <p className="mt-1 text-sm text-red-600">{errors.investorType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Buyer Size <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
              {...register('buyerSize', { required: 'Buyer size is required' })}
            >
              <option value="">Select buyer size</option>
              {BUYER_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {errors.buyerSize && (
              <p className="mt-1 text-sm text-red-600">{errors.buyerSize.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Offices</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Number and locations"
              {...register('offices')}
            />
          </div>

          {investorType && availableSectors.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {investorType} Investor Industry Sector
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
                {...register('strategicInvestorSector')}
              >
                <option value="">Select sector</option>
                {availableSectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Type of Entity <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
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
              <p className="mt-1 text-sm text-red-600">{errors.entityType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Geographical Presence</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="e.g., Global, Regional"
              {...register('geographicalPresence')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Headcount</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Number of employees"
              {...register('headcount')}
            />
          </div>
        </div>
      </div>

      {/* Geography Preferences - Full Width */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Geography Preferences</label>
        <div className="grid grid-cols-3 gap-3 mt-2">
          {GEOGRAPHY_OPTIONS.map((geo) => {
            const isSelected = selectedGeographies.includes(geo);
            return (
              <button
                key={geo}
                type="button"
                onClick={() => toggleGeography(geo)}
                className={`
                  w-full px-4 py-2.5 rounded-lg border-2 transition-all text-sm font-medium
                  ${isSelected
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-blue-400'
                  }
                `}
              >
                {geo}
              </button>
            );
          })}
        </div>
        <input
          type="hidden"
          {...register('geographyPreferences')}
          value={selectedGeographies.join(',')}
        />
      </div>
    </form>
  );
}

export default InvestorTypeEntityDetailsStep;

