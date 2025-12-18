import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TrendingUp } from 'lucide-react';

const OFFICE_TYPES = [
  'Single Office',
  'Multiple Offices (Same City)',
  'Multiple Offices (Same Country)',
  'Multiple Offices (Regional)',
  'Multiple Offices (Global)',
  'Virtual/Remote Only',
];

const GEOGRAPHY_OPTIONS = [
  "America's",
  'Canada',
  'UK',
  'EU',
  'MEA',
  'APJ',
  'ANZ',
  'Global'
];

function OperationsOwnershipStep({ data, onSubmit, loading }) {
  const [selectedGeographies, setSelectedGeographies] = useState(
    Array.isArray(data.geographySplit) ? data.geographySplit :
    data.geographySplit ? data.geographySplit.split(',').filter(Boolean) : []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      employeesOnPayroll: data.employeesOnPayroll || '',
      employeesOnContract: data.employeesOnContract || '',
      geographicalPresence: data.geographicalPresence || '',
      offices: data.offices || '',
      businessGeographySplit: data.businessGeographySplit || '',
      subsidiaries: data.subsidiaries || '',
      investmentsAcquisitions: data.investmentsAcquisitions || '',
      capTableShareholding: data.capTableShareholding || '',
      coreBusinessModel: data.coreBusinessModel || '',
      keyDifferentiators: data.keyDifferentiators || '',
      investorHistory: data.investorHistory || '',
    },
  });

  const toggleGeography = (geo) => {
    const updated = selectedGeographies.includes(geo)
      ? selectedGeographies.filter((g) => g !== geo)
      : [...selectedGeographies, geo];
    setSelectedGeographies(updated);
    setValue('geographySplit', updated);
  };

  const handleFormSubmit = (formData) => {
    onSubmit({
      ...formData,
      geographySplit: selectedGeographies,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 sm:space-y-6" id="step-form">
      {/* Step Header */}
      <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900">Operations & Ownership</h2>
        </div>
      </div>

      {/* Employees Section - One Line (2 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
            No. of Employees(FTEs)
          </label>
          <input
            type="text"
            className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="On payroll"
            {...register('employeesOnPayroll')}
          />
          {errors.employeesOnPayroll && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.employeesOnPayroll.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
            Contractual Employees
          </label>
          <input
            type="text"
            className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="On contractual"
            {...register('employeesOnContract')}
          />
          {errors.employeesOnContract && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.employeesOnContract.message}</p>
          )}
        </div>
      </div>

      {/* Geographical Presence, Offices, % split - One Line (3 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
            Geographical Presence
          </label>
          <input
            type="text"
            className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="Countries/regions where you operate"
            {...register('geographicalPresence')}
          />
          {errors.geographicalPresence && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.geographicalPresence.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
            Offices
          </label>
          <select
            className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            {...register('offices')}
          >
            <option value="">Select office type</option>
            {OFFICE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.offices && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.offices.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
            % split of Business geography wise
          </label>
          <input
            type="text"
            className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="Optional % details"
            {...register('businessGeographySplit')}
          />
          {errors.businessGeographySplit && (
            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.businessGeographySplit.message}</p>
          )}
        </div>
      </div>

      {/* Geography split - Full Width */}
      <div>
        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
          Geography split - select applicable regions
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-2">
          {GEOGRAPHY_OPTIONS.map((geo) => (
            <button
              key={geo}
              type="button"
              onClick={() => toggleGeography(geo)}
              className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border transition-colors ${
                selectedGeographies.includes(geo)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
              }`}
            >
              {geo}
            </button>
          ))}
        </div>
        {errors.geographySplit && (
          <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.geographySplit.message}</p>
        )}
      </div>

      {/* 6 Textarea Fields in 2-Column Layout (2 per row, 3 rows) */}
      <div className="pt-4 sm:pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
              Subsidiaries <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-y"
              rows="4"
              placeholder="List subsidiaries, if any"
              {...register('subsidiaries', { required: 'Subsidiaries information is required' })}
            />
            {errors.subsidiaries && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.subsidiaries.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
              Investments / Acquisitions <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-y"
              rows="4"
              placeholder="Details of investments or acquisitions (if any)"
              {...register('investmentsAcquisitions', { required: 'Investments/Acquisitions information is required' })}
            />
            {errors.investmentsAcquisitions && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.investmentsAcquisitions.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
              Cap Table / Shareholding <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-y"
              rows="4"
              placeholder="High-level shareholding / cap table"
              {...register('capTableShareholding', { required: 'Cap Table/Shareholding information is required' })}
            />
            {errors.capTableShareholding && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.capTableShareholding.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
              Core Business Model (short description)
            </label>
            <textarea
              className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-y"
              rows="3"
              placeholder="B2B, B2C, SaaS, Marketplace, etc."
              {...register('coreBusinessModel')}
            />
            {errors.coreBusinessModel && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.coreBusinessModel.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
              Key Differentiators (short description)
            </label>
            <textarea
              className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-y"
              rows="3"
              placeholder="What makes your business unique?"
              {...register('keyDifferentiators')}
            />
            {errors.keyDifferentiators && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.keyDifferentiators.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5">
              Investor History & Investments secured (if any)
            </label>
            <textarea
              className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-y"
              rows="4"
              placeholder="Previous rounds, investors, amounts, etc."
              {...register('investorHistory')}
            />
            {errors.investorHistory && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.investorHistory.message}</p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default OperationsOwnershipStep;

