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
import Marketplace from './pages/marketplace/Marketplace';
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
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/live-auction" element={<LiveAuction />} />
        <Route path="/helpdesk" element={<Helpdesk />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  

  )
}

export default App;
