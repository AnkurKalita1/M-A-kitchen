import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import regularImg from '../../assets/regular.png';
import silverImg from '../../assets/silver.png';
import spoon from '../../assets/spoonImg.png';
import logo from '../../assets/logo.png';

const MarketplaceLogin = () => {
  const [marketplaceId, setMarketplaceId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!marketplaceId || !password) {
      alert('Please enter both Marketplace ID and Password');
      return;
    }

    // Check the pattern: BUY-XXX, SEL-XXX, or AGT-XXX
    const buyPattern = /^BUY-\d{3}$/i;
    const sellPattern = /^SEL-\d{3}$/i;
    const agentPattern = /^AGT-\d{3}$/i;

    if (buyPattern.test(marketplaceId)) {
      navigate('/marketplace/buyer');
    } else if (sellPattern.test(marketplaceId)) {
      navigate('/marketplace/seller');
    } else if (agentPattern.test(marketplaceId)) {
      navigate('/marketplace/agent');
    } else {
      alert('Invalid Marketplace ID format. Please use BUY-XXX, SEL-XXX, or AGT-XXX format.');
    }
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex mt-14">
      {/* Left Column - 40% width */}
      <div 
        className="w-[45%] relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${regularImg})`,
        }}
      >
        
        {/* Spoon and Logo */}
        <div className="absolute left-0 top-2 z-20">
          <img src={spoon} alt="spoon" className="lg:w-60 lg:h-40 md:w-32 md:h-32 block m-0 p-0" />
          <img src={logo} alt="logo" className="lg:w-60 lg:h-50 md:w-32 md:h-32 block m-0 p-0" />
        </div>

        {/* Explore Button */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-12 py-4 rounded-lg transition-colors text-lg">
            EXPLORE
          </button>
        </div>
      </div>

      {/* Right Column - 60% width */}
      <div 
        className="w-[55%] relative bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: `url(${silverImg})`,
        }}
      >
        
        {/* Login Form */}
        <div className="relative z-10 w-full max-w-md px-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
             
              <input
                type="text"
                id="marketplaceId"
                value={marketplaceId}
                onChange={(e) => setMarketplaceId(e.target.value)}
                className="w-full bg-green-100 bg-opacity-90 text-gray-900 px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                placeholder=" MARKETPLACE ID :"
              />
            </div>

            <div className="space-y-2">
            
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-green-100 bg-opacity-90 px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                placeholder="Password :"
              />
            </div>

            <div className="flex justify-center items-center pt-4 gap-4">
              <a href="#" className="text-white text-xl hover:underline">
                Forgot Password
              </a>
              <span className="text-4xl">🔪</span>

              <a href="#" className="text-white text-xl hover:underline flex items-center gap-1">
                Subscribe
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-base mt-6"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* MARKETPLACE Heading - Spanning both columns */}
      <div className="absolute top-12 left-0 right-0 z-30 pointer-events-none">
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif text-white font-light text-center">
          MARKETPLACE
        </h1>
      </div>
    </section>
  );
};

export default MarketplaceLogin;

