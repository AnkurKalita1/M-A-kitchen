import worldMap from '../../../assets/worldMap.png';
import buildingBg from '../../../assets/buildingBg.png';
import locationMark from '../../../assets/locationMark.png';
import spoon from '../../../assets/spoonImg.png';
import logo from '../../../assets/logo.png';

const ContactUsHero = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden mt-16">
      <div className="absolute top-30 left-40 right-0 z-10 w-full min-h-screen">
        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-black font-serif">
          CONTACT US
        </h1>
      </div>
      <div className="relative w-full min-h-screen">
        <div 
          className="absolute top-0 left-0 right-0 h-1/2 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${buildingBg})`,
            zIndex: 1,
          }}
        ></div>

        <div 
          className="absolute top-30 bottom-0 left-0 right-0 bg-contain bg-center bg-no-repeat opacity-80"
          style={{
            backgroundImage: `url(${worldMap})`,
            zIndex: 2,
          }}
        ></div>

        <div className="absolute right-0 top-0 z-20">
          <img src={spoon} alt="spoon" className="lg:w-55 lg:h-30 md:w-32 md:h-32 block m-0 p-0" />
          <img src={logo} alt="logo" className="lg:w-55 lg:h-40 md:w-32 md:h-32 block m-0 p-0" />
        </div>
      </div>
    </section>
  );
};

export default ContactUsHero;
