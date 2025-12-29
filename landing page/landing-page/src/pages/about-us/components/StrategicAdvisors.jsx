import advisorImage from "../../../assets/strategic-advisor/advisor.png";
import plateBg from "../../../assets/strategic-advisor/plateBg.png";
import advisorBgTop1 from "../../../assets/strategic-advisor/advisorsBgTop-1.png";
import advisorBgBottom1 from "../../../assets/strategic-advisor/advisorsBgBottom-1.png";
import advisorBgTop2 from "../../../assets/strategic-advisor/advisorBgTop-2.png";
import advisorBgBottom2 from "../../../assets/strategic-advisor/advisorBgBottom-2.png";
import advisorBg3 from "../../../assets/strategic-advisor/advisorBg-3.png";
import advisorBg4 from "../../../assets/strategic-advisor/advisorBg-4.png";

const StrategicAdvisors = () => {
    const section1Advisors = [
        {
            name: "Tariq Ahmed Alwahedi",
            title: "Chairman of Private Family Office, EMX_AE, Logicon Capital"
        },
        {
            name: "Rashmi Khurana",
            title: "CEO, Techfortune Venture Capital"
        },
        {
            name: "J. Neely",
            title: "Global M&A Practice Lead and Senior Managing Director, Accenture"
        },
        {
            name: "Martin Brand",
            title: "Head of Private Equity, North America Blackstone"
        }
    ];

    const section2Advisors = [
        {
            name: "Javed Khan",
            title: "Managing Partner, Rothschild & Co / CEO, Five Arrows"
        },
        {
            name: "Jim Keenan",
            title: "ex Chief Investment Officer and Global Head of Private Debt at BlackRock"
        },
        {
            name: "Peter Stavros",
            title: "Co-Head of Global Private Equity at KKR"
        },
        {
            name: "Lionel Assant",
            title: "Global Co-Chief Investment Officer, Blackstone"
        },
        {
            name: "Chip Kaye",
            title: "Chairman, Warburg Pincus"
        }
    ];

    const section3Advisors = [
        {
            name: "Christian Hyldahl",
            title: "Managing Director, Head of Continental Europe at BlackRock"
        },
        {
            name: "Aanchal Agarwal",
            title: "Group Head of Corporate Development, IHH Healthcare"
        },
        {
            name: "Robert Swaak",
            title: "Non - Executive Director Barclays Bank UK, ex-CEO ABN AMRO"
        },
        {
            name: "Tanoya Chatterjee",
            title: "Operating Partner at Mubadala"
        },
        {
            name: "Hazem Ben-Gacem",
            title: "ex Co-Chief Executive Officer, Investcorp"
        }
    ];

    const section4Advisors = [
        {
            name: "Matt Nord",
            title: "Co-Head of Equity, Apollo Global Management"
        },
        {
            name: "Tom Wolf",
            title: "Former Chairman & CEO - RIB Software, Founder MetaWolf AG, TWO Family Office"
        },
        {
            name: "Patrick Thomson",
            title: "CEO Europe, Middle East & Africa at J.P. Morgan Asset Management"
        },
        {
            name: "David King",
            title: "Managing Director, Co-Head of Technology M&A at Bank of America Merrill Lynch"
        },
        {
            name: "Alisa (Amarosa) Wood",
            title: "Partner, KKR & Co-CEO, K-PEC"
        }
    ];

    // Render advisor card (portrait + plate)
    const renderAdvisorCard = (advisor) => (
        <div className="flex flex-col items-center" style={{ minWidth: '200px', maxWidth: '280px', flex: '1 1 auto' }}>
            {/* Advisor Portrait - Circular, Fixed Size */}
            <div className="w-40 h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full border-4 border-green-800 overflow-hidden relative z-20">
                <img
                    src={advisorImage}
                    alt={advisor.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Advisor Plate - Circular, Connected to portrait (no gap) */}
            <div
                className="w-40 h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full flex flex-col items-center justify-center p-4 relative z-10"
                style={{
                    backgroundImage: `url(${plateBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                {/* Name */}
                <h3 className="text-black text-sm md:text-base lg:text-lg font-bold text-center mb-1 md:mb-2 leading-tight">
                    {advisor.name}
                </h3>
                {/* Title */}
                <p className="text-black text-xs md:text-sm text-center leading-relaxed">
                    {advisor.title}
                </p>
            </div>
        </div>
    );

    return (
        <div className="w-full">
            {/* Section 1: 4 advisors with split top/bottom backgrounds */}
            <section className="relative w-full mb-16 opacity-50">
                {/* Top Section - Portraits with top background */}

                <div
                    className="relative w-full h-[32vh] flex items-center justify-center flex-col"
                    style={{
                        backgroundImage: `url(${advisorBgTop1})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <h2 className="text-7xl font-sembold text-center text-white font-serif mt-16">STRATEGIC <br />ADVISOR</h2>

                </div>





                {/* Bottom Section - Plates with bottom background */}
                <div
                    className="relative w-full min-h-[30vh] flex items-start justify-center flex-col "
                    style={{
                        backgroundImage: `url(${advisorBgBottom1})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat'
                    }}
                >

                    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                        <div className="flex justify-center items-end gap-8 lg:gap-12">
                            {section1Advisors.map((advisor, index) => (
                                <div key={index} className="w-40 h-40 md:w-48 md:h-48 lg:w-52 lg:h-64  overflow-hidden relative z-20 flex-shrink-0">
                                    <img
                                        src={advisorImage}
                                        alt={advisor.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-center items-start gap-8 lg:gap-12">
                            {section1Advisors.map((advisor, index) => (
                                <div
                                    key={index}
                                    className="w-40 h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full  flex flex-col items-center justify-center p-4 flex-shrink-0"
                                    style={{
                                        backgroundImage: `url(${plateBg})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                >
                                    <h3 className="text-black text-sm md:text-base lg:text-lg font-bold text-center mb-1 md:mb-2 leading-tight">
                                        {advisor.name}
                                    </h3>
                                    <p className="text-black text-xs md:text-sm text-center leading-relaxed">
                                        {advisor.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: 5 advisors with split top/bottom backgrounds */}
            <section className="relative w-full opacity-50">
                {/* Top Section - Portraits with top background */}
                <div
                    className="relative w-full h-[50vh] flex items-end justify-center "
                    style={{
                        backgroundImage: `url(${advisorBgTop2})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-center items-end gap-8 lg:gap-12">
                            {section2Advisors.map((advisor, index) => (
                                <div key={index} className="w-40 h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 border-4 border-green-800 rounded-full overflow-hidden relative z-20 flex-shrink-0">
                                    <img
                                        src={advisorImage}
                                        alt={advisor.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Plates with bottom background */}
                <div
                    className="relative w-full min-h-[40vh] flex items-start justify-center "
                    style={{
                        backgroundImage: `url(${advisorBgBottom2})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-center items-start gap-8 lg:gap-12">
                            {section2Advisors.map((advisor, index) => (
                                <div
                                    key={index}
                                    className="w-40 h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full flex flex-col items-center justify-center p-4 flex-shrink-0"
                                    style={{
                                        backgroundImage: `url(${plateBg})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                >
                                    <h3 className="text-black text-sm md:text-base lg:text-lg font-bold text-center mb-1 md:mb-2 leading-tight">
                                        {advisor.name}
                                    </h3>
                                    <p className="text-black text-xs md:text-sm text-center leading-relaxed">
                                        {advisor.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3:*/}
            <section
                className="relative w-full min-h-screen flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 opacity-50"
                style={{
                    backgroundImage: `url(${advisorBg3})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-wrap justify-center items-start gap-8 lg:gap-12">
                        {section3Advisors.map((advisor, index) => renderAdvisorCard(advisor))}
                    </div>
                </div>
            </section>

            {/* Section 4*/}
            <section
                className="relative w-full min-h-screen flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 opacity-50"
                style={{
                    backgroundImage: `url(${advisorBg4})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 ">
                    <div className="flex flex-wrap justify-center items-start gap-8 lg:gap-12">
                        {section4Advisors.map((advisor, index) => renderAdvisorCard(advisor))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StrategicAdvisors;
