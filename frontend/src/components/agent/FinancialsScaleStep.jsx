import { useForm } from 'react-hook-form';
import { DollarSign } from 'lucide-react';

const TURNOVER_RANGES = [
  'Under $1M',
  '$1M - $5M',
  '$5M - $10M',
  '$10M - $25M',
  '$25M - $50M',
  '$50M - $100M',
  '$100M - $500M',
  '$500M - $1B',
  'Over $1B',
];

const OFFICE_TYPES = [
  'Single Office',
  'Multiple Offices (Same City)',
  'Multiple Offices (Same Country)',
  'Multiple Offices (Regional)',
  'Multiple Offices (Global)',
  'Virtual/Remote Only',
];

function FinancialsScaleStep({ data, onSubmit, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      annualTurnover: data.annualTurnover || '',
      employeesOnPayroll: data.employeesOnPayroll || '',
      employeesOnContract: data.employeesOnContract || '',
      geographicalPresence: data.geographicalPresence || '',
      offices: data.offices || '',
      subsidiariesParent: data.subsidiariesParent || '',
      totalTransactions: data.totalTransactions || '',
      topCustomersGeography: data.topCustomersGeography || '',
      topCustomersRevenue: data.topCustomersRevenue || '',
    },
  });

  const handleFormSubmit = (formData) => {
    console.log('FinancialsScaleStep - Submitting data:', formData);

    const submitData = {
      annualTurnover: formData.annualTurnover,
      employeesOnPayroll: formData.employeesOnPayroll || '',
      employeesOnContract: formData.employeesOnContract || '',
      geographicalPresence: formData.geographicalPresence || '',
      offices: formData.offices,
      subsidiariesParent: formData.subsidiariesParent || '',
      totalTransactions: formData.totalTransactions || '',
      topCustomersGeography: formData.topCustomersGeography || '',
      topCustomersRevenue: formData.topCustomersRevenue || '',
    };

    console.log('Processed submit data:', submitData);
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 sm:space-y-6" id="step-form">
      {/* Step Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-start gap-2 sm:gap-3 mb-2">
          <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
          <h2 className="text-lg sm:text-xl text-gray-900 font-semibold">Financials & Scale</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Annual Turnover */}
          <div>
            <label className="label text-sm sm:text-base">
              Annual Turnover (for last 3 years) <span className="text-red-500">*</span>
            </label>
            <select
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              {...register('annualTurnover', { required: 'Annual turnover is required' })}
            >
              <option value="">Select turnover range</option>
              {TURNOVER_RANGES.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
            {errors.annualTurnover && (
              <p className="error-text text-xs sm:text-sm">{errors.annualTurnover.message}</p>
            )}
          </div>

          {/* No. of Employees */}
          <div>
            <label className="label text-sm sm:text-base">No. of Employees</label>
            <input
              type="text"
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              placeholder="On contractual"
              {...register('employeesOnContract')}
            />
          </div>

          {/* Offices */}
          <div>
            <label className="label text-sm sm:text-base">
              Offices <span className="text-red-500">*</span>
            </label>
            <select
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              {...register('offices', { required: 'Office type is required' })}
            >
              <option value="">Select office type</option>
              {OFFICE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.offices && <p className="error-text text-xs sm:text-sm">{errors.offices.message}</p>}
          </div>

          {/* Total no. of Investment transactions */}
          <div>
            <label className="label text-sm sm:text-base">
              Total no. of Investment transactions / Engagements delivered till date
            </label>
            <input
              type="text"
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              placeholder="Number of mandates completed"
              {...register('totalTransactions')}
            />
          </div>

          {/* Top 5-8 Customers (Geography) */}
          <div>
            <label className="label text-sm sm:text-base">Top 5–8 Customers</label>
            <textarea
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              rows="4"
              placeholder="List by geography (if shareable)"
              {...register('topCustomersGeography')}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* No. of Employees (FTEs) */}
          <div>
            <label className="label text-sm sm:text-base">No. of Employees (FTEs)</label>
            <input
              type="text"
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              placeholder="On payroll"
              {...register('employeesOnPayroll')}
            />
          </div>

          {/* Geographical Presence */}
          <div>
            <label className="label text-sm sm:text-base">Geographical Presence</label>
            <textarea
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              rows="3"
              placeholder="Countries/regions where you operate"
              {...register('geographicalPresence')}
            />
          </div>

          {/* Subsidiaries / Parent */}
          <div>
            <label className="label text-sm sm:text-base">Subsidiaries / Parent</label>
            <textarea
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              rows="3"
              placeholder="Short description of group structure"
              {...register('subsidiariesParent')}
            />
          </div>

          {/* Top 5-8 Customers (Revenue) */}
          <div>
            <label className="label text-sm sm:text-base">Top 5–8 Customers</label>
            <textarea
              className="input-field text-sm sm:text-base px-3 sm:px-4 py-2.5"
              rows="4"
              placeholder="List by revenue mix (if shareable)"
              {...register('topCustomersRevenue')}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default FinancialsScaleStep;


