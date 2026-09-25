import React from 'react';
import { TrendingUp, ShieldCheck, Activity, Users, User } from 'lucide-react';
import { Language, t } from '../utils/i18n';

interface OwnerBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang?: Language;
}

export const OwnerBottomNav: React.FC<OwnerBottomNavProps> = ({
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
          className={`flex flex-col items-center justify-center min-h-[44px] py-1.5 px-3 rounded-xl transition-all ${
            activeTab === 'home'
              ? 'text-slate-900 dark:text-white font-semibold'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
          }`}>
          <TrendingUp size={18} strokeWidth={1.75} className={activeTab === 'home' ? 'text-emerald-600 dark:text-emerald-400' : ''} />
          <span className="text-[10px] mt-1 font-medium tracking-tight">{t('navHome', lang)}</span>
        </button>

        {/* 2. Vault Tab */}
        <button
          onClick={() => setActiveTab('vault')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1.5 px-3 rounded-xl transition-all ${
            activeTab === 'vault'
              ? 'text-slate-900 dark:text-white font-semibold'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
          }`}>
          <ShieldCheck size={18} strokeWidth={1.75} className={activeTab === 'vault' ? 'text-emerald-600 dark:text-emerald-400' : ''} />
          <span className="text-[10px] mt-1 font-medium tracking-tight">{t('navVault', lang)}</span>
        </button>

        {/* 3. Monitor Tab */}
        <button
          onClick={() => setActiveTab('monitor')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1.5 px-3 rounded-xl transition-all ${
            activeTab === 'monitor'
              ? 'text-slate-900 dark:text-white font-semibold'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
          }`}>
          <Activity size={18} strokeWidth={1.75} className={activeTab === 'monitor' ? 'text-emerald-600 dark:text-emerald-400' : ''} />
          <span className="text-[10px] mt-1 font-medium tracking-tight">{t('navMonitor', lang)}</span>
        </button>

        {/* 4. Security Tab */}
        <button
          onClick={() => setActiveTab('security')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1.5 px-3 rounded-xl transition-all ${
            activeTab === 'security'
              ? 'text-slate-900 dark:text-white font-semibold'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
          }`}>
          <Users size={18} strokeWidth={1.75} className={activeTab === 'security' ? 'text-emerald-600 dark:text-emerald-400' : ''} />
          <span className="text-[10px] mt-1 font-medium tracking-tight">{t('navSecurity', lang)}</span>
        </button>

        {/* 5. Profile Tab */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1.5 px-3 rounded-xl transition-all ${
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
