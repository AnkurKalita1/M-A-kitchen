import welcomeImg from '../../../assets/welcomeImg.png'

const WelcomeIntro = () => {
  return (
    <section className="w-full min-h-screen bg-[#1e1f20]">
      <div className="w-full min-h-screen flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col justify-start md:justify-center space-y-4 md:space-y-6 md:p-8 lg:px-16 pt-12 md:pt-8 font-serif">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white text-start px-7 mb-16">
            WELCOME TO M&A KITCHEN™
          </h2>
          <p className="text-gray-300 text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed text-end px-8 mt-16">
            ...an Agentic AI enabled "Virtual Investment Banking" marketplace application for Buyers, Sellers and Agents designed on the backdrop of a kitchen concept, catering to "Live Investment Events" and powered by Blockchain, RPA, <br /> Quantum.
          </p>
          <div className="flex justify-end md:justify-end px-12">
            <button className="w-fit bg-red-600 hover:bg-red-700 text-white font-semibold px-6 md:px-8 py-2 md:py-3 rounded-lg transition-colors text-sm md:text-base">
              Learn more
            </button>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 relative h-[80vh] sm:h-96 md:h-auto md:min-h-screen">
          <img src={welcomeImg} alt="welcome-intro" className="w-full h-[90%] relative bottom-0 object-cover" />
        </div>
      </div>
    </section>
  );
};

export default WelcomeIntro;

