import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#1e1f20]">
      <Navbar />
      <main className="pt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

