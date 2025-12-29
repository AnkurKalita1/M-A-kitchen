import { Gavel } from 'lucide-react';

const LiveAuction = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#1e1f20]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Gavel className="w-16 h-16 mx-auto text-purple-600 mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">Live Auction</h1>
          <p className="text-xl text-gray-300">
            Participate in real-time auctions for exclusive investment opportunities
          </p>
        </div>

        <div className="bg-[#1e1f20] border border-gray-700 p-8 rounded-lg shadow-md">
          <p className="text-gray-300 text-center">
            Live auction functionality will be displayed here. View active auctions, place bids, and track your participation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveAuction;

