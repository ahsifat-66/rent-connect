import React, { useState, useEffect } from 'react';
import { backend, BackendState } from '../services/backend';
import { QuickReceiptModal } from './QuickReceiptModal';
import { TelemetryDiagnosisModal } from './TelemetryDiagnosisModal';
import { RentReceipt } from '../types';

interface OwnerVaultViewProps {
  onBack?: () => void;
  onSelectUnit?: (unitNo: string) => void;
  onShowToast?: (msg: string) => void;
}

export const OwnerVaultView: React.FC<OwnerVaultViewProps> = ({ onBack, onSelectUnit, onShowToast }) => {
  const [backendState, setBackendState] = useState<BackendState>(backend.getState());
  const [selectedReceipt, setSelectedReceipt] = useState<RentReceipt | null>(null);
  const [selectedUnitForReceipt, setSelectedUnitForReceipt] = useState<{ unit: string; tenant: string } | null>(null);
  const [diagnosisUnit, setDiagnosisUnit] = useState<string | null>(null);

  useEffect(() => {
    return backend.subscribe(() => {
      setBackendState({ ...backend.getState() });
    });
  }, []);

  const openReceiptForUnit = (unitNo: string, tenantName: string, amount: number) => {
    const r: RentReceipt = {
      id: `REC-2026-03-${unitNo}`,
      month: 'March 2026',
      amount,
      paidOn: 'Mar 4, 2026',
      paymentMethod: 'bKash',
      transactionId: `BK9X${unitNo}7721M`,
      status: 'confirmed'
    };
    setSelectedReceipt(r);
    setSelectedUnitForReceipt({ unit: unitNo, tenant: tenantName });
  };

  const is1BAlert = backendState.criticalAlerts.some(a => a.unit === '1B' && a.active);
  const is2BAlert = backendState.criticalAlerts.some(a => a.unit === '2B' && a.active);

  return (
    <div className="space-y-5 animate-fade-in max-w-lg mx-auto pb-6">
      
      {/* 1. Header with Back Button */}
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
            NID Vault
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Building Portfolio
          </p>
        </div>
      </div>

      {/* 2. Top Metric KPI Cards (Total Units, Verified, Pending) */}
      <div className="grid grid-cols-3 gap-3">
        
        {/* Total Units */}
        <div className="rounded-[24px] p-4 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-center space-y-0.5">
          <div className="text-2xl sm:text-3xl font-black text-[#111827] dark:text-white">
            9
          </div>
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
            Total Units
          </p>
        </div>

        {/* Verified (Green) */}
        <div className="rounded-[24px] p-4 bg-[#00B665] text-white shadow-lg shadow-emerald-500/20 text-center space-y-0.5">
          <div className="text-2xl sm:text-3xl font-black">
            7
          </div>
          <p className="text-[11px] font-bold text-emerald-100">
            Verified
          </p>
        </div>

        {/* Pending (Orange) */}
        <div className="rounded-[24px] p-4 bg-[#E58325] text-white shadow-lg shadow-amber-500/20 text-center space-y-0.5">
          <div className="text-2xl sm:text-3xl font-black">
            2
          </div>
          <p className="text-[11px] font-bold text-amber-100">
            Pending
          </p>
        </div>

      </div>

      {/* 3. Floors Breakdown */}
      <div className="space-y-6 pt-1">
        
        {/* FLOOR 1 */}
        <div className="space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#121632] text-white text-xs font-black tracking-wide">
            Floor 1
          </span>

          <div className="grid grid-cols-3 gap-2.5">
            
            {/* 1A */}
            <div className="rounded-[20px] p-3 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-sm text-center flex flex-col justify-between space-y-2">
              <div className="space-y-1">
                <span className="w-6 h-6 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#00B665] flex items-center justify-center text-xs font-bold">
                  🛡️
                </span>
                <h4 className="font-black text-sm text-[#111827] dark:text-white">1A</h4>
                <p className="text-[10px] text-slate-500 truncate">Fatima Rahman</p>
                <div className="font-mono font-bold text-xs text-slate-800 dark:text-slate-200">৳12,000</div>
              </div>
              <button 
                onClick={() => openReceiptForUnit('1A', 'Fatima Rahman', 12000)}
                className="w-full py-1.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all">
                Quick Receipt
              </button>
            </div>

            {/* 1B */}
            {is1BAlert ? (
              <div className="rounded-[20px] p-3 bg-gradient-to-b from-[#FF4D2D] to-[#E63518] text-white shadow-lg shadow-red-500/35 text-center flex flex-col justify-between space-y-2 relative overflow-hidden animate-pulse">
                <div className="space-y-1">
                  <span className="w-6 h-6 mx-auto rounded-full bg-white/20 text-white flex items-center justify-center text-xs font-bold">
                    ⚠️
                  </span>
                  <h4 className="font-black text-sm">1B</h4>
                  <p className="text-[10px] text-red-100 truncate font-semibold">Karim Ahmed</p>
                  <div className="text-[11px] font-extrabold text-white">Water Leak</div>
                </div>
                <button 
                  onClick={() => setDiagnosisUnit('1B')}
                  className="w-full py-1.5 rounded-xl bg-black/20 hover:bg-black/30 text-[9px] font-black uppercase tracking-wider text-white active:scale-95 transition-all">
                  EMERGENCY ALERT
                </button>
              </div>
            ) : (
              <div className="rounded-[20px] p-3 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-sm text-center flex flex-col justify-between space-y-2">
                <div className="space-y-1">
                  <span className="w-6 h-6 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#00B665] flex items-center justify-center text-xs font-bold">
                    🛡️
                  </span>
                  <h4 className="font-black text-sm text-[#111827] dark:text-white">1B</h4>
                  <p className="text-[10px] text-slate-500 truncate">Karim Ahmed</p>
                  <div className="font-mono font-bold text-xs text-slate-800 dark:text-slate-200">৳12,000</div>
                </div>
                <button 
                  onClick={() => openReceiptForUnit('1B', 'Karim Ahmed', 12000)}
                  className="w-full py-1.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all">
                  Quick Receipt
                </button>
              </div>
            )}

            {/* 1C */}
            <div className="rounded-[20px] p-3 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-sm text-center flex flex-col justify-between space-y-2">
              <div className="space-y-1">
                <span className="w-6 h-6 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#00B665] flex items-center justify-center text-xs font-bold">
                  🛡️
                </span>
                <h4 className="font-black text-sm text-[#111827] dark:text-white">1C</h4>
                <p className="text-[10px] text-slate-500 truncate">Shabnam Begum</p>
                <div className="font-mono font-bold text-xs text-slate-800 dark:text-slate-200">৳12,000</div>
              </div>
              <button 
                onClick={() => openReceiptForUnit('1C', 'Shabnam Begum', 12000)}
                className="w-full py-1.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all">
                Quick Receipt
              </button>
            </div>

          </div>
        </div>

        {/* FLOOR 2 */}
        <div className="space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#121632] text-white text-xs font-black tracking-wide">
            Floor 2
          </span>

          <div className="grid grid-cols-3 gap-2.5">
            
            {/* 2A */}
            <div className="rounded-[20px] p-3 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-sm text-center flex flex-col justify-between space-y-2">
              <div className="space-y-1">
                <span className="w-6 h-6 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#00B665] flex items-center justify-center text-xs font-bold">
                  🛡️
                </span>
                <h4 className="font-black text-sm text-[#111827] dark:text-white">2A</h4>
                <p className="text-[10px] text-slate-500 truncate">Rizwan Hasan</p>
                <div className="font-mono font-bold text-xs text-slate-800 dark:text-slate-200">৳14,000</div>
              </div>
              <button 
                onClick={() => openReceiptForUnit('2A', 'Rizwan Hasan', 14000)}
                className="w-full py-1.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all">
                Quick Receipt
              </button>
            </div>

            {/* 2B */}
            {is2BAlert ? (
              <div className="rounded-[20px] p-3 bg-gradient-to-b from-[#FF4D2D] to-[#E63518] text-white shadow-lg shadow-red-500/35 text-center flex flex-col justify-between space-y-2 relative overflow-hidden animate-pulse">
                <div className="space-y-1">
                  <span className="w-6 h-6 mx-auto rounded-full bg-white/20 text-white flex items-center justify-center text-xs font-bold">
                    ⚠️
                  </span>
                  <h4 className="font-black text-sm">2B</h4>
                  <p className="text-[10px] text-red-100 truncate font-semibold">Tanvir Ahmed</p>
                  <div className="text-[11px] font-extrabold text-white">Gas Leak</div>
                </div>
                <button 
                  onClick={() => {
                    backend.resolveGasLeakAlert('2B');
                    if (onShowToast) onShowToast("Gas solenoid shutoff activated for Flat 2B.");
                  }}
                  className="w-full py-1.5 rounded-xl bg-black/20 hover:bg-black/30 text-[9px] font-black uppercase tracking-wider text-white active:scale-95 transition-all">
                  SHUTOFF VALVE
                </button>
              </div>
            ) : (
              <div className="rounded-[20px] p-3 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-sm text-center flex flex-col justify-between space-y-2">
                <div className="space-y-1">
                  <span className="w-6 h-6 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#00B665] flex items-center justify-center text-xs font-bold">
                    🛡️
                  </span>
                  <h4 className="font-black text-sm text-[#111827] dark:text-white">2B</h4>
                  <p className="text-[10px] text-slate-500 truncate">Tanvir Ahmed</p>
                  <div className="font-mono font-bold text-xs text-slate-800 dark:text-slate-200">৳28,000</div>
                </div>
                <button 
                  onClick={() => openReceiptForUnit('2B', 'Tanvir Ahmed', 28000)}
                  className="w-full py-1.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all">
                  Quick Receipt
                </button>
              </div>
            )}

            {/* 2C */}
            <div className="rounded-[20px] p-3 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-sm text-center flex flex-col justify-between space-y-2">
              <div className="space-y-1">
                <span className="w-6 h-6 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#00B665] flex items-center justify-center text-xs font-bold">
                  🛡️
                </span>
                <h4 className="font-black text-sm text-[#111827] dark:text-white">2C</h4>
                <p className="text-[10px] text-slate-500 truncate">Ariful Islam</p>
                <div className="font-mono font-bold text-xs text-slate-800 dark:text-slate-200">৳14,000</div>
              </div>
              <button 
                onClick={() => openReceiptForUnit('2C', 'Ariful Islam', 14000)}
                className="w-full py-1.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all">
                Quick Receipt
              </button>
            </div>

          </div>
        </div>

        {/* FLOOR 3 */}
        <div className="space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#121632] text-white text-xs font-black tracking-wide">
            Floor 3
          </span>

          <div className="grid grid-cols-3 gap-2.5">
            <div className="rounded-[20px] p-3 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-sm text-center flex flex-col justify-between space-y-2">
              <div className="space-y-1">
                <span className="w-6 h-6 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#00B665] flex items-center justify-center text-xs font-bold">🛡️</span>
                <h4 className="font-black text-sm text-[#111827] dark:text-white">3A</h4>
                <p className="text-[10px] text-slate-500 truncate">Tasnim Ahmed</p>
                <div className="font-mono font-bold text-xs">৳15,000</div>
              </div>
              <button onClick={() => openReceiptForUnit('3A', 'Tasnim Ahmed', 15000)} className="w-full py-1.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100">Quick Receipt</button>
            </div>

            <div className="rounded-[20px] p-3 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-sm text-center flex flex-col justify-between space-y-2">
              <div className="space-y-1">
                <span className="w-6 h-6 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#00B665] flex items-center justify-center text-xs font-bold">🛡️</span>
                <h4 className="font-black text-sm text-[#111827] dark:text-white">3B</h4>
                <p className="text-[10px] text-slate-500 truncate">Mehedi Hasan</p>
                <div className="font-mono font-bold text-xs">৳15,000</div>
              </div>
              <button onClick={() => openReceiptForUnit('3B', 'Mehedi Hasan', 15000)} className="w-full py-1.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100">Quick Receipt</button>
            </div>

            <div className="rounded-[20px] p-3 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-sm text-center flex flex-col justify-between space-y-2">
              <div className="space-y-1">
                <span className="w-6 h-6 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#00B665] flex items-center justify-center text-xs font-bold">🛡️</span>
                <h4 className="font-black text-sm text-[#111827] dark:text-white">3C</h4>
                <p className="text-[10px] text-slate-500 truncate">Sadia Sultana</p>
                <div className="font-mono font-bold text-xs">৳15,000</div>
              </div>
              <button onClick={() => openReceiptForUnit('3C', 'Sadia Sultana', 15000)} className="w-full py-1.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100">Quick Receipt</button>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Portfolio Summary Card */}
      <div className="rounded-[28px] p-5 sm:p-6 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">📈</span>
          <h3 className="font-extrabold text-base text-[#111827] dark:text-white">
            Portfolio Summary
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-1">
          <div>
            <span className="text-xs text-slate-400 font-medium block">
              Total Monthly Revenue
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-[#111827] dark:text-white mt-0.5">
              ৳123,000
            </div>
          </div>

          <div>
            <span className="text-xs text-slate-400 font-medium block">
              Occupancy Rate
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#00B665] font-mono mt-0.5">
              100%
            </div>
          </div>
        </div>
      </div>

      {/* Quick Receipt Modal */}
      <QuickReceiptModal
        isOpen={!!selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
        receipt={selectedReceipt}
        unitNumber={selectedUnitForReceipt?.unit}
        tenantName={selectedUnitForReceipt?.tenant}
      />

      {/* Telemetry Diagnosis Modal */}
      <TelemetryDiagnosisModal
        isOpen={!!diagnosisUnit}
        onClose={() => setDiagnosisUnit(null)}
        unitNumber={diagnosisUnit || '1B'}
        onDispatched={() => {
          if (onShowToast) onShowToast("Plumber dispatched to Flat 1B successfully!");
        }}
      />

    </div>
  );
};
