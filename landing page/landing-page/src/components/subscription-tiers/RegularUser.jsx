import { useEffect, useRef, useState } from 'react';
import regularPlanBg from '../../assets/regularBg.png';

const RegularUser = ({ userType = "User" }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [leftColumnVisible, setLeftColumnVisible] = useState(false);
  const [rightColumnVisible, setRightColumnVisible] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setLeftColumnVisible(true);
          setTimeout(() => {
            setRightColumnVisible(true);
          }, 800);
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

  const keyBenefits = [
    '• Access to 1-2 Industry Segments (varies by subscription term)',
    '• Explore marketplace listings, understand pricing benchmarks, and discover early opportunities',
    '• Basic entry into Live Auctions (0-2% discounts)',
    '• Low to Medium Listing Visibility—perfect for learning without pressure',
    '• No/Minimal VAO Discounts (0-2%)',
    '• Auto Platform Upgrade for 6M & 12M Plans'
  ];

  const highlights = [
    'Base user with exploratory access',
    'Minimal to low live auction benefit',
    'Low priority listing',
    'Negligible discount on value added offerings',
    'Industry sector constraints',
    'Agent/Advisor access limitation',
    'Auto-upgrade absent in Quarterly'
  ];

  return (
    <section 
      ref={sectionRef}
      className={`w-full md:py-24 bg-[#1e1f20] h-screen isolate transition-opacity duration-[300ms] ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ willChange: 'opacity' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[90vh]">
          <div className="w-1/2 pr-8 h-full font-serif">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-8">
              REGULAR {userType.toUpperCase()}
            </h2>
            
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl text-red-500 mb-4 font-sans py-8">Key Benefits</h3>
              <ul className="space-y-3 text-yellow-600 text-base md:text-lg lg:text-2xl font-sans font-semibold">
                {keyBenefits.map((benefit, index) => (
                  <li
                    key={index}
                    className={`transition-all duration-[400ms] ease-out ${
                      leftColumnVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-3'
                    }`}
                    style={{
                      transitionDelay: leftColumnVisible ? `${index * 80}ms` : '0ms',
                      willChange: 'transform, opacity',
                    }}
                  >
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div 
            className="w-1/2 relative min-h-[90%] isolate"
            style={{
              backgroundImage: `url(${regularPlanBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-center font-serif">
              <h3 className="text-xl md:text-2xl font-semibold text-yellow-600 mb-6 pl-18 ml-8">Highlights</h3>
              <ul className="space-y-3 text-white text-base md:text-lg lg:text-2xl font-semibold pl-12">
                {highlights.map((highlight, index) => (
                  <li 
                    key={index}
                    className={`flex items-center transition-all duration-[400ms] ease-out ${
                      rightColumnVisible 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 translate-x-5'
                    }`}
                    style={{
                      transitionDelay: rightColumnVisible ? `${index * 100}ms` : '0ms',
                      willChange: 'transform, opacity',
                    }}
                  >
                    <span className="text-green-500 mr-2 bg-gray-500 rounded-full p-2 px-4">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegularUser;
