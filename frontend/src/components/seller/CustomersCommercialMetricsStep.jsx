import { useForm } from 'react-hook-form';
import { TrendingUp } from 'lucide-react';

function CustomersCommercialMetricsStep({ data, onSubmit, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      totalClientsUsers: data.totalClientsUsers || '',
      totalActiveClientsUsers: data.totalActiveClientsUsers || '',
      avgDealSize: data.avgDealSize || '',
      repeatCustomersPercent: data.repeatCustomersPercent || '',
      biggestDealSize: data.biggestDealSize || '',
      productPricingPerItem: data.productPricingPerItem || '',
      typicalPricePerItem: data.typicalPricePerItem || '',
      aum: data.aum || '',
      assetsUnderManagement: data.assetsUnderManagement || '',
      topCustomers: data.topCustomers || '',
      partnershipAlliancesChannels: data.partnershipAlliancesChannels || '',
      iprs: data.iprs || '',
      founderProfiles: data.founderProfiles || '',
      cac: data.cac || '',
      customerAcquisitionCost: data.customerAcquisitionCost || '',
      clv: data.clv || '',
      customerLifetimeValue: data.customerLifetimeValue || '',
      npv: data.npv || '',
      netPresentValue: data.netPresentValue || '',
      pendingLegalIssues: data.pendingLegalIssues || '',
      legalIssuesDetails: data.legalIssuesDetails || '',
      shortLongTermBorrowings: data.shortLongTermBorrowings || '',
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
          <h2 className="text-base sm:text-lg font-bold text-gray-900">Customers & Commercial Metrics</h2>
        </div>
      </div>

      {/* Line 1: 3 fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
            Total no. of clients / users till date <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="Enter total clients/users"
            {...register('totalClientsUsers', { required: 'Total clients/users is required' })}
          />
          {errors.totalClientsUsers && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.totalClientsUsers.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
            Avg. Deal Size <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="e.g., $50K"
            {...register('avgDealSize', { required: 'Avg. Deal Size is required' })}
          />
          {errors.avgDealSize && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.avgDealSize.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
            Biggest Deal Size till date <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="e.g., $1M"
            {...register('biggestDealSize', { required: 'Biggest Deal Size is required' })}
          />
          {errors.biggestDealSize && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.biggestDealSize.message}</p>
          )}
        </div>
      </div>

      {/* Line 2: 3 fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
            % of repeat customers <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="e.g., 65%"
            {...register('repeatCustomersPercent', { required: '% of repeat customers is required' })}
          />
          {errors.repeatCustomersPercent && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.repeatCustomersPercent.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
            Product Pricing per item <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="Enter pricing"
            {...register('productPricingPerItem', { required: 'Product Pricing per item is required' })}
          />
          {errors.productPricingPerItem && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.productPricingPerItem.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
            AUM <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="Enter AUM"
            {...register('aum', { required: 'AUM is required' })}
          />
          {errors.aum && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.aum.message}</p>
          )}
        </div>
      </div>

      {/* Line 3: 2 fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
            Partnership / Alliances / Channels
          </label>
          <textarea
            className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-y"
            rows="4"
            placeholder="Key partnerships, alliances, channels"
            {...register('partnershipAlliancesChannels')}
          />
          {errors.partnershipAlliancesChannels && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.partnershipAlliancesChannels.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
            IPR's (Patents / Trademarks / Copyrights / Intellectual property)
          </label>
          <textarea
            className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-y"
            rows="4"
            placeholder="List key IP assets"
            {...register('iprs')}
          />
          {errors.iprs && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.iprs.message}</p>
          )}
        </div>
      </div>

      {/* Line 4: 1 field (full width) */}
      <div>
        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
          Top 5-8 customers
        </label>
        <textarea
          className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-y"
          rows="4"
          placeholder="By Geo, By Revenue mix, By Product/Service (you can structure here)"
          {...register('topCustomers')}
        />
        {errors.topCustomers && (
          <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.topCustomers.message}</p>
        )}
      </div>

      {/* Line 5: Left half (Founder Profiles), Right half (CAC, CLV, NPV) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
            Founder Profiles (brief bios)
          </label>
          <textarea
            className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-y"
            rows="4"
            placeholder="Brief background of founders and key management"
            {...register('founderProfiles')}
          />
          {errors.founderProfiles && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.founderProfiles.message}</p>
          )}
        </div>

        <div>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
                CAC <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="Customer Acquisition Cost"
                {...register('cac', { required: 'CAC is required' })}
              />
              {errors.cac && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.cac.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
                CLV <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="Customer Lifetime Value"
                {...register('clv', { required: 'CLV is required' })}
              />
              {errors.clv && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.clv.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
                NPV <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="Net Present Value (if applicable)"
                {...register('npv', { required: 'NPV is required' })}
              />
              {errors.npv && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.npv.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Line 6: 2 fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
            Short & Long term borrowings
          </label>
          <textarea
            className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-y"
            rows="4"
            placeholder="Summarise loans / borrowings"
            {...register('shortLongTermBorrowings')}
          />
          {errors.shortLongTermBorrowings && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.shortLongTermBorrowings.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
            Pending legal issues / lawsuits (if applicable)
          </label>
          <textarea
            className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-y"
            rows="4"
            placeholder="Brief details, if any"
            {...register('pendingLegalIssues')}
          />
          {errors.pendingLegalIssues && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.pendingLegalIssues.message}</p>
          )}
        </div>
      </div>
    </form>
  );
}

export default CustomersCommercialMetricsStep;

