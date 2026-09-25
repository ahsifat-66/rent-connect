import React from 'react';
import { Plus, Droplets, Zap, Snowflake, Hammer, Calendar, Phone } from 'lucide-react';
import { MaintenanceDispatch } from '../types';

interface ServiceDispatchViewProps {
  dispatches: MaintenanceDispatch[];
  isOwner: boolean;
  onOpenDispatchModal: () => void;
  onOpenTicketModal: () => void;
  lang: 'en' | 'bn';
}

export const ServiceDispatchView: React.FC<ServiceDispatchViewProps> = ({
  dispatches,
  isOwner,
  onOpenDispatchModal,
  onOpenTicketModal,
  lang
}) => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {isOwner ? (lang === 'en' ? 'Contractor Dispatch & Operations' : 'মিস্ত্রি সার্ভিস ও ডিসপ্যাচ') : (lang === 'en' ? 'Maintenance Service Tickets' : 'ফ্ল্যাট মেরামত ও সার্ভিস')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {isOwner 
              ? 'Rapid dispatching for plumbing, electrical, HVAC, and carpentry.'
              : 'Submit maintenance tickets directly with instant work-order telemetry.'
            }
          </p>
        </div>
        <button 
          onClick={isOwner ? onOpenDispatchModal : onOpenTicketModal}
          className="px-4 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-sm hover:bg-emerald-700 active:scale-95 self-start sm:self-auto flex items-center gap-1.5 transition-all">
          <Plus size={14} strokeWidth={2} />
          <span>{isOwner ? (lang === 'en' ? 'Dispatch Pro' : 'মিস্ত্রি পাঠান') : (lang === 'en' ? 'Report Issue' : 'সমস্যা জানান')}</span>
        </button>
      </div>

      {isOwner && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          {[
            { label: lang === 'en' ? 'Plumber' : 'প্লাম্বার', icon: Droplets, color: 'text-sky-500' },
            { label: lang === 'en' ? 'Electrician' : 'ইলেকট্রিশিয়ান', icon: Zap, color: 'text-amber-500' },
            { label: lang === 'en' ? 'HVAC / AC Pro' : 'এসি মেকানিক', icon: Snowflake, color: 'text-cyan-500' },
            { label: lang === 'en' ? 'Carpenter' : 'কাঠমিস্ত্রি', icon: Hammer, color: 'text-orange-500' }
          ].map((pro, i) => {
            const Icon = pro.icon;
            return (
              <div 
                key={i} 
                onClick={onOpenDispatchModal}
                className="card-luxury p-3.5 sm:p-5 cursor-pointer text-center active:scale-95 hover:border-emerald-500/40 transition-all flex flex-col items-center justify-center space-y-2">
                <div className={`w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center ${pro.color}`}>
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">{pro.label}</h4>
                <p className="text-[10px] sm:text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Dispatch Pro →</p>
              </div>
            );
          })}
        </div>
      )}

      <div className="card-luxury p-4 sm:p-6 space-y-3 sm:space-y-4">
        <h3 className="font-semibold text-base sm:text-lg text-slate-900 dark:text-white">
          {lang === 'en' ? 'Active Work Orders' : 'চলমান কাজের তালিকা'}
        </h3>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {dispatches.map(item => (
            <div key={item.id} className="py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold bg-slate-900 dark:bg-slate-800 text-white text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md border border-slate-700">
                    Unit {item.unitNumber}
                  </span>
                  <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">{item.trade} — {item.contractorName}</h4>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.description}</p>
                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 font-mono">
                  <Calendar size={11} strokeWidth={1.75} />
                  <span>{item.scheduledTime}</span>
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <a href={`tel:${item.phone}`} className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 flex items-center gap-1 transition-colors">
                  <Phone size={10} strokeWidth={1.75} className="text-emerald-600 dark:text-emerald-400" />
                  <span>{lang === 'en' ? 'Call Pro' : 'কল করুন'}</span>
                </a>
                <span className={`text-[10px] sm:text-xs font-semibold uppercase px-2.5 py-0.5 rounded-full ${
                  item.status === 'dispatched' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
