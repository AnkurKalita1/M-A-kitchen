import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BuyerRegistration from './pages/BuyerRegistration';
import Success from './pages/Success';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BuyerRegistration />} />
        <Route path="/success" element={<Success />} />
        <Route path="/dashboard/:buyerId" element={<Dashboard />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;

