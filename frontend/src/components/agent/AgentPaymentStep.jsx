import { useState } from 'react';
import { toast } from 'react-toastify';
import { CreditCard, Loader2, Shield, Lock } from 'lucide-react';
import { agentAPI } from '../../services/api';

const TIER_INFO = {
  REGULAR_QUARTERLY: { name: 'Regular (Quarterly)', price: 999, currency: 'USD' },
  SILVER_QUARTERLY: { name: 'Silver (Quarterly)', price: 5999, currency: 'USD' },
  GOLD_QUARTERLY: { name: 'Gold (Quarterly)', price: 12999, currency: 'USD' },
  REGULAR_HALFYEARLY: { name: 'Regular (Half-Yearly)', price: 2999, currency: 'USD' },
};

function AgentPaymentStep({ agentId, subscriptionTier, onComplete, onBack }) {
  const [processing, setProcessing] = useState(false);
  const tierInfo = TIER_INFO[subscriptionTier];

  const handlePayment = async () => {
    try {
      setProcessing(true);

      // Create Razorpay order
      const orderResponse = await agentAPI.createPaymentOrder(agentId, subscriptionTier);
      const { orderId, amount, currency, keyId, testMode } = orderResponse.data;

      // TEST MODE: If in test mode, simulate payment
      if (testMode) {
        console.log('⚠️ TEST MODE: Simulating payment...');
        toast.info('Test Mode: Simulating payment...');
        
        // Wait 2 seconds to simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Verify payment (will skip verification in test mode)
        await agentAPI.verifyPayment({
          razorpay_order_id: orderId,
          razorpay_payment_id: `test_pay_${Date.now()}`,
          razorpay_signature: 'test_signature',
          agentId,
          subscriptionTier,
        });

        toast.success('Test payment completed!');
        onComplete();
        return;
      }

      // Real Razorpay flow
      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: 'M&A Kitchen',
        description: `${tierInfo.name} Subscription`,
        order_id: orderId,
        handler: async function (response) {
          try {
            // Verify payment
            await agentAPI.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              agentId,
              subscriptionTier,
            });

            onComplete();
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#0284c7',
        },
        modal: {
          ondismiss: function () {
            setProcessing(false);
            toast.info('Payment cancelled');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.response?.data?.error?.message || 'Failed to initiate payment');
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Complete Your Payment</h2>
        <p className="text-gray-600 mt-2">Secure payment powered by Razorpay</p>
      </div>

      {/* Order Summary */}
      <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-xl p-6 border border-primary-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Order Summary
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Subscription Plan</span>
            <span className="font-semibold text-gray-900">{tierInfo.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Billing Cycle</span>
            <span className="font-semibold text-gray-900">Monthly</span>
          </div>
          <div className="border-t border-primary-200 pt-3 flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total Amount</span>
            <span className="text-2xl font-bold text-primary-600">${tierInfo.price.toLocaleString()} {tierInfo.currency || 'USD'}</span>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-green-900 mb-1">Secure Payment</h4>
            <p className="text-sm text-green-800">
              Your payment information is encrypted and secure. We use industry-standard 
              security measures to protect your data.
            </p>
          </div>
        </div>
      </div>

      {/* Features Reminder */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">What you'll get:</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
            Instant access to the M&A Kitchen platform
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
            Access to buyers and sellers in your industries
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
            Priority visibility in marketplace
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
            Priority customer support
          </li>
        </ul>
      </div>

      {/* Payment Button */}
      <div className="pt-6">
        <button
          onClick={handlePayment}
          disabled={processing}
          className="w-full btn-primary flex items-center justify-center gap-2 text-lg py-4"
        >
          {processing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              Pay ${tierInfo.price.toLocaleString()} {tierInfo.currency || 'USD'} Securely
            </>
          )}
        </button>
      </div>

      <div className="flex justify-start">
        <button
          type="button"
          onClick={onBack}
          disabled={processing}
          className="btn-secondary"
        >
          Back
        </button>
      </div>

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-6 pt-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Shield className="w-4 h-4" />
          SSL Secured
        </div>
        <div className="flex items-center gap-1">
          <Lock className="w-4 h-4" />
          PCI Compliant
        </div>
      </div>
    </div>
  );
}

export default AgentPaymentStep;

