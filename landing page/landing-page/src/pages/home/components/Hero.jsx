import logo from '../../../assets/logo.png'
import homeHeroBg from '../../../assets/homeHeroBg.png'
const Hero = () => {
  return (
    <section className="w-full h-[90vh] bg-[#1e1f20] bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url(${homeHeroBg})` }}>
        <div className="absolute left-5 bottom-0">
           <img src={logo} className='object-contain w-[32vw] h-[59vh] rounded-lg' alt="logo" />
        </div>
    </section>
  );
};

export default Hero;

