import platinumBg from '../../assets/platinumBg-1.png';
import platinumSide from '../../assets/platinum-1-Side.png';

const PlatinumUser1 = ({ userType = "User" }) => {
  return (
    <section className="w-full  md:py-24 bg-[#1e1f20] h-screen isolate my-10 "
    style={{
      backgroundImage: `url(${platinumBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex h-[90vh] ">
          {/* Left Column - Key Benefits */}
            <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-center font-serif ">
              <h3 className="text-xl md:text-2xl font-semibold text-yellow-600 mb-6 pl-18 ml-8">Highlights</h3>
              <ul className="space-y-3 text-white text-base md:text-lg lg:text-2xl font-semibold ">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2 bg-gray-500 rounded-full p-2 px-4">✓</span>
                  <span>Lifetime Perpetual Access</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2 bg-gray-500 rounded-full p-2 px-4">✓</span>
                  <span>Unlimited, Non-Restrictive Feature Access</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2 bg-gray-500 rounded-full p-2 px-4">✓</span>
                  <span>Zero-Cost Live Auction Participation</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2 bg-gray-500 rounded-full p-2 px-4">✓</span>
                  <span>Top Listings Across All Geographies & Segments</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2 bg-gray-500 rounded-full p-2 px-4">✓</span>
                  <span>Top Priority in “Auction as a Service”</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2 bg-gray-500 rounded-full p-2 px-4">✓</span>
                  <span>Full Marketplace Customization</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2 bg-gray-500 rounded-full p-2 px-4">✓</span>
                  <span>Dashboard Analytics + Geographic Insights</span>
                </li>
               
              </ul>          
          </div>
          {/* Right Column - Highlights with Image Background */}
          <div className="w-1/2 h-full font-serif relative">
            <div className="space-y-4 ">
            <h2 className="text-4xl md:text-5xl lg:text-6xl  text-black  ml-12">
              PLATINUM {userType.toUpperCase()}
            </h2>

            <div className="absolute bottom-0 right-0 w-[260px] lg:w-[380px] h-[260px] lg:h-[380px] rounded-full " 
            style={{
                backgroundImage: `url(${platinumSide})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
            >
                <p className="text-black text-center text-3xl font-bold mt-12 py-8 font-semibold">
                    elite, <br /> perpetual, <br /> all aceess  <br />membership
                </p>
            </div>
            
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatinumUser1;
