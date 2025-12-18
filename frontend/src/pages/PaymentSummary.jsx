import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DollarSign, Lock, ArrowLeft, ArrowRight, Circle, CheckCircle2, Shield, CheckSquare, Zap, CreditCard, Radio } from 'lucide-react';

const PLAN_PRICES = {
  'regular-3': { price: 999, name: 'Regular Plan', duration: 'Quarterly subscription' },
  'regular-6': { price: 2999, name: 'Regular Plan', duration: 'Semi-annual subscription' },
  'regular-12': { price: 3999, name: 'Regular Plan', duration: 'Annual subscription' },
  'silver-3': { price: 5999, name: 'Silver Plan', duration: 'Quarterly subscription' },
  'silver-6': { price: 7999, name: 'Silver Plan', duration: 'Semi-annual subscription' },
  'silver-12': { price: 9999, name: 'Silver Plan', duration: 'Annual subscription' },
  'gold-3': { price: 12999, name: 'Gold Plan', duration: 'Quarterly subscription' },
  'gold-6': { price: 14999, name: 'Gold Plan', duration: 'Semi-annual subscription' },
  'gold-12': { price: 15999, name: 'Gold Plan', duration: 'Annual subscription' },
  'platinum-lifetime': { price: 250000, name: 'Platinum Plan', duration: 'Lifetime Access' },
};

function PaymentSummary() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('plan') || 'regular-6';
  const buyerId = searchParams.get('buyerId');
  const agentId = searchParams.get('agentId');
  const sellerId = searchParams.get('sellerId');
  const tier = searchParams.get('tier') || 'regular';
  const [loading, setLoading] = useState(false);
  const [selectedOfferings, setSelectedOfferings] = useState([]);
  const [discount, setDiscount] = useState(0); // Discount percentage for VAOs

  useEffect(() => {
    // Parse offerings from URL params
    const offeringsParam = searchParams.get('offerings');
    if (offeringsParam) {
      try {
        const offerings = JSON.parse(offeringsParam);
        setSelectedOfferings(offerings);
      } catch (error) {
        console.error('Error parsing offerings:', error);
      }
    }
  }, [searchParams]);

  const plan = PLAN_PRICES[planId] || PLAN_PRICES['regular-6'];
  const subscriptionPrice = plan.price;

  // Calculate VAO prices with discount
  const vaoSubtotal = selectedOfferings.reduce((sum, item) => sum + (item.price || 0), 0);
  const vaoDiscountAmount = (vaoSubtotal * discount) / 100;
  const vaoPriceAfterDiscount = vaoSubtotal - vaoDiscountAmount;

  const subtotal = subscriptionPrice + vaoPriceAfterDiscount;
  const tax = subtotal * 0.1; // 10% tax
  const grandTotal = subtotal + tax;

  const handleProceedToPayment = () => {
    // Navigate to Complete Payment page
    const params = new URLSearchParams();
    if (agentId) {
      params.set('agentId', agentId);
    }
    if (buyerId) {
      params.set('buyerId', buyerId);
      if (planId) params.set('plan', planId);
      if (tier) params.set('tier', tier);
    }
    if (sellerId) {
      params.set('sellerId', sellerId);
      if (planId) params.set('plan', planId);
      if (tier) params.set('tier', tier);
    }
    if (selectedOfferings.length > 0) {
      params.set('offerings', JSON.stringify(selectedOfferings));
      params.set('total', grandTotal);
    }
    navigate(`/complete-payment?${params.toString()}`);
  };

  const handleBack = () => {
    // Navigate back to Value Added Offerings page
    const params = new URLSearchParams();
    if (agentId) {
      params.set('agentId', agentId);
    }
    if (buyerId) {
      params.set('buyerId', buyerId);
      if (planId) params.set('plan', planId);
      if (tier) params.set('tier', tier);
    }
    if (sellerId) {
      params.set('sellerId', sellerId);
      if (planId) params.set('plan', planId);
      if (tier) params.set('tier', tier);
    }
    navigate(`/value-added-offerings?${params.toString()}`);
  };

  return (
    <div className="min-h-screen p-3 sm:p-4" style={{ backgroundColor: '#5D3FD3' }}>
      <div className="w-full max-w-4xl mx-auto py-4 sm:py-6 md:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex flex-col items-center gap-3 sm:gap-4 mb-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Payment Summary</h1>
              <p className="text-white/90 text-sm sm:text-base">
                Review your subscription and selected services before proceeding to payment
              </p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl py-4 px-12 sm:p-6 md:p-8">
          {/* Subscription Plan Section */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
            <div className='bg-violet-600 rounded-lg p-2 '>
                <Shield className="w-7 h-6 text-white" />

                </div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Subscription Plan</h2>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg sm:text-xl font-normal text-gray-900 mb-1">{plan.name}</p>
                  <p className="text-base sm:text-lg font-normal text-gray-600">{plan.duration}</p>
                </div>
                <p className="text-xl sm:text-2xl font-normal text-gray-900">${subscriptionPrice.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Value Added Offerings Section */}
          {selectedOfferings.length > 0 && (
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Value Added Offerings</h2>
              </div>
              <div className="mt-4 space-y-2">
                {selectedOfferings.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-base sm:text-lg font-normal text-gray-700">• {item.title}</span>
                    <span className="text-base sm:text-lg font-normal text-gray-900">${item.price}</span>
                  </div>
                ))}
                <p className="text-sm sm:text-base font-normal text-gray-500 mt-3">
                  Discount applied to VAOs for this plan: {discount.toFixed(1)}%
                </p>
              </div>
            </div>
          )}

          {/* Cost Breakdown */}
          <div className="mb-6 pb-6 border-b border-gray-200 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm sm:text-base text-gray-600">Subscription</span>
              <span className="text-sm sm:text-base font-semibold text-gray-900">${subscriptionPrice.toLocaleString()}</span>
            </div>
            {selectedOfferings.length > 0 && (
              <div className="flex justify-between">
                <span className="text-sm sm:text-base text-gray-600">Value Added Offerings (after discount)</span>
                <span className="text-sm sm:text-base font-semibold text-gray-900">${vaoPriceAfterDiscount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="text-sm sm:text-base text-gray-600">Subtotal</span>
              <span className="text-sm sm:text-base font-semibold text-gray-900">${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm sm:text-base text-gray-600">Tax (10%)</span>
              <span className="text-sm sm:text-base font-semibold text-gray-900">${tax.toFixed(2)}</span>
            </div>
          </div>

          {/* Grand Total */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="flex justify-between items-baseline">
              <div>
                <p className="text-lg sm:text-xl  text-gray-900">Grand Total</p>
                <p className="text-xs sm:text-sm text-gray-500">Due today</p>
              </div>
              <p className="text-3xl sm:text-3xl  text-violet-700">${grandTotal.toFixed(2)}</p>
            </div>
          </div>

          {/* Secure Payment Section */}
          <div className="mb-6">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className='bg-green-500 rounded-lg p-2 '>
                <Shield className="w-7 h-6 text-white" />

                </div>
                <div className='ml-2 flex flex-col items-start justify-start'>
                <h2 className="text-lg sm:text-xl text-gray-900">Secure Payment</h2>

                <p className="text-sm text-gray-600">
                  Your payment information is encrypted and secure
                </p>
              </div>
              </div>
             


            </div>
          </div>
        </div>

        {/* Security Indicators - Outside the white card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 mt-6">
          <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-700">SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-700">PCI Compliant</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-700">Instant Activation</span>
          </div>
        </div>

        {/* Navigation Buttons - Outside the white card */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="btn-secondary flex items-center justify-center gap-2 text-sm sm:text-base px-4 py-2.5 sm:py-2.5 w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            type="button"
            onClick={handleProceedToPayment}
            disabled={loading}
            className="btn-primary flex items-center justify-center gap-2 text-sm sm:text-base px-4 py-2.5 sm:py-2.5 w-full sm:w-auto"
          >
            {loading ? (
              <>
                <Lock className="w-4 h-4 animate-pulse" />
                Processing...
              </>
            ) : (
              <>
                Proceed to Payment Gateway
                <DollarSign className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSummary;
