import React, { useState } from 'react';
import { 
  Droplets, 
  Zap, 
  Flame, 
  X, 
  AlertTriangle, 
  Check, 
  Wrench 
} from 'lucide-react';

export interface UnitSubmeterData {
  unit: string;
  tenantName: string;
  waterFlow: number; // L/day
  waterStatus: 'normal' | 'leak' | 'warning';
  waterMeterId: string;
  waterCostEst: number; // BDT
  elecUsage: number; // kWh/day
  elecStatus: 'normal' | 'high' | 'warning';
  elecMeterId: string;
  elecCostEst: number; // BDT
  elecPrepaidBalance?: number;
  gasPressure: string;
  lastUpdated: string;
}

interface UnitSubmeterDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: UnitSubmeterData | null;
  onDispatchTech?: (unit: string, trade: string) => void;
  onShowToast?: (msg: string) => void;
}

export const UnitSubmeterDetailModal: React.FC<UnitSubmeterDetailModalProps> = ({
  isOpen,
  onClose,
  data,
  onDispatchTech,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'water' | 'electricity' | 'gas'>('water');
  const [valveClosed, setValveClosed] = useState(false);

  if (!isOpen || !data) return null;

  const totalMonthlyEst = (data.waterCostEst * 30) + (data.elecCostEst * 30);

  const handleToggleValve = () => {
    setValveClosed(!valveClosed);
    if (onShowToast) {
      onShowToast(valveClosed ? `Submeter valve for Flat ${data.unit} re-opened.` : `Emergency submeter isolation valve closed for Flat ${data.unit}.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="card-luxury w-full max-w-lg bg-white dark:bg-[#161B22] p-5 sm:p-7 rounded-b-none sm:rounded-2xl space-y-5 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#121632] to-[#00B665] text-white flex items-center justify-center font-black text-sm shadow">
              {data.unit}
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#111827] dark:text-white">
                Flat {data.unit} IoT Submeter Telemetry
              </h3>
              <p className="text-xs text-slate-400">
                Tenant: {data.tenantName} · Live BMS Stream
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold">
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        {/* Tab Switcher: Water | Electricity | Gas */}
        <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('water')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'water' ? 'bg-sky-500 text-white shadow' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
            }`}>
            <Droplets size={14} strokeWidth={1.75} />
            <span>Water (DWASA)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('electricity')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'electricity' ? 'bg-amber-500 text-white shadow' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
            }`}>
            <Zap size={14} strokeWidth={1.75} />
            <span>Electricity (DESCO)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('gas')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'gas' ? 'bg-purple-600 text-white shadow' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
            }`}>
            <Flame size={14} strokeWidth={1.75} />
            <span>Gas (Titas)</span>
          </button>
        </div>

        {/* --- 1. WATER TELEMETRY TAB --- */}
        {activeTab === 'water' && (
          <div className="space-y-4">
            
            <div className={`p-4 rounded-2xl border text-xs space-y-2.5 ${
              data.waterStatus === 'leak'
                ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'
                : 'bg-slate-50 dark:bg-[#0D1117] border-slate-200 dark:border-slate-800'
            }`}>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Sensor Model:</span>
                <strong className="font-mono text-slate-800 dark:text-slate-200">{data.waterMeterId}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">24h Consumption Rate:</span>
                <strong className={`font-mono text-base font-black ${data.waterStatus === 'leak' ? 'text-red-600 dark:text-red-400' : 'text-sky-600 dark:text-sky-400'}`}>
                  {data.waterFlow} Liters / day
                </strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Daily Water Tariff:</span>
                <span className="font-mono font-bold">৳{data.waterCostEst.toFixed(2)} (@ ৳16.50/kL)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Main Line Pressure:</span>
                <span className="font-mono">2.8 bar (Deep-well Booster Active)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Acoustic Vibration Signature:</span>
                {data.waterStatus === 'leak' ? (
                  <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1.5">
                    <AlertTriangle size={14} strokeWidth={1.75} />
                    Continuous Micro-flow Leak Detected
                  </span>
                ) : (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                    <Check size={14} strokeWidth={2} />
                    Normal Intermittent Flow
                  </span>
                )}
              </div>
            </div>

            {/* Valve Isolation Control */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs text-[#111827] dark:text-white">Smart Submeter Isolation Valve</h4>
                <p className="text-[11px] text-slate-400">{valveClosed ? 'Water Supply Cut Off (Closed)' : 'Water Supply Open (Normal Flow)'}</p>
              </div>
              <button
                type="button"
                onClick={handleToggleValve}
                className={`px-3 py-1.5 rounded-xl text-xs font-black shadow transition-all ${
                  valveClosed ? 'bg-[#00B665] text-white' : 'bg-red-600 text-white'
                }`}>
                {valveClosed ? 'OPEN VALVE' : 'ISOLATE VALVE'}
              </button>
            </div>

          </div>
        )}

        {/* --- 2. ELECTRICITY TELEMETRY TAB --- */}
        {activeTab === 'electricity' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-xs space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Smart Pre-paid Meter ID:</span>
                <strong className="font-mono text-slate-800 dark:text-slate-200">{data.elecMeterId}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Daily Electricity Consumption:</span>
                <strong className="font-mono text-base font-black text-amber-600 dark:text-amber-400">
                  {data.elecUsage} kWh / day
                </strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Pre-paid Balance Remaining:</span>
                <strong className="font-mono text-emerald-600 font-bold">
                  ৳{data.elecPrepaidBalance ? data.elecPrepaidBalance.toLocaleString() : '1,840.00'}
                </strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">DESCO Grid Phase Voltage:</span>
                <span className="font-mono">226.4 V (50.08 Hz · PF 0.98)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Standby Generator Auto-switch:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <Check size={14} strokeWidth={2} />
                  Ready (Diesel Sub-panel Armed)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* --- 3. GAS TELEMETRY TAB --- */}
        {activeTab === 'gas' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-xs space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Titas Pipeline Feed:</span>
                <strong className="font-mono text-slate-800 dark:text-slate-200">TITAS-GL-MANIFOLD-{data.unit}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Pipeline Pressure:</span>
                <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{data.gasPressure}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Methane PPM Sensor:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <Check size={14} strokeWidth={2} />
                  3.2 ppm (Safe & Zero Leak)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Emergency Solenoid Trip:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <Check size={14} strokeWidth={2} />
                  Auto-shutoff Linked to Fire Alarm
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Monthly Estimate Summary */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#121632] to-[#1C224B] text-white text-xs space-y-1.5 shadow-md">
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Estimated Monthly Utility Bill (Flat {data.unit}):</span>
            <strong className="font-mono text-base font-black text-[#00B665]">৳{Math.round(totalMonthlyEst).toLocaleString()}</strong>
          </div>
          <p className="text-[10px] text-slate-400">Includes DWASA water, DESCO electricity slabs, and common elevator/generator load share.</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => {
              if (onDispatchTech) onDispatchTech(data.unit, activeTab === 'water' ? 'Plumber' : 'Electrician');
              if (onShowToast) onShowToast(`Maintenance technician assigned to Flat ${data.unit} for ${activeTab}.`);
              onClose();
            }}
            className="flex-1 py-3.5 rounded-2xl bg-[#00B665] hover:bg-[#009E54] text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 active:scale-95 transition-all">
            <Wrench size={16} strokeWidth={1.75} />
            Dispatch {activeTab === 'water' ? 'Plumber' : activeTab === 'electricity' ? 'Electrician' : 'Gas Tech'}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95">
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
