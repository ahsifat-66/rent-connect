import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface SosPanicModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export const SosPanicModal: React.FC<SosPanicModalProps> = ({ isOpen, onClose, user }) => {
  const [countdown, setCountdown] = useState(5);
  const [alertSent, setAlertSent] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      setAlertSent(false);
      return;
    }

    if (countdown > 0 && !alertSent) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !alertSent) {
      setAlertSent(true);
    }
  }, [isOpen, countdown, alertSent]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="card-luxury w-full max-w-md bg-[var(--bg-surface)] p-6 sm:p-8 space-y-5 rounded-b-none sm:rounded-b-[28px] border-2 border-red-500 shadow-2xl text-center">
        
        {/* Red Siren Icon */}
        <div className="w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500 text-red-500 mx-auto flex items-center justify-center text-3xl animate-bounce">
          🚨
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-black text-red-600 uppercase tracking-tight">
            {alertSent ? 'EMERGENCY ALERT DISPATCHED' : 'EMERGENCY SOS INITIATED'}
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed">
            {alertSent 
              ? `Main Gate Security Guard & Landlord have been alerted with live distress location (Unit ${user.unitNumber || '2B'}, Gulshan Building).`
              : 'Broadcasting high-priority alarm to Building Security Gate, CCTV Control & Landlord.'
            }
          </p>
        </div>

        {!alertSent ? (
          <div className="space-y-3">
            <div className="text-4xl font-black text-[#FF3B30] font-mono">
              00:0{countdown}
            </div>
            <p className="text-[11px] text-slate-400">Cancel within {countdown}s if triggered by accident</p>
            <button
              onClick={onClose}
              className="w-full py-3.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-[var(--text-main)] font-black text-xs uppercase tracking-wider rounded-2xl">
              CANCEL SOS ALARM
            </button>
          </div>
        ) : (
          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-700 dark:text-red-300 font-bold space-y-1">
              <p>✓ Guard Desk Notified (Siren Active)</p>
              <p>✓ SMS & Call Dispatched to Building Manager</p>
              <p>✓ Police Dispatch Hotline Prepared (999)</p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3.5 bg-emerald-600 text-white font-bold text-xs rounded-2xl shadow">
              Dismiss Emergency State
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
