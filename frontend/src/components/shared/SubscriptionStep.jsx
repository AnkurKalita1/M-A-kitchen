import { useState } from 'react';
import { Check, Crown, Star, Sparkles, Award } from 'lucide-react';

const TIERS = [
  {
    id: 'REGULAR_QUARTERLY',
    name: 'Regular',
    duration: 'Quarterly (3 months)',
    icon: Star,
    price: 999,
    currency: 'USD',
    color: 'from-gray-400 to-gray-600',
    features: [
      'Exploratory access to marketplace for chosen Industry vertical',
      'No live auction discounts',
      'Access to Buyers/Sellers within 1 Industry vertical (chosen while subscribing)',
      'No access to Agents',
      'No discounts on Value Added Offerings (VAOs)',
      'No Auto upgrade to next version of application platform on version update',
      'Low priority marketplace listing (low visibility)',
    ],
  },
  {
    id: 'SILVER_QUARTERLY',
    name: 'Silver',
    duration: 'Quarterly (3 months)',
    icon: Sparkles,
    price: 5999,
    currency: 'USD',
    color: 'from-gray-300 to-gray-500',
    popular: false,
    features: [
      'Complimentary access to all Sellers, Buyers & Agents within 2 Industry segments in marketplace',
      '5% discount on Live Auction Event tickets for 2 events each',
      'Auto upgrade to next version of application platform on version update',
      'Medium priority listing amongst Sellers, Buyers and Agents (med visibility)',
      '1% discount on purchase of Value-Added Offerings (VAOs)',
      'Dashboard Analytics view of marketplace',
    ],
  },
  {
    id: 'GOLD_QUARTERLY',
    name: 'Gold',
    duration: 'Quarterly (3 months)',
    icon: Crown,
    price: 12999,
    currency: 'USD',
    color: 'from-yellow-400 to-yellow-600',
    popular: true,
    features: [
      'Complimentary access to all Sellers, Buyers & Agents within 6 Industry segments in marketplace',
      '15% discount on Live Auction Event tickets for 4 events each',
      'Auto upgrade to next version of application platform on version update',
      'High priority listing amongst Sellers, Buyers and Agents (high visibility)',
      '7% discount on purchase of Value-Added Offerings (VAOs)',
      '24% discount on Subscription Renewal',
      'High priority in Live Auction Event bookings (balcony seats)',
      'Dashboard Analytics view of marketplace',
    ],
  },
  {
    id: 'REGULAR_HALFYEARLY',
    name: 'Regular',
    duration: 'Half-Yearly (6 months)',
    icon: Award,
    price: 2999,
    currency: 'USD',
    color: 'from-blue-400 to-blue-600',
    popular: false,
    features: [
      'Complimentary access to all Sellers, Buyers & Agents within 1 Industry segment in marketplace',
      '1% discount on Live Auction Event ticket for 1 event',
    ],
  },
];

function SubscriptionStep({ selectedTier, onSelect }) {
  const [selected, setSelected] = useState(selectedTier || 'GOLD_QUARTERLY');

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

              <h3 className="text-2xl font-bold text-gray-900 mb-1">{tier.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{tier.duration}</p>
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">${tier.price.toLocaleString()}</span>
                <span className="text-gray-600"> USD</span>
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
        <h4 className="font-semibold text-gray-900 mb-2">🎯 Subscription Plans</h4>
        <p className="text-sm text-gray-700">
          Choose between quarterly (3 months) or half-yearly (6 months) subscriptions. Higher tier subscriptions 
          provide greater marketplace access, auction discounts, and priority visibility for M&A opportunities.
        </p>
      </div>

      <div className="hidden">
        <button type="button" onClick={handleContinue} id="subscription-continue-btn" />
      </div>
    </div>
  );
}

export default SubscriptionStep;

