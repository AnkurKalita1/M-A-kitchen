import { useEffect, useRef, useState } from 'react';
import Platinum from '../../../assets/platinum.png'
import Silver from '../../../assets/silver.png'
import Gold from '../../../assets/gold.png'
import Regular from '../../../assets/regular.png'


const SubscribePlans = () => {
  const plans = [
    { name: 'REGULAR', image: Regular },
    { name: 'SILVER', image: Silver },
    { name: 'GOLD', image: Gold },
    { name: 'PLATINUM', image: Platinum }
  ];

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
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
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24 bg-[#1e1f20]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className={`text-4xl md:text-5xl lg:text-6xl text-stone-200 text-start mb-12 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-5'
          }`}
          style={{
            transitionProperty: 'opacity, transform',
            transitionDuration: '600ms',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            willChange: 'transform, opacity',
          }}
        >
          SUBSCRIBE
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`subscribe-plan-card relative w-full md:h-[64vh] rounded-2xl overflow-hidden ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ 
                backgroundImage: `url(${plan.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                transitionProperty: 'opacity, transform',
                transitionDuration: '600ms',
                transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                willChange: 'transform, opacity',
              }}
            >
              <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white text-center">
                  {plan.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscribePlans;
