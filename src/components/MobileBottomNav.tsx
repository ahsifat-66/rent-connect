import React from 'react';
import { Home, FileText, CreditCard, MessageSquare, Users, User } from 'lucide-react';
import { Language, t } from '../utils/i18n';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang?: Language;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  lang = 'en'
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#161B22]/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800 pb-safe pt-1.5 px-3 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <div className="max-w-md mx-auto flex items-center justify-around">
        
        {/* 1. Home Tab */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1.5 px-2.5 rounded-xl transition-all ${
            activeTab === 'home'
              ? 'text-slate-900 dark:text-white font-semibold'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
          }`}>
          <Home size={18} strokeWidth={1.75} className={activeTab === 'home' ? 'text-emerald-600 dark:text-emerald-400' : ''} />
          <span className="text-[10px] mt-1 font-medium tracking-tight">{t('navHome', lang)}</span>
        </button>

        {/* 2. Lease Tab */}
        <button
          onClick={() => setActiveTab('lease')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1.5 px-2.5 rounded-xl transition-all ${
            activeTab === 'lease'
              ? 'text-slate-900 dark:text-white font-semibold'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
          }`}>
          <FileText size={18} strokeWidth={1.75} className={activeTab === 'lease' ? 'text-emerald-600 dark:text-emerald-400' : ''} />
          <span className="text-[10px] mt-1 font-medium tracking-tight">{t('navLease', lang)}</span>
        </button>

        {/* 3. Pay Tab */}
        <button
          onClick={() => setActiveTab('pay')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1.5 px-2.5 rounded-xl transition-all ${
            activeTab === 'pay'
              ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
          }`}>
          <CreditCard size={18} strokeWidth={1.75} className={activeTab === 'pay' ? 'text-emerald-600 dark:text-emerald-400' : ''} />
          <span className="text-[10px] mt-1 font-medium tracking-tight">{t('navPay', lang)}</span>
        </button>

        {/* 4. Chat to Owner Tab */}
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1.5 px-2.5 rounded-xl transition-all relative ${
            activeTab === 'chat' || activeTab === 'messenger'
              ? 'text-sky-600 dark:text-sky-400 font-semibold'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
          }`}>
          <div className="relative">
            <MessageSquare size={18} strokeWidth={1.75} className={activeTab === 'chat' || activeTab === 'messenger' ? 'text-sky-600 dark:text-sky-400' : ''} />
            <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-emerald-500 border border-white dark:border-[#161B22]" />
          </div>
          <span className="text-[10px] mt-1 font-medium tracking-tight">{t('navChat', lang)}</span>
        </button>

        {/* 5. Guests / Security Tab */}
        <button
          onClick={() => setActiveTab('guests')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1.5 px-2 rounded-xl transition-all ${
            activeTab === 'guests'
              ? 'text-slate-900 dark:text-white font-semibold'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
          }`}>
          <Users size={18} strokeWidth={1.75} className={activeTab === 'guests' ? 'text-emerald-600 dark:text-emerald-400' : ''} />
          <span className="text-[10px] mt-1 font-medium tracking-tight">{t('navGuests', lang)}</span>
        </button>

        {/* 6. Profile Tab */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1.5 px-2 rounded-xl transition-all ${
            activeTab === 'profile'
              ? 'text-slate-900 dark:text-white font-semibold'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
          }`}>
          <User size={18} strokeWidth={1.75} className={activeTab === 'profile' ? 'text-emerald-600 dark:text-emerald-400' : ''} />
          <span className="text-[10px] mt-1 font-medium tracking-tight">{t('navProfile', lang)}</span>
        </button>

      </div>
    </nav>
  );
};
