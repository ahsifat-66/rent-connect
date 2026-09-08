import React, { useState } from 'react';
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
    <div className="space-y-5 animate-fade-in max-w-lg mx-auto pb-6">
      
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] dark:text-white tracking-tight">
          Security & Guests
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
          Access Control Portal
        </p>
      </div>

      {/* 1. SOS PANIC BUTTON (Orange-Red Gradient Card) */}
      <div className="rounded-[28px] p-5 sm:p-6 bg-gradient-to-r from-[#FF5226] via-[#FF3B30] to-[#E63518] text-white shadow-xl shadow-red-500/25 space-y-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xl shrink-0 border border-white/20">
            ⚠️
          </div>
          <div>
            <h3 className="font-black text-base sm:text-lg tracking-wide uppercase">
              SOS PANIC BUTTON
            </h3>
            <p className="text-xs text-red-100 font-medium">
              Immediate alert to owner & guard
            </p>
          </div>
        </div>

        {/* White Emergency Button */}
        <button
          onClick={handlePressSos}
          className="w-full py-3.5 rounded-2xl bg-white hover:bg-red-50 active:scale-98 text-[#FF3B30] font-black text-sm uppercase tracking-wider shadow-md transition-all">
          PRESS IN EMERGENCY
        </button>
      </div>

      {/* 2. Guest QR Code Generator Card */}
      <div className="rounded-[28px] p-5 sm:p-6 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center text-xl shrink-0">
            📱
          </div>
          <div>
            <h3 className="font-extrabold text-base text-[#111827] dark:text-white leading-tight">
              Guest QR Code
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Generate secure access pass
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleGenerate} className="space-y-3.5 pt-1">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Guest Name
            </label>
            <input
              type="text"
              required
              value={guestNameInput}
              onChange={(e) => setGuestNameInput(e.target.value)}
              placeholder="Enter guest name"
              className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-sm text-[#111827] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:opacity-95 text-white font-extrabold text-xs sm:text-sm shadow flex items-center justify-center gap-1.5 active:scale-98 transition-all">
            <span>+</span> Generate Guest QR
          </button>
        </form>
      </div>

      {/* 3. Recent Guests Card */}
      <div className="rounded-[28px] p-5 sm:p-6 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-[#111827] dark:text-white">
            Recent Guests
          </h3>
          <span className="text-slate-400 text-sm">⏱️</span>
        </div>

        {/* Guest List */}
        <div className="space-y-3">
          {recentGuests.map(guest => (
            <div
              key={guest.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0D1117] border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-sm text-[#111827] dark:text-white">
                  {guest.name}
                </h4>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  {guest.time}
                </p>
              </div>

              <span className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 text-[11px] font-extrabold px-3 py-1 rounded-full border border-emerald-500/20">
                Verified
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
