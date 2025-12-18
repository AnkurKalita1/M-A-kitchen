import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Zap, Award, Gem, ArrowRight, BarChart3 } from 'lucide-react';

const SUBSCRIPTION_TIERS = [
  {
    id: 'regular',
    name: 'Regular',
    icon: Zap,
    price: 999,
    priceLabel: '/starting from',
    color: 'from-blue-500 to-blue-600',
    badge: null,
  },
  {
    id: 'silver',
    name: 'Silver',
    icon: Award,
    price: 5999,
    priceLabel: '/starting from',
    color: 'from-gray-400 to-gray-600',
    badge: null,
  },
  {
    id: 'gold',
    name: 'Gold',
    icon: Crown,
    price: 12999,
    priceLabel: '/starting from',
    color: 'from-yellow-400 to-yellow-600',
    badge: 'Most Popular',
  },
  {
    id: 'platinum',
    name: 'Platinum',
    icon: Gem,
    price: null,
    priceLabel: 'View details',
    color: 'from-purple-500 to-purple-700',
    badge: null,
  },
];


function SubscriptionTiers() {
  const navigate = useNavigate();

  const handleTierSelect = (tierId) => {
    navigate(`/plan-details?tier=${tierId}`);
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#5D3FD3' }}>
      <div className="w-full max-w-7xl mx-auto">
       
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center shadow-md">
              <Crown className="w-7 h-7 text-white" />
            </div>
          </div>
          
          <h1 className="text-[30px] text-gray-200 my-5">Choose Your Subscription Tier</h1>
          
        </div>

        {/* Tier Cards - Single Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 my-10 max-w-6xl mx-auto">
          {SUBSCRIPTION_TIERS.map((tier) => {
            const Icon = tier.icon;

            return (
              <div
                key={tier.id}
                onClick={() => handleTierSelect(tier.id)}
                className="bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] relative shadow-sm flex flex-col items-center"
              >
                {tier.badge && (
                  <div className="absolute -top-2 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {tier.badge}
                  </div>
                )}
                
                <div className={`p-6 rounded-2xl bg-gradient-to-r ${tier.color} flex items-center justify-center my-3 shadow-sm`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 my-3 text-center">{tier.name}</h3>
                
                <div className="text-center flex flex-col gap-2 my-4">
                  {tier.price ? (
                    <>
                      <span className="text-4xl font-bold text-gray-900">${tier.price.toLocaleString()}</span>
                      <span className="text-gray-600 text-sm ml-1">{tier.priceLabel}</span>
                    </>
                  ) : (
                    <span className="text-gray-600 text-sm">{tier.priceLabel}</span>
                  )}
                </div>
   
              </div>
            );
          })}
        </div>
        <div className="flex justify-center">
          <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-4 rounded-lg transition-colors text-lg">
            <BarChart3 className="w-7 h-6" />
            Compare Plans
          </button>
        </div>

      </div>
      
       
    </div>
  );
}

export default SubscriptionTiers;
