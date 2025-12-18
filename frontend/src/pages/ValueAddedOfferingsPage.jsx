import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ValueAddedOfferings from '../components/shared/ValueAddedOfferings';

function ValueAddedOfferingsPage() {
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];
  const agentId = searchParams.get('agentId');
  const buyerId = searchParams.get('buyerId');
  const sellerId = searchParams.get('sellerId');
  const plan = searchParams.get('plan');
  const tier = searchParams.get('tier');

  const handleContinue = (selectedItems, totalPayable) => {
    const params = new URLSearchParams();
    if (agentId) {
      params.set('agentId', agentId);
    }
    if (buyerId) {
      params.set('buyerId', buyerId);
      if (plan) params.set('plan', plan);
      if (tier) params.set('tier', tier);
    }
    if (sellerId) {
      params.set('sellerId', sellerId);
    }
    if (selectedItems.length > 0) {
      params.set('offerings', JSON.stringify(selectedItems));
      params.set('total', totalPayable);
    }
    navigate(`/payment?${params.toString()}`);
  };

  const handleSkip = () => {
    const params = new URLSearchParams();
    if (agentId) {
      params.set('agentId', agentId);
    }
    if (buyerId) {
      params.set('buyerId', buyerId);
      if (plan) params.set('plan', plan);
      if (tier) params.set('tier', tier);
    }
    if (sellerId) {
      params.set('sellerId', sellerId);
    }
    navigate(`/payment?${params.toString()}`);
  };

  const handleBack = () => {
    if (agentId) {
      navigate(`/agent/register?plan=${plan || 'regular-6'}&tier=${tier || 'regular'}`);
    } else if (buyerId) {
      navigate(`/buyer/register?plan=${plan}&tier=${tier}`);
    } else if (sellerId) {
      navigate(`/seller/register`);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen p-3 sm:p-4" style={{ backgroundColor: '#5D3FD3' }}>
      <div className="w-full max-w-6xl mx-auto py-4 sm:py-6 md:py-8">
        <ValueAddedOfferings
          onContinue={handleContinue}
          onSkip={handleSkip}
          onBack={handleBack}
        />
      </div>
    </div>
  );
}

export default ValueAddedOfferingsPage;

