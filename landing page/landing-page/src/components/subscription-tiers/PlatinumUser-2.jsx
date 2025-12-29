import platinumBg from '../../assets/platinumBg-2.png';
import platinumSide from '../../assets/platinum-1-Side.png';


const PlatinumUser2 = ({ userType = "User" }) => {
  return (
    <section className="w-full  md:py-24 bg-[#1e1f20] h-full isolate my-10 "
    style={{
      backgroundImage: `url(${platinumBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}
    >
      <div className="container px-4 h-full ">
        <div className="h-screen">
          {/* Left Column - Key Benefits */}
          <h2 className='text-white font-serif text-4xl md:text-5xl lg:text-6xl  ml-12 opacity-80 text-center'>
            PLATINUM PLAN  <span className='text-red-600'> (LIFETIME BENEFITS)  </span>
          </h2>
            <div className=" z-10 md:p-8 h-full  font-sans ">
              <ul className="space-y-3 text-yellow-500 text-base md:text-lg lg:text-2xl font-semibold  w-1/2 py-8">
                <li className="flex items-center">
                  <span>🏆 Unlimited, All-Industry Access — No Restrictions, Ever
                  </span>
                </li>
                <li className="flex items-center">
                  <span>🏆 All Buyers, Sellers & Agents Included Across Geographies
                  </span>
                </li>
                <li className="flex items-center">
                  <span>🏆 Free Access to All Live Auctions Across All Segments — No Ticketing Required
                  </span>
                </li>
                <li className="flex items-center">
                  <span>🏆 Complimentary Access to All Value-Added Offerings
                  </span>
                </li>
                <li className="flex items-center">
                  <span>🏆 Free Investment Research + All Future App Upgrades
                  </span>
                </li>
                <li className="flex items-center">
                  <span>🏆 Top Listing Priority Across All Geographies & Segments
                  n</span>
                </li>
                <li className="flex items-center">
                  <span>🏆 #1 Priority in Auction-as-a-Service
                  </span>
                </li>
                <li className="flex items-center">
                  <span>🏆 Full Marketplace Customization, Including Workflows, Dashboards & Automation

                  </span>
                </li>
                <li className="flex items-center">
                  <span>🏆 Advanced Analytics + Geographic Reports & Infographics
                  </span>
                </li>
               
              </ul>          
          </div>
        
          
        </div>
      </div>
    </section>
  );
};

export default PlatinumUser2;
