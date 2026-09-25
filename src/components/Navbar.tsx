import React from 'react';
import { User } from '../types';
import { Language, t } from '../utils/i18n';

interface NavbarProps {
  user: User | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
  onOpenAuthModal: () => void;
  isOwnerView: boolean;
  setIsOwnerView: (val: boolean) => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  setActiveTab,
  theme,
  setTheme,
  onOpenAuthModal,
  isOwnerView,
  setIsOwnerView,
  lang,
  setLang
}) => {
  const ownerNavItems = [
    { id: 'home', label: `📈 ${t('navHome', lang)}` },
    { id: 'vault', label: `🛡️ ${t('navVault', lang)}` },
    { id: 'monitor', label: `📊 ${t('navMonitor', lang)}` },
    { id: 'security', label: `👥 ${t('navSecurity', lang)}` },
    { id: 'marketplace', label: `🏢 ${t('navMarket', lang)}` },
    { id: 'messenger', label: `💬 ${t('navChat', lang)}` },
    { id: 'hirepro', label: `🔧 ${t('navDispatch', lang)}` },
    { id: 'profile', label: `👤 ${t('navProfile', lang)}` }
  ];

  const tenantNavItems = [
    { id: 'home', label: `🏠 ${t('navHome', lang)}` },
    { id: 'lease', label: `📄 ${t('navLease', lang)}` },
    { id: 'pay', label: `💲 ${t('navPay', lang)}` },
    { id: 'guests', label: `👥 ${t('navGuests', lang)}` },
    { id: 'hirepro', label: `🛠️ ${t('navHirePro', lang)}` },
    { id: 'marketplace', label: `🛍️ ${t('navMarket', lang)}` },
    { id: 'chat', label: `💬 ${t('navChat', lang)}` },
    { id: 'profile', label: `👤 ${t('navProfile', lang)}` }
  ];

  const navItems = isOwnerView ? ownerNavItems : tenantNavItems;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/95 dark:bg-[#161B22]/95 border-b border-slate-200/80 dark:border-slate-800 px-3 sm:px-6 py-2 transition-colors duration-200">
      <div className="max-w-md sm:max-w-6xl mx-auto flex items-center justify-between gap-2">
        
        {/* Brand Logo & Role Pill */}
        <div className="flex items-center gap-2">
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 cursor-pointer select-none">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#121632] to-[#00B665] flex items-center justify-center text-white font-black text-sm shadow-md shrink-0">
              RC
            </div>
            <div className="min-w-0">
              <span className="font-black text-sm sm:text-base tracking-tight text-[#111827] dark:text-white truncate block">
                {t('brandName', lang)}
              </span>
            </div>
          </div>

          {/* Quick Role Switcher Pill */}
          <button
            onClick={() => {
              const nextMode = !isOwnerView;
              setIsOwnerView(nextMode);
              setActiveTab('home');
            }}
            title="Click to switch between Owner and Tenant views"
            className={`px-2 sm:px-2.5 py-1 rounded-full text-[10px] font-black tracking-wide border transition-all active:scale-95 flex items-center gap-1 ${
              isOwnerView
                ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/25'
                : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25'
            }`}>
            <span>{isOwnerView ? (lang === 'bn' ? '👑 বাড়িওয়ালা' : '👑 Owner') : (lang === 'bn' ? '🛡️ ভাড়াটিয়া' : '🛡️ Tenant')}</span>
            <span className="text-[9px] opacity-70 underline hidden sm:inline">{t('switchRole', lang)}</span>
          </button>
        </div>

        {/* Desktop Quick Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl border border-slate-200/60 dark:border-slate-700">
          {navItems.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-[#161B22] text-[#111827] dark:text-white shadow-sm scale-105'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}>
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Real-Time Language Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setLang('en')}
              title="English"
              className={`px-2 py-1 rounded-lg text-[11px] font-black transition-all ${
                lang === 'en'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}>
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('bn')}
              title="বাংলা"
              className={`px-2 py-1 rounded-lg text-[11px] font-black transition-all ${
                lang === 'bn'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}>
              বাং
            </button>
          </div>

          {/* Light / Dark Mode Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setTheme('light')}
              title="Light Mode"
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                theme === 'light'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}>
              <span>☀️</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              title="Dark Mode"
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                theme === 'dark'
                  ? 'bg-[#161B22] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}>
              <span>🌙</span>
            </button>
          </div>

          {/* Log Out Button */}
          <button
            onClick={onOpenAuthModal}
            title="Log out and return to Login / Sign Up screen"
            className="px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-extrabold bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 transition-all flex items-center gap-1.5 active:scale-95">
            <span>🚪</span>
            <span className="hidden sm:inline">{t('logout', lang)}</span>
          </button>

          {/* Quick Avatar Trigger */}
          {user && (
            <div 
              onClick={() => setActiveTab('profile')}
              title={`View ${user.name}'s Profile`}
              className="relative w-8 h-8 rounded-full ring-2 ring-emerald-500 cursor-pointer shrink-0 active:scale-95 transition-transform hover:scale-105">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
            </div>
          )}

        </div>

      </div>
    </header>
  );
};
