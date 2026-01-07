import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import buyerHeroTopBg from "../../../assets/buyerHeroTopBg.png";
import buyerHeroBottomBg from "../../../assets/buyerHeroBottomBg.png";
import spoon from "../../../assets/spoonImg.png";
import logo from "../../../assets/logo.png";

function BuyersHero() {
  const [marketplaceId, setMarketplaceId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if marketplaceId starts with BUY- and has format BUY-XXX
    if (marketplaceId.trim().toUpperCase().startsWith('BUY-') && password.trim() !== '') {
      navigate('/marketplace/buyer');
    } else {
      alert('Please enter a valid Marketplace ID (BUY-XXX) and password');
    }
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden isolate mt-4">
      <div 
        className="relative w-full h-[40vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${buyerHeroTopBg})`,
        }}
      >
        <div className="absolute right-0 top-0 z-10">
          <img src={spoon} alt="spoon" className="lg:w-55 lg:h-30 md:w-32 md:h-32 block m-0 p-0" />
          <img src={logo} alt="logo" className="lg:w-55 lg:h-40 md:w-32 md:h-32 block m-0 p-0" />
        </div>

        <div className="absolute bottom-10 left-0 right-0 z-10 pb-8 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-6xl text-white font-serif">
            BUYERS/INVESTORS
          </h1>
        </div>
      </div>

      <div 
        className="relative w-full min-h-[60vh] flex items-center justify-center py-16 md:py-24"
        style={{
          backgroundImage: `url(${buyerHeroBottomBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="relative z-10 w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
                placeholder="BUY-XXX"
              />
            </div>

            <div className="flex items-center justify-end gap-4">
              <label htmlFor="password" className="text-white text-base md:text-lg font-bold whitespace-nowrap bg-red-600 px-4 py-3 rounded-3xl border-4 border-yellow-600 font-serif opacity-70 ">
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

            <div className="flex items-center justify-center pt-4">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-3xl border-4 border-yellow-600 font-serif opacity-90 transition-colors duration-200"
              >
                LOGIN
              </button>
            </div>

            <div className="flex items-center justify-center pt-4">
              <div className="flex items-center justify-between gap-2">
                <a href="#" className="text-white text-sm md:text-base hover:underline">
                  Forgot Password
                </a>
                <img src={spoon} alt="spoon" className="w-6 h-6 md:w-8 md:h-8" />
                <a href="#" className="text-white text-sm md:text-base hover:underline">
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

export default BuyersHero;
