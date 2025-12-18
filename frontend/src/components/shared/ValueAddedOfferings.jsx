import { useState } from 'react';
import { Shield, User, FileText, TrendingUp, Target, Zap, Sparkles } from 'lucide-react';

const OFFERINGS = [
  {
    id: 'buyer_nda',
    title: 'Buyer NDA Template',
    description: 'Standard NDA for buyers - pay & download.',
    price: 35,
    icon: Shield,
  },
  {
    id: 'seller_nda',
    title: 'Seller NDA Template',
    description: 'Protect your information as a seller.',
    price: 35,
    icon: Shield,
  },
  {
    id: 'advisor_nda',
    title: 'Advisor NDA Template',
    description: 'For advisors & intermediaries - pay & download.',
    price: 35,
    icon: User,
  },
  {
    id: 'loi',
    title: 'LOI (Letter of Intent) Template',
    description: 'Deal-ready LOI format - pay & download.',
    price: 100,
    icon: FileText,
  },
  {
    id: 'dd_templates',
    title: 'Due Diligence Templates Pack',
    description: 'Structured DD checklists & formats.',
    price: 200,
    icon: TrendingUp,
  },
  {
    id: 'spa_sha',
    title: 'SPA + SHA Templates Pack',
    description: 'Share Purchase + Shareholders Agreement base drafts.',
    price: 500,
    icon: FileText,
  },
  {
    id: 'pmi_checklist',
    title: 'PMI Checklist',
    description: 'Post-Merger Integration readiness checklist.',
    price: 700,
    icon: Target,
  },
  {
    id: 'investment_research',
    title: 'Investment Research Pack',
    description: 'Curated investment research templates.',
    price: 1000,
    icon: Zap,
  },
];

function ValueAddedOfferings({ onContinue, onSkip, onBack, selectedItems: initialSelected = [], totalPayable: initialTotal = 0 }) {
  const [selectedItems, setSelectedItems] = useState(initialSelected);
  const [totalPayable, setTotalPayable] = useState(initialTotal);

  const toggleItem = (offering) => {
    setSelectedItems((prev) => {
      const isSelected = prev.some((item) => item.id === offering.id);
      if (isSelected) {
        const newItems = prev.filter((item) => item.id !== offering.id);
        setTotalPayable(newItems.reduce((sum, item) => sum + item.price, 0));
        return newItems;
      } else {
        const newItems = [...prev, offering];
        setTotalPayable(newItems.reduce((sum, item) => sum + item.price, 0));
        return newItems;
      }
    });
  };

  const handleContinue = () => {
    if (onContinue) {
      onContinue(selectedItems, totalPayable);
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="w-full">
      {/* Header with Logo */}
      <div className="mb-6 sm:mb-8 text-center">
        <div className="flex flex-col items-center gap-4 mb-5 gap-9">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500 " style={{ backgroundColor: "#5D3FD3" }}>
            <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-white stroke-[2.5]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Value Added Offerings</h2>
        </div>
      </div>

      {/* Offerings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        {OFFERINGS.map((offering) => {
          const Icon = offering.icon;
          const isSelected = selectedItems.some((item) => item.id === offering.id);

          return (
            <div
              key={offering.id}
              className={`
                bg-white rounded-xl p-4 sm:p-6 border-2 transition-all cursor-pointer
                ${isSelected ? 'border-blue-600 shadow-lg' : 'border-gray-200 hover:border-blue-400'}
              `}
              onClick={() => toggleItem(offering)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`
                  w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center
                  ${isSelected ? 'bg-blue-600' : 'bg-gray-100'}
                `}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                </div>
                {isSelected && (
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                {offering.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-4">
                {offering.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-lg sm:text-xl font-bold text-gray-900">
                  ${offering.price}
                </span>
                <button
                  type="button"
                  className={`
                    flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors
                    ${isSelected
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(offering);
                  }}
                >
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                  {isSelected ? 'Selected' : 'Pay & Download'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Note */}
      <div className="mb-6 flex justify-end">
        <div className="bg-purple-900/50 rounded-lg p-3 sm:p-4 flex items-center gap-2 max-w-md">
          <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0" />
          <p className="text-xs sm:text-sm text-white">
            Additional Note: <span className="font-semibold">*Discounts available w.r.t chosen subscription type</span>
          </p>
        </div>
      </div>

      {/* Footer with Summary and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Selected Items - Left */}
        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 flex-1">
          <span className="text-sm text-gray-600 block mb-1">Selected Items</span>
          <p className="text-lg font-semibold text-gray-900">
            {selectedItems.length} template{selectedItems.length !== 1 ? 's' : ''} selected
          </p>
        </div>

        {/* Total Payable - Right */}
        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 flex-1 sm:flex-initial sm:min-w-[200px]">
          <span className="text-sm text-gray-600 block mb-1">Total Payable</span>
          <p className="text-lg sm:text-xl font-bold text-gray-900 text-right">
            ${totalPayable}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="text-sm sm:text-base text-gray-600 hover:text-gray-800 font-medium"
          >
            Back
          </button>
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={handleSkip}
              className="text-sm sm:text-base text-blue-600 hover:text-blue-700 font-medium"
            >
              Skip to Payment Summary
            </button>
            <button
              type="button"
              onClick={handleContinue}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium transition-colors"
            >
              Continue to Payment Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ValueAddedOfferings;

