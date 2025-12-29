import boardBg from "../../../assets/boardBg.png";
import pinakId from "../../../assets/pinak-id.png";
import pinakCard from "../../../assets/pinak-card.png";

const Board = () => {
  const member = {
    name: "His Highness Sheikh Hamdan bin Mohammed bin Rashid Al Maktoum",
    title: "HONOURARY CHAIRMAN",
    description: "Crown Prince of Dubai, Deputy Prime Minister and Minister of Defense of the UAE, and Chairman of The Executive Council of Dubai",
    identityImage: pinakId,
    cardImage: pinakCard 
  };

  return (
    <section 
      className="relative w-full min-h-screen py-16 md:py-24"
      style={{
        backgroundImage: `url(${boardBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full md:w-[55%] flex flex-col space-y-4 md:space-y-6">
            <p className="text-white text-lg md:text-xl lg:text-2xl font-serif">
              {member.name}
            </p>

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              {member.title}
            </h3>

            <div className="flex">
              <div className="w-48 h-64 md:w-56 md:h-72 bg-gray-700 border-2 border-gray-600 rounded-l-lg flex items-center justify-center">
                {member.identityImage ? (
                  <img src={member.identityImage} alt="Identity" className="w-full h-full object-cover rounded-l-lg" />
                ) : (
                  <span className="text-gray-400 text-xs text-center">IDENTITY<br />IMAGE<br />PLACEHOLDER</span>
                )}
              </div>
              
              <div className="w-48 h-64 md:w-56 md:h-72 bg-gray-800 border-2 border-gray-600 border-l-0 rounded-r-lg flex items-center justify-center opacity-90">
                {member.cardImage ? (
                  <img src={member.cardImage} alt="Card" className="w-full h-full object-cover rounded-r-lg" />
                ) : (
                  <span className="text-gray-400 text-xs text-center">CARD<br />IMAGE<br />PLACEHOLDER</span>
                )}
              </div>
            </div>
          </div>

          <div className="w-full md:flex-1 pl-0 md:pl-8 lg:pl-12 mt-8 md:mt-0">
            <p className="text-white text-sm md:text-base lg:text-lg leading-relaxed">
              {member.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Board;

