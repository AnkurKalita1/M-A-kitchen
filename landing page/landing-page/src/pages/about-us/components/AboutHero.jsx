import aboutUsHeroBg from "../../../assets/aboutUsHero.png"
import spoon from "../../../assets/spoonImg.png"
import logo from "../../../assets/logo.png"
const AboutHero = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden mt-16">
      <div 
        className="relative w-full h-[40vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${aboutUsHeroBg})`,
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-8 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
            About Us
          </h1>
        </div>

        <div className="absolute right-0 top-0 z-20">
          <img src={spoon} alt="spoon" className="lg:w-55 lg:h-30 md:w-32 md:h-32 block m-0 p-0" />
          <img src={logo} alt="logo" className="lg:w-55 lg:h-40 md:w-32 md:h-32 block m-0 p-0" />
        </div>
      </div>

      <div className="w-full py-12 md:py-16 bg-[#1e1f20]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 lg:text-xl">
                M&AKitchen™ is the registered trademark of PBKITCHENM&A (OPC) PRIVATE LIMITED – a one of its kind revolutionary concept that creates, enables & sustains a virtual "investment banking marketplace" for Buyers, Sellers and Advisors.
                Our key differentiators include Agentic AI driven marketplace application, live auction investment events on the platform (AaS), empowered within a Blockchain, RPA and Quantum environment.
                We understand that the main functions of a kitchen are to store, prepare and cook food (while completing related tasks such as dishwashing). The room or area may also be used for dining (or small meals like breakfast), entertainment and laundry.
                Similarly, in the much sought after business of investment banking, our M&AKitchen™ represents a new age tech enabled SaaS platform for storage of buy & sell side data, preparation towards investment decision making, e-pitches, exchanges, segmentation/grouping industry wise, facilitating interaction, blending buyers & sellers over a unique, creative, real-time auction process enabled through live investment events (to be held bi-monthly for subscribed users on the platform application – Auction As a Service Marketplace).
                The given platform is driven by game theory, permutation-combination, one-to-one, one-to-many, many-to-one, many-to-many mathematical relationships, supported by AI, RPA, Blockchain, IaaS, PaaS alongside VAO (Value Added Offerings).
                It delivers value beyond expectations for subscribers and is bound to transform the Investment Banking Industry worldwide. Although few may compare it with Tinder or LinkedIn for M&A, the application's advantages such as live auction process propel beyond any of the legacy platforms.
                Apart from the core offering portfolio, VAO covers associated value adds such as investment templates, sectoral investment research, due diligence auditor booking and so on.
                M&AKitchen™ serves the purpose of a subscription-based live investment marketplace – one of its kind globally – that eases decision making (convenience), cuts down unwanted costs in the investment process (RPA enabled), ensures rapid organic growth of participants, eliminates deal brokers/middlemen, can be used 24x7, is virtual, secured via Blockchain and augmented through web3.
                The application welcomes all to the new frontier of M&A and the future of Investment Banking.
                The Kitchen concept thereby promotes "State-of-the-Art Investment Banking On Demand". Investor/Buyer subscription categories include all – Strategic, financial, Institutional – segmented via buyer grouping (Investor category, type – small, mid cap, large, industry sector, sub-segment, operating geographical location, AUM, historical investor data, etc.) and similarly for Sellers/Investment targets.
                M&AKitchen™ offers 4 types of subscriptions – Platinum, Gold, Silver and Regular (in perpetuity, 3 months, 6 months, annual).
                Our Global headquarters is at NY with offices in Virginia, Argentina, London, Zurich, Sydney, Singapore, India, Dubai, Qatar, etc.
                With 500+ customers, 100+ resources, we strive to soar like an Eagle in the Global Investment marketplace (hence the logo).
                We attempt to offer value beyond expectations with a future-oriented tech business model augmented by highly qualified Investors and global investment professionals of reckoning.
              </p>
           
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
