import React from 'react';
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
          <span className="text-xl">📈</span>
          <span className="text-[11px] mt-0.5 font-bold">{t('navHome', lang)}</span>
        </button>

        {/* 2. Vault Tab */}
        <button
          onClick={() => setActiveTab('vault')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all ${
            activeTab === 'vault'
              ? 'text-[#111827] dark:text-white font-extrabold scale-105'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
          }`}>
          <span className="text-xl">🛡️</span>
          <span className="text-[11px] mt-0.5 font-bold">{t('navVault', lang)}</span>
        </button>

        {/* 3. Monitor Tab */}
        <button
          onClick={() => setActiveTab('monitor')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all ${
            activeTab === 'monitor'
              ? 'text-[#111827] dark:text-white font-extrabold scale-105'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
          }`}>
          <span className="text-xl">📊</span>
          <span className="text-[11px] mt-0.5 font-bold">{t('navMonitor', lang)}</span>
        </button>

        {/* 4. Security Tab */}
        <button
          onClick={() => setActiveTab('security')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all ${
            activeTab === 'security'
              ? 'text-[#111827] dark:text-white font-extrabold scale-105'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
          }`}>
          <span className="text-xl">👥</span>
          <span className="text-[11px] mt-0.5 font-bold">{t('navSecurity', lang)}</span>
        </button>

        {/* 5. Profile Tab */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all ${
            activeTab === 'profile'
              ? 'text-[#111827] dark:text-white font-extrabold scale-105'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
          }`}>
          <span className="text-xl">👤</span>
          <span className="text-[11px] mt-0.5 font-bold">{t('navProfile', lang)}</span>
        </button>

      </div>
    </nav>
  );
};
