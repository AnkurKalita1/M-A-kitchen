import regularPlanBg from '../../assets/regularPlanBg.png';
import silverPlanBg from '../../assets/silverPlanBg.png';
import goldPlanBg from '../../assets/goldPlanBg.png';
import platinumPlanBg from '../../assets/platinumPlanBg.png';

const SubscriptionPlans = () => {
  const plans = [
    { name: 'REGULAR', image: regularPlanBg, duration: ['3 months', '6 months', 'annual']},
    { name: 'SILVER', image: silverPlanBg, duration: ['3 months', '6 months', 'annual']},
    { name: 'GOLD', image: goldPlanBg, duration: ['3 months', '6 months', 'annual']},
    { name: 'PLATINUM', image: platinumPlanBg, duration: ['lifetime (in-perpetuity)']}
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-[#1e1f20]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <div key={plan.name}>
              <h1 className="text-3xl md:text-3xl lg:text-4xl text-stone-200 text-start mb-12 flex justify-center items-center font-serif">
                {plan.name}
              </h1>

              <div 
                className="relative w-full md:h-[64vh] rounded-2xl overflow-hidden"
                style={{ 
                  backgroundImage: `url(${plan.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="m-10 flex items-center justify-center flex-col gap-4 font-bold text-2xl font-serif">
                  {plan.duration.map((duration) => (
                    <ul key={duration}>
                      <li>• {duration}</li>
                    </ul>
                  ))}
                </div>
              </div>
              <div className="item-center justify-center flex m-2 hover:scale-105 transition-all duration-300">
                <button className="bg-red-500 text-white px-4 py-2 rounded-xl">
                  SUBSCRIBE 
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;

