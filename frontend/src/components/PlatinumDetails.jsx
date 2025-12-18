import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Gem, Star, Check } from 'lucide-react';

const EXCLUSIVE_BENEFITS = [
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
];

const COMPLETE_FEATURES = [
  'Dashboard Analytics view of the marketplace',
  'Industry segment-wise feedback',
  'Access to entire marketplace ecosystem',
  'Full integration of features across all modules',
  'Geography-wise feedback',
  'Infographics & insights visualization',
  'Ability to explore & interact with all segments',
];

function PlatinumDetails() {
  const navigate = useNavigate();

  const handleGetLifetimeAccess = () => {
    navigate('/role-selection?tier=platinum&plan=platinum-lifetime');
  };

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: '#5D3FD3' }}>
      <div className="w-full max-w-7xl mx-auto">
       
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-center mb-4 relative">
            
            <button className="absolute right-16 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Compare Plans
            </button>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-6">
          {/* Purple Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Gem className="w-8 h-8 text-white" />
                  <Star className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1" fill="currentColor" />
                </div>
                <h2 className="text-2xl font-bold text-white">Platinum Subscription</h2>
                <Star className="w-5 h-5 text-yellow-300" fill="currentColor" />
              </div>
            </div>
            <p className="text-purple-100 text-sm mb-2">
              Elite tier with lifetime access and white-glove service. Invest once, benefit forever.
            </p>
            <div className="text-center mt-4">
              <p className="text-white text-lg font-semibold">Elite Membership Per User</p>
            </div>
          </div>

          {/* Lifetime Access Pricing Section */}
          <div className="px-8 py-12 text-center bg-white">
            <div className="mb-6">
              <Gem className="w-24 h-24 text-purple-600 mx-auto mb-6" />
              <h3 className="text-4xl font-bold text-gray-900 mb-3">Lifetime Access</h3>
              <p className="text-6xl font-bold text-gray-900 mb-4">$250,000</p>
              <p className="text-gray-600 text-base mb-8">One-time payment • Lifetime benefits</p>
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-10 py-4 rounded-xl transition-colors text-lg shadow-lg">
                Never pay again
              </button>
            </div>
          </div>

          {/* Exclusive Platinum Benefits Section */}
          <div className="bg-purple-50 px-8 py-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Exclusive Platinum Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {EXCLUSIVE_BENEFITS.slice(0, 6).map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" />
                    <span className="text-sm text-gray-700 leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {EXCLUSIVE_BENEFITS.slice(6).map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" />
                    <span className="text-sm text-gray-700 leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Complete Feature Set Section */}
          <div className="bg-white px-8 py-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Complete Feature Set</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {COMPLETE_FEATURES.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {COMPLETE_FEATURES.slice(4).map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Best Long-Term Value Section */}
          <div className="bg-green-50 px-8 py-6">
            <div className="flex items-center gap-3">
              <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                Save over $10,000 compared to annual Gold subscriptions over 5 years
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors shadow-sm text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tiers
          </button>
          
          <button
            onClick={handleGetLifetimeAccess}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium text-sm transition-all shadow-md"
          >
            Get Lifetime Access
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlatinumDetails;

