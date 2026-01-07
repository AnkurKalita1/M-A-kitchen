import { useState } from 'react';
import TopNavbar from '../../../components/marketplace/TopNavbar';
import BottomNavbar from '../../../components/marketplace/BottomNavbar';
import Toast from '../../../components/marketplace/Toast';

const AgentMarketplace = () => {
  const [sortBy, setSortBy] = useState('Best Match');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const [toast, setToast] = useState({ show: false, message: '' });

  const deals = [
    {
      id: 1,
      name: 'CloudMetrics Platform',
      industry: 'B2B SaaS',
      location: 'San Francisco, CA',
      dealSize: '$50M - $60M',
      revenue: '$13M ARR',
      growth: '+88% YoY',
      dealType: 'Minority Stake',
      whyMatch: [
        'Perfect fit for your SaaS-focused buyer client',
        'Strong growth metrics exceed typical benchmarks'
      ]
    },
    {
      id: 2,
      name: 'SecureAuth Solutions',
      industry: 'Cybersecurity',
      location: 'Boston, MA',
      dealSize: '$35M - $42M',
      revenue: '$9.5M ARR',
      growth: '+76% YoY',
      dealType: 'Majority Stake',
      whyMatch: [
        'High-demand cybersecurity sector with strong tailwinds',
        'Matches investment criteria for 2 of your buyer clients'
      ]
    },
    {
      id: 3,
      name: 'FinEdge Analytics',
      industry: 'FinTech',
      location: 'New York, NY',
      dealSize: '$45M - $55M',
      revenue: '$11M ARR',
      growth: '+82% YoY',
      dealType: 'Minority Stake',
      whyMatch: [
        'Expanding fintech platform with enterprise pipeline',
        'Valuation aligns with buyer mandate for Q2'
      ]
    },
    {
      id: 4,
      name: 'HealthData Nexus',
      industry: 'Healthcare Tech',
      location: 'Austin, TX',
      dealSize: '$40M - $52M',
      revenue: '$10.5M ARR',
      growth: '+71% YoY',
      dealType: 'Majority Stake',
      whyMatch: [
        'Regulatory readiness matches healthcare-focused buyers',
        'Recurring revenue with hospital networks'
      ]
    },{
      id: 5,
      name: 'SupplyTrack Systems',
      industry: 'Supply Chain Tech',
      location: 'Chicago, IL',
      dealSize: '$32M - $40M',
      revenue: '$8.2M ARR',
      growth: '+64% YoY',
      dealType: 'Majority Stake',
      whyMatch: [
        'Buyer has prior investments in logistics platforms',
        'Stable enterprise contracts with predictable cash flow'
      ]
    },
    {
      id: 6,
      name: 'AdPulse Marketing',
      industry: 'MarTech',
      location: 'Los Angeles, CA',
      dealSize: '$28M - $36M',
      revenue: '$7.5M ARR',
      growth: '+69% YoY',
      dealType: 'Minority Stake',
      whyMatch: [
        'Data-driven marketing platform complements buyer portfolio',
        'High-margin SaaS with strong customer retention'
      ]
    },
    {
      id: 7,
      name: 'InfraLogic Cloud',
      industry: 'Cloud Infrastructure',
      location: 'Seattle, WA',
      dealSize: '$48M - $58M',
      revenue: '$12M ARR',
      growth: '+73% YoY',
      dealType: 'Majority Stake',
      whyMatch: [
        'Infrastructure SaaS aligns with long-term buyer strategy',
        'Enterprise renewals drive consistent ARR growth'
      ]
    },
    {
      id: 8,
      name: 'PeopleOps Suite',
      industry: 'HR Tech',
      location: 'Remote (US)',
      dealSize: '$30M - $38M',
      revenue: '$8.8M ARR',
      growth: '+67% YoY',
      dealType: 'Minority Stake',
      whyMatch: [
        'Strong mid-market adoption with expansion potential',
        'Fits buyer’s thesis on workforce automation'
      ]
    }
    
  ];

  const hero = {
    name: 'Sarah Chen',
    firm: 'Apex M&A Advisors',
    tags: ['B2B SaaS', 'FinTech', 'Healthcare Tech'],
    coverage: ['North America', 'Western Europe'],
    metrics: {
      newDealsThisWeek: 15,
      newBuyerClients: 4,
      activeDeals: 23,
      dealsCompleted: 45,
      totalDealValue: '$2.8B'
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1f20] text-white pb-20 sm:pb-24 md:pb-20 px-4 sm:px-6 md:px-10 lg:px-16">
      <TopNavbar />

      {/* Hero / Summary */}
      <div className="bg-gradient-to-r from-black via-[#0f1115] to-black px-4 sm:px-8 md:px-12 lg:px-16 py-6 md:py-8 m-4 sm:m-6 md:m-8 rounded-xl shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold md:text-2xl  mb-2">{hero.name}</h1>
            <p className="text-sm text-gray-300 mb-3 lg:text-lg">{hero.firm}</p>
            <div className="flex flex-wrap gap-2">
              {hero.tags.map((tag) => (
                <span key={tag} className="bg-gray-800 text-gray-200 px-4 py-2 rounded-full text-xs border border-gray-700">
                  {tag}
                </span>
              ))}
            </div>
            <div className=" mt-12 text-gray-300">
              <span className=" text-md">
                
                Coverage Regions <br />   {hero.coverage.join('  ')}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-400 mb-1">Deals Completed</p>
              <p className="text-lg font-semibold">{hero.metrics.dealsCompleted}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Total Deal Value</p>
              <p className="text-lg font-semibold">{hero.metrics.totalDealValue}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Active Deals</p>
              <p className="text-lg font-semibold">{hero.metrics.activeDeals}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">New Deals This Week</p>
              <p className="text-lg font-semibold flex items-center gap-1">
                {hero.metrics.newDealsThisWeek}
                <span className="text-green-400 text-xs">↑</span>
              </p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">New Buyer Clients</p>
              <p className="text-lg font-semibold">{hero.metrics.newBuyerClients}</p>
            </div>
          </div>
        </div>

      
      </div>


      {/* Tabs placeholder */}
        <div className="flex gap-3 text-xs sm:text-sm my-8 mx-12 bg-gray-300 rounded-2xl w-fit px-2 py-1">
          {['Deal Opportunities', 'Buyer Clients', 'Analytics'].map((tab) => (
            <span
              key={tab}
              className={`px-6 py-3 rounded-2xl  ${
                tab === 'Deal Opportunities' ? 'bg-white text-black ' : ' text-gray-900'
              }`}
            >
              {tab}
            </span>
          ))}
        </div>
        

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-screen px-2 sm:px-4 md:px-6 lg:px-10 gap-4 md:gap-6 lg:gap-10">
     
        {/* Filter Toggle (mobile/tablet) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center justify-between w-full"
        >
          <span className="font-semibold">Filters</span>
          <svg className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Filters Sidebar */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 border-r-0 lg:border-r border-gray-700 p-4 md:p-6 rounded-lg bg-gray-900 lg:bg-transparent max-h-[80vh] lg:max-h-none overflow-y-auto`}>
          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-3 text-gray-300">Sector</h4>
            <div className="space-y-2">
              {['B2B SaaS', 'FinTech', 'Healthcare Tech', 'Cybersecurity'].map((sector) => (
                <label key={sector} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-300">{sector}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-3 text-gray-300">Deal Size (USD)</h4>
            <div className="space-y-2">
              <input type="text" placeholder="Min ($M)" className="w-full bg-gray-700 text-white px-3 py-2 rounded text-sm" />
              <input type="text" placeholder="Max ($M)" className="w-full bg-gray-700 text-white px-3 py-2 rounded text-sm" />
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-3 text-gray-300">Services</h4>
            <div className="space-y-2">
              {['M&A Advisory', 'Sell-side', 'Buy-side'].map((service) => (
                <label key={service} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-300">{service}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm">
            Reset Filters
          </button>
        </div>

        {/* Deals List */}
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 md:mb-6">
            <div className="w-full sm:w-auto">
              <h2 className="text-xl sm:text-2xl mb-1">Deal Opportunities</h2>
              <p className="text-gray-400 text-xs sm:text-sm">{deals.length} deals match your expertise</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-700 text-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm flex-1 sm:flex-none"
              >
                <option>Best Match</option>
                <option>Highest Growth</option>
                <option>Largest Deal Size</option>
                <option>Newest</option>
              </select>
              <div className="flex gap-1 sm:gap-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-700' : 'bg-gray-800'}`}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-700' : 'bg-gray-800'}`}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 lg:grid-cols-2' : 'grid-cols-2'} gap-4 sm:gap-6`}>
            {deals.map((deal) => (
              <div key={deal.id} className="bg-gray-900 border border-gray-700 rounded-xl p-5 sm:p-6 shadow-md hover:border-gray-500 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1">{deal.name}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      {deal.industry} | {deal.location}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 text-sm sm:text-base text-gray-200 my-10">
                  <span className="px-3 py-1 rounded-full border border-gray-700 ">Deal Size: {deal.dealSize}</span>


                  <span className="px-3 py-1 rounded-full border border-gray-700">Revenue: {deal.revenue}</span>
                  <span className="px-3 py-1 rounded-full border border-gray-700 text-green-400">Growth: {deal.growth}</span>
                  <span className="px-3 py-1 rounded-full border border-gray-700">Deal Type: {deal.dealType}</span>
                </div>

                <div className="my-8">
                  <p className="text-xs sm:text-sm font-semibold mb-2">Why Perfect Match?</p>
                  <ul className="text-xs sm:text-sm text-gray-300 space-y-1">
                    {deal.whyMatch.map((reason, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <span className="text-green-400">•</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-800">
                  <button className="bg-black text-white px-6 sm:px-8 py-2 rounded text-xs sm:text-sm hover:bg-gray-900 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="hidden sm:inline">View Details</span>
                    <span className="sm:hidden">Details</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setToast({ show: true, message: 'Deal added to tracking' })}
                      className="p-2 rounded hover:bg-gray-800"
                      title="Add to tracking"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => setToast({ show: true, message: 'message sent to seller' })}
                      className="p-2 rounded hover:bg-gray-800"
                      title="Send message"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center my-12 sm:mt-8">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base transition-colors duration-200">
              Load more Deals
            </button>
          </div>
        </div>
      </div>

      {toast.show && (
        <Toast 
          message={toast.message} 
          onClose={() => setToast({ show: false, message: '' })} 
        />
      )}

      <BottomNavbar activeTab="marketplace" />
    </div>
  );
};

export default AgentMarketplace;
