import sellersHeroBg from "../../../assets/sellersHeroBg.png";
import spoon from "../../../assets/spoonImg.png";
import logo from "../../../assets/logo.png";

function SellersHero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden isolate mt-0 pt-0">
      <div 
        className="relative w-full min-h-[90vh] mt-0 pt-0"
        style={{
          backgroundImage: `url(${sellersHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute right-0 top-0 z-10">
          <img src={spoon} alt="spoon" className="lg:w-55 lg:h-30 md:w-32 md:h-32 block m-0 p-0" />
          <img src={logo} alt="logo" className="lg:w-55 lg:h-50 md:w-32 md:h-32 block m-0 p-0" />
        </div>

        <div className="absolute top-30 left-30 z-10 px-4 sm:px-6 lg:px-8 text-start font-serif">
          <h1 className="text-4xl md:text-6xl lg:text-6xl text-black font-serif">
            SELLERS
          </h1>
        </div>

        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-full max-w-md pl-4 sm:pl-6 lg:pl-8 pr-4">
          <form className="space-y-6">
            <div className="flex items-center justify-start gap-4">
              <label htmlFor="marketplaceId" className="text-white text-base md:text-lg font-bold whitespace-nowrap bg-red-600 px-4 py-3 rounded-3xl border-4 border-yellow-600 font-serif opacity-70">
                MARKETPLACE ID
              </label>
              <input
                type="text"
                id="marketplaceId"
                className="flex-1 bg-red-600 text-white placeholder-white placeholder-opacity-70 px-12 py-3 border-none focus:outline-none focus:ring-0 opacity-70"
                placeholder=""
              />
            </div>

            <div className="flex items-center justify-start gap-4">
              <label htmlFor="password" className="text-white text-base md:text-lg font-bold whitespace-nowrap bg-red-600 px-4 py-3 rounded-3xl border-4 border-yellow-600 font-serif opacity-70">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="flex-1 bg-red-600 text-white placeholder-white placeholder-opacity-70 px-12 py-3 border-none focus:outline-none focus:ring-0 opacity-70"
                placeholder=""
              />
            </div>

            <div className="flex items-center justify-start pt-4 ml-8">
              <div className="flex items-center gap-4 ">
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

export default SellersHero;
