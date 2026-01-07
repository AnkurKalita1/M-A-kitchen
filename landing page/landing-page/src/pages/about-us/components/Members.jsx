import memberBg from "../../../assets/memberBg.png";

import pinakId from "../../../assets/members/pinak-id.png";
import pinakCard from "../../../assets/members/pinak-card.png";
import pamliId from "../../../assets/members/pamli-id.png";
import pamliCard from "../../../assets/members/pamli-card.png";
import michaelId from "../../../assets/members/michael-id.png";
import michaelCard from "../../../assets/members/michael-card.png";


const Members = () => {
    const members = [
        {
            name: "Pinak Bhattacharjee",
            title: "FOUNDER & CEO",
            description: "Having generated more than $3B of net new business globally and secured $400M–$1.5B worth of investments, Pinak has achieved over 40% in operating profits and EBITDA margins as high as 65% during his career span with NRR greater than 200%. For over 22 years, he has delivered innovative and exceptional outcomes in highly competitive business environments worldwide across 18 diverse industry verticals serving both product and service firms. The geographic expanse of this experience covers North America, EMEA, UK, APJ and ANZ. His work experience includes small, medium and large enterprises with P&L management ranging from $3M to over $1B. Pinak has secured buy-side for more than 27 global targets during 2018–2021 and was responsible for the acquisition of RIB Software SE by Schneider Electric at a 50% premium valued at €1.5B. He led end-to-end M&A execution including deal origination, structuring, LOI, due diligence, SPA, SHA, completion and post-merger integration, with deal sizes ranging from $1.7M to over $300M depending on region and objectives. He has proactively sourced healthy targets without intermediaries and executed more than 10 sell-side mandates with cumulative AUM exceeding $5B. With post-graduation in Artificial Intelligence and business management and a graduation in Chemical Engineering, Pinak has created the vision of Virtual Investment Banking for the future and leads M&A Kitchen™ as its CEO, Founder and Managing Partner.",

            identityImage: pinakId,
            cardImage: pinakCard 
        },
        {
            name: "Pamli Ganguly",
            title: "CTO",
            description: "Pamli brings a rare combination of engineering rigor, deep tech acumen and hands-on AI implementation experience to her role as CTO, bridging the critical gap between complex technology and tangible business outcomes at M&A Kitchen™. In her previous roles, she has architected complete AI-driven business transformations that reduced operational costs by 40–60% and built predictive systems that prevented millions in potential losses for clients. Her work spans custom AI agents using LLMs and SLMs, intelligent process automation, custom machine learning models, computer vision systems, predictive analytics and AR/VR integrations, guided by a philosophy that technology should solve problems rather than create complexity. Her technical leadership is grounded in pragmatic implementation and measurable impact. At M&A Kitchen™, she is building AI capabilities from the ground up by combining agentic AI systems, RPA automation, blockchain and immersive next-generation technologies into a cohesive platform that reimagines financial operations for simplicity and speed. Her experience includes leading AI product strategy, managing machine learning models, hands-on product management and technical architecture, enabling scalability, differentiation and industry-defining innovation.",
            identityImage: pamliId, 
            cardImage: pamliCard
        },
        {
            name: "Michael Leonardo Gitelmaker",
            title: "PARTNER",
            description: "With extensive experience operating large investment structures, funds and organizations, growing mid-sized and large conglomerates and taking companies public, Michael has built long-term relationships with a global network of institutional and UHNW investors, family offices, asset managers, serial entrepreneurs, innovators and international innovation hubs. His track record includes leading ventures from early-stage companies to IPOs and successful mergers, maintaining trusted relationships with some of the wealthiest families and business groups across the United States, Europe and Asia. Michael represents over $23 billion in capital for investments and acquisitions and is a seasoned investor and thought leader across industries including life sciences, technology commercialization, entertainment investment, industrial manufacturing, agriculture and food, telecommunications, television technology, government contracting and relations, internet and broadband infrastructure, drones, AI, SaaS, direct sales and marketing, mass media advertising and promotions. At M&A Kitchen™, he oversees investor relations and government affairs as Partner and continues to focus on developing new investment and business paradigms by combining insights from diverse industries with decades of generational expertise.",
            identityImage: michaelId,
            cardImage:  michaelCard ,
        }
    ];

    return (
        <div>
          {members.map((member, index) => (
            <section
              key={index}
              className="relative w-full md:py-24 overflow-hidden"
            >
              {/* BACKGROUND IMAGE */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${memberBg})`,
                }}
              />
    
              {/* DARK OVERLAY (controls opacity) */}
              <div className="absolute inset-0 bg-black/60"></div>
    
              {/* CONTENT (NOT affected by opacity) */}
              <div className="relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="w-full flex flex-col md:flex-row font-serif">
                    
                    <div className="w-full md:w-[50%] flex flex-col space-y-4 md:space-y-6">
                      <p className="text-white text-lg md:text-xl lg:text-2xl">
                        {member.name}
                      </p>
    
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                        {member.title}
                      </h3>
    
                      <div className="flex ">
                        <div className="w-72 h-80 md:w-80 md:h-[32rem] lg:w-96 lg:h-[28rem] ">
                          {member.identityImage ? (
                            <img
                              src={member.identityImage}
                              alt="Identity"
                              className="w-full h-full object-cover rounded-2xl "
                            />
                          ) : (
                            <span className="text-gray-400 text-xs text-center">
                              IDENTITY IMAGE PLACEHOLDER
                            </span>
                          )}
                        </div>
    
                        <div className="w-72 h-80 md:w-80 md:h-[32rem] lg:w-96 lg:h-[28rem] ">
                          {member.cardImage ? (
                            <img
                              src={member.cardImage}
                              alt="Card"
                              className="w-full h-full object-cover rounded-2xl"
                            />
                          ) : (
                            <span className="text-gray-400 text-xs text-center">
                              CARD IMAGE PLACEHOLDER
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
    
                    <div className="w-full lg:px-12 md:flex-1 md:pl-8 mt-8 md:mt-0">
                      <p className="text-white text-sm md:text-base lg:text-lg leading-relaxed">
                        {member.description}
                      </p>
                    </div>
    
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      );
};

export default Members;

