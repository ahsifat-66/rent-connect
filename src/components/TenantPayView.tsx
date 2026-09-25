import React, { useState, useEffect } from 'react';
import { User, RentReceipt } from '../types';
import { backend, BackendState } from '../services/backend';
import { QuickReceiptModal } from './QuickReceiptModal';

interface TenantPayViewProps {
  user: User;
  onOpenRentPay: () => void;
}

export const TenantPayView: React.FC<TenantPayViewProps> = ({ user, onOpenRentPay }) => {
  const [backendState, setBackendState] = useState<BackendState>(backend.getState());
  const [selectedReceipt, setSelectedReceipt] = useState<RentReceipt | null>(null);

  useEffect(() => {
    return backend.subscribe(() => {
      setBackendState({ ...backend.getState() });
    });
  }, []);

  return (
    <div className="space-y-6 animate-fade-in w-full max-w-6xl mx-auto pb-6">
      
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] dark:text-white tracking-tight">
          Financial Engine
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
          Payments & Receipts
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (5 cols): Current Month Rent & Security Deposit */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Current Month Rent Card (Vibrant Green) */}
          <div className="rounded-[28px] p-5 sm:p-6 bg-gradient-to-r from-[#00B665] to-[#009E54] text-white shadow-lg shadow-emerald-500/20 space-y-4">
            <div>
              <span className="text-xs font-semibold text-emerald-100">
                Current Month Rent
              </span>
              <div className="text-3xl sm:text-4xl font-black tracking-tight mt-1 font-mono">
                ৳{user.rentAmount ? user.rentAmount.toLocaleString() : '28,000'}
              </div>
              <p className="text-xs text-emerald-100 font-medium mt-1">
                Due: March 5, 2026 · Flat {user.unitNumber || '2B'}
              </p>
            </div>

            {/* White Pay with bKash Button */}
            <button
              onClick={onOpenRentPay}
              className="w-full py-3.5 rounded-2xl bg-white hover:bg-slate-50 active:scale-98 text-slate-900 font-extrabold text-sm shadow-md flex items-center justify-center gap-2.5 transition-all">
              <span className="w-6 h-5 rounded bg-[#E2136E] text-white flex items-center justify-center text-[10px] font-bold">
                💳
              </span>
              <span className="text-[#111827]">Pay with bKash</span>
            </button>
          </div>

          {/* 2. Security Deposit Card */}
          <div className="rounded-[28px] p-5 sm:p-6 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 flex items-center justify-center text-lg shrink-0">
                🛡️
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#111827] dark:text-white leading-tight">
                  Security Deposit
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Protected & Escrow Tracked
                </p>
              </div>
            </div>

            {/* Rows */}
            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Total Amount</span>
                <strong className="text-base font-black text-[#111827] dark:text-white font-mono">
                  ৳{user.securityDeposit ? user.securityDeposit.toLocaleString() : '56,000'}
                </strong>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Status</span>
                <strong className="font-bold text-[#00B665]">
                  Held in Escrow
                </strong>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Refund Date</span>
                <span className="text-slate-400 font-medium">
                  Upon lease completion ({user.leaseEndDate || 'Dec 31, 2026'})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Receipt Vault Card */}
        <div className="lg:col-span-7">
          <div className="rounded-[28px] p-5 sm:p-6 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-[#111827] dark:text-white">
                Receipt Vault
              </h3>
              <span className="text-xs text-slate-400 font-medium">
                {backendState.receipts.length} receipts
              </span>
            </div>

            {/* Dynamic Receipts List */}
            <div className="space-y-3">
              {backendState.receipts.map(rec => (
                <div
                  key={rec.id}
                  onClick={() => setSelectedReceipt(rec)}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0D1117] border border-slate-100 dark:border-slate-800 hover:border-emerald-500/40 cursor-pointer flex items-center justify-between transition-all">
                  <div>
                    <h4 className="font-extrabold text-sm text-[#111827] dark:text-white">
                      {rec.month}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      {rec.paidOn} · {rec.paymentMethod}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-black text-[#111827] dark:text-white font-mono">
                        ৳{rec.amount.toLocaleString()}
                      </div>
                      <div className="text-[11px] font-bold text-[#00B665]">
                        Paid
                      </div>
                    </div>

                    <div className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#161B22] hover:bg-slate-100 text-slate-700 dark:text-slate-200 flex items-center justify-center text-sm shadow-sm">
                      📄
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* Quick Receipt Slip Modal */}
      <QuickReceiptModal
        isOpen={!!selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
        receipt={selectedReceipt}
        unitNumber={user.unitNumber || '2B'}
        tenantName={user.name}
      />

    </div>
  );
};
