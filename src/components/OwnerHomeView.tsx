import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Check, 
  AlertTriangle, 
  Megaphone, 
  Building2, 
  MessageSquare, 
  Wrench, 
  ShieldCheck, 
  Activity, 
  Lock, 
  Unlock, 
  History, 
  Info, 
  AlertCircle 
} from 'lucide-react';
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
          <div className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 shadow-sm">
            <Sun size={14} strokeWidth={1.75} className="text-amber-500" />
            <span>32°C Dhaka</span>
          </div>

          <div 
            onClick={() => onNavigateTab('profile')}
            title="Click to open Owner Profile"
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center shadow-sm cursor-pointer active:scale-95 transition-transform hover:scale-105">
            MA
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full flex items-center justify-center text-white">
              <Check size={8} strokeWidth={2.5} />
            </span>
          </div>
        </div>
      </div>

      {/* 2. CRITICAL ALERT Card (Full Width) */}
      {gasAlert && (
        <div className="rounded-2xl p-4 sm:p-5 bg-rose-600 text-white shadow-lg shadow-rose-500/10 border border-rose-500 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
              <AlertTriangle size={20} strokeWidth={1.75} className="text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider truncate">
                {t('criticalAlert', lang)}
              </h3>
              <p className="text-xs text-rose-100 font-medium truncate">
                {t('gasLeakAlert', lang)}
              </p>
            </div>
          </div>

          <button
            onClick={handleGasShutoff}
            className="px-4 py-2 rounded-xl bg-white text-rose-600 hover:bg-rose-50 font-semibold text-xs uppercase tracking-wider shadow active:scale-95 shrink-0 transition-all">
            {t('shutoff', lang)}
          </button>
        </div>
      )}

      {/* 3. Main Responsive Content Grid: Stacks on mobile, 12-cols on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (Desktop: 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Rent Collection Card (Deep Navy with Donut Ring) */}
          <div 
            onClick={() => onNavigateTab('vault')}
            title="Click to view building rent ledger, collection breakdown & receipts in NID Vault"
            className="rounded-[28px] p-5 sm:p-7 bg-gradient-to-br from-[#121632] via-[#161B3D] to-[#1C224B] text-white shadow-xl flex items-center justify-between gap-4 cursor-pointer hover:shadow-2xl hover:border-emerald-500/30 border border-transparent active:scale-[0.99] transition-all group">
            
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
            
            <span className="text-xs font-bold text-emerald-400 opacity-80 group-hover:opacity-100 hidden sm:inline transition-opacity self-center">
              View Ledger →
            </span>
          </div>

          {/* Quick Metrics Bar: 3 Interactive KPI Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div 
              onClick={() => onNavigateTab('vault')}
              title="Click to view building occupancy & units in Vault"
              className="card-luxury p-3.5 sm:p-4 text-center cursor-pointer hover:border-emerald-500/50 hover:shadow-md active:scale-95 transition-all">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 block uppercase">Occupancy</span>
              <span className="text-xl sm:text-2xl font-black text-[#111827] dark:text-white">91%</span>
              <span className="text-[10px] text-emerald-500 font-bold block">10/11 Units →</span>
            </div>
            <div 
              onClick={() => onNavigateTab('security')}
              title="Click to view gate check-ins & security pass log"
              className="card-luxury p-3.5 sm:p-4 text-center cursor-pointer hover:border-blue-500/50 hover:shadow-md active:scale-95 transition-all">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 block uppercase">Check-ins</span>
              <span className="text-xl sm:text-2xl font-black text-blue-600 font-mono">{backendState.checkinsToday}</span>
              <span className="text-[10px] text-slate-400 font-semibold block">Today · Pass →</span>
            </div>
            <div 
              onClick={() => onNavigateTab('vault')}
              title="Click to view DMP police verification status & compliance"
              className="card-luxury p-3.5 sm:p-4 text-center cursor-pointer hover:border-emerald-500/50 hover:shadow-md active:scale-95 transition-all">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 block uppercase">Compliance</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-600 font-mono">{backendState.complianceRate}%</span>
              <span className="text-[10px] text-emerald-500 font-bold block">DMP Verified →</span>
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
                className="rounded-2xl p-4 sm:p-5 bg-white dark:bg-[#161B22] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center space-y-2 cursor-pointer group active:scale-95 hover:border-emerald-500/30">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors">
                  <Megaphone size={18} strokeWidth={1.75} />
                </div>
                <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {lang === 'bn' ? 'জরুরী নোটিশ' : 'Notice Board'}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Publish Alerts</span>
              </div>

              {/* Card 2: Marketplace */}
              <div
                onClick={onOpenMarketplace}
                className="rounded-2xl p-4 sm:p-5 bg-white dark:bg-[#161B22] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center space-y-2 cursor-pointer group relative active:scale-95 hover:border-emerald-500/30">
                <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-emerald-500"></span>
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors">
                  <Building2 size={18} strokeWidth={1.75} />
                </div>
                <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {t('buildingPortfolio', lang)}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Vacants & Leases</span>
              </div>

              {/* Card 3: Messenger */}
              <div
                onClick={onOpenMessenger}
                className="rounded-2xl p-4 sm:p-5 bg-white dark:bg-[#161B22] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center space-y-2 cursor-pointer group relative active:scale-95 hover:border-emerald-500/30">
                <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-sky-500"></span>
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors">
                  <MessageSquare size={18} strokeWidth={1.75} />
                </div>
                <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {t('navChat', lang)}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Direct Resident Line</span>
              </div>

              {/* Card 4: Hire Pro */}
              <div
                onClick={onOpenHirePro}
                className="rounded-2xl p-4 sm:p-5 bg-white dark:bg-[#161B22] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center space-y-2 cursor-pointer group active:scale-95 hover:border-emerald-500/30">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors">
                  <Wrench size={18} strokeWidth={1.75} />
                </div>
                <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {t('navHirePro', lang)}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Contractor Dispatch</span>
              </div>

              {/* Card 5: NID Vault */}
              <div
                onClick={() => onNavigateTab('vault')}
                className="rounded-2xl p-4 sm:p-5 bg-white dark:bg-[#161B22] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center space-y-2 cursor-pointer group active:scale-95 hover:border-emerald-500/30">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors">
                  <ShieldCheck size={18} strokeWidth={1.75} />
                </div>
                <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {t('navVault', lang)}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Tenant Directory</span>
              </div>

              {/* Card 6: Submeter Monitor */}
              <div
                onClick={() => onNavigateTab('monitor')}
                className="rounded-2xl p-4 sm:p-5 bg-white dark:bg-[#161B22] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center space-y-2 cursor-pointer group active:scale-95 hover:border-emerald-500/30">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors">
                  <Activity size={18} strokeWidth={1.75} />
                </div>
                <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
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
                <ShieldCheck size={18} strokeWidth={1.75} className="text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                  Building Security Controls
                </h3>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                Gate 24/7 Live
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 dark:bg-slate-800 text-white shadow-sm flex items-center justify-between border border-slate-800 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  {backendState.rooftopLocked ? (
                    <Lock size={18} strokeWidth={1.75} className="text-amber-400" />
                  ) : (
                    <Unlock size={18} strokeWidth={1.75} className="text-emerald-400" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm leading-tight">Rooftop Smart Lock</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {backendState.rooftopLocked ? 'Status: Securely Locked' : 'Status: Unlocked (Open)'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  const locked = backend.toggleRooftopLock();
                  if (onShowToast) onShowToast(`Rooftop access is now ${locked ? 'Locked' : 'Unlocked'}`);
                }}
                className="px-3.5 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-semibold text-xs uppercase tracking-wider shadow-sm active:scale-95 transition-all">
                {backendState.rooftopLocked ? 'Unlock' : 'Lock'}
              </button>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="card-luxury p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History size={18} strokeWidth={1.75} className="text-slate-500" />
                <h3 className="font-semibold text-base text-slate-900 dark:text-white">
                  {lang === 'bn' ? 'সাম্প্রতিক কার্যক্রম' : 'Recent Audit Activity'}
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">Real-time Log</span>
            </div>

            <div className="space-y-3">
              {backendState.recentActivities.slice(0, 6).map(act => (
                <div
                  key={act.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#161B22] border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    act.type === 'success'
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                      : act.type === 'warning'
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                      : 'bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400'
                  }`}>
                    {act.type === 'success' ? (
                      <Check size={14} strokeWidth={2} />
                    ) : act.type === 'warning' ? (
                      <AlertCircle size={14} strokeWidth={2} />
                    ) : (
                      <Info size={14} strokeWidth={2} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
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
