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
    <div className="space-y-6 animate-fade-in w-full pb-6">
      
      {/* 1. Header: Command Center */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] dark:text-white tracking-tight">
            {t('commandCenter', lang)}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
            {user.name || 'Md ABID HASAN SIFAT'} · Gulshan Luxury Tower Portfolio
          </p>
        </div>

        {/* Right Badges: Weather Pill & Profile Icon */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-bold flex items-center gap-1.5 shadow-sm">
            <span>🌤️</span>
            <span>32°C Dhaka</span>
          </div>

          <div 
            onClick={() => onNavigateTab('profile')}
            title="Click to open Owner Profile"
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center shadow-md cursor-pointer active:scale-95 transition-transform hover:scale-105">
            MA
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-amber-400 border-2 border-white dark:border-slate-900 rounded-full flex items-center justify-center text-[7px] text-slate-900 font-black">
              ✓
            </span>
          </div>
        </div>
      </div>

      {/* 2. CRITICAL ALERT Card (Full Width) */}
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

      {/* 3. Main Responsive Content Grid: Stacks on mobile, 12-cols on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (Desktop: 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Rent Collection Card (Deep Navy with Donut Ring) */}
          <div className="rounded-[28px] p-5 sm:p-7 bg-gradient-to-br from-[#121632] via-[#161B3D] to-[#1C224B] text-white shadow-xl flex items-center justify-between gap-4">
            
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

          {/* Quick Metrics Bar: 3 KPI Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="card-luxury p-3.5 sm:p-4 text-center">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 block uppercase">Occupancy</span>
              <span className="text-xl sm:text-2xl font-black text-[#111827] dark:text-white">91%</span>
              <span className="text-[10px] text-emerald-500 font-bold block">10/11 Units</span>
            </div>
            <div className="card-luxury p-3.5 sm:p-4 text-center">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 block uppercase">Check-ins</span>
              <span className="text-xl sm:text-2xl font-black text-blue-600 font-mono">{backendState.checkinsToday}</span>
              <span className="text-[10px] text-slate-400 font-semibold block">Today · Pass</span>
            </div>
            <div className="card-luxury p-3.5 sm:p-4 text-center">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 block uppercase">Compliance</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-600 font-mono">{backendState.complianceRate}%</span>
              <span className="text-[10px] text-emerald-500 font-bold block">DMP Verified</span>
            </div>
          </div>

          {/* Management Grid (6 Action Cards: 2 cols on mobile, 3 cols on sm/desktop) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-black text-sm uppercase tracking-wider text-[#111827] dark:text-white">
                {lang === 'bn' ? 'ম্যানেজমেন্ট হাব' : 'Management Grid'}
              </h3>
              <span className="text-xs text-slate-400 font-medium">Quick Operations</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              
              {/* Card 1: Broadcast Notice */}
              <div
                onClick={onOpenBroadcast}
                className="rounded-[24px] p-4 sm:p-5 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col items-center text-center space-y-2 cursor-pointer group active:scale-95 hover:border-emerald-500/30">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/50 group-hover:bg-sky-100 text-sky-600 dark:text-sky-400 flex items-center justify-center text-2xl transition-colors">
                  📣
                </div>
                <span className="font-extrabold text-xs sm:text-sm text-[#111827] dark:text-white">
                  {lang === 'bn' ? 'জরুরী নোটিশ' : 'Notice Board'}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Publish Alerts</span>
              </div>

              {/* Card 2: Marketplace */}
              <div
                onClick={onOpenMarketplace}
                className="rounded-[24px] p-4 sm:p-5 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col items-center text-center space-y-2 cursor-pointer group relative active:scale-95 hover:border-emerald-500/30">
                <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 group-hover:bg-amber-100 text-amber-600 dark:text-amber-400 flex items-center justify-center text-2xl transition-colors">
                  🏢
                </div>
                <span className="font-extrabold text-xs sm:text-sm text-[#111827] dark:text-white">
                  {t('buildingPortfolio', lang)}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Vacants & Leases</span>
              </div>

              {/* Card 3: Messenger */}
              <div
                onClick={onOpenMessenger}
                className="rounded-[24px] p-4 sm:p-5 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col items-center text-center space-y-2 cursor-pointer group relative active:scale-95 hover:border-emerald-500/30">
                <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 group-hover:bg-purple-100 text-purple-600 dark:text-purple-400 flex items-center justify-center text-2xl transition-colors">
                  💬
                </div>
                <span className="font-extrabold text-xs sm:text-sm text-[#111827] dark:text-white">
                  {t('navChat', lang)}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Direct Resident Line</span>
              </div>

              {/* Card 4: Hire Pro */}
              <div
                onClick={onOpenHirePro}
                className="rounded-[24px] p-4 sm:p-5 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col items-center text-center space-y-2 cursor-pointer group active:scale-95 hover:border-emerald-500/30">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 group-hover:bg-emerald-100 text-[#00B665] flex items-center justify-center text-2xl transition-colors">
                  🔧
                </div>
                <span className="font-extrabold text-xs sm:text-sm text-[#111827] dark:text-white">
                  {t('navHirePro', lang)}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Contractor Dispatch</span>
              </div>

              {/* Card 5: NID Vault */}
              <div
                onClick={() => onNavigateTab('vault')}
                className="rounded-[24px] p-4 sm:p-5 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col items-center text-center space-y-2 cursor-pointer group active:scale-95 hover:border-emerald-500/30">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 text-slate-700 dark:text-slate-200 flex items-center justify-center text-2xl transition-colors">
                  🛡️
                </div>
                <span className="font-extrabold text-xs sm:text-sm text-[#111827] dark:text-white">
                  {t('navVault', lang)}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Tenant Directory</span>
              </div>

              {/* Card 6: Submeter Monitor */}
              <div
                onClick={() => onNavigateTab('monitor')}
                className="rounded-[24px] p-4 sm:p-5 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col items-center text-center space-y-2 cursor-pointer group active:scale-95 hover:border-emerald-500/30">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 group-hover:bg-amber-100 text-amber-600 dark:text-amber-400 flex items-center justify-center text-2xl transition-colors">
                  📊
                </div>
                <span className="font-extrabold text-xs sm:text-sm text-[#111827] dark:text-white">
                  {t('ghostBillMonitor', lang)}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">WASA & DESCO IoT</span>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column (Desktop: 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Smart Security & Rooftop Access Card */}
          <div className="card-luxury p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🛡️</span>
                <h3 className="font-extrabold text-sm sm:text-base text-[#111827] dark:text-white">
                  Building Security Controls
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
                Gate 24/7 Live
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <h4 className="font-black text-xs sm:text-sm leading-tight">Rooftop Smart Lock</h4>
                  <p className="text-[11px] text-amber-100 mt-0.5">
                    {backendState.rooftopLocked ? 'Status: Securely Locked' : 'Status: Unlocked (Open)'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  const locked = backend.toggleRooftopLock();
                  if (onShowToast) onShowToast(`Rooftop access is now ${locked ? 'Locked' : 'Unlocked'}`);
                }}
                className="px-3.5 py-2 rounded-xl bg-white text-amber-700 hover:bg-amber-50 font-black text-xs uppercase tracking-wider shadow active:scale-95 transition-all">
                {backendState.rooftopLocked ? 'Unlock' : 'Lock'}
              </button>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="card-luxury p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">📈</span>
                <h3 className="font-extrabold text-base text-[#111827] dark:text-white">
                  {lang === 'bn' ? 'সাম্প্রতিক কার্যক্রম' : 'Recent Audit Activity'}
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">Real-time Log</span>
            </div>

            <div className="space-y-3">
              {backendState.recentActivities.slice(0, 6).map(act => (
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

      </div>

    </div>
  );
};
