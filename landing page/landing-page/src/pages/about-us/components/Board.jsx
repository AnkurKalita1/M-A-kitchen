import boardBg from "../../../assets/boardBg.png";

import rashidCard from "../../../assets/board/rashid-card.png";
import rashidId from "../../../assets/board/rashid-id.png";


const Board = () => {
  const member = {
    name: "His Highness Sheikh Hamdan bin Mohammed bin Rashid Al Maktoum",
    title: "HONOURARY CHAIRMAN",
    description: "Crown Prince of Dubai, Deputy Prime Minister and Minister of Defense of the UAE, and Chairman of The Executive Council of Dubai",
   
    identityImage: rashidId,
    cardImage: rashidCard 
  };

  return (
    <section 
      className="relative w-full min-h-screen py-16 md:py-24 "
      style={{
        backgroundImage: `url(${boardBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-32 ml-16">
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full md:w-[55%] flex flex-col space-y-4 md:space-y-6">
            <p className="text-white text-lg md:text-xl lg:text-2xl font-serif">
              {member.name}
            </p>

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mt-4">
              {member.title}
            </h3>

            <div className="flex ">
              <div className=" md:w-56 md:h-72 lg:h-92 lg:w-[280px]  rounded-2xl flex items-center justify-center opacity-70">
                {member.identityImage ? (
                  <img src={member.identityImage} alt="Identity" className="w-full h-full  rounded-2xl" />
                ) : (
                  <span className="text-gray-400 text-xs text-center">IDENTITY<br />IMAGE<br />PLACEHOLDER</span>
                )}
              </div>
              
              <div className="lg:h-92 lg:w-[280px] md:w-56 md:h-72    rounded-2xl flex items-center justify-center opacity-70 ">
                {member.cardImage ? (
                  <img src={member.cardImage} alt="Card" className="w-full h-full  rounded-2xl" />
                ) : (
                  <span className="text-gray-400 text-xs text-center">CARD<br />IMAGE<br />PLACEHOLDER</span>
                )}
              </div>

           
           
            </div>

            <div className="w-[400px] md:flex-1 pl-0  mt-8 md:mt-0">
            <p className="text-white text-sm md:text-base lg:text-lg leading-relaxed">
            {member.description}
            </p>
          </div>
          </div>

          <div className="w-full md:flex-1 pl-0 md:pl-8 lg:pl-32 ml-18  md:mt-0 lg:mt-[-60px]">
            <p className="text-white  leading-relaxed ml-32 lg:text-8xl ">
                 BOARD
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Board;

