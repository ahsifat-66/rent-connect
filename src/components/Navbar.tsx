import React from 'react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
  onOpenAuthModal: () => void;
  isOwnerView: boolean;
  setIsOwnerView: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  setActiveTab,
  theme,
  setTheme,
  onOpenAuthModal,
  isOwnerView,
  setIsOwnerView
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/95 dark:bg-[#161B22]/95 border-b border-slate-200/80 dark:border-slate-800 px-3.5 sm:px-8 py-2 sm:py-3 transition-colors duration-200">
      <div className="max-w-md sm:max-w-5xl mx-auto flex items-center justify-between gap-2">
        
        {/* Brand Logo */}
        <div 
          onClick={() => { setActiveTab('home'); setIsOwnerView(false); }}
          className="flex items-center gap-2 cursor-pointer select-none">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#121632] to-[#00B665] flex items-center justify-center text-white font-black text-sm shadow-md shrink-0">
            RC
          </div>
          <div className="min-w-0">
            <span className="font-black text-sm sm:text-lg tracking-tight text-[#111827] dark:text-white truncate block">
              RentConnect
            </span>
          </div>
        </div>

        {/* Desktop Quick Nav */}
        <nav className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200/60 dark:border-slate-700">
          {[
            { id: 'home', label: 'Home' },
            { id: 'lease', label: 'Lease' },
            { id: 'pay', label: 'Pay' },
            { id: 'guests', label: 'Guests' },
            { id: 'marketplace', label: 'Marketplace' },
            { id: 'messenger', label: 'Chat' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setIsOwnerView(false); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-[#161B22] text-[#111827] dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}>
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Light / Dark Mode Toggle Pill */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setTheme('light')}
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
            <span>Log Out</span>
          </button>

          {/* Quick Avatar Trigger to open User Profile */}
          {user && (
            <div 
              onClick={() => setActiveTab('profile')}
              title="Click to view and edit My Profile"
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
