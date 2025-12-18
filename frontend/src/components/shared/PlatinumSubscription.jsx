import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Gem, Star, Check } from 'lucide-react';

function PlatinumSubscription({ onSelectPlan }) {
  const navigate = useNavigate();

  const exclusiveBenefits = [
    'Lifetime subscriber in perpetuity',
    'Free automatic upgrades & all future benefits included',
    'Free access to all Value-Added Offerings',
    'Top listings across all geographies & segments',
    'Full customization within marketplace',
    'Highest visibility & priority in all marketplace processes',
  ];

  const completeFeatures = [
    'Dashboard Analytics view of the marketplace',
    'Industry segment-wise feedback',
    'Access to entire marketplace ecosystem',
    'Full integration of features across all modules',
    'Geography-wise feedback',
    'Infographics & insights visualization',
    'Ability to explore & interact with all segments',
  ];

  return (
    <div className="max-w-5xl mx-auto mb-6">
      {/* Platinum Subscription Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Purple Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Gem className="w-8 h-8 text-white" />
              <Star className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1" fill="currentColor" />
            </div>
            <h2 className="text-xl font-bold text-white">Platinum Subscription</h2>
            <Star className="w-5 h-5 text-yellow-300" fill="currentColor" />
          </div>
          <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm">
            Compare Plans
          </button>
        </div>

        {/* Description Section */}
        <div className="px-6 py-4 text-center border-b border-gray-200">
          <p className="text-gray-700 text-sm mb-2">
            Elite tier with lifetime access and white-glove service. Invest once, benefit forever.
          </p>
          <h3 className="text-lg font-semibold text-gray-900">Elite Membership Per User</h3>
        </div>

        {/* Lifetime Access Pricing */}
        <div className="px-6 py-8 text-center bg-gradient-to-b from-purple-50 to-white">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center shadow-lg">
              <Gem className="w-10 h-10 text-white" />
            </div>
          </div>
          <h4 className="text-2xl font-bold text-gray-900 mb-2">Lifetime Access</h4>
          <p className="text-4xl font-bold text-gray-900 mb-2">$250,000</p>
          <p className="text-gray-600 text-sm mb-4">One-time payment • Lifetime benefits</p>
          <button
            onClick={() => onSelectPlan && onSelectPlan('platinum-lifetime')}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
          >
            Never pay again
          </button>
        </div>

        {/* Exclusive Platinum Benefits */}
        <div className="px-6 py-6 bg-purple-50">
          <h5 className="text-lg font-bold text-gray-900 mb-4">Exclusive Platinum Benefits</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exclusiveBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-2">
                <Star className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" />
                <span className="text-sm text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Complete Feature Set */}
        <div className="px-6 py-6 bg-white">
          <h5 className="text-lg font-bold text-gray-900 mb-4">Complete Feature Set</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {completeFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Best Long-Term Value */}
        <div className="px-6 py-4 bg-green-50 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            <p className="text-sm text-gray-700">
              Save over $10,000 compared to annual Gold subscriptions over 5 years
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors shadow-sm text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tiers
        </button>
        
        <button
          onClick={() => onSelectPlan && onSelectPlan('platinum-lifetime')}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md text-sm font-medium"
        >
          Get Lifetime Access
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default PlatinumSubscription;

