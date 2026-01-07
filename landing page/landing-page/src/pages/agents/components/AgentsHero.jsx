import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import agentsHeroBg from "../../../assets/agentHeroBg.png";
import spoon from "../../../assets/spoonImg.png";
import logo from "../../../assets/logo.png";

function AgentsHero() {
  const [marketplaceId, setMarketplaceId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if marketplaceId starts with AGT- and has format AGT-XXX
    if (marketplaceId.trim().toUpperCase().startsWith('AGT-') && password.trim() !== '') {
      navigate('/marketplace/agent');
    } else {
      alert('Please enter a valid Marketplace ID (AGT-XXX) and password');
    }
  };

  return (
    <section className="relative w-full h-[85vh] overflow-hidden isolate mt-4 pt-0">
      <div 
        className="relative w-full min-h-[90vh] mt-0 pt-0"
        style={{
          backgroundImage: `url(${agentsHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute left-0 top-0 z-10">
          <img src={spoon} alt="spoon" className="lg:w-55 lg:h-30 md:w-32 md:h-32 block m-0 p-0" />
          <img src={logo} alt="logo" className="lg:w-55 lg:h-50 md:w-32 md:h-32 block m-0 p-0" />
        </div>

        <div className="absolute top-10 right-40 z-10 px-4 sm:px-6 lg:px-8 text-end font-serif">
          <h1 className="text-4xl md:text-6xl lg:text-6xl text-black font-serif">
            AGENTS
          </h1>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-full max-w-md pr-4 sm:pr-6 lg:pr-8 pl-4">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex items-center justify-end gap-4">
              <label htmlFor="marketplaceId" className="text-white text-base md:text-lg font-bold whitespace-nowrap bg-red-600 px-4 py-3 rounded-3xl border-4 border-yellow-600 font-serif opacity-70">
                MARKETPLACE ID
              </label>
              <input
                type="text"
                id="marketplaceId"
                value={marketplaceId}
                onChange={(e) => setMarketplaceId(e.target.value)}
                className="flex-1 bg-red-600 text-white placeholder-white placeholder-opacity-70 px-12 py-3 border-none focus:outline-none focus:ring-0 opacity-70"
                placeholder="AGT-XXX"
              />
            </div>

            <div className="flex items-center justify-end gap-4">
              <label htmlFor="password" className="text-white text-base md:text-lg font-bold whitespace-nowrap bg-red-600 px-4 py-3 rounded-3xl border-4 border-yellow-600 font-serif opacity-70">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-red-600 text-white placeholder-white placeholder-opacity-70 px-12 py-3 border-none focus:outline-none focus:ring-0 opacity-70"
                placeholder=""
              />
            </div>

            <div className="flex items-center justify-end pt-4 mr-8">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-3xl border-4 border-yellow-600 font-serif opacity-90 transition-colors duration-200"
              >
                LOGIN
              </button>
            </div>

            <div className="flex items-center justify-end pt-4 mr-8">
              <div className="flex items-center gap-4">
                <a href="#" className="text-white text-lg md:text-base lg:text-xl hover:underline font-serif">
                  Forgot Password
                </a>
                <img src={spoon} alt="spoon" className="w-6 h-6 md:w-8 md:h-8" />
                <a href="#" className="text-white text-md md:text-base lg:text-xl hover:underline font-serif">
                  Subscribe
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AgentsHero;
