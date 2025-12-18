import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DollarSign, Lock, Check, ArrowLeft, Shield } from 'lucide-react';
import { buyerAPI, agentAPI, sellerAPI } from '../services/api';
import { toast } from 'react-toastify';

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

// Map frontend plan IDs to backend Razorpay subscription tier keys
const mapPlanToSubscriptionTier = (planId) => {
  switch (planId) {
    case 'regular-3':
      return 'REGULAR_QUARTERLY';
    case 'regular-6':
      return 'REGULAR_HALFYEARLY';
    case 'silver-3':
      return 'SILVER_QUARTERLY';
    case 'silver-6':
      return 'SILVER_HALFYEARLY';
    case 'silver-12':
      return 'SILVER_ANNUAL';
    case 'gold-3':
      return 'GOLD_QUARTERLY';
    case 'gold-6':
      return 'GOLD_HALFYEARLY';
    case 'gold-12':
      return 'GOLD_ANNUAL';
    case 'platinum-lifetime':
      return 'PLATINUM_LIFETIME';
    default:
      return null;
  }
};

function CompletePayment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('plan') || 'regular-6';
  const buyerId = searchParams.get('buyerId');
  const agentId = searchParams.get('agentId');
  const sellerId = searchParams.get('sellerId');
  const tier = searchParams.get('tier') || 'regular';
  const [loading, setLoading] = useState(false);
  const [selectedOfferings, setSelectedOfferings] = useState([]);

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

  // For sellers without a plan, use default regular-6
  const effectivePlanId = planId || (sellerId ? 'regular-6' : 'regular-6');
  const plan = PLAN_PRICES[effectivePlanId] || PLAN_PRICES['regular-6'];
  const subscriptionPrice = plan.price;
  const vaoPrice = selectedOfferings.reduce((sum, item) => sum + (item.price || 0), 0);
  const subtotal = subscriptionPrice + vaoPrice;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handlePayment = async () => {
    try {
      setLoading(true);
      const subscriptionTier = mapPlanToSubscriptionTier(effectivePlanId);

      if (!subscriptionTier) {
        toast.error('Selected plan is not yet configured for online payment. Please choose Regular (3 or 6 months), Silver (3 months), or Gold (3 months).');
        setLoading(false);
        return;
      }

      // Agent payment flow
      if (agentId) {
        const orderResponse = await agentAPI.createPaymentOrder(agentId, subscriptionTier);
        // agentAPI.createPaymentOrder returns { success: true, data: { orderId, ... } } or just { orderId, ... }
        const orderData = orderResponse?.data || orderResponse;
        const { orderId, amount, currency, keyId, testMode, amountCapped, originalAmount } = orderData;

        // Show warning if amount was capped for test mode
        if (amountCapped && originalAmount) {
          const originalInr = (originalAmount / 100).toLocaleString('en-IN', { maximumFractionDigits: 0 });
          const cappedInr = (amount / 100).toLocaleString('en-IN', { maximumFractionDigits: 0 });
          toast.warning(`⚠️ Test Mode: Payment amount capped to ₹${cappedInr} (original: ₹${originalInr}) due to Razorpay test limits`, { autoClose: 5000 });
        }

        // Test mode: simulate payment without opening Razorpay UI
        if (testMode) {
          toast.info('Test Mode: Simulating payment...');
          await new Promise((resolve) => setTimeout(resolve, 2000));

          const verifyResponse = await agentAPI.verifyPayment({
            razorpay_order_id: orderId,
            razorpay_payment_id: `test_pay_${Date.now()}`,
            razorpay_signature: 'test_signature',
            agentId,
            subscriptionTier,
          });

          toast.success('Payment completed!');
          // verifyResponse is already the data object from agentAPI.verifyPayment
          navigate(`/success?agentId=${agentId}&subscriptionTier=${subscriptionTier}&marketplaceId=${verifyResponse.marketplaceId}&password=${verifyResponse.defaultPassword}&organizationName=${encodeURIComponent(verifyResponse.organizationName || '')}`);
          return;
        }

        const options = {
          key: keyId,
          amount,
          currency,
          name: 'M&A Kitchen',
          description: `${plan.name} - ${plan.duration}`,
          order_id: orderId,
          handler: async (response) => {
            try {
              const verifyResponse = await agentAPI.verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                agentId,
                subscriptionTier,
              });

              toast.success('Payment successful!');
              // verifyResponse is already the data object from agentAPI.verifyPayment
              navigate(`/success?agentId=${agentId}&subscriptionTier=${subscriptionTier}&marketplaceId=${verifyResponse.marketplaceId}&password=${verifyResponse.defaultPassword}&organizationName=${encodeURIComponent(verifyResponse.organizationName || '')}`);
            } catch (error) {
              console.error('Payment verification error:', error);
              toast.error('Payment verification failed. Please contact support.');
            } finally {
              setLoading(false);
            }
          },
          theme: {
            color: '#5D3FD3',
          },
          modal: {
            ondismiss: () => {
              setLoading(false);
              toast.info('Payment cancelled');
            },
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
        return;
      }

      // Buyer payment flow
      if (buyerId) {
        const response = await buyerAPI.createPaymentOrder({
          buyerId,
          subscriptionTier,
        });

        const { data } = response;
        const orderData = data.data;
        const { orderId, amount, currency, keyId, testMode, amountCapped, originalAmount } = orderData;

        // Show warning if amount was capped for test mode
        if (amountCapped && originalAmount) {
          const originalInr = (originalAmount / 100).toLocaleString('en-IN', { maximumFractionDigits: 0 });
          const cappedInr = (amount / 100).toLocaleString('en-IN', { maximumFractionDigits: 0 });
          toast.warning(`⚠️ Test Mode: Payment amount capped to ₹${cappedInr} (original: ₹${originalInr}) due to Razorpay test limits`, { autoClose: 5000 });
        }

        if (testMode) {
          toast.info('Test Mode: Simulating payment...');
          await new Promise((resolve) => setTimeout(resolve, 2000));

          const verifyResponse = await buyerAPI.verifyPayment({
            razorpay_order_id: orderId,
            razorpay_payment_id: `test_pay_${Date.now()}`,
            razorpay_signature: 'test_signature',
            buyerId,
            subscriptionTier,
          });

          toast.success('Payment completed!');
          // verifyResponse is already the data object from buyerAPI.verifyPayment
          navigate(`/success?buyerId=${buyerId}&subscriptionTier=${subscriptionTier}&marketplaceId=${verifyResponse.marketplaceId}&password=${verifyResponse.defaultPassword}&organizationName=${encodeURIComponent(verifyResponse.organizationName || '')}`);
          return;
        }

        const options = {
          key: keyId,
          amount,
          currency,
          name: 'M&A Kitchen',
          description: `${plan.name} - ${plan.duration}`,
          order_id: orderId,
          handler: async (responseRazorpay) => {
            try {
              const verifyResponse = await buyerAPI.verifyPayment({
                razorpay_order_id: responseRazorpay.razorpay_order_id,
                razorpay_payment_id: responseRazorpay.razorpay_payment_id,
                razorpay_signature: responseRazorpay.razorpay_signature,
                buyerId,
                subscriptionTier,
              });

              toast.success('Payment successful!');
              // verifyResponse is already the data object from buyerAPI.verifyPayment
              const verifyData = verifyResponse?.data || verifyResponse;
              navigate(`/success?buyerId=${buyerId}&subscriptionTier=${subscriptionTier}&marketplaceId=${verifyData.marketplaceId}&password=${verifyData.defaultPassword}&organizationName=${encodeURIComponent(verifyData.organizationName || '')}`);
            } catch (error) {
              console.error('Payment verification error:', error);
              const errorMessage = error.response?.data?.error?.description || 
                                  error.response?.data?.error?.message ||
                                  error.message ||
                                  'Payment verification failed. Please contact support.';
              toast.error(errorMessage);
            } finally {
              setLoading(false);
            }
          },
          prefill: {
            email: orderData.email || '',
          },
          notes: {
            subscriptionTier: subscriptionTier,
            buyerId: buyerId,
          },
          error: (error) => {
            console.error('Razorpay payment error:', error);
            setLoading(false);
            const errorDescription = error.error?.description || error.error?.reason || error.error?.message || 'Payment failed';
            
            if (errorDescription.includes('maximum amount') || errorDescription.includes('exceeds')) {
              toast.error('Payment amount exceeds the maximum allowed limit. Please contact support or try a different payment method.');
            } else if (errorDescription.includes('currency')) {
              toast.error('Currency not supported. Please contact support.');
            } else {
              toast.error(`Payment failed: ${errorDescription}`);
            }
          },
          theme: {
            color: '#5D3FD3',
          },
          modal: {
            ondismiss: () => {
              setLoading(false);
              toast.info('Payment cancelled');
            },
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
        return;
      }

      // Seller payment flow
      if (sellerId) {
        const response = await sellerAPI.createPaymentOrder(sellerId, subscriptionTier);
        // sellerAPI.createPaymentOrder returns the data object directly (already extracted)
        // It returns { orderId, amount, currency, keyId, testMode } or { success: true, data: {...} }
        const orderData = response?.data || response;
        const { orderId, amount, currency, keyId, testMode, amountCapped, originalAmount } = orderData;

        // Show warning if amount was capped for test mode
        if (amountCapped && originalAmount) {
          const originalInr = (originalAmount / 100).toLocaleString('en-IN', { maximumFractionDigits: 0 });
          const cappedInr = (amount / 100).toLocaleString('en-IN', { maximumFractionDigits: 0 });
          toast.warning(`⚠️ Test Mode: Payment amount capped to ₹${cappedInr} (original: ₹${originalInr}) due to Razorpay test limits`, { autoClose: 5000 });
        }

        // Test mode: simulate payment without opening Razorpay UI
        if (testMode) {
          toast.info('Test Mode: Simulating payment...');
          await new Promise((resolve) => setTimeout(resolve, 2000));

          const verifyResponse = await sellerAPI.verifyPayment({
            razorpay_order_id: orderId,
            razorpay_payment_id: `test_pay_${Date.now()}`,
            razorpay_signature: 'test_signature',
            sellerId,
            subscriptionTier,
          });

          toast.success('Payment completed!');
          // verifyResponse is already the data object from sellerAPI.verifyPayment
          const verifyData = verifyResponse?.data || verifyResponse;
          navigate(`/success?sellerId=${sellerId}&subscriptionTier=${subscriptionTier}&marketplaceId=${verifyData.marketplaceId}&password=${verifyData.defaultPassword}&organizationName=${encodeURIComponent(verifyData.organizationName || '')}`);
          return;
        }

        const options = {
          key: keyId,
          amount,
          currency,
          name: 'M&A Kitchen',
          description: `${plan.name} - ${plan.duration}`,
          order_id: orderId,
          handler: async (response) => {
            try {
              const verifyResponse = await sellerAPI.verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                sellerId,
                subscriptionTier,
              });

              toast.success('Payment successful!');
              // verifyResponse is already the data object from sellerAPI.verifyPayment
              const verifyData = verifyResponse?.data || verifyResponse;
              navigate(`/success?sellerId=${sellerId}&subscriptionTier=${subscriptionTier}&marketplaceId=${verifyData.marketplaceId}&password=${verifyData.defaultPassword}&organizationName=${encodeURIComponent(verifyData.organizationName || '')}`);
            } catch (error) {
              console.error('Payment verification error:', error);
              const errorMessage = error.response?.data?.error?.description || 
                                  error.response?.data?.error?.message ||
                                  error.message ||
                                  'Payment verification failed. Please contact support.';
              toast.error(errorMessage);
            } finally {
              setLoading(false);
            }
          },
          prefill: {
            email: orderData.email || '',
          },
          notes: {
            subscriptionTier: subscriptionTier,
            sellerId: sellerId,
          },
          error: (error) => {
            console.error('Razorpay payment error:', error);
            setLoading(false);
            const errorDescription = error.error?.description || error.error?.reason || error.error?.message || 'Payment failed';
            
            if (errorDescription.includes('maximum amount') || errorDescription.includes('exceeds')) {
              toast.error('Payment amount exceeds the maximum allowed limit. Please contact support or try a different payment method.');
            } else if (errorDescription.includes('currency')) {
              toast.error('Currency not supported. Please contact support.');
            } else {
              toast.error(`Payment failed: ${errorDescription}`);
            }
          },
          theme: {
            color: '#5D3FD3',
          },
          modal: {
            ondismiss: () => {
              setLoading(false);
              toast.info('Payment cancelled');
            },
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
        return;
      }

      toast.error('Unable to determine user for payment. Please restart the flow.');
    } catch (error) {
      console.error('Payment error:', error);
      const message =
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        error.message ||
        'Failed to initiate payment';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen p-3 sm:p-4" style={{ backgroundColor: '#5D3FD3' }}>
      <div className="w-full max-w-5xl mx-auto py-6 sm:py-8 md:py-10">
        {/* Parent White Card */}
        <div className="bg-white rounded-3xl shadow-2xl px-4 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 ">Complete Your Payment</h1>
            <p className="text-sm sm:text-sm font-medium text-gray-600 m-1">Order Summary</p>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-6 sm:gap-8 items-start">
            {/* Left Box - Order Summary */}
            <div className="border border-gray-200 rounded-2xl p-4 sm:p-6 md:p-7">

              <div className="space-y-4 mb-5">
                {/* Plan details */}
                <div className="pb-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-start justify-between flex-col">
                  <p className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                    {plan.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mb-3">
                    {plan.duration}
                  </p>

                  </div>

                 

                  <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                    ${subscriptionPrice.toLocaleString()}
                  </p>

                </div>

                {/* Value Added Offerings */}
                {selectedOfferings.length > 0 && (
                  <div className="pb-4 border-b border-gray-100">
                    <p className="text-sm text-gray-600 mb-1">
                      Value Added Services
                    </p>
                    <p className="text-xs text-gray-500 mb-2">
                      {selectedOfferings.length} service{selectedOfferings.length !== 1 ? 's' : ''} selected
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-gray-900">
                      ${vaoPrice.toLocaleString()}
                    </p>
                  </div>
                )}

                {/* Cost breakdown */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      ${subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Tax (10%)</span>
                    <span className="font-semibold text-gray-900">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 mt-1 border-t border-gray-100">
                    <span className="text-sm sm:text-base font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-purple-600">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Secure Payment strip */}
              <div className="mt-2 rounded-2xl border border-green-100 bg-gradient-to-r from-green-50 to-green-50 px-4 py-3 flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-green-500">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-800">
                    Secure Payment Guaranteed
                  </p>
                  <p className="text-xs sm:text-sm text-green-700">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </div>
            </div>

            {/* Right Box - Pay Securely Card */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-sky-900 to-slate-800 shadow-2xl px-5 py-6 sm:px-6 sm:py-7 flex flex-col gap-6">
                {/* Light overlay circles */}
                <div className="pointer-events-none absolute inset-0 opacity-40">
                  <div className="absolute -top-16 -right-10 h-40 w-40 rounded-full bg-cyan-400 blur-3xl" />
                  <div className="absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-blue-500 blur-3xl" />
                </div>

                <div className="relative z-10 space-y-4">
                  {/* Pay Securely pill button */}
                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full rounded-full bg-white text-slate-900 py-3 sm:py-3.5 px-4 flex items-center justify-center gap-2 text-sm sm:text-base font-semibold tracking-wide shadow-[0_18px_45px_rgba(0,0,0,0.35)] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      'Processing...'
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Pay Securely
                      </>
                    )}
                  </button>

                  {/* SSL / PCI row */}
                  <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] sm:text-xs text-slate-100/80">
                    <div className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" />
                      <span>SSL Encrypted</span>
                    </div>
                    <div className="w-px h-3.5 bg-slate-500/60" />
                    <div className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" />
                      <span>PCI Compliant</span>
                    </div>
                  </div>
                </div>

                {/* Card brands row */}
                <div className="relative z-10 mt-2 flex flex-col gap-3">
                  <div className="flex justify-center gap-2 text-[10px] sm:text-xs text-slate-200/80">
                    <span className="uppercase tracking-[0.18em] px-3 py-1 rounded-full bg-slate-900/50 border border-slate-500/60">
                      Visa
                    </span>
                    <span className="uppercase tracking-[0.18em] px-3 py-1 rounded-full bg-slate-900/50 border border-slate-500/60">
                      Mastercard
                    </span>
                    <span className="uppercase tracking-[0.18em] px-3 py-1 rounded-full bg-slate-900/50 border border-slate-500/60">
                      Razorpay
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back link */}
          <button
            onClick={handleBack}
            className="mt-6 flex items-center gap-2 text-sm sm:text-base text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Subscription
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompletePayment;


