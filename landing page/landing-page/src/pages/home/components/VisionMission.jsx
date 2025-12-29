import { useEffect, useRef } from 'react';
import visionMission from "../../../assets/visionMission.png"

const VisionMission = () => {
  const visionTextRef = useRef(null);
  const missionTextRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (visionTextRef.current) observer.observe(visionTextRef.current);
    if (missionTextRef.current) observer.observe(missionTextRef.current);

    return () => {
      if (visionTextRef.current) observer.unobserve(visionTextRef.current);
      if (missionTextRef.current) observer.unobserve(missionTextRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes visionSlideIn {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes missionSlideIn {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .vision-text-animate {
          opacity: 0;
          transform: translateX(40px);
          will-change: transform, opacity;
        }

        .vision-text-animate.animate-in {
          animation: visionSlideIn 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .mission-text-animate {
          opacity: 0;
          transform: translateX(-40px);
          will-change: transform, opacity;
        }

        .mission-text-animate.animate-in {
          animation: missionSlideIn 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
      <section 
        className="relative w-full h-screen overflow-hidden"
        style={{
          backgroundImage: `url(${visionMission})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="relative z-10 w-full h-full flex flex-col">
          {/* vission */}
          <div className="flex-1 relative flex items-start">
            {/* Vision Heading  */}
            <div className="absolute top-8 md:top-12 lg:top-12 left-12 md:left-12 lg:left-14">
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-white font-light px-16">
                VISION
              </h2>
            </div>

            {/* Vision Subtext  */}
            <div 
              ref={visionTextRef}
              className="vision-text-animate absolute top-10 md:top-12 lg:top-16 right-8 md:right-12 lg:right-16 max-w-lg md:max-w-xl lg:max-w-2xl"
            >
              <p className="text-white text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed text-start pt-15 font-bold">
               " To transform Global Investment Banking into data centric organizations focused on client journey while moving middle- and back-office functionality into fintech"
              </p>
            </div>
          </div>

          {/*  Mission */}
          <div className="flex-1 relative flex items-end">
            {/* Mission Subtext  */}
            <div 
              ref={missionTextRef}
              className="mission-text-animate absolute bottom-8 md:bottom-12 lg:bottom-16 left-8 md:left-12 lg:left-16 max-w-lg md:max-w-4xl lg:max-w-6xl text-right"
            >
              <p className="text-white text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed font-bold">
               " Devoted to enabling the most comprehensive web & mobile based Investment Banking Platform for Investors & Sellers with live auction feature that revolutionizes the traditional approach and creates a convenience-oriented Industry segment - "Virtual Investment Banking" within financial services by 2027"
              </p>
            </div>

            {/* Mission Heading */}
            <div className="absolute top-8 md:top-12 lg:top-16 right-8 md:right-12 lg:right-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-white font-light">
                MISSION
              </h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VisionMission;

