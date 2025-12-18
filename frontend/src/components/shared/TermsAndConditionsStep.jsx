import { useState } from 'react';
import { FileText } from 'lucide-react';

function TermsAndConditionsStep({ onAccept, onSubmit, loading = false, userType = 'Seller' }) {
  const [accepted, setAccepted] = useState(false);
  
  const getCheckboxText = () => {
    const userTypeText = userType === 'Buyer' ? 'Buyer' : userType === 'Agent' ? 'Agent' : 'Seller';
    return `I have read and understood the Terms & Conditions and agree to proceed as a ${userTypeText} on the M&A Kitchen™ platform.`;
  };

  const handleAccept = () => {
    if (accepted) {
      // Just accept the terms, don't navigate
      // Navigation will be handled by the parent's "Continue to VAO Selection" button
      if (onAccept) {
      onAccept();
      } else if (onSubmit) {
        onSubmit();
      }
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 text-start">
        <div className="flex items-center text-start mb-4 gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Terms & Conditions</h2>
        </div>
    
        <p className="text-gray-600 text-sm mt-2">
          Please review our Terms & Conditions. By accepting, you confirm that you are authorised to provide this information and agree to proceed on the M&A Kitchen™ platform.
        </p>
      </div>

      <div className="max-h-[500px] overflow-y-auto border border-gray-200 rounded-lg p-6 bg-gray-50 mb-6">
        <div className="space-y-6 text-sm text-gray-600">
          {/* Copyright */}
          <p className="text-sm text-gray-600 mb-6">
            Copyright© 2025, PBKITCHENM&A (OPC) PVT. LTD., All rights reserved
          </p>

          {/* Privacy Policy */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">Privacy Policy</h3>
            <p className="text-sm text-gray-600 mb-4"><strong>Effective Date: 7th Dec 2025</strong></p>
            
            <p className="text-sm text-gray-600 mb-4">
              This Privacy Policy explains how PBKITCHENM&A (OPC) PVT. LTD ("we," "us," or "our") collects, uses, shares, and protects the personal and financial information of users ("you" or "your") of our Investment Banking Subscription-Based Marketplace Application – M&A Kitchen™ ("the Application" or "Service"). By using our Application, you agree to the practices described in this Privacy Policy:-
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">1. Information We Collect</h4>
                <p className="text-sm text-gray-600 mb-2">We collect personal and financial information that you provide directly to us and information that is automatically collected when you use our Application. This may include:</p>
                <p className="text-sm text-gray-600 mb-2"><strong>Personal Information</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-600">
                  <li><strong>Account Information:</strong> Your name, email address, phone number, and password.</li>
                  <li><strong>Billing Information:</strong> Credit card details, billing address, and payment history.</li>
                  <li><strong>Profile Data:</strong> Preferences, investment interests, transaction history, and any data you provide in your profile.</li>
                </ul>
                <p className="text-sm text-gray-600 mb-2 mt-3"><strong>Financial Information</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-600">
                  <li><strong>Transaction Data:</strong> Information about the investment transactions you make, including subscription purchases, investment portfolio details, and trade history.</li>
                  <li><strong>Income and Financial Status:</strong> Information required for investment suitability assessments and to tailor the marketplace's offerings.</li>
                </ul>
                <p className="text-sm text-gray-600 mb-2 mt-3"><strong>Technical Data</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-600">
                  <li><strong>Usage Data:</strong> Information about how you interact with the Application, such as IP address, device type, browser type, and other usage statistics.</li>
                  <li><strong>Cookies and Tracking Technologies:</strong> We may use cookies, web beacons, and similar technologies to track your activities within the Application and to personalize your experience.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">2. How We Use Your Information</h4>
                <p className="text-sm text-gray-600 mb-2">We use the information we collect for the following purposes:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-600">
                  <li><strong>To Provide and Improve Our Services:</strong> To create and manage your account, process transactions, deliver subscription services, and personalize the user experience.</li>
                  <li><strong>To Communicate with You:</strong> To send important updates regarding your account, subscriptions, and our services. This includes transaction confirmations, service updates, newsletters, and other relevant communications.</li>
                  <li><strong>For Marketing:</strong> To send you promotional offers and content related to our services that we believe may be of interest to you, subject to your preferences and applicable consent.</li>
                  <li><strong>For Legal and Regulatory Compliance:</strong> To comply with relevant laws, regulations, and industry standards, including anti-money laundering (AML), know your customer (KYC) requirements, and tax reporting obligations.</li>
                  <li><strong>Security and Fraud Prevention:</strong> To ensure the security of our services, prevent fraud, and detect suspicious activities.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">3. How We Share Your Information</h4>
                <p className="text-sm text-gray-600 mb-2">We may share your personal and financial information in the following circumstances:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-600">
                  <li><strong>Service Providers:</strong> We may share your information with third-party service providers who perform services on our behalf (e.g., payment processors, cloud storage providers, marketing platforms). These providers are obligated to protect your information and only use it for the purposes of providing services to us.</li>
                  <li><strong>Legal and Regulatory Obligations:</strong> We may disclose your information as required by law, to comply with legal obligations, or in response to valid requests from public authorities (e.g., law enforcement).</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your personal and financial data may be transferred as part of the transaction, provided that the new entity continues to protect your data in accordance with this Privacy Policy.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">4. How We Protect Your Information</h4>
                <p className="text-sm text-gray-600 mb-2">We take the security of your personal and financial information seriously and implement a range of physical, technical, and administrative measures to protect it. These measures include:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-600">
                  <li><strong>Encryption:</strong> We use encryption protocols to protect sensitive data, such as payment information, during transmission.</li>
                  <li><strong>Access Control:</strong> We restrict access to your data to authorized personnel who need it to perform their job duties.</li>
                  <li><strong>Regular Security Audits:</strong> We conduct regular security audits to ensure that our systems and practices are effective in safeguarding your data.</li>
                </ul>
                <p className="text-sm text-gray-600 mt-2">Despite these measures, no system is completely secure, and we cannot guarantee the absolute security of your data.</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">5. Your Rights and Choices</h4>
                <p className="text-sm text-gray-600 mb-2">Depending on your jurisdiction, you may have certain rights regarding your personal data, including:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-600">
                  <li><strong>Access:</strong> The right to request a copy of the personal data we hold about you.</li>
                  <li><strong>Correction:</strong> The right to correct any inaccurate or incomplete personal data.</li>
                  <li><strong>Deletion:</strong> The right to request that we delete your personal data, subject to certain legal exceptions.</li>
                  <li><strong>Opt-Out of Marketing:</strong> You can opt-out of receiving marketing communications by clicking "unsubscribe" in emails or adjusting your preferences within the Application.</li>
                  <li><strong>Data Portability:</strong> The right to request a copy of your personal data in a structured, commonly used format.</li>
                  <li><strong>Withdraw Consent:</strong> Where consent is the basis for processing your data, you can withdraw your consent at any time.</li>
                </ul>
                <p className="text-sm text-gray-600 mt-2">To exercise any of these rights, please contact us at <a href="mailto:ceo@kitchenma.com" className="text-blue-600 hover:underline">ceo@kitchenma.com</a></p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">6. Data Retention</h4>
                <p className="text-sm text-gray-600">
                  We will retain your personal and financial data for as long as necessary to provide our services and comply with legal, regulatory, or contractual obligations. Once data is no longer required, we will securely delete or anonymize it.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">7. Third-Party Links</h4>
                <p className="text-sm text-gray-600">
                  The Application may contain links to third-party websites or services. These third-party services have their own privacy policies, and we are not responsible for their practices. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">8. Changes to This Privacy Policy</h4>
                <p className="text-sm text-gray-600">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal obligations. Any changes will be posted on this page with an updated "Effective Date." We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">9. Contact Us</h4>
                <p className="text-sm text-gray-600 mb-1">If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us at:</p>
                <p className="text-sm text-gray-600 mb-1">PBKITCHENM&A (OPC) PVT. LTD</p>
                <p className="text-sm text-gray-600 mb-1">375, Park Ave</p>
                <p className="text-sm text-gray-600 mb-1">Suite 449</p>
                <p className="text-sm text-gray-600 mb-1">NY 10022</p>
                <p className="text-sm text-gray-600 mb-1"><a href="mailto:ceo@kitchenma.com" className="text-blue-600 hover:underline">ceo@kitchenma.com</a></p>
                <p className="text-sm text-gray-600">+1 (917)242-1755</p>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="mt-8 pt-8 border-t border-gray-300">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Terms & Conditions of Application</h3>
            <p className="text-sm text-gray-600 mb-4"><strong>Subscription & Usage – M&A Kitchen™ :-</strong></p>
            
            <p className="text-sm text-gray-600 mb-4">
              These Terms and Conditions ("Terms") govern your use of the Investment Banking Subscription-Based Marketplace Application- M&A Kitchen™ ("Application," "Service," or "Platform") provided by PBKITCHENM&A (OPC) PVT. LTD ("we," "us," or "our"). By accessing or using our Application, you agree to be bound by these Terms. If you do not agree with these Terms, you must not access or use the Application.
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">1. Acceptance of Terms</h4>
                <p className="text-sm text-gray-600">
                  By accessing or using the Application, you affirm that you have read, understood, and agree to comply with these Terms. If you are accessing or using the Application on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">2. Eligibility</h4>
                <p className="text-sm text-gray-600 mb-2">To use the Application, you must meet the following eligibility criteria:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-600">
                  <li>Be at least 18 years old and legally capable of entering into a binding contract.</li>
                  <li>Be an accredited investor (if required by applicable law) or meet the necessary criteria to access investment opportunities through the Platform.</li>
                  <li>If you are using the Application on behalf of an entity, you must be authorized to act on behalf of that entity.</li>
                </ul>
                <p className="text-sm text-gray-600 mt-2">We may refuse or suspend access to the Application for any user who does not meet these eligibility requirements.</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">3. Account Registration</h4>
                <p className="text-sm text-gray-600 mb-2">To use certain features of the Application, you may be required to create an account. During registration, you will provide certain personal and financial information, including but not limited to your name, email address, phone number, billing details, and financial information. You agree to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-600">
                  <li>Provide accurate, current, and complete information during registration and to update this information as necessary.</li>
                  <li>Maintain the confidentiality of your account credentials (e.g., username and password).</li>
                  <li>Notify us immediately of any unauthorized use of your account.</li>
                </ul>
                <p className="text-sm text-gray-600 mt-2">You are responsible for all activity under your account, whether or not authorized, and agree to bear the risk of any unauthorized access or use.</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">4. Subscription Fees and Payments</h4>
                <p className="text-sm text-gray-600 mb-2">Our Application operates on a subscription-based model. By subscribing to our service, you agree to pay the subscription fees outlined on the Platform.</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-600">
                  <li><strong>Payment Terms:</strong> Fees are billed periodically (e.g., quarterly, half-yearly, annually) as specified in your subscription plan. Payments are due in advance and are non-refundable, except as required by law.</li>
                  <li><strong>Billing Information:</strong> You agree to provide accurate and current payment details. If you do not update your payment information, we may suspend or terminate your access to the Application.</li>
                  <li><strong>Price Changes:</strong> We may change subscription fees at any time, but we will notify you before any price change takes effect.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">5. Access to Investment Opportunities</h4>
                <p className="text-sm text-gray-600 mb-2">The Application provides access to investment banking opportunities, including securities, investments, and financial products ("Investment Opportunities"). By using the Platform, you understand and agree to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-600">
                  <li><strong>Accredited Investor Status:</strong> Certain Investment Opportunities may only be available to accredited investors, and you may be required to provide proof of your eligibility.</li>
                  <li><strong>No Investment Advice:</strong> The Platform provides access to market information and opportunities but does not offer investment advice, financial advice, or make any recommendations regarding specific investments.</li>
                  <li><strong>Due Diligence:</strong> You are solely responsible for conducting your own due diligence on any Investment Opportunities before making any investment decisions. You can download DD template(s) from the Value-Added Offerings section within application.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">6. Use of the Application</h4>
                <p className="text-sm text-gray-600 mb-2">You agree to use the Application only for lawful purposes and in accordance with these Terms. Specifically, you agree not to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-600">
                  <li>Violate any applicable laws, regulations, or third-party rights.</li>
                  <li>Use the Platform to engage in fraudulent, deceptive, or illegal activities.</li>
                  <li>Interfere with or disrupt the operation of the Application or the Platform's servers and networks.</li>
                  <li>Attempt to reverse-engineer, decompile, or modify the Platform's code or technology.</li>
                  <li>Upload, post, or transmit any harmful content, including malware, viruses, or other malicious code.</li>
            </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">7. Intellectual Property</h4>
                <p className="text-sm text-gray-600 mb-2">All content, materials, trademarks, and intellectual property related to the Application are owned by PBKITCHENM&A (OPC) PVT. LTD. You may not use any content or intellectual property without our prior written consent. Your use of the Application does not grant you any ownership or rights to the Platform's intellectual property.</p>
                <p className="text-sm text-gray-600">The Company's registered trademark is M&A Kitchen™ - "the Global Investment Marketplace". The platform's business model, theme & concept is also its intellectual property.</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">8. Privacy and Data Protection</h4>
                <p className="text-sm text-gray-600">
                  By using the Application, you agree to the collection and use of your personal and financial information as outlined in our Privacy Policy. You acknowledge and consent to our use of your data as described therein.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">9. Third-Party Links and Services</h4>
                <p className="text-sm text-gray-600">
                  The Application may contain links to third-party websites, services, or content that are not owned or controlled by us. We are not responsible for the content, privacy policies, or practices of any third-party websites or services. By accessing such third-party resources, you do so at your own risk.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">10. Disclaimers</h4>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-gray-600">
                  <li><strong>No Investment Advice:</strong> The Application does not provide personalized investment advice or recommendations. All information provided through the Application is for informational purposes & investments only.</li>
                  <li><strong>No Guarantees:</strong> We do not guarantee the accuracy, reliability, or completeness of any information, content, or Investment Opportunities available on the Platform.</li>
                  <li><strong>Investment Risks:</strong> Investments always carry risks, and past performance is not indicative of future results. You agree to bear all risks associated with your investments and financial decisions.</li>
            </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">11. Limitation of Liability</h4>
                <p className="text-sm text-gray-600">
                  To the fullest extent permitted by law, PBKITCHENM&A (OPC) PVT. LTD. and its affiliates, officers, employees, agents, and partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or investment losses, arising out of or in connection with the use or inability to use the Application or any Investment Opportunities provided through the Platform.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">12. Indemnification</h4>
                <p className="text-sm text-gray-600">
                  You agree to indemnify and hold harmless PBKITCHENM&A (OPC) PVT. LTD, its affiliates, employees, agents, and partners from any claims, damages, liabilities, or expenses (including legal fees) arising out of or related to your use of the Application, your violation of these Terms, or your breach of any applicable laws.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">13. Termination</h4>
                <p className="text-sm text-gray-600">
                  We may suspend or terminate your access to the Application at any time, with or without cause, if we believe you have violated these Terms or engaged in inappropriate behavior. Upon termination, you will no longer be able to access your account or use the Application, and any outstanding payments will remain due.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">14. Governing Law and Dispute Resolution</h4>
                <p className="text-sm text-gray-600">
                  These Terms are governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with these Terms will be resolved through binding arbitration in India, and you agree to waive any right to a trial by jury or class action.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">15. Amendments to These Terms</h4>
                <p className="text-sm text-gray-600">
                  We may update or amend these Terms at any time by posting an updated version on the Application. Any changes will take effect immediately upon posting, and your continued use of the Application will signify your acceptance of those changes.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">16. Contact Information</h4>
                <p className="text-sm text-gray-600 mb-1">If you have any questions or concerns about these Terms, please contact us at:</p>
                <p className="text-sm text-gray-600 mb-1">PBKITCHENM&A (OPC) PVT. LTD</p>
                <p className="text-sm text-gray-600 mb-1">375, Park Ave</p>
                <p className="text-sm text-gray-600 mb-1">Suite 449</p>
                <p className="text-sm text-gray-600 mb-1">NY 10022</p>
                <p className="text-sm text-gray-600 mb-1"><a href="mailto:ceo@kitchenma.com" className="text-blue-600 hover:underline">ceo@kitchenma.com</a></p>
                <p className="text-sm text-gray-600">+1 (917)242-1755</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">17. Severability</h4>
                <p className="text-sm text-gray-600">
                  If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions will continue in full force and effect.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkbox and Accept Button */}
      <div className="flex items-start gap-3 mb-6">
        <input
          type="checkbox"
          id="acceptTerms"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="acceptTerms" className="text-sm text-gray-700 cursor-pointer">
          {getCheckboxText()} <span className="text-red-500">*</span>
        </label>
      </div>

      {/* Accept Button - Inside Form */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={handleAccept}
          disabled={!accepted || loading}
          className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
            accepted && !loading
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {loading ? 'Processing...' : 'I ACCEPT'}
        </button>
      </div>
    </div>
  );
}

export default TermsAndConditionsStep;


