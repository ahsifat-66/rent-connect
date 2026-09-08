import React from 'react';
import { RentReceipt } from '../types';

interface QuickReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  receipt: RentReceipt | null;
  unitNumber?: string;
  tenantName?: string;
}

export const QuickReceiptModal: React.FC<QuickReceiptModalProps> = ({
  isOpen,
  onClose,
  receipt,
  unitNumber = '2B',
  tenantName = 'Tanvir Ahmed'
}) => {
  if (!isOpen || !receipt) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="card-luxury w-full max-w-md bg-white dark:bg-[#161B22] p-6 rounded-b-none sm:rounded-b-[28px] space-y-5 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00B665] text-white flex items-center justify-center font-bold text-sm shadow">
              ✓
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#111827] dark:text-white">Official Rent Receipt</h3>
              <p className="text-[11px] text-slate-400">Gulshan Luxury Tower Estate</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold text-xl">
            ✕
          </button>
        </div>

        {/* Paper Receipt Simulation */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-xs space-y-3 font-sans relative overflow-hidden">
          
          {/* Watermark badge */}
          <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none text-6xl">
            🏛️
          </div>

          <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="font-mono text-[10px] text-slate-400 block">RECEIPT NUMBER</span>
              <strong className="font-mono font-bold text-slate-900 dark:text-white text-xs">{receipt.id}</strong>
            </div>
            <div className="text-right">
              <span className="font-mono text-[10px] text-slate-400 block">BILLING MONTH</span>
              <strong className="text-slate-900 dark:text-white text-xs font-extrabold">{receipt.month}</strong>
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Tenant Name:</span>
              <strong className="text-slate-900 dark:text-white">{tenantName}</strong>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Unit / Flat:</span>
              <strong className="text-emerald-600 font-bold">Unit {unitNumber}</strong>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Paid Date:</span>
              <span>{receipt.paidOn}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Payment Channel:</span>
              <span className="font-semibold">{receipt.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Transaction ID:</span>
              <span className="font-mono text-[11px] font-bold text-slate-700 dark:text-slate-300">{receipt.transactionId}</span>
            </div>
          </div>

          <div className="border-t border-dashed border-slate-300 dark:border-slate-700 pt-3 flex items-center justify-between">
            <span className="font-black text-sm text-slate-900 dark:text-white">Amount Paid</span>
            <span className="text-lg font-black font-mono text-[#00B665]">৳{receipt.amount.toLocaleString()}</span>
          </div>

          <div className="pt-2 text-center text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center gap-1.5">
            <span>🛡️</span>
            <span>Cryptographically Verified & DMP Landlord Registry Logged</span>
          </div>

        </div>

        {/* Action buttons */}
        <div className="flex gap-2.5">
          <button
            onClick={() => {
              window.print();
            }}
            className="flex-1 py-3 rounded-2xl bg-[#121632] text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 active:scale-95">
            <span>🖨️</span> Print Receipt
          </button>
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 active:scale-95">
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
