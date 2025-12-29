import calendarImg from "../../../assets/calenderImg.png"
import liveAuctionBg from "../../../assets/liveAuctionBg.png"


const LiveAuction = () => {
  return (
    <section className="relative w-full h-screen bg-[#1e1f20] overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${liveAuctionBg})` }}>
      {/* Background image placeholder */}
      

      <div className="relative z-10 w-full h-full flex">
        {/* Left side - Calendar (60% width, 70% height from top) */}
        <div className="w-[60%] h-[60%] relative">
          {/* Calendar image */}
          <img 
            src={calendarImg} 
            alt="Calendar" 
            className="w-full h-full object-cover"
          />
          
          <button className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg border-2 border-yellow-500 transition-colors shadow-lg">
            Click here..
          </button>
        </div>

        {/* Right side - LIVE AUCTION text (40% width, aligned right) */}
        <div className="w-[45%] flex items-center justify-end pr-3 text-center px-12">
            <h2 className="text-5xl md:text-5xl lg:text-6xl font-bold text-white leading-tight px-16">
              LIVE  <br />
              AUCTION
              EVENT
              CALENDAR
              2026
            </h2>
        </div>
      </div>
    </section>
  );
};

export default LiveAuction;
