import React, { useState } from 'react';
import { Check, FileText, Download, ShieldCheck } from 'lucide-react';
import { User } from '../types';
import { ContractPdfModal } from './ContractPdfModal';

interface TenantLeaseViewProps {
  user: User;
  onOpenDmpForm?: () => void;
}

export const TenantLeaseView: React.FC<TenantLeaseViewProps> = ({ user, onOpenDmpForm }) => {
  const [showContractModal, setShowContractModal] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in w-full max-w-5xl mx-auto pb-6">
      
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] dark:text-white tracking-tight">
          Digital Lease
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
          Archive & Timeline
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (7 cols): Lease Progress & Stepper Timeline Card */}
        <div className="lg:col-span-7">
          <div className="rounded-[28px] p-5 sm:p-6 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
            
            {/* Progress Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-extrabold text-base text-[#111827] dark:text-white">
                  Lease Progress
                </h3>
                <span className="font-black text-sm text-[#00B665]">
                  65%
                </span>
              </div>

              {/* Green Progress Bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-[#00B665] h-full rounded-full w-[65%] transition-all duration-500"></div>
              </div>
            </div>

            {/* Vertical Timeline Stepper */}
            <div className="space-y-6 pl-1">
              
              {/* Step 1: Lease Started (Completed) */}
              <div className="flex items-start gap-4 relative">
                <div className="absolute left-[13px] top-7 bottom-[-24px] w-[2px] bg-emerald-500"></div>
                
                <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 z-10 shadow-sm">
                  <Check size={12} strokeWidth={2.5} />
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white leading-tight">
                    Lease Started
                  </h4>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Jan 1, 2026
                  </p>
                </div>
              </div>

              {/* Step 2: First Payment (Completed) */}
              <div className="flex items-start gap-4 relative">
                <div className="absolute left-[13px] top-7 bottom-[-24px] w-[2px] bg-emerald-500"></div>

                <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 z-10 shadow-sm">
                  <Check size={12} strokeWidth={2.5} />
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white leading-tight">
                    First Payment
                  </h4>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Jan 5, 2026
                  </p>
                </div>
              </div>

              {/* Step 3: Current Period (In Progress) */}
              <div className="flex items-start gap-4 relative">
                <div className="absolute left-[13px] top-7 bottom-[-24px] w-[2px] bg-slate-200 dark:border-slate-800"></div>

                <div className="w-7 h-7 rounded-full bg-white dark:bg-[#161B22] border-[2px] border-amber-500 flex items-center justify-center shrink-0 z-10">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white leading-tight">
                    Current Period
                  </h4>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    March 2026
                  </p>
                </div>
              </div>

              {/* Step 4: Lease Renewal (Upcoming) */}
              <div className="flex items-start gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 border-[2px] border-slate-300 dark:border-slate-700 flex items-center justify-center shrink-0 z-10">
                  <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600"></div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-slate-400 dark:text-slate-500 leading-tight">
                    Lease Renewal
                  </h4>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Dec 31, 2026
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Right Column (5 cols): Lease Agreement & Verification Details */}
        <div className="lg:col-span-5 space-y-6">
          {/* 2. Lease Agreement Download Card */}
          <div className="rounded-2xl p-5 sm:p-6 bg-slate-900 dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 text-white shadow-sm space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <FileText size={18} strokeWidth={1.75} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-base leading-snug">
                  Lease Agreement
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Signed: Jan 1, 2026 · Flat {user.unitNumber || '2B'}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Monthly Rent:</span>
                <span className="font-semibold font-mono">৳{user.rentAmount?.toLocaleString() || '28,000'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Security Deposit:</span>
                <span className="font-semibold font-mono">৳{user.securityDeposit?.toLocaleString() || '56,000'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Term:</span>
                <span className="font-medium">{user.leaseStartDate || 'Jan 1, 2026'} - {user.leaseEndDate || 'Dec 31, 2026'}</span>
              </div>
            </div>

            <button
              onClick={() => setShowContractModal(true)}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 active:scale-98 border border-white/20 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm">
              <Download size={14} strokeWidth={1.75} />
              <span>View & Download PDF Agreement</span>
            </button>
          </div>

          {onOpenDmpForm && (
            <div className="rounded-2xl p-5 bg-white dark:bg-[#161B22] border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">DMP Police Verification</h4>
                  <p className="text-[11px] text-slate-400">Citizen registry record verified</p>
                </div>
              </div>
              <button
                onClick={onOpenDmpForm}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">
                View DMP
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Contract PDF Modal */}
      <ContractPdfModal
        isOpen={showContractModal}
        onClose={() => setShowContractModal(false)}
        user={user}
      />

    </div>
  );
};
