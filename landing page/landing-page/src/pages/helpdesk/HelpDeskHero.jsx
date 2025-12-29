import helpDeskHero from "../../assets/helpDeskHero.png";
import spoon from "../../assets/spoonImg.png";
import logo from "../../assets/logo.png";

function HelpDeskHero() {
  return (
    <section className="relative w-full h-full overflow-hidden isolate">
      <div 
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${helpDeskHero})`,
        }}
      >
        <div className="z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white pt-20 font-serif">
            SUPPORT/HELPDESK
          </h1>
        </div>

        <div className="absolute right-0 top-0 z-20">
          <img src={spoon} alt="spoon" className="lg:w-55 lg:h-30 md:w-32 md:h-32 block m-0 p-0" />
          <img src={logo} alt="logo" className="lg:w-55 lg:h-40 md:w-32 md:h-32 block m-0 p-0" />
        </div>

        <div className="z-30 w-[90vw] md:w-[60vw] lg:w-[40vw] xl:w-[20vw] min-w-[400px] max-w-[600px] m-8 py-12">
          <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 ">
                Support & Helpdesk
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Submit your request - our team aims to respond within 48 hours.
              </p>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="requestType" className="block text-gray-900 text-sm md:text-base font-semibold">
                  Request / Enquiry Type
                </label>
                <select
                  id="requestType"
                  className="w-full bg-white text-gray-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                >
                  <option value="">Select Request Type</option>
                  <option value="subscription">Subscription Issue</option>
                  <option value="payment">Payment Issue</option>
                  <option value="other">Other Issues</option>
                  <option value="complaint">Complaint</option>
                  <option value="marketplace">Marketplace</option>
                  <option value="auction">Live Auction</option>
                  <option value="advertising">Advertising</option>
                  <option value="vao">VAO</option>
                  <option value="access">User Access</option>
                  <option value="ethics">Ethics</option>
                  <option value="regulatory">Regulatory</option>
                  <option value="privacy">Privacy Policy</option>
                  <option value="terms">Terms & Conditions</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-gray-900 text-sm md:text-base font-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="w-full bg-white text-gray-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-gray-900 text-sm md:text-base font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-white text-gray-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="contactPhone" className="block text-gray-900 text-sm md:text-base font-semibold">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    className="w-full bg-white text-gray-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                    placeholder="Enter your phone"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-gray-900 text-sm md:text-base font-semibold">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full bg-white text-gray-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                    placeholder="Enter subject"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-gray-900 text-sm md:text-base font-semibold">
                  Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="w-full bg-white text-gray-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base resize-none"
                  placeholder="Describe the issue, steps to reproduce, timelines and any related IDs or URLs"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label htmlFor="attachment" className="block text-gray-900 text-sm md:text-base font-semibold">
                  Attachments
                </label>
                <div className="space-y-2">
                  <input
                    type="file"
                    id="attachment"
                    multiple
                    className="w-full bg-white text-gray-900 px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  />
                  <p className="text-gray-500 text-xs md:text-sm">
                    Accepted: JPG, PNG, PDF, DOCX, TXT - Max total 20 MB
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm md:text-base"
                >
                  Submit Request
                </button>
                <button
                  type="reset"
                  className="px-6 py-3 bg-white text-gray-900 font-semibold border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm md:text-base"
                >
                  Reset
                </button>
              </div>

              <p className="text-gray-500 text-xs md:text-sm text-center pt-2">
                By submitting this form you agree to our Privacy Policy and Terms & Conditions.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HelpDeskHero;
