import { useState } from 'react';
import TopNavbar from '../../../components/marketplace/TopNavbar';
import BottomNavbar from '../../../components/marketplace/BottomNavbar';

const BuyerMarketplace = () => {
  const [sortBy, setSortBy] = useState('Best Match');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Dummy data for companies
  const companies = [
    {
      id: 1,
      name: 'CloudSecure Inc',
      industry: 'Cybersecurity',
      location: 'Austin, TX',
      match: 92,
      dealRange: '$68M - $78M',
      revenue: '$18M ARR',
      growth: '+95% YoY',
      ebitda: '35%',
      whyMatch: [
        'Exceptional growth metrics in high-demand sector.',
        'Strategic fit with buyer\'s existing portfolio.'
      ],
      tags: ['Cybersecurity', 'Enterprise', 'Cloud'],
      status: 'New'
    },
    {
      id: 2,
      name: 'FinOps Platform',
      industry: 'FinTech',
      location: 'New York, NY',
      match: 87,
      dealRange: '$55M - $65M',
      revenue: '$14M ARR',
      growth: '+68% YoY',
      ebitda: '30%',
      whyMatch: [
        'Buyer actively seeking FinTech investments',
        'Proven product-market fit with Fortune 500 clients'
      ],
      tags: ['FinTech', 'B2B', 'Automation'],
      status: 'Ready'
    },
    {
      id: 3,
      name: 'DataStream AI',
      industry: 'Data Analytics',
      location: 'Seattle, WA',
      match: 85,
      dealRange: '$45M - $55M',
      revenue: '$12M ARR',
      growth: '+75% YoY',
      ebitda: '32%',
      whyMatch: [
        'Strong alignment with buyer\'s enterprise software focus',
        'Revenue and growth metrics exceed buyer requirements'
      ],
      tags: ['Data Analytics', 'AI', 'Enterprise'],
      status: 'Ready'
    },
    {
      id: 4,
      name: 'LogiChain Pro',
      industry: 'Supply Chain',
      location: 'Chicago, IL',
      match: 82,
      dealRange: '$38M - $48M',
      revenue: '$10M ARR',
      growth: '+60% YoY',
      ebitda: '28%',
      whyMatch: [
        'Buyer has invested in 3 similar supply chain platforms',
        'Valuation range matches buyer criteria perfectly'
      ],
      tags: ['Supply Chain', 'Logistics', 'B2B'],
      status: 'Ready'
    },{
        id: 5,
        name: 'HealthSync Systems',
        industry: 'HealthTech',
        location: 'Boston, MA',
        match: 89,
        dealRange: '$60M - $70M',
        revenue: '$16M ARR',
        growth: '+72% YoY',
        ebitda: '33%',
        whyMatch: [
          'Strong recurring revenue with hospital-grade enterprise clients',
          'Buyer has prior exposure to regulated SaaS businesses'
        ],
        tags: ['HealthTech', 'SaaS', 'Enterprise'],
        status: 'New'
      },
      {
        id: 6,
        name: 'RetailIQ Labs',
        industry: 'Retail Analytics',
        location: 'San Francisco, CA',
        match: 84,
        dealRange: '$42M - $52M',
        revenue: '$11M ARR',
        growth: '+65% YoY',
        ebitda: '29%',
        whyMatch: [
          'AI-driven demand forecasting aligns with buyer’s data strategy',
          'Mid-market dominance with scalable enterprise expansion'
        ],
        tags: ['Retail', 'AI', 'Analytics'],
        status: 'Ready'
      },
      {
        id: 7,
        name: 'GreenGrid Energy',
        industry: 'CleanTech',
        location: 'Denver, CO',
        match: 80,
        dealRange: '$35M - $45M',
        revenue: '$9M ARR',
        growth: '+58% YoY',
        ebitda: '26%',
        whyMatch: [
          'Buyer targeting sustainability-focused infrastructure platforms',
          'Strong government and enterprise contracts'
        ],
        tags: ['CleanTech', 'Energy', 'Infrastructure'],
        status: 'New'
      },
      {
        id: 8,
        name: 'WorkFlowX',
        industry: 'HR Tech',
        location: 'Remote (US)',
        match: 88,
        dealRange: '$50M - $60M',
        revenue: '$13M ARR',
        growth: '+70% YoY',
        ebitda: '31%',
        whyMatch: [
          'High retention SaaS with low customer acquisition cost',
          'Complements buyer’s existing productivity software stack'
        ],
        tags: ['HR Tech', 'SaaS', 'B2B'],
        status: 'Ready'
      }
      
  ];

  return (
    <div className="min-h-screen bg-[#1e1f20] text-white pb-20 sm:pb-24 md:pb-20 px-4 sm:px-6 md:px-10 lg:px-16">
      <TopNavbar />

      {/* Dashboard Summary */}
      <div className="bg-black px-4 sm:px-8 md:px-12 lg:px-16 py-6 md:py-8 m-4 sm:m-6 md:m-8 rounded-xl">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-start">Welcome back, TechVentures Capital</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12 md:mt-16">
          <div>
            <p className="text-2xl sm:text-3xl mb-1 md:mb-2">8</p>
            <p className="text-gray-300 text-xs sm:text-sm">New Matches</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl mb-1 md:mb-2">12</p>
            <p className="text-gray-300 text-xs sm:text-sm">Companies Favorited</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl mb-1 md:mb-2">5</p>
            <p className="text-gray-300 text-xs sm:text-sm">New Messages</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-screen px-2 sm:px-4 md:px-6 lg:px-10 gap-4 md:gap-6 lg:gap-10">
        {/* Filter Toggle Button for Mobile/Tablet */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center justify-between w-full"
        >
          <span className="font-semibold">Filters</span>
          <svg className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Left Sidebar - Filters */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 border-r-0 lg:border-r border-gray-700 p-4 md:p-6 border-1 rounded-lg border-gray-700 bg-gray-900 lg:bg-transparent max-h-[80vh] lg:max-h-none overflow-y-auto lg:overflow-visible`}>
          <h3 className="text-lg font-semibold mb-4">Filters</h3>
          
          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-3 text-gray-400">Sector</h4>
            <div className="space-y-2">
              {['B2B SaaS', 'FinTech', 'Healthcare Tech', 'Cybersecurity', 'Data Analytics', 'Supply Chain'].map((sector) => (
                <label key={sector} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-300">{sector}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-3 text-gray-400">Location</h4>
            <div className="space-y-2">
              {['San Francisco, CA', 'New York, NY', 'Boston, MA', 'Austin, TX', 'Seattle, WA', 'Chicago, IL'].map((location) => (
                <label key={location} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-300">{location}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-3 text-gray-400">Deal Size (USD)</h4>
            <div className="space-y-2">
              <input type="text" placeholder="$0M" className="w-full bg-gray-700 text-white px-3 py-2 rounded text-sm" />
              <input type="text" placeholder="$100M" className="w-full bg-gray-700 text-white px-3 py-2 rounded text-sm" />
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-3 text-gray-400">Deal Type</h4>
            <div className="space-y-2">
              {['Minority Stake', 'Majority Stake', 'Full Acquisition'].map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-300">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-3 text-gray-400">Readiness</h4>
            <div className="space-y-2">
              {['All', 'Ready', 'Need Info'].map((readiness) => (
                <label key={readiness} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" defaultChecked={readiness === 'All'} />
                  <span className="text-sm text-gray-300">{readiness}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm">
            Reset Filters
          </button>
        </div>

        {/* Right Main Content */}
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 md:mb-6">
            <div className="w-full sm:w-auto">
              <h2 className="text-xl sm:text-2xl mb-1">Personalized Matches For You</h2>
              <p className="text-gray-400 text-xs sm:text-sm">{companies.length} companies match your criteria.</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-700 text-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm flex-1 sm:flex-none"
              >
                <option>Best Match</option>
                <option>Highest Valuation</option>
                <option>Highest Growth</option>
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

          {/* Company Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {companies.map((company) => (
              <div key={company.id} className="shadow-xl hover:shadow-2xl hover:border-gray-500 hover:border-2 transition-all duration-300 rounded-lg p-4 sm:p-6 border border-gray-700 relative">
                {/* Match Percentage */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-12 h-12 sm:w-14 sm:h-14 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs sm:text-sm font-bold">{company.match}%</span>
                </div>

                {/* Company Info */}
                <div className="mb-3 sm:mb-4 pr-16 sm:pr-20">
                  <h3 className="text-lg sm:text-xl font-bold mb-1">{company.name}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-2 sm:gap-4 sm:gap-6">
                    <p className="text-gray-400 text-xs sm:text-sm">
                      {company.industry} | {company.location}
                    </p>
                    <div className="flex gap-2 items-center">
                      {company.status === 'New' && (
                        <span className="text-blue-600 border border-blue-600 px-2 py-1 rounded text-xs">New</span>
                      )}
                      {company.status === 'Ready' && (
                        <span className="text-green-600 border border-green-600 px-2 py-1 rounded text-xs">Ready</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Deal Range */}
                <div className="my-4 sm:my-6">
                  <p className="text-base sm:text-lg font-semibold">{company.dealRange}</p>
                </div>

                {/* Financial Metrics */}
                <div className="my-4 sm:my-6 md:my-8 gap-4 sm:gap-8 md:gap-12 flex flex-col sm:flex-row items-start sm:items-center justify-start">
                  <div>
                    <p className="text-xs sm:text-sm">Revenue</p>
                    <p className="text-sm sm:text-base">{company.revenue}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-green-400">Growth</p>
                    <p className="text-sm sm:text-base text-green-400">{company.growth}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm">EBITDA</p>
                    <p className="text-sm sm:text-base">{company.ebitda}</p>
                  </div>
                </div>

                {/* Why Match */}
                <div className="my-4 sm:my-6 md:my-8">
                  <p className="text-xs sm:text-sm font-semibold mb-2">Why Match?</p>
                  <ul className="text-xs sm:text-sm text-gray-300 space-y-1">
                    {company.whyMatch.map((reason, idx) => (
                      <li key={idx}>• {reason}</li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 my-4 sm:my-6">
                  {company.tags.map((tag, idx) => (
                    <span key={idx} className="bg-gray-700 text-gray-300 px-2 sm:px-3 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Action Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 pt-4 border-t border-gray-700">
                  <button className="bg-black text-white px-6 sm:px-8 md:px-12 py-2 sm:py-3 rounded text-xs sm:text-sm hover:bg-gray-900 w-full sm:w-auto">
                    View Full Profile
                  </button>
                  <div className="flex gap-2 justify-center sm:justify-end">
                    <button className="p-2 hover:bg-gray-700 rounded">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-700 rounded">
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

export default BuyerMarketplace;

