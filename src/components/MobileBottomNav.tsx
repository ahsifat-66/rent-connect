import React from 'react';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang?: 'en' | 'bn';
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#161B22]/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800 pb-safe pt-1.5 px-3 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <div className="max-w-md mx-auto flex items-center justify-around">
        
        {/* 1. Home Tab */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all ${
            activeTab === 'home'
              ? 'text-[#111827] dark:text-white font-extrabold scale-105'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
          }`}>
          <span className="text-xl">🏠</span>
          <span className="text-[11px] mt-0.5 font-bold">Home</span>
        </button>

        {/* 2. Lease Tab */}
        <button
          onClick={() => setActiveTab('lease')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all ${
            activeTab === 'lease'
              ? 'text-[#111827] dark:text-white font-extrabold scale-105'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
          }`}>
          <span className="text-xl">📄</span>
          <span className="text-[11px] mt-0.5 font-bold">Lease</span>
        </button>

        {/* 3. Pay Tab */}
        <button
          onClick={() => setActiveTab('pay')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all ${
            activeTab === 'pay'
              ? 'text-[#00B665] font-extrabold scale-105'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
          }`}>
          <span className="text-xl">💲</span>
          <span className="text-[11px] mt-0.5 font-bold">Pay</span>
        </button>

        {/* 4. Chat to Owner Tab */}
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all relative ${
            activeTab === 'chat' || activeTab === 'messenger'
              ? 'text-sky-500 font-extrabold scale-105'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
          }`}>
          <span className="text-xl relative">
            💬
            <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-emerald-500 border border-white dark:border-[#161B22]"></span>
          </span>
          <span className="text-[11px] mt-0.5 font-bold">Chat</span>
        </button>

        {/* 5. Guests / Security Tab */}
        <button
          onClick={() => setActiveTab('guests')}
          className={`flex flex-col items-center py-1.5 px-2 rounded-2xl transition-all ${
            activeTab === 'guests'
              ? 'text-[#111827] dark:text-white font-extrabold scale-105'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
          }`}>
          <span className="text-xl">👥</span>
          <span className="text-[11px] mt-0.5 font-bold">Guests</span>
        </button>

        {/* 6. Profile Tab */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center py-1.5 px-2 rounded-2xl transition-all ${
            activeTab === 'profile'
              ? 'text-[#111827] dark:text-white font-extrabold scale-105'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
          }`}>
          <span className="text-xl">👤</span>
          <span className="text-[11px] mt-0.5 font-bold">Profile</span>
        </button>

      </div>
    </nav>
  );
};

