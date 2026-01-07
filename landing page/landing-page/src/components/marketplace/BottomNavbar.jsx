const BottomNavbar = ({ activeTab = 'marketplace' }) => {
  const navItems = [
    { id: 'marketplace', label: 'Marketplace', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { id: 'favorites', label: 'Favorites', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    { id: 'messages', label: 'Messages', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { id: 'profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-[#1e1f20] border-gray-700 px-2 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-around z-50">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`flex flex-col items-center gap-0.5 sm:gap-1 ${
            activeTab === item.id ? 'text-blue-500' : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
          </svg>
          <span className="text-[10px] sm:text-xs">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNavbar;



