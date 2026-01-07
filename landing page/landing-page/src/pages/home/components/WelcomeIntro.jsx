import { useEffect, useRef } from 'react';
import homeWlcmIntroVdo from '../../../assets/homeWlcmIntroVdo.mp4';

const WelcomeIntro = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch((error) => {
            console.log('Video autoplay prevented:', error);
          });
        } else if (videoRef.current) {
          videoRef.current.pause();
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full min-h-screen bg-[#1e1f20]">
      <div className="w-full min-h-screen flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col justify-start md:justify-center space-y-4 md:space-y-6 md:p-8 lg:px-16 pt-12 md:pt-8 font-serif z-10">
          <h2 className="text-3xl md:text-4xl lg:text-7xl  font-semibold text-white text-end px-7 mb-16">
            WELCOME TO <span className=' text-[#FF4040] '>M&A</span><span className='text-[#DA6304]'>kitchen</span>™
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
        
        <div className="w-full md:w-1/2 relative h-[80vh] sm:h-96 md:h-auto md:min-h-screen overflow-hidden">
          <video
            ref={videoRef}
            src={homeWlcmIntroVdo}
            className="w-full h-full object-cover absolute inset-0"
            loop
            muted
            playsInline
          />
        </div>
      </div>
    </section>
  );
};

export default WelcomeIntro;

