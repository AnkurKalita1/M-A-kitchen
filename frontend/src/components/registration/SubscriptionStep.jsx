import { useState } from 'react';
import { Check, Crown, Star, Sparkles, Award } from 'lucide-react';

const TIERS = [
  {
    id: 'REGULAR',
    name: 'Regular',
    icon: Star,
    price: 100,
    color: 'from-gray-400 to-gray-600',
    features: [
      'Basic deal access',
      '5 deals per month',
      'Email support',
      'Deal notifications',
    ],
  },
  {
    id: 'SILVER',
    name: 'Silver',
    icon: Sparkles,
    price: 500,
    color: 'from-gray-300 to-gray-500',
    popular: false,
    features: [
      'Enhanced deal access',
      '20 deals per month',
      'Priority support',
      'AI recommendations',
      'Advanced filters',
    ],
  },
  {
    id: 'GOLD',
    name: 'Gold',
    icon: Crown,
    price: 1000,
    color: 'from-yellow-400 to-yellow-600',
    popular: true,
    features: [
      'Premium deal access',
      '50 deals per month',
      '24/7 support',
      'Advanced AI insights',
      'Auction participation',
      'Custom deal alerts',
    ],
  },
  {
    id: 'PLATINUM',
    name: 'Platinum',
    icon: Award,
    price: 2500,
    color: 'from-purple-400 to-purple-600',
    popular: false,
    features: [
      'Unlimited deal access',
      'Unlimited deals',
      'Dedicated account manager',
      'Premium AI insights',
      'Priority auction access',
      'Custom reports',
      'White-glove service',
    ],
  },
];

function SubscriptionStep({ selectedTier, onSelect, onBack }) {
  const [selected, setSelected] = useState(selectedTier || 'GOLD');

  const handleSelect = (tierId) => {
    setSelected(tierId);
  };

  const handleContinue = () => {
    onSelect(selected);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Subscription</h2>
        <p className="text-gray-600 mt-2">Select the plan that best fits your investment needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TIERS.map((tier) => {
          const Icon = tier.icon;
          const isSelected = selected === tier.id;

          return (
            <div
              key={tier.id}
              onClick={() => handleSelect(tier.id)}
              className={`
                relative cursor-pointer rounded-xl border-2 p-6 transition-all hover:shadow-lg
                ${isSelected ? 'border-primary-600 shadow-lg ring-2 ring-primary-200' : 'border-gray-200'}
              `}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Most Popular
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${tier.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {isSelected && <Check className="w-6 h-6 text-primary-600" />}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">₹{tier.price}</span>
                <span className="text-gray-600">/month</span>
              </div>

              <ul className="space-y-3">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-primary-50 to-purple-50 border border-primary-200 rounded-lg p-6 mt-8">
        <h4 className="font-semibold text-gray-900 mb-2">🎯 Why Choose Premium Tiers?</h4>
        <p className="text-sm text-gray-700">
          Higher tier subscriptions give you access to AI-powered deal recommendations, 
          priority auction access, and dedicated support to help you find the perfect M&A opportunities.
        </p>
      </div>

      <div className="flex justify-between pt-6">
        <button type="button" onClick={onBack} className="btn-secondary">
          Back
        </button>
        <button type="button" onClick={handleContinue} className="btn-primary">
          Continue to Payment
        </button>
      </div>
    </div>
  );
}

export default SubscriptionStep;

