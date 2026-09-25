import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { backend, BackendState } from '../services/backend';
import { Language, t } from '../utils/i18n';

interface OwnerHomeViewProps {
  user: User;
  onNavigateTab: (tab: string) => void;
  onOpenBroadcast: () => void;
  onOpenMarketplace: () => void;
  onOpenMessenger: () => void;
  onOpenHirePro: () => void;
  onShowToast?: (msg: string) => void;
  lang?: Language;
}

export const OwnerHomeView: React.FC<OwnerHomeViewProps> = ({
  user,
  onNavigateTab,
  onOpenBroadcast,
  onOpenMarketplace,
  onOpenMessenger,
  onOpenHirePro,
  onShowToast,
  lang = 'en'
}) => {
  const [backendState, setBackendState] = useState<BackendState>(backend.getState());

  useEffect(() => {
    return backend.subscribe(() => {
      setBackendState({ ...backend.getState() });
    });
  }, []);

  const gasAlert = backendState.criticalAlerts.find(a => a.unit === '2B' && a.type === 'gas_leak' && a.active);
  const percentage = Math.round((backendState.rentCollected / backendState.rentTotal) * 100);
  const strokeDashoffset = 251.2 - (251.2 * percentage) / 100;

  const handleGasShutoff = () => {
    backend.resolveGasLeakAlert('2B');
    if (onShowToast) {
      onShowToast(lang === 'bn' ? "ফ্ল্যাট ২বি-এর ইমার্জেন্সি ভালভ বন্ধ করা হয়েছে।" : "Emergency solenoid valve closed for Flat 2B. Resident & technician notified.");
    }
  };

  return (
    <div className="space-y-5 animate-fade-in max-w-lg mx-auto pb-6">
      
      {/* 1. Header: Command Center */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] dark:text-white tracking-tight">
            {t('commandCenter', lang)}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
            {user.name || 'Md ABID HASAN SIFAT'}
          </p>
        </div>

        {/* Right Badges: Weather Pill & Profile Icon */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-bold flex items-center gap-1.5 shadow-sm">
            <span>🌤️</span>
            <span>32°C</span>
          </div>

          <div 
            onClick={() => onNavigateTab('profile')}
            title="Click to open Owner Profile"
            className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white font-extrabold text-xs flex items-center justify-center shadow-md cursor-pointer active:scale-95 transition-transform hover:scale-105">
            MA
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-amber-400 border-2 border-white dark:border-slate-900 rounded-full flex items-center justify-center text-[7px] text-slate-900 font-black">
              ✓
            </span>
          </div>
        </div>
      </div>

      {/* 2. CRITICAL ALERT Card (Orange-Red Gradient) */}
      {gasAlert && (
        <div className="rounded-[24px] p-4 sm:p-5 bg-gradient-to-r from-[#FF4D2D] via-[#FF3B30] to-[#E63518] text-white shadow-lg shadow-red-500/20 flex items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shrink-0 border border-white/20">
              ⚠️
            </div>
            <div className="min-w-0">
              <h3 className="font-black text-xs sm:text-sm uppercase tracking-wider truncate">
                {t('criticalAlert', lang)}
              </h3>
              <p className="text-xs text-red-100 font-medium truncate">
                {t('gasLeakAlert', lang)}
              </p>
            </div>
          </div>

          <button
            onClick={handleGasShutoff}
            className="px-4 py-2 rounded-xl bg-white text-[#FF3B30] hover:bg-red-50 font-black text-xs uppercase tracking-wider shadow active:scale-95 shrink-0 transition-all">
            {t('shutoff', lang)}
          </button>
        </div>
      )}

      {/* 3. Rent Collection Card (Deep Navy with Donut Ring) */}
      <div className="rounded-[28px] p-5 sm:p-6 bg-gradient-to-br from-[#121632] via-[#161B3D] to-[#1C224B] text-white shadow-xl flex items-center justify-between gap-4">
        
        {/* Donut Progress Circle */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              className="stroke-slate-700/60"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#00B665"
              strokeWidth="10"
              strokeDasharray="251.2"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute text-center">
            <span className="text-lg sm:text-xl font-black text-white">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Amount Metrics */}
        <div className="space-y-1 flex-1 text-left">
          <span className="text-xs text-slate-300 font-semibold block">
            {t('totalRentCollected', lang)}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-[#00B665] font-mono tracking-tight">
            ৳{backendState.rentCollected.toLocaleString()}
          </div>
          <p className="text-xs text-slate-400 font-medium">
            {lang === 'bn' ? 'মোট লক্ষ্যমাত্রা' : 'of'} <span className="text-slate-300 font-bold font-mono">৳{backendState.rentTotal.toLocaleString()}</span>
          </p>
        </div>
      </div>

      {/* 4. Management Grid (6 Action Cards) */}
      <div className="space-y-3">
        <h3 className="font-black text-sm uppercase tracking-wider text-[#111827] dark:text-white px-1">
          {lang === 'bn' ? 'ম্যানেজমেন্ট হাব' : 'Management Grid'}
        </h3>

        <div className="grid grid-cols-2 gap-3.5">
          
          {/* Card 1: Broadcast Notice */}
          <div
            onClick={onOpenBroadcast}
            className="rounded-[24px] p-5 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col items-center text-center space-y-2.5 cursor-pointer group active:scale-95">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/50 group-hover:bg-sky-100 text-sky-600 dark:text-sky-400 flex items-center justify-center text-2xl transition-colors">
              📣
            </div>
            <span className="font-extrabold text-xs sm:text-sm text-[#111827] dark:text-white">
              {lang === 'bn' ? 'জরুরী নোটিশ' : 'Broadcast Notice'}
            </span>
          </div>

          {/* Card 2: Marketplace (with Notification Dot) */}
          <div
            onClick={onOpenMarketplace}
            className="rounded-[24px] p-5 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col items-center text-center space-y-2.5 cursor-pointer group relative active:scale-95">
            <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 group-hover:bg-amber-100 text-amber-600 dark:text-amber-400 flex items-center justify-center text-2xl transition-colors">
              🏢
            </div>
            <span className="font-extrabold text-xs sm:text-sm text-[#111827] dark:text-white">
              {t('buildingPortfolio', lang)}
            </span>
          </div>

          {/* Card 3: Messenger (with Notification Dot) */}
          <div
            onClick={onOpenMessenger}
            className="rounded-[24px] p-5 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col items-center text-center space-y-2.5 cursor-pointer group relative active:scale-95">
            <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 group-hover:bg-purple-100 text-purple-600 dark:text-purple-400 flex items-center justify-center text-2xl transition-colors">
              💬
            </div>
            <span className="font-extrabold text-xs sm:text-sm text-[#111827] dark:text-white">
              {t('navChat', lang)}
            </span>
          </div>

          {/* Card 4: Hire Pro */}
          <div
            onClick={onOpenHirePro}
            className="rounded-[24px] p-5 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col items-center text-center space-y-2.5 cursor-pointer group active:scale-95">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 group-hover:bg-emerald-100 text-[#00B665] flex items-center justify-center text-2xl transition-colors">
              🔧
            </div>
            <span className="font-extrabold text-xs sm:text-sm text-[#111827] dark:text-white">
              {t('navHirePro', lang)}
            </span>
          </div>

          {/* Card 5: NID Vault */}
          <div
            onClick={() => onNavigateTab('vault')}
            className="rounded-[24px] p-5 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col items-center text-center space-y-2.5 cursor-pointer group active:scale-95">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 text-slate-700 dark:text-slate-200 flex items-center justify-center text-2xl transition-colors">
              🛡️
            </div>
            <span className="font-extrabold text-xs sm:text-sm text-[#111827] dark:text-white">
              {t('navVault', lang)}
            </span>
          </div>

          {/* Card 6: Analytics */}
          <div
            onClick={() => onNavigateTab('monitor')}
            className="rounded-[24px] p-5 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col items-center text-center space-y-2.5 cursor-pointer group active:scale-95">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 group-hover:bg-amber-100 text-amber-600 dark:text-amber-400 flex items-center justify-center text-2xl transition-colors">
              📊
            </div>
            <span className="font-extrabold text-xs sm:text-sm text-[#111827] dark:text-white">
              {t('ghostBillMonitor', lang)}
            </span>
          </div>

        </div>
      </div>

      {/* 5. Recent Activity Feed */}
      <div className="rounded-[28px] p-5 sm:p-6 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">📈</span>
          <h3 className="font-extrabold text-base text-[#111827] dark:text-white">
            {lang === 'bn' ? 'সাম্প্রতিক কার্যক্রম' : 'Recent Activity'}
          </h3>
        </div>

        <div className="space-y-3">
          {backendState.recentActivities.slice(0, 5).map(act => (
            <div
              key={act.id}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0D1117] border border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                act.type === 'success'
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                  : act.type === 'warning'
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                  : 'bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400'
              }`}>
                {act.type === 'success' ? '✓' : act.type === 'warning' ? '!' : 'ℹ'}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-[#111827] dark:text-white truncate">
                  {act.text}
                </h4>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                  {act.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
