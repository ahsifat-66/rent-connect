import React from 'react';
import { FileText, X, Download } from 'lucide-react';
import { User } from '../types';

interface ContractPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export const ContractPdfModal: React.FC<ContractPdfModalProps> = ({
  isOpen,
  onClose,
  user
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="card-luxury w-full max-w-lg bg-white dark:bg-[#161B22] p-6 rounded-b-none sm:rounded-2xl space-y-5 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#121632] to-[#00B665] text-white flex items-center justify-center shadow">
              <FileText size={16} strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#111827] dark:text-white">Tenancy Agreement Contract</h3>
              <p className="text-[11px] text-slate-400">Gulshan Luxury Tower · Unit {user.unitNumber || '2B'}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold">
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        {/* Contract Preview Paper */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-xs space-y-4 font-sans max-h-96 overflow-y-auto">
          
          <div className="text-center border-b pb-3 border-slate-200 dark:border-slate-800">
            <h4 className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white">
              RESIDENTIAL TENANCY LEASE DEED
            </h4>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">CONTRACT REF: DHAKA-GULSHAN-2026-UNIT2B</p>
          </div>

          <div className="space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              This Residential Tenancy Agreement is entered into between <strong>Md ABID HASAN SIFAT (Landlord / First Party)</strong> and <strong>{user.name} (Resident / Second Party)</strong> for premises located at <strong>{user.buildingName || 'Gulshan Luxury Tower'}, Unit {user.unitNumber || '2B'}</strong>.
            </p>

            <div className="p-3 bg-white dark:bg-[#161B22] rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex justify-between"><span>Lease Duration:</span><strong>Jan 1, 2026 – Dec 31, 2026 (12 Months)</strong></div>
              <div className="flex justify-between"><span>Monthly Rent:</span><strong>৳28,000 / Month</strong></div>
              <div className="flex justify-between"><span>Security Deposit:</span><strong>৳56,000 (Held in Escrow)</strong></div>
              <div className="flex justify-between"><span>Allocated Parking:</span><strong>Slot P-14 EV Ready</strong></div>
            </div>

            <p className="text-[11px] text-slate-500">
              Clause 4.1: The premises shall be used strictly for peaceful residential purposes. Utility meters (DESCO, DPDC, WASA, Titas) shall be monitored through the RentConnect IoT portal.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-center">
            <div className="p-2.5 bg-white dark:bg-[#161B22] rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-bold">LANDLORD SIGNATURE</span>
              <p className="font-serif italic text-emerald-600 font-bold mt-1">Md Abid Hasan Sifat</p>
              <span className="text-[9px] text-slate-400 block font-mono">Digitally Signed (Jan 1, 2026)</span>
            </div>
            <div className="p-2.5 bg-white dark:bg-[#161B22] rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-bold">TENANT SIGNATURE</span>
              <p className="font-serif italic text-emerald-600 font-bold mt-1">{user.name}</p>
              <span className="text-[9px] text-slate-400 block font-mono">NID Verified: {user.nid}</span>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5">
          <button
            onClick={() => {
              window.print();
            }}
            className="flex-1 py-3.5 rounded-2xl bg-[#00B665] hover:bg-[#009E54] text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 active:scale-95 transition-all">
            <Download size={14} strokeWidth={1.75} />
            <span>Download Signed PDF Deed</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 active:scale-95 transition-all">
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
