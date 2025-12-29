import { Shield, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#1e1f20]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Shield className="w-16 h-16 mx-auto text-purple-600 mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">Admin Portal</h1>
          <p className="text-xl text-gray-300">
            Administrative access to manage the platform
          </p>
        </div>

        <div className="bg-[#1e1f20] border border-gray-700 p-8 rounded-lg shadow-md">
          <div className="text-center">
            <Lock className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-4 text-white">Restricted Access</h2>
            <p className="text-gray-300 mb-6">
              This area is restricted to authorized administrators only. Please log in to continue.
            </p>
            <Link
              to="/login"
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Login to Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

