import { useEffect, useRef, useState } from 'react';
import plateBg from "../../../assets/plateBg.png"

const VisionMissionCoreValues = () => {
  const sectionRef = useRef(null);
  const [visionVisible, setVisionVisible] = useState(false);
  const [missionVisible, setMissionVisible] = useState(false);
  const [valuesVisible, setValuesVisible] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisionVisible(true);
          setTimeout(() => {
            setMissionVisible(true);
          }, 120);
          setValuesVisible(true);
          observer.unobserve(entry.target);
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

  const valuesList = [
    'Value Beyond Expectations',
    'Integrity',
    'Courage',
    'Transparency',
    'Diversity',
    'Leadership'
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden "
      style={{
        backgroundImage: `url(${plateBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat'
      }}
    >

<div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 font-serif">
        <div className="space-y-12 md:space-y-16">
          <div
            className={`w-[50%] transition-all duration-[700ms] ${
              visionVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-10'
            }`}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              willChange: 'transform, opacity',
            }}
          >
            <p className="text-white text-base md:text-lg lg:text-xl mb-6 opacity-100">
             "To transform Global Investment Banking into data centric organizations focused on client journey while moving middle- and back-office functionality into fintech"
            </p>
            <h2 className="text-xl md:text-xl lg:text-3xl font-serif text-yellow-600 font-light opacity-100">
              VISION
            </h2>
          </div>

          <div className="w-[60%] flex justify-end mt-16" >
            <div
              className={`w-[90%] px-16 transition-all duration-[700ms]  ${
                missionVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-10'
              }`}
              style={{
                transitionDelay: '120ms',
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                willChange: 'transform, opacity',
              }}
            >
              <p className="text-white text-base md:text-lg lg:text-xl mb-6 opacity-100">
               "Devoted to enabling the most comprehensive web & mobile based Investment Banking Platform for Investors & Sellers with live auction feature that revolutionizes the traditional approach and creates a convenience-oriented Industry segment - "Virtual Investment Banking" within financial services by 2027"
              </p>
              <h2 className="text-xl md:text-xl lg:text-2xl font-serif text-yellow-600 font-light">
                MISSION
              </h2>
            </div>
          </div>

          <div className="w-full flex justify-end">
            <div className="w-[30%] text-start">
              <div className="space-y-2 md:space-y-2 mb-2">
                {valuesList.map((value, index) => (
                  <p 
                    key={index}
                    className={`text-white text-base md:text-lg lg:text-xl transition-all duration-[400ms] ${
                      valuesVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-3'
                    }`}
                    style={{
                      transitionDelay: valuesVisible ? `${index * 80}ms` : '0ms',
                      willChange: 'transform, opacity',
                    }}
                  >
                    {value}
                  </p>
                ))}
              </div>
              <h2 className="text-xl md:text-xl lg:text-2xl font-serif text-yellow-600 font-light">
                CORE VALUES
              </h2>
            </div>
          </div>
        
        </div>
      </div>
    </section>
  );
};

export default VisionMissionCoreValues;
