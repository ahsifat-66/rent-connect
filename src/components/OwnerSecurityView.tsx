import React, { useState, useEffect } from 'react';
import { Lock, Unlock, QrCode, Check, Clock } from 'lucide-react';
import { backend, BackendState } from '../services/backend';

interface OwnerSecurityViewProps {
  onBack?: () => void;
  onOpenGuestQrModal?: () => void;
  onShowToast?: (msg: string) => void;
}

export const OwnerSecurityView: React.FC<OwnerSecurityViewProps> = ({
  onBack,
  onOpenGuestQrModal,
  onShowToast
}) => {
  const [backendState, setBackendState] = useState<BackendState>(backend.getState());

  useEffect(() => {
    return backend.subscribe(() => {
      setBackendState({ ...backend.getState() });
    });
  }, []);

  const handleToggleRooftop = () => {
    const locked = backend.toggleRooftopLock();
    if (onShowToast) {
      onShowToast(`Rooftop access is now ${locked ? 'Locked' : 'Unlocked (Open)'}`);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in w-full pb-6">
      
      {/* 1. Header: Security Shield */}
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-base shadow-sm active:scale-95">
            ←
          </button>
        )}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] dark:text-white tracking-tight">
            Security Shield
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Access control & monitoring
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (5 cols): Quick Controls & Metrics */}
        <div className="lg:col-span-5 space-y-6">
          {/* 2. Quick Controls Card */}
          <div className="rounded-2xl p-5 sm:p-6 bg-white dark:bg-[#161B22] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-semibold text-base text-slate-900 dark:text-white">
              Quick Controls
            </h3>

            {/* Rooftop Access Card */}
            <div className="rounded-xl p-4 bg-slate-900 dark:bg-slate-800 text-white shadow-sm flex items-center justify-between border border-slate-800 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  {backendState.rooftopLocked ? (
                    <Lock size={18} strokeWidth={1.75} className="text-amber-400" />
                  ) : (
                    <Unlock size={18} strokeWidth={1.75} className="text-emerald-400" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-sm leading-tight text-white">
                    Rooftop Access
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {backendState.rooftopLocked ? 'Status: Securely Locked' : 'Status: Unlocked (Open)'}
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={handleToggleRooftop}
                className={`w-14 h-8 rounded-full transition-colors p-1 flex items-center ${
                  backendState.rooftopLocked ? 'bg-amber-600 justify-end' : 'bg-emerald-600 justify-start'
                }`}>
                <div className="w-6 h-6 rounded-full bg-white shadow-sm" />
              </button>
            </div>

            {/* Generate Guest QR Code Button */}
            <button
              onClick={onOpenGuestQrModal}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-xs tracking-wider shadow-sm flex items-center justify-center gap-2 transition-all active:scale-98">
              <QrCode size={15} strokeWidth={1.75} />
              <span>Generate Guest QR Code</span>
            </button>
          </div>

          {/* 3. Metric KPI Cards */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* Blue Card: Check-ins Today */}
            <div className="rounded-[28px] p-5 sm:p-6 bg-[#2563EB] text-white shadow-lg shadow-blue-500/20 space-y-1">
              <div className="text-3xl sm:text-4xl font-black font-mono">
                {backendState.checkinsToday}
              </div>
              <p className="text-xs font-bold text-blue-100">
                Check-ins Today
              </p>
            </div>

            {/* Green Card: Compliance Rate */}
            <div className="rounded-[28px] p-5 sm:p-6 bg-[#00B665] text-white shadow-lg shadow-emerald-500/20 space-y-1">
              <div className="text-3xl sm:text-4xl font-black font-mono">
                {backendState.complianceRate}%
              </div>
              <p className="text-xs font-bold text-emerald-100">
                Compliance Rate
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Gate Log Timeline Card */}
        <div className="lg:col-span-7">
          <div className="rounded-[28px] p-5 sm:p-6 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
            
            <h3 className="font-extrabold text-base text-[#111827] dark:text-white">
              Gate Log Timeline
            </h3>

            <div className="space-y-3">
              {backendState.gateLogs.map(log => (
                <div
                  key={log.id}
                  className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-[#0D1117] border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 ring-1 ring-slate-200 dark:ring-slate-700">
                      <img src={log.avatar} alt={log.guardName} className="w-full h-full object-cover" />
                      {log.isLive && (
                        <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-extrabold text-xs sm:text-sm text-[#111827] dark:text-white truncate">
                        {log.location}
                      </h4>
                      <p className="text-xs text-slate-400 font-medium truncate">
                        {log.guardName}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 space-y-1">
                    {log.isLive ? (
                      <span className="inline-block bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border border-emerald-500/20">
                        LIVE
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400">
                        <Check size={14} strokeWidth={2} />
                      </span>
                    )}
                    <div className="text-[11px] font-semibold text-slate-400 font-mono flex items-center justify-end gap-1">
                      <Clock size={11} strokeWidth={1.75} />
                      <span>{log.time}</span>
                    </div>
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
