import { useState } from 'react';
import vaoHero from "../../../assets/vaoHero.png";
import spoon from "../../../assets/spoonImg.png";
import logo from "../../../assets/logo.png";

function VaoHero() {
  const categories = [
    {
      name: "NDA TEMPLATES",
      price: "$35*",
      special: true,
      subItems: ["BUYER NDA", "SELLER NDA", "ADVISOR NDA"]
    },
    {
      name: "LOI TEMPLATE",
      price: "$100*",
      special: false
    },
    {
      name: "DD TEMPLATES",
      price: "$200*",
      special: false
    },
    {
      name: "SPA + SHA TEMPLATES",
      price: "$500*",
      special: false
    },
    {
      name: "PMI CHECKLIST",
      price: "$700*",
      special: false
    },
    {
      name: "INVESTMENT RESEARCH",
      price: "$1000*",
      special: false
    }
  ];

  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="relative w-full min-h-screen overflow-hidden isolate">
      <div 
        className="relative w-full h-[40vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${vaoHero})`,
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white">
          </h1>
        </div>

        <div className="absolute right-0 top-0 z-20">
          <img src={spoon} alt="spoon" className="lg:w-55 lg:h-30 md:w-32 md:h-32 block m-0 p-0" />
          <img src={logo} alt="logo" className="lg:w-55 lg:h-40 md:w-32 md:h-32 block m-0 p-0" />
        </div>
      </div>

      <div className="w-full min-h-[60vh] bg-[#1e1f20] py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(index)}
                  className={`w-full text-left px-6 py-4 rounded-lg font-serif font-bold text-lg md:text-xl transition-all ${
                    index === 0
                      ? 'bg-red-500 text-white'
                      : activeCategory === index
                      ? 'bg-red-600 text-white'
                      : 'bg-red-900 text-white hover:bg-red-800'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="flex flex-col justify-start space-y-6">
              {categories.map((category, index) => (
                <div key={index}>
                  {category.special ? (
                    <div className="space-y-4 flex items-center justify-between">
                      <div className="flex flex-wrap gap-3 mb-4">
                        {category.subItems.map((subItem, subIndex) => (
                          <span
                            key={subIndex}
                            className="text-white text-lg md:text-xl font-serif underline cursor-pointer hover:text-yellow-400"
                          >
                            {subItem}
                          </span>
                        ))}
                      </div>
                       <div className="bg-red-600 rounded-xl px-4 py-3 inline-block">
                        <span className="text-white text-2xl md:text-2xl font-bold font-serif">
                          {category.price}
                        </span>
                      </div>
                     
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-white text-lg md:text-xl font-serif">
                        pay & download
                      </span>
                      <div className="bg-red-600 rounded-xl px-6 py-3">
                        <span className="text-white text-2xl md:text-2xl font-bold font-serif">
                          {category.price}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-right">
            <p className="text-white text-sm md:text-base font-serif opacity-70">
              *discounts available w.r.t chosen subscription type
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VaoHero;
