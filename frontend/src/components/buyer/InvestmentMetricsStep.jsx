import { useForm } from 'react-hook-form';
import { Target } from 'lucide-react';

function InvestmentMetricsStep({ data, onSubmit, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      averageInvestmentTicketSize: data.averageInvestmentTicketSize || '',
      annualTurnover: data.annualTurnover || '',
      ebitda: data.ebitda || '',
      ebitdaMargin: data.ebitdaMargin || '',
      netProfit: data.netProfit || '',
      aum: data.aum || '',
      fundSize: data.fundSize || '',
      investmentTillDate: data.investmentTillDate || '',
      investmentHistory: data.investmentHistory || '',
    },
  });

  const onSubmitForm = (formData) => {
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6" id="step-form">
      {/* Step Header */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Investment Metrics & History</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Average Investment Ticket Size / Deal
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="e.g., $5M - $20M"
              {...register('averageInvestmentTicketSize')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">EBITDA</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="e.g., $10M"
              {...register('ebitda')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Net Profit</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="e.g., $8M"
              {...register('netProfit')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Fund Size</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="For investors other than strategic"
              {...register('fundSize')}
            />
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Annual Turnover</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="e.g., $50M"
              {...register('annualTurnover')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">EBITDA Margin</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="e.g., 20%"
              {...register('ebitdaMargin')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">AUM (Assets Under Management)</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="e.g., $500M"
              {...register('aum')}
            />
          </div>
        </div>
      </div>

      {/* Investment Till Date - Full Width */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Investment Till Date</label>
        <textarea
          rows={4}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
          placeholder="Summary of investments till date (no. of deals, sectors, geographies, etc.)"
          {...register('investmentTillDate')}
        />
      </div>

      {/* Investment History - Full Width */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Investment History (if any)</label>
        <textarea
          rows={4}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
          placeholder="Brief description of past investments, exits and notable deals"
          {...register('investmentHistory')}
        />
      </div>
    </form>
  );
}

export default InvestmentMetricsStep;

