import { useEffect, useRef, useState } from 'react';
import goldBg from '../../assets/goldBg.png';

const GoldUser = ({ userType = "User" }) => {
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
          setRightColumnVisible(true);
          setTimeout(() => {
            setLeftColumnVisible(true);
          }, 960);
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
    '• Access to 6-10 Industry Segments',
    '• Premium Live Auction Discounts (15-22%) for 4-8 events',
    '• High Priority Listing Placement—top-tier visibility across the marketplace',
    '• Priority Live Auction Seating (Balcony Seats) + queue fast-track',
    '• 7-15% VAO Discounts',
    '• Annual Gold: Up to 45% Subscription Renewal Discount',
    '• Dashboard Analytics + Custom Marketplace Configurations (12M plan)',
    '• Automatic upgrades and enterprise-level support'
  ];

  const highlights = [
    'Large Multi-Segment Access',
    'High Live Auction Discounts',
    'High Priority Listings',
    'High Priority in Event Bookings',
    'Meaningful VAO Discounts',
    'Strong Subscription Renewal Benefits',
    'Dashboard Analytics Included',
    'Customization Options (Annual Gold)',
    'Auto Upgrade'
  ];

  return (
    <section 
      ref={sectionRef}
      className={`w-full md:py-24 bg-[#1e1f20] h-screen isolate my-10 transition-opacity duration-[300ms] ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ willChange: 'opacity' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[90vh]">
          <div 
            className="w-1/2 relative min-h-[90%] isolate"
            style={{
              backgroundImage: `url(${goldBg})`,
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
                      leftColumnVisible 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 translate-x-5'
                    }`}
                    style={{
                      transitionDelay: leftColumnVisible ? `${index * 100}ms` : '0ms',
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

          <div className="w-1/2 pl-10 h-full font-serif">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-white pl-18 ml-8">
                GOLD {userType.toUpperCase()}
              </h2>
              <h3 className="text-xl md:text-2xl text-red-500 mb-4 font-sans py-8">Key Benefits</h3>
              <ul className="space-y-3 text-yellow-600 text-base md:text-lg lg:text-2xl font-sans font-semibold">
                {keyBenefits.map((benefit, index) => (
                  <li
                    key={index}
                    className={`transition-all duration-[400ms] ease-out ${
                      rightColumnVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-3'
                    }`}
                    style={{
                      transitionDelay: rightColumnVisible ? `${index * 80}ms` : '0ms',
                      willChange: 'transform, opacity',
                    }}
                  >
                    {benefit}
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

export default GoldUser;
