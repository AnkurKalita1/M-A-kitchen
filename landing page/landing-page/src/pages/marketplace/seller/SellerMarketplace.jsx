import { useState } from 'react';
import TopNavbar from '../../../components/marketplace/TopNavbar';
import BottomNavbar from '../../../components/marketplace/BottomNavbar';

const SellerMarketplace = () => {
  const [sortBy, setSortBy] = useState('Best Match');

  // Dummy data for interested buyers
  const interestedBuyers = [
    {
      id: 1,
      name: 'Summit Ventures',
      type: 'Growth Equity',
      investmentRange: '$20M - $75M',
      portfolioSize: 28,
      location: 'San Francisco, CA',
      focusSectors: ['B2B SaaS', 'FinTech', 'Healthcare Tech'],
      whyMatch: [
        'Investment range perfectly matches your valuation',
        'Active investor in B2B SaaS with 12 portfolio companies'
      ]
    },
    {
      id: 2,
      name: 'TechGrowth Capital',
      type: 'Private Equity',
      investmentRange: '$30M - $100M',
      portfolioSize: 15,
      location: 'Boston, MA',
      focusSectors: ['Enterprise Software', 'Cybersecurity', 'Data Analytics'],
      whyMatch: [
        'Strong track record in scaling enterprise SaaS companies',
        'Offers operational support and go-to-market expertise'
      ]
    },
    {
      id: 3,
      name: 'Horizon Strategic',
      type: 'Strategic Buyer',
      investmentRange: '$25M - $80M',
      portfolioSize: 22,
      location: 'New York, NY',
      focusSectors: ['SaaS', 'Enterprise', 'B2B'],
      whyMatch: [
        'Strategic fit with existing product portfolio',
        'Looking to expand into your market segment'
      ]
    },
    {
      id: 4,
      name: 'Venture Partners',
      type: 'Venture Capital',
      investmentRange: '$15M - $60M',
      portfolioSize: 35,
      location: 'Austin, TX',
      focusSectors: ['FinTech', 'Healthcare Tech', 'SaaS'],
      whyMatch: [
        'Early-stage focus aligns with your growth trajectory',
        'Strong network in your target markets'
      ]
    },
    {
      id: 5,
      name: 'Capital Equity Group',
      type: 'Private Equity',
      investmentRange: '$40M - $120M',
      portfolioSize: 18,
      location: 'Chicago, IL',
      focusSectors: ['Enterprise Software', 'B2B SaaS', 'Data Analytics'],
      whyMatch: [
        'Proven expertise in scaling mid-market companies',
        'Investment range matches your valuation expectations'
      ]
    }
  ];

  // Seller profile data
  const sellerProfile = {
    companyName: 'TechFlow Analytics',
    sector: 'B2B SaaS',
    geography: 'San Francisco, CA',
    founded: '2019',
    teamSize: '78 employees',
    profileReadiness: 87
  };

  // Financial snapshot
  const financialSnapshot = {
    revenue: '$12M ARR',
    growth: '+85% YoY',
    ebitdaMargin: '32%'
  };

  // Key metrics
  const keyMetrics = {
    interestedBuyers: 12,
    newMatches: 3,
    valuationRange: '$45M - $55M'
  };

  // Documents
  const documents = [
    { name: 'Pitch Deck', available: true },
    { name: 'Financial Statements', available: true },
    { name: 'Customer Contracts', available: true },
    { name: 'Data Room (Optional)', available: false }
  ];

  // AI Generated Tags
  const aiTags = [
    'High Growth',
    'Enterprise Ready',
    'Recurring Revenue',
    'Profitable',
    'Scalable'
  ];

  return (
    <div className="min-h-screen bg-[#1e1f20] text-white pb-20 sm:pb-24 md:pb-20 px-4 sm:px-6 md:px-10 lg:px-16">
      <TopNavbar />

      {/* Dashboard Summary */}
      <div className="bg-black px-4 sm:px-8 md:px-12 lg:px-16 py-6 md:py-8 m-4 sm:m-6 md:m-8 rounded-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <h1 className="text-xl sm:text-2xl md:text-2xl mb-2"> {sellerProfile.companyName}</h1>
        </div>

        {/* Key Metrics */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12 md:mt-16">
          {/* Profile Readiness */}
          <div className="mb-6">
            <div className="flex items-center justify-between my-2 flex-col">
              <span className="text-sm text-gray-400 my-1">Profile Readiness</span>
              <span className="text-sm font-semibold">{sellerProfile.profileReadiness}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all duration-300" 
                style={{ width: `${sellerProfile.profileReadiness}%` }}
              ></div>
            </div>
          </div>
        
          <div>
          <p className="text-gray-300 text-xs sm:text-sm mb-1">Interested Buyers</p>

            <p className="text-2xl sm:text-3xl mb-1 md:mb-2">{keyMetrics.interestedBuyers}</p>
          </div>
          <div>
          <p className="text-gray-300 text-xs sm:text-sm mb-1">New Matches</p>

            <p className="text-2xl sm:text-3xl mb-1 md:mb-2">{keyMetrics.newMatches}</p>
          </div>
          <div>
          <p className="text-gray-300 text-xs sm:text-sm mb-1">Valuation Range</p>

            <p className="text-2xl sm:text-3xl mb-1 md:mb-2">{keyMetrics.valuationRange}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-2 sm:px-4 md:px-6 lg:px-10">
        {/* My Profile Section */}
        <div className="bg-[#1e1f20] rounded-lg p-4 sm:p-6 md:p-8 mb-6 border border-gray-500 hover:border-gray-400 transition-all duration-300">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">My Profile</h2>
          
        

          {/* Profile Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div>
              <p className="text-xs sm:text-sm text-gray-400 mb-1">Sector</p>
              <p className="text-sm sm:text-base font-semibold">{sellerProfile.sector}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-400 mb-1">Geography</p>
              <p className="text-sm sm:text-base font-semibold">{sellerProfile.geography}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-400 mb-1">Founded</p>
              <p className="text-sm sm:text-base font-semibold">{sellerProfile.founded}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-400 mb-1">Team Size</p>
              <p className="text-sm sm:text-base font-semibold">{sellerProfile.teamSize}</p>
            </div>
          </div>

          {/* Financial Snapshot */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-700  ">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Financial Snapshot</h3>


            <div className="flex flex-col gap-3 my-6">
              <div className="flex items-center justify-between bg-gray-700  rounded-lg p-3">
                <p className="text-xs sm:text-sm text-gray-400 mb-1 md:text-lg">Revenue</p>
                <p className="text-base sm:text-lg font-semibold">{financialSnapshot.revenue}</p>
              </div>
              <div className="flex items-center justify-between my-2 bg-gray-700  rounded-lg p-3">
                <p className="text-xs sm:text-sm text-gray-400 mb-1 md:text-lg">Growth</p>
                <p className="text-base sm:text-lg font-semibold text-green-400">{financialSnapshot.growth}</p>
              </div>
              <div className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                <p className="text-xs sm:text-sm text-gray-400 mb-1 md:text-lg">EBITDA Margin</p>
                <p className="text-base sm:text-lg font-semibold">{financialSnapshot.ebitdaMargin}</p>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-700">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Documents</h3>
            <div className="flex flex-col gap-2">
              {documents.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-2 p-1 ">
                  {doc.available ? (
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  <span className={`text-sm ${doc.available ? 'text-white' : 'text-gray-500'}`}>{doc.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Generated Tags Section */}
        <div className="bg-[#1e1f20] hover:border-gray-400 transition-all duration-300 rounded-lg p-4 sm:p-6 md:p-8 mb-6 border border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">AI-Generated Tags</h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {aiTags.map((tag, idx) => (
              <span 
                key={idx} 
                className="bg-gray-700 text-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm border border-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Interested Buyers Section */}
        <div className="mb-6 ">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-1">Interested Buyers</h2>
              <p className="text-gray-400 text-sm">{interestedBuyers.length} buyers match your company profile</p>
            </div>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-700 text-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm"
            >
              <option>Sort by: Best Match</option>
              <option>Highest Investment Range</option>
              <option>Most Active</option>
              <option>Newest</option>
            </select>
          </div>

          {/* Buyer Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-6">
            {interestedBuyers.map((buyer) => (
              <div 
                key={buyer.id} 
                className="bg-[#1e1f20] rounded-lg p-4 sm:p-6 border border-gray-700 hover:border-gray-500 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1">{buyer.name}</h3>
                    <p className="text-sm text-gray-400">{buyer.type}</p>
                  </div>
                </div>

                {/* Investment Details */}
                <div className="space-y-3 sm:space-y-4 my-10 sm:mb-6">
                  <div className="flex items-center justify-between">
                    <p className="md:text-lg sm:text-sm text-gray-400 ">Investment Range</p>
                    <p className="text-sm sm:text-base font-semibold">{buyer.investmentRange}</p>
                  </div>
                    <div className="flex items-center justify-between">
                      <p className="md:text-lg sm:text-sm text-gray-400">Portfolio Size</p>
                      <p className="text-sm sm:text-base font-semibold">{buyer.portfolioSize} companies</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="md:text-lg sm:text-sm text-gray-400 ">Location</p>
                      <p className="text-sm sm:text-base font-semibold">{buyer.location}</p>
                    </div>
                </div>

                {/* Focus Sectors */}
                <div className="mb-4 sm:mb-6">
                  <p className="text-xs sm:text-sm text-gray-400 mb-2">Focus Sectors</p>
                  <div className="flex flex-wrap gap-2">
                    {buyer.focusSectors.map((sector, idx) => (
                      <span 
                        key={idx} 
                        className="bg-gray-700 text-gray-300 px-2 sm:px-3 py-1 rounded-full text-xs border border-gray-600"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Why Match */}
                <div className="my-12 sm:mb-6">
                  <p className="text-xs sm:text-sm font-semibold mb-2">Why Match?</p>
                  <ul className="text-xs sm:text-sm text-gray-300 space-y-1 ">
                    {buyer.whyMatch.map((reason, idx) => (
                      <li key={idx} className="flex items-center  gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t border-gray-700">
                  <button className="bg-black text-white px-6 sm:px-8 md:px-12 py-2 sm:py-3 rounded text-xs sm:text-sm hover:bg-gray-900 flex-1 sm:flex-none">
                    View Profile
                  </button>
                  <button className="bg-white text-black px-6 sm:px-8 md:px-12 py-2 sm:py-3 rounded text-xs sm:text-sm hover:bg-gray-100 flex items-center justify-center gap-2 flex-1 sm:flex-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center mt-6 sm:mt-8">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base transition-colors duration-200">
              Load more Deals
            </button>
          </div>
        </div>
      </div>

      <BottomNavbar activeTab="marketplace" />
    </div>
  );
};

export default SellerMarketplace;
