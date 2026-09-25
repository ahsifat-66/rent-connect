import React, { useState } from 'react';
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
                <div className="absolute left-[13px] top-7 bottom-[-24px] w-[2px] bg-[#00B665]"></div>
                
                <div className="w-7 h-7 rounded-full bg-[#00B665] text-white flex items-center justify-center text-xs font-bold shrink-0 z-10 shadow-sm">
                  ✓
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-[#111827] dark:text-white leading-tight">
                    Lease Started
                  </h4>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Jan 1, 2026
                  </p>
                </div>
              </div>

              {/* Step 2: First Payment (Completed) */}
              <div className="flex items-start gap-4 relative">
                <div className="absolute left-[13px] top-7 bottom-[-24px] w-[2px] bg-[#00B665]"></div>

                <div className="w-7 h-7 rounded-full bg-[#00B665] text-white flex items-center justify-center text-xs font-bold shrink-0 z-10 shadow-sm">
                  ✓
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-[#111827] dark:text-white leading-tight">
                    First Payment
                  </h4>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Jan 5, 2026
                  </p>
                </div>
              </div>

              {/* Step 3: Current Period (In Progress - Orange Ring) */}
              <div className="flex items-start gap-4 relative">
                <div className="absolute left-[13px] top-7 bottom-[-24px] w-[2px] bg-slate-200 dark:border-slate-800"></div>

                <div className="w-7 h-7 rounded-full bg-white dark:bg-[#161B22] border-[2.5px] border-[#E89E3A] flex items-center justify-center shrink-0 z-10">
                  <div className="w-2 h-2 rounded-full bg-[#E89E3A]"></div>
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-[#111827] dark:text-white leading-tight">
                    Current Period
                  </h4>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    March 2026
                  </p>
                </div>
              </div>

              {/* Step 4: Lease Renewal (Upcoming - Grey Ring) */}
              <div className="flex items-start gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 border-[2px] border-slate-300 dark:border-slate-700 flex items-center justify-center shrink-0 z-10">
                  <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-400 dark:text-slate-500 leading-tight">
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
          {/* 2. Dark Navy Lease Agreement Download Card */}
          <div className="rounded-[28px] p-5 sm:p-6 bg-gradient-to-br from-[#121632] via-[#161B3D] to-[#1C224B] text-white shadow-xl space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-xl shrink-0">
                📄
              </div>
              <div>
                <h3 className="font-extrabold text-base leading-snug">
                  Lease Agreement
                </h3>
                <p className="text-xs text-slate-300 font-medium">
                  Signed: Jan 1, 2026 · Flat {user.unitNumber || '2B'}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-300">Monthly Rent:</span>
                <span className="font-bold font-mono">৳{user.rentAmount?.toLocaleString() || '28,000'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Security Deposit:</span>
                <span className="font-bold font-mono">৳{user.securityDeposit?.toLocaleString() || '56,000'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Term:</span>
                <span className="font-bold">{user.leaseStartDate || 'Jan 1, 2026'} - {user.leaseEndDate || 'Dec 31, 2026'}</span>
              </div>
            </div>

            <button
              onClick={() => setShowContractModal(true)}
              className="w-full py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 active:scale-98 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm">
              <span>⬇️</span> View & Download PDF Agreement
            </button>
          </div>

          {onOpenDmpForm && (
            <div className="rounded-[28px] p-5 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">👮‍♂️</span>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-[#111827] dark:text-white">DMP Police Verification</h4>
                  <p className="text-[11px] text-slate-400">Citizen registry record verified</p>
                </div>
              </div>
              <button
                onClick={onOpenDmpForm}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200">
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
