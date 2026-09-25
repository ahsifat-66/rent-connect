import React, { useState } from 'react';
import { AlertTriangle, QrCode, Plus, Clock } from 'lucide-react';
import { User } from '../types';
import { backend } from '../services/backend';

interface TenantSecurityGuestsViewProps {
  user: User;
  onTriggerSos: () => void;
  onOpenGuestQr: (guestName: string) => void;
}

export const TenantSecurityGuestsView: React.FC<TenantSecurityGuestsViewProps> = ({
  user,
  onTriggerSos,
  onOpenGuestQr
}) => {
  const [guestNameInput, setGuestNameInput] = useState('');
  const [recentGuests, setRecentGuests] = useState([
    { id: 'g1', name: 'Rashed Khan', time: 'Mar 8, 2026 · 3:45 PM', verified: true },
    { id: 'g2', name: 'Naveed Hossain', time: 'Mar 4, 2026 · 11:20 AM', verified: true }
  ]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestNameInput.trim()) return;
    const name = guestNameInput.trim();
    
    // Save to backend service
    backend.generateGuestPass(name, user.unitNumber || '2B');

    setRecentGuests(prev => [
      { id: `g-${Date.now()}`, name, time: 'Just now', verified: true },
      ...prev
    ]);
    onOpenGuestQr(name);
    setGuestNameInput('');
  };

  const handlePressSos = () => {
    backend.triggerSos(user.unitNumber || '2B');
    onTriggerSos();
  };

  return (
    <div className="space-y-6 animate-fade-in w-full max-w-5xl mx-auto pb-6">
      
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] dark:text-white tracking-tight">
          Security & Guests
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
          Access Control Portal
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (5 cols): SOS Panic & Guest QR Generator */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. SOS PANIC BUTTON */}
          <div className="rounded-2xl p-5 sm:p-6 bg-rose-600 text-white shadow-lg shadow-rose-500/10 border border-rose-500 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white shrink-0 border border-white/20">
                <AlertTriangle size={22} strokeWidth={1.75} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg tracking-wide uppercase">
                  SOS Panic Button
                </h3>
                <p className="text-xs text-rose-100 font-medium">
                  Immediate alert to owner & guard desk
                </p>
              </div>
            </div>

            {/* Emergency Button */}
            <button
              onClick={handlePressSos}
              className="w-full py-3.5 rounded-xl bg-white hover:bg-rose-50 active:scale-98 text-rose-600 font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-sm transition-all">
              Trigger Emergency Alert
            </button>
          </div>

          {/* 2. Guest QR Code Generator Card */}
          <div className="rounded-2xl p-5 sm:p-6 bg-white dark:bg-[#161B22] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <QrCode size={18} strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-semibold text-base text-slate-900 dark:text-white leading-tight">
                  Guest QR Code
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Generate secure visitor pass
                </p>
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleGenerate} className="space-y-3.5 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Guest Name
                </label>
                <input
                  type="text"
                  required
                  value={guestNameInput}
                  onChange={(e) => setGuestNameInput(e.target.value)}
                  placeholder="Enter guest name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500 transition-all font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-xs tracking-wider shadow-sm flex items-center justify-center gap-1.5 active:scale-98 transition-all">
                <Plus size={14} strokeWidth={2} />
                <span>Generate Guest QR</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column (7 cols): Recent Guests Card */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl p-5 sm:p-6 bg-white dark:bg-[#161B22] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-base text-slate-900 dark:text-white">
                Recent Guests
              </h3>
              <Clock size={16} strokeWidth={1.75} className="text-slate-400" />
            </div>

            {/* Guest List */}
            <div className="space-y-3">
              {recentGuests.map(guest => (
                <div
                  key={guest.id}
                  onClick={() => onOpenGuestQr(guest.name)}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-[#161B22] border border-slate-200/80 dark:border-slate-800 hover:border-purple-500/40 cursor-pointer flex items-center justify-between transition-all active:scale-[0.99] group">
                  <div>
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {guest.name}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      {guest.time}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold px-3 py-1 rounded-full border border-emerald-500/20">
                      Verified
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenGuestQr(guest.name);
                      }}
                      className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all flex items-center gap-1">
                      <QrCode size={12} strokeWidth={1.75} />
                      <span>Pass</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
