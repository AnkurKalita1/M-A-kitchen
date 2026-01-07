import { Routes, Route } from 'react-router-dom';

// Layout
import Layout from './components/Layout';

// Landing Pages
import Home from './pages/home/Home';
import AboutUs from './pages/about-us/AboutUs';
import Buyers from './pages/buyers/Buyers';
import Sellers from './pages/sellers/Sellers';
import Agents from './pages/agents/Agents';
import VAOs from './pages/vaos/VAOs';
import MarketplaceLogin from './pages/marketplace/MarketplaceLogin';
import BuyerMarketplace from './pages/marketplace/buyer/BuyerMarketplace';
import SellerMarketplace from './pages/marketplace/seller/SellerMarketplace';
import AgentMarketplace from './pages/marketplace/agent/AgentMarketplace';
import LiveAuction from './pages/live-auction/LiveAuction';
import Helpdesk from './pages/helpdesk/Helpdesk';
import ContactUs from './pages/contact-us/ContactUs';
import Admin from './pages/admin/Admin';

function App() {
  return (
  <Routes>
      {/* Landing Pages with Navbar */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/buyers" element={<Buyers />} />
        <Route path="/sellers" element={<Sellers />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/vaos" element={<VAOs />} />
        <Route path="/marketplace" element={<MarketplaceLogin />} />
        <Route path="/live-auction" element={<LiveAuction />} />
        <Route path="/helpdesk" element={<Helpdesk />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
      
      {/* Marketplace Pages (without Layout) */}
      <Route path="/marketplace/buyer" element={<BuyerMarketplace />} />
      <Route path="/marketplace/seller" element={<SellerMarketplace />} />
      <Route path="/marketplace/agent" element={<AgentMarketplace />} />
    </Routes>
  

  )
}

export default App;
