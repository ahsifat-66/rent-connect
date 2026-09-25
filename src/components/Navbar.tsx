import React from 'react';
import { User } from '../types';
import { Language, t } from '../utils/i18n';
import {
  TrendingUp,
  ShieldCheck,
  Activity,
  Users,
  Building2,
  MessageSquare,
  Wrench,
  User as UserIcon,
  Home,
  FileText,
  CreditCard,
  ShoppingBag,
  Sun,
  Moon,
  LogOut,
  ArrowLeftRight
} from 'lucide-react';

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
    { id: 'home', label: t('navHome', lang), icon: TrendingUp },
    { id: 'vault', label: t('navVault', lang), icon: ShieldCheck },
    { id: 'monitor', label: t('navMonitor', lang), icon: Activity },
    { id: 'security', label: t('navSecurity', lang), icon: Users },
    { id: 'marketplace', label: t('navMarket', lang), icon: Building2 },
    { id: 'messenger', label: t('navChat', lang), icon: MessageSquare },
    { id: 'hirepro', label: t('navDispatch', lang), icon: Wrench },
    { id: 'profile', label: t('navProfile', lang), icon: UserIcon }
  ];

  const tenantNavItems = [
    { id: 'home', label: t('navHome', lang), icon: Home },
    { id: 'lease', label: t('navLease', lang), icon: FileText },
    { id: 'pay', label: t('navPay', lang), icon: CreditCard },
    { id: 'guests', label: t('navGuests', lang), icon: Users },
    { id: 'hirepro', label: t('navHirePro', lang), icon: Wrench },
    { id: 'marketplace', label: t('navMarket', lang), icon: ShoppingBag },
    { id: 'chat', label: t('navChat', lang), icon: MessageSquare },
    { id: 'profile', label: t('navProfile', lang), icon: UserIcon }
  ];

  const navItems = isOwnerView ? ownerNavItems : tenantNavItems;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/95 dark:bg-[#161B22]/95 border-b border-slate-200/80 dark:border-slate-800 px-3 sm:px-6 py-2.5 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo & Role Pill */}
        <div className="flex items-center gap-2.5">
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer select-none group">
            <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-emerald-600 flex items-center justify-center text-white font-black text-xs tracking-wider shadow-sm shrink-0 transition-transform group-hover:scale-105">
              RC
            </div>
            <div className="min-w-0">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white truncate block">
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
            title="Switch between Landlord and Resident modes"
            className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border transition-all active:scale-95 flex items-center gap-1.5 min-h-[32px] ${
              isOwnerView
                ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20 hover:bg-amber-500/15'
                : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/15'
            }`}>
            <ArrowLeftRight strokeWidth={1.75} size={13} className="shrink-0" />
            <span>{isOwnerView ? (lang === 'bn' ? 'মালিকানা' : 'Landlord') : (lang === 'bn' ? 'ভাড়াটিয়া' : 'Resident')}</span>
          </button>
        </div>

        {/* Desktop Quick Nav */}
        <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-slate-100/80 dark:bg-slate-800/60 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/60 overflow-x-auto scrollbar-none">
          {navItems.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white dark:bg-[#161B22] text-slate-900 dark:text-white shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}>
                <Icon strokeWidth={1.75} size={15} className={isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Real-Time Language Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setLang('en')}
              title="English"
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all min-h-[28px] ${
                lang === 'en'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}>
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('bn')}
              title="বাংলা"
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all min-h-[28px] ${
                lang === 'bn'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
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
              className={`p-1.5 rounded-lg transition-all min-h-[28px] min-w-[28px] flex items-center justify-center ${
                theme === 'light'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-400 hover:text-slate-700 dark:text-slate-400'
              }`}>
              <Sun strokeWidth={1.75} size={15} />
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              title="Dark Mode"
              className={`p-1.5 rounded-lg transition-all min-h-[28px] min-w-[28px] flex items-center justify-center ${
                theme === 'dark'
                  ? 'bg-[#161B22] text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-700 dark:text-slate-400'
              }`}>
              <Moon strokeWidth={1.75} size={15} />
            </button>
          </div>

          {/* Log Out Button */}
          <button
            onClick={onOpenAuthModal}
            title="Log out and return to Login screen"
            className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:hover:bg-rose-900/40 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 transition-all flex items-center gap-1.5 active:scale-95 min-h-[32px]">
            <LogOut strokeWidth={1.75} size={14} />
            <span className="hidden sm:inline">{t('logout', lang)}</span>
          </button>

          {/* Quick Avatar Trigger */}
          {user && (
            <div 
              onClick={() => setActiveTab('profile')}
              title={`View ${user.name}'s Profile`}
              className="relative w-8 h-8 rounded-full ring-2 ring-emerald-500/70 cursor-pointer shrink-0 active:scale-95 transition-transform hover:scale-105">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-white dark:border-slate-900"></span>
            </div>
          )}

        </div>

      </div>
    </header>
  );
};
