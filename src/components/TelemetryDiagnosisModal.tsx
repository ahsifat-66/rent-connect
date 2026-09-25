import React from 'react';
import { AlertTriangle, X, Wrench } from 'lucide-react';
import { backend } from '../services/backend';

interface TelemetryDiagnosisModalProps {
  isOpen: boolean;
  onClose: () => void;
  unitNumber?: string;
  onDispatched?: () => void;
}

export const TelemetryDiagnosisModal: React.FC<TelemetryDiagnosisModalProps> = ({
  isOpen,
  onClose,
  unitNumber = '1B',
  onDispatched
}) => {
  if (!isOpen) return null;

  const handleDispatchPlumber = () => {
    backend.dispatchPlumberForLeak(unitNumber);
    if (onDispatched) onDispatched();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="card-luxury w-full max-w-md bg-white dark:bg-[#161B22] p-6 rounded-b-none sm:rounded-2xl space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-950 text-red-600 flex items-center justify-center font-bold">
              <AlertTriangle size={16} strokeWidth={2} />
            </span>
            <div>
              <h3 className="font-extrabold text-base text-[#111827] dark:text-white">Water Telemetry Diagnosis</h3>
              <p className="text-[11px] text-slate-400">IoT Submeter Sensor Diagnostic</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white">
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>
        
        {/* Diagnosis Data */}
        <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-2xl border border-red-200 dark:border-red-800 text-xs space-y-2.5">
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Affected Unit:</span>
            <strong className="text-slate-900 dark:text-white">Flat {unitNumber} (Karim Ahmed)</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Sensor Device ID:</span>
            <strong className="font-mono text-slate-800 dark:text-slate-200">WTR-SUB-1B-99 (Submersible Line)</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Current Flow Rate:</span>
            <strong className="text-red-600 dark:text-red-400 font-bold font-mono">420 Liters / 24h (↑ 235% spike)</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Baseline Normal:</span>
            <span className="font-mono">120 Liters / 24h</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Acoustic Vibration:</span>
            <span className="text-amber-600 font-bold">High (Continuous leak signature)</span>
          </div>
        </div>

        {/* Dispatch Action */}
        <button
          onClick={handleDispatchPlumber}
          className="w-full py-3.5 bg-[#00B665] hover:bg-[#009E54] text-white font-bold text-xs rounded-xl shadow active:scale-95 transition-all flex items-center justify-center gap-2">
          <Wrench size={14} strokeWidth={1.75} />
          <span>Dispatch Emergency Plumber to Flat {unitNumber} &rarr;</span>
        </button>

      </div>
    </div>
  );
};
