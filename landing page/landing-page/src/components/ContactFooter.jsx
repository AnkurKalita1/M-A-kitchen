import logo from "../assets/logo.png"
import footerChef from "../assets/footerChef.png"

const ContactFooter = ({
  hqAddress = "375, Park Ave\nSuite 449\nNY 10022",
  worldwideLocations = "US, Argentina,\nUK, Dubai, Qatar,\nSydney, Zurich,\nSingapore, India",
  phone = "+1 (917) 242-1755",
  email = "ceo@kitchenma.com",
  quickLinks = ["About Us", "Buyers", "Sellers", "Agents"],
  kitchenLinks = ["Marketplace", "Live Auction", "Helpdesk", "VAOs"],
  essentialsLinks = ["Intellectual Property", "Privacy Policy", "Terms & Conditions", "Contact Us"],
  copyright = "Copyright © 2025. PBKITCHENM&A (OPC) PRIVATE LIMITED. (CIN) U62099WB20250PC278609. All rights reserved."
}) => {
  return (
    <footer className="w-full bg-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ROW 1 — CONTACT SECTION */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 ">
          
          {/* LEFT COLUMN — HQ & Worldwide */}
          <div className="space-y-6">
            <div>
              <h3 className="text-4xl font-semibold mb-4">HQ</h3>
              <p className="text-gray-300 whitespace-pre-line text-xl">
                {hqAddress}
              </p>
            </div>
            <div className="my-12">
              <h3 className="text-4xl font-semibold my-4">Worldwide</h3>
              <p className="text-gray-300 whitespace-pre-line text-xl">
                {worldwideLocations}
              </p>
            </div>
          </div>

          {/* CENTER COLUMN — EMAIL US FORM */}
          <div>
            <h3 className="font-bold mb-6 text-center text-5xl">EMAIL US</h3>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-2  border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-600"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-2 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-600"
                />
              </div>
              <div>
                <select
                  className="w-full px-4 py-2  border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-600 placeholder-gray-400"
                >
                  <option value="">Type Of Enquiry</option>
                  <option value="general">General</option>
                  <option value="support">Support</option>
                  <option value="sales">Sales</option>
                </select>
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-2  border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-600"
                />
              </div>
              <div>
                <textarea
                  rows="4"
                  placeholder="Write Your Message"
                  className="w-full px-4 py-2 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-600 resize-none"
                ></textarea>
              </div>
              <button
                type="button"
                className="w-full bg-white text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                SUBMIT
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN — Image & Contact */}
          <div className="space-y-6 mb-10">
            {/* Image placeholder */}
            <div className="w-full h-[50vh] mb-10 rounded-lg flex items-center justify-center ">
                  <img src={footerChef} alt="footerChef" className="w-full h-full object-contain " />
             </div>
            
            {/* Phone */}
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
                <span className="text-xs">📞</span>
              </div>
              <span className="text-gray-300">{phone}</span>
            </div>
            
            {/* Email */}
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
                <span className="text-xs">✉</span>
              </div>
              <span className="text-gray-300">{email}</span>
            </div>
          </div>
        </div>

        {/* ROW 2 — FOOTER LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12 border-t border-gray-800 pt-8">
          
          {/* COLUMN 1 — Logo & Social */}
          <div className="space-y-4">
            {/* Logo placeholder */}
            <div className="w-32 h-36  flex items-center justify-center mb-2">
             <img src={logo} alt="logo" className="w-full h-full object-contain" />
            </div>
            {/* Brand description placeholder */}
            <p className="text-gray-400 text-sm">
              {/* Brand description placeholder */}
            </p>
            {/* Social media icon placeholders */}
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-gray-700 border border-gray-600 rounded flex items-center justify-center">
                <span className="text-xs">in</span>
              </div>
              <div className="w-8 h-8 bg-gray-700 border border-gray-600 rounded flex items-center justify-center">
                <span className="text-xs">X</span>
              </div>
              <div className="w-8 h-8 bg-gray-700 border border-gray-600 rounded flex items-center justify-center">
                <span className="text-xs">f</span>
              </div>
              <div className="w-8 h-8 bg-gray-700 border border-gray-600 rounded flex items-center justify-center">
                <span className="text-xs">📷</span>
              </div>
            </div>
          </div>

          {/* COLUMN 2 — Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3 — Kitchen */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kitchen</h4>
            <ul className="space-y-2">
              {kitchenLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4 — Essentials */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Essentials</h4>
            <ul className="space-y-2">
              {essentialsLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ROW 3 — COPYRIGHT */}
        <div className="text-center pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;

