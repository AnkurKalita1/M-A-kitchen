import calendarImg from "../../assets/calendar.jpg";
import comparativeImg from "../../assets/comparativeSummaryBg.png";

const ComparativeSection = ({ userType = "User" }) => {
  const tableData = [
    {
      feature: "Industry Segments",
      regular: "1-2",
      silver: "2-5",
      gold: "6-10",
      platinum: "Unlimited"
    },
    {
      feature: "Auction Discounts",
      regular: "0-2%",
      silver: "5-10%",
      gold: "15-22%",
      platinum: "100% free"
    },
    {
      feature: "Listing Visibility",
      regular: "Low",
      silver: "Medium-High",
      gold: "High",
      platinum: "Top Priority"
    },
    {
      feature: "VAO Discounts",
      regular: "0-2%",
      silver: "1-5%",
      gold: "7-15%",
      platinum: "Free"
    },
    {
      feature: "Dashboard Analytics",
      regular: "-",
      silver: "✔",
      gold: "✔",
      platinum: "✔ Advanced"
    },
    {
      feature: "Customization",
      regular: "-",
      silver: "-",
      gold: "Selective",
      platinum: "Full"
    },
    {
      feature: "Renewal Discounts",
      regular: "-",
      silver: "Up to 25%",
      gold: "Up to 45%",
      platinum: "Lifetime access"
    }
  ];

  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src={comparativeImg} 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-3xl lg:text-5xl font-serif text-white text-center">
            COMPARATIVE SUBSCRIPTION SUMMARY
          </h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white bg-opacity-95 rounded-lg overflow-hidden shadow-2xl">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 md:px-6 py-4 md:py-6 text-left text-sm md:text-base font-semibold border-r border-gray-700">
                  Feature / Tier
                </th>
                <th className="px-4 md:px-6 py-4 md:py-6 text-center text-sm md:text-base font-semibold border-r border-gray-700">
                  Regular
                </th>
                <th className="px-4 md:px-6 py-4 md:py-6 text-center text-sm md:text-base font-semibold border-r border-gray-700">
                  Silver
                </th>
                <th className="px-4 md:px-6 py-4 md:py-6 text-center text-sm md:text-base font-semibold border-r border-gray-700">
                  Gold
                </th>
                <th className="px-4 md:px-6 py-4 md:py-6 text-center text-sm md:text-base font-semibold">
                  Platinum
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr 
                  key={index}
                  className={`border-b border-gray-300 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="px-4 md:px-6 py-4 md:py-6 text-sm md:text-base font-medium text-gray-800 border-r border-gray-300">
                    {row.feature}
                  </td>
                  <td className="px-4 md:px-6 py-4 md:py-6 text-sm md:text-base text-center text-gray-700 border-r border-gray-300">
                    {row.regular}
                  </td>
                  <td className="px-4 md:px-6 py-4 md:py-6 text-sm md:text-base text-center text-gray-700 border-r border-gray-300">
                    {row.silver}
                  </td>
                  <td className="px-4 md:px-6 py-4 md:py-6 text-sm md:text-base text-center text-gray-700 border-r border-gray-300">
                    {row.gold}
                  </td>
                  <td className="px-4 md:px-6 py-4 md:py-6 text-sm md:text-base text-center text-gray-700">
                    {row.platinum}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparativeSection;

