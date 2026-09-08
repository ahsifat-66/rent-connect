import React from 'react';
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
          <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-main)]">
            {isOwner ? (lang === 'en' ? 'Contractor Dispatch & Operations' : 'মিস্ত্রি সার্ভিস ও ডিসপ্যাচ') : (lang === 'en' ? 'Maintenance Service Tickets' : 'ফ্ল্যাট মেরামত ও সার্ভিস')}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
            {isOwner 
              ? 'Rapid dispatching for plumbing, electrical, HVAC, and carpentry.'
              : 'Submit maintenance tickets directly with instant work-order telemetry.'
            }
          </p>
        </div>
        <button 
          onClick={isOwner ? onOpenDispatchModal : onOpenTicketModal}
          className="px-4 py-2.5 bg-emerald-600 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md hover:bg-emerald-700 active:scale-95 self-start sm:self-auto">
          + {isOwner ? (lang === 'en' ? 'Dispatch Pro' : 'মিস্ত্রি পাঠান') : (lang === 'en' ? 'Report Issue' : 'সমস্যা জানান')}
        </button>
      </div>

      {isOwner && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          {[
            { label: lang === 'en' ? 'Plumber' : 'প্লাম্বার', icon: '🚰', trade: 'Plumber' },
            { label: lang === 'en' ? 'Electrician' : 'ইলেকট্রিশিয়ান', icon: '⚡', trade: 'Electrician' },
            { label: lang === 'en' ? 'HVAC / AC Pro' : 'এসি মেকানিক', icon: '❄️', trade: 'HVAC / AC Pro' },
            { label: lang === 'en' ? 'Carpenter' : 'কাঠমিস্ত্রি', icon: '🪚', trade: 'Carpenter' }
          ].map((pro, i) => (
            <div 
              key={i} 
              onClick={onOpenDispatchModal}
              className="card-luxury p-3.5 sm:p-5 cursor-pointer text-center active:scale-95 hover:border-emerald-500 transition-all">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{pro.icon}</div>
              <h4 className="font-extrabold text-xs sm:text-sm">{pro.label}</h4>
              <p className="text-[10px] sm:text-[11px] text-emerald-600 font-semibold mt-0.5">Dispatch Pro →</p>
            </div>
          ))}
        </div>
      )}

      <div className="card-luxury p-4 sm:p-6 space-y-3 sm:space-y-4">
        <h3 className="font-extrabold text-base sm:text-lg">
          {lang === 'en' ? 'Active Work Orders' : 'চলমান কাজের তালিকা'}
        </h3>
        <div className="divide-y divide-[var(--border-main)]">
          {dispatches.map(item => (
            <div key={item.id} className="py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold bg-slate-900 text-white text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md">
                    Unit {item.unitNumber}
                  </span>
                  <h4 className="font-extrabold text-xs sm:text-sm">{item.trade} — {item.contractorName}</h4>
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-1">{item.description}</p>
                <p className="text-[11px] text-slate-400 mt-1">📅 {item.scheduledTime}</p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <a href={`tel:${item.phone}`} className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[var(--bg-input)] text-[var(--text-main)] border border-[var(--border-main)] hover:border-emerald-500">
                  📞 {lang === 'en' ? 'Call Pro' : 'কল করুন'}
                </a>
                <span className={`text-[10px] sm:text-xs font-bold uppercase px-2.5 py-1 rounded-full ${
                  item.status === 'dispatched' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
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
