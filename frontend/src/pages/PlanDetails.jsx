import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Crown, Zap, Award, Gem, BarChart3 } from 'lucide-react';
import PlatinumDetails from '../components/PlatinumDetails';

const TIER_CONFIG = {
  regular: {
    name: 'Regular',
    icon: Zap,
    color: 'from-blue-500 to-blue-600',
    description: 'Perfect for individual investors starting their M&A journey. Choose your preferred payment cycle.',
    plans: [
      {
        id: 'regular-3',
        duration: '3 Months',
        // billing: 'Billed quarterly',
        price: 999,
        monthlyPrice: 333,
        features: [
          'Exploratory access to marketplace for chosen Industry vertical',
          'Access to Buyers/Sellers within 1 Industry vertical (chosen while subscribing)',
          'No live auction discounts',
          'No discounts on Value Added Offerings (VAOs)',
          'No access to Agents',
          'No auto-upgrade to next version of application platform',
          'Low priority marketplace listing (low visibility)',
        ],
        included: [true, true, false, false, false, false, false],
      },
      {
        id: 'regular-6',
        duration: '6 Months',
        billing: 'Billed semi-annually',
        price: 2999,
        monthlyPrice: 499,
        features: [
          'Complimentary access to all Sellers, Buyers & Agents within 1 Industry segment',
          '1% discount on Live Auction Event ticket for 1 event',
          'Auto upgrade to next version of application platform on version update',
          'Low to medium priority listing (low-medium visibility)',
          'No discounts on Value Added Offerings (VAOs)',
        ],
        included: [true, true, true, true, false],
      },
      {
        id: 'regular-12',
        duration: '12 Months',
        billing: 'Billed annually',
        price: 3999,
        monthlyPrice: 333,
        badge: 'Best Value',
        features: [
          'Complimentary access to all Sellers, Buyers & Agents within 2 Industry segments',
          '2% discount on Live Auction Event ticket for 1 event',
          'Auto upgrade to next version of application platform on version update',
          'Low to medium priority listing (low-medium visibility)',
          '2% discount on purchase of Value-Added Offerings (VAOs)',
        ],
        included: [true, true, true, true, true],
      },
    ],
  },
  silver: {
    name: 'Silver',
    icon: Award,
    color: 'from-gray-400 to-gray-600',
    description: 'Ideal for growing businesses and active deal seekers. Unlock advanced features and priority support.',
    plans: [
      {
        id: 'silver-3',
        duration: '3 Months',
        billing: 'Billed quarterly',
        price: 5999,
        monthlyPrice: 1999,
        features: [
          'Complimentary access to all Sellers, Buyers & Agents within 2 Industry segments in marketplace',
          '5% discount on Live Auction Event tickets for 2 events each',
          'Auto upgrade to next version of application platform on version update',
          'Medium priority listing amongst Sellers, Buyers and Agents (med visibility)',
          '1% discount on purchase of Value-Added Offerings (VAOs)',
          'Dashboard Analytics view of marketplace',
        ],
        included: [true, true, true, true, true, true],
      },
      {
        id: 'silver-6',
        duration: '6 Months',
        billing: 'Billed semi-annually',
        price: 7999,
        monthlyPrice: 1333,
        features: [
          'Complimentary access to all Sellers, Buyers & Agents within 4 Industry segments in marketplace',
          '7% discount on Live Auction Event tickets for 3 events each',
          'Auto upgrade to next version of application platform on version update',
          'Medium to High priority listing amongst Sellers, Buyers and Agents (med-high visibility)',
          '3.5% discount on purchase of Value-Added Offerings (VAOs)',
          'Dashboard Analytics view of marketplace',
        ],
        included: [true, true, true, true, true, true],
      },
      {
        id: 'silver-12',
        duration: '12 Months',
        billing: 'Billed annually',
        price: 9999,
        monthlyPrice: 833,
        badge: 'Best Value',
        features: [
          'Complimentary access to all Sellers, Buyers & Agents within 5 Industry segments in marketplace',
          '10% discount on Live Auction Event tickets for 4 events each',
          'Auto upgrade to next version of application platform on version update',
          'Medium to High priority listing amongst Sellers, Buyers and Agents (med-high visibility)',
          '5% discount on purchase of Value-Added Offerings (VAOs)',
          '25% discount on Annual subscription renewal',
          'Dashboard Analytics view of marketplace',
        ],
        included: [true, true, true, true, true, true, true],
      },
    ],
  },
  gold: {
    name: 'Gold',
    icon: Crown,
    color: 'from-yellow-400 to-yellow-600',
    description: 'Premium solution for professional investors and enterprises. Get unlimited access and dedicated support.',
    plans: [
      {
        id: 'gold-3',
        duration: '3 Months',
        billing: 'Billed quarterly',
        price: 12999,
        monthlyPrice: 4333,
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
        included: [true, true, true, true, true, true, true, true],
      },
      {
        id: 'gold-6',
        duration: '6 Months',
        billing: 'Billed semi-annually',
        price: 14999,
        monthlyPrice: 2500,
        features: [
          'Complimentary access to all Sellers, Buyers & Agents within 8 Industry segments in marketplace',
          '18% discount on Live Auction Event tickets for 6 events each',
          'Auto upgrade to next version of application platform on version update',
          'High priority listing amongst Sellers, Buyers and Agents (high visibility)',
          '10% discount on purchase of Value-Added Offerings (VAOs)',
          '35% discount on Subscription Renewal',
          'High priority in Live Auction Event queue & bookings (balcony seats)',
          'Dashboard Analytics view of marketplace',
        ],
        included: [true, true, true, true, true, true, true, true],
      },
      {
        id: 'gold-12',
        duration: '12 Months',
        billing: 'Billed annually',
        price: 15999,
        monthlyPrice: 1333,
        badge: 'Best Value',
        features: [
          'Complimentary access to all Sellers, Buyers & Agents within 10 Industry segments in marketplace',
          '22% discount on Live Auction Event tickets for 8 events each',
          'Auto upgrade to next version of application platform on version update',
          'High priority listing amongst Sellers, Buyers and Agents (high visibility)',
          '15% discount on purchase of Value-Added Offerings (VAOs)',
          '45% discount on Subscription Renewal',
          'High priority in Live Auction Event queue & bookings (balcony seats)',
          'Select customizations within marketplace',
          'Dashboard Analytics view of marketplace',
        ],
        included: [true, true, true, true, true, true, true, true, true],
      },
    ],
  },
  platinum: {
    name: 'Platinum',
    icon: Gem,
    color: 'from-purple-500 to-purple-700',
    description: 'Elite tier with lifetime access and white-glove service. Invest once, benefit forever.',
    plans: [
      {
        id: 'platinum-lifetime',
        duration: 'Lifetime Access',
        billing: 'One-time payment • Lifetime benefits',
        price: 250000,
        monthlyPrice: null,
        badge: 'Elite Membership',
        features: [
          'Lifetime subscriber in perpetuity',
          'Free automatic upgrades & all future benefits included',
          'Free access to all Value-Added Offerings',
          'Top listings across all geographies & segments',
          'Full customization within marketplace',
          'Highest visibility & priority in all marketplace processes',
          'All-in-one access per user with no restrictions',
          'Access to all Live Auction Events with no extra ticket fees',
          'Free access to all Investment Research & application upgrades forever',
          'Top-priority listing in Auction-As-A-Service (AaaS)',
          'First access to all new features & enhancements',
        ],
        included: Array(11).fill(true),
      },
    ],
  },
};

function PlanDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tierId = searchParams.get('tier') || 'regular';
  const role = searchParams.get('role') || 'buyer';
  const [selectedPlan, setSelectedPlan] = useState(null);

  const tier = TIER_CONFIG[tierId];
  if (!tier) {
    navigate('/');
    return null;
  }

  // Render PlatinumDetails component for platinum tier
  if (tierId === 'platinum') {
    return <PlatinumDetails />;
  }

  const Icon = tier.icon;

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleContinue = () => {
    if (selectedPlan) {
      navigate(`/role-selection?tier=${tierId}&plan=${selectedPlan}`);
    }
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#5D3FD3' }}>
      <div className="w-full max-w-7xl mx-auto ">
     

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-center mb-4 relative">
            <div className={`p-4 rounded-xl bg-gradient-to-r ${tier.color} flex items-center justify-center shadow-md`}>
              <Icon className="w-11 h-11 text-white" />
            </div>
            <button className="absolute right-16 flex items-center gap-2 bg-blue-100 hover:bg-blue-700 text-blue-600 hover:text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm">
              <BarChart3 className="w-4 h-4" />
              Compare Plans
            </button>
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-purple-200 mb-2">{tier.name} Subscription</h1>
          
          </div>
        </div>

        {/* Plan Details Container */}
        <div className="max-w-5xl mx-auto mb-6 p-3">
          <div className="bg-white rounded-xl  shadow-md py-12 px-8">
            
            {/* Payment Cycle Selection Boxes  */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
              {tier.plans.map((plan, index) => {
                const isSelected = selectedPlan === plan.id;
                return (
                  <div
                    key={`payment-${plan.id}`}
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`
                      bg-white rounded-lg p-4 text-center cursor-pointer transition-all border
                      ${isSelected ? 'border-blue-500 shadow-md' : 'border-gray-300 hover:shadow-md'}
                    `}
                  >
                    <p className="text-gray-600 text-sm my-2">{plan.billing}</p>
                    <p className="text-2xl font-bold text-gray-900 my-3">
                      ${plan.price.toLocaleString()}
                    </p>
                    {plan.monthlyPrice && (
                      <p className="text-gray-600 text-xs">${plan.monthlyPrice.toLocaleString()}/month</p>
                    )}
                    {plan.badge && (
                      <span className="inline-block mt-2 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tier.plans.map((plan, index) => {
                const isSelected = selectedPlan === plan.id;
                // Different light background colors for each plan
                const backgroundColors = [
                  'bg-blue-50', // Very light blue for first plan
                  'bg-purple-50', // Very light purple for second plan
                  'bg-green-50' // Very light green for third plan
                ];
                const bgColor = backgroundColors[index % 3];
                
                return (
                  <div
                    key={plan.id}
                    className={`
                      ${bgColor} rounded-xl py-5 px-4 transition-all shadow-sm flex flex-col h-full border border-gray-200
                      ${isSelected ? '' : 'hover:shadow-md'}
                    `}
                  >
                    {/* Plan Features */}
                    <div className="mb-4 flex-grow p-4 text-start">
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">
                        {plan.duration} 
                      </h4>
                      <p className="text-base font-bold text-gray-900 mb-8">
                        ${plan.price.toLocaleString()} / User
                      </p>
                      
                      <ul className="space-y-1.5">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-2">
                            {plan.included[featureIndex] ? (
                              <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                            ) : (
                              <div className="w-3.5 h-3.5 border-2 border-gray-300 rounded flex-shrink-0 mt-0.5" />
                            )}
                            <span className="text-xs text-gray-700 leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Select Plan Button */}
                    <button
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`
                        w-full py-2 px-4 rounded-lg font-medium transition-colors text-xs mt-auto border
                        ${isSelected
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                        }
                      `}
                    >
                      {isSelected ? 'Selected' : 'Select Plan'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors shadow-sm text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tiers
          </button>
          
          <button
            onClick={handleContinue}
            disabled={!selectedPlan}
            className={`
              flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-sm transition-all
              ${selectedPlan
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlanDetails;
