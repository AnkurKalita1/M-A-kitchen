import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Welcome from './pages/Welcome';
import SubscriptionTiers from './pages/SubscriptionTiers';
import PlanDetails from './pages/PlanDetails';
import BuyerRegistration from './pages/BuyerRegistration';
import PaymentSummary from './pages/PaymentSummary';
import CompletePayment from './pages/CompletePayment';
import AgentRegistration from './pages/AgentRegistration';
import SellerRegistration from './pages/SellerRegistration';
import ValueAddedOfferingsPage from './pages/ValueAddedOfferingsPage';
import Success from './pages/Success';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SubscriptionTiers />} />
        <Route path="/role-selection" element={<Welcome />} />
        <Route path="/plan-details" element={<PlanDetails />} />
        <Route path="/buyer/register" element={<BuyerRegistration />} />
        <Route path="/seller/register" element={<SellerRegistration />} />
        <Route path="/value-added-offerings" element={<ValueAddedOfferingsPage />} />
        <Route path="/payment" element={<PaymentSummary />} />
        <Route path="/complete-payment" element={<CompletePayment />} />
        <Route path="/agent" element={<AgentRegistration />} />
        <Route path="/agent/register" element={<AgentRegistration />} />
        <Route path="/success" element={<Success />} />
        <Route path="/dashboard/:buyerId" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;

