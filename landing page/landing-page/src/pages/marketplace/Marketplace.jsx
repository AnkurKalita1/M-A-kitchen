import { Store } from 'lucide-react';

const Marketplace = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Store className="w-16 h-16 mx-auto text-purple-600 mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">Marketplace</h1>
          <p className="text-xl text-gray-300">
            Browse and discover investment opportunities
          </p>
        </div>

        <div className="bg-[#1e1f20] border border-gray-700 p-8 rounded-lg shadow-md">
          <p className="text-gray-300 text-center">
            Marketplace content will be displayed here. Browse available listings, filter by industry, size, and more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;

