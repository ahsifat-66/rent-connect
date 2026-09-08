import React from 'react';
import { User } from '../types';

interface GuestQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestName: string;
  user: User;
}

export const GuestQrModal: React.FC<GuestQrModalProps> = ({ isOpen, onClose, guestName, user }) => {
  if (!isOpen) return null;

  const accessCode = `GUEST-QR-${guestName.replace(/\s+/g, '').toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="card-luxury w-full max-w-md bg-[var(--bg-surface)] p-6 sm:p-8 space-y-5 rounded-b-none sm:rounded-b-[28px] text-center max-h-[92vh] overflow-y-auto">
        
        <div className="flex justify-between items-center border-b border-[var(--border-main)] pb-3">
          <div className="text-left">
            <h3 className="font-extrabold text-base sm:text-lg text-[var(--text-main)]">Guest QR Access Pass</h3>
            <p className="text-xs text-[var(--text-muted)]">Unit {user.unitNumber || '2B'} · Gulshan Building</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-xl font-bold">✕</button>
        </div>

        {/* QR Box */}
        <div className="p-6 rounded-3xl bg-white border-2 border-purple-500 shadow-xl max-w-[260px] mx-auto flex flex-col items-center justify-center space-y-3">
          <div className="w-44 h-44 bg-slate-900 rounded-2xl flex items-center justify-center p-3 text-white">
            <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
              <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z" />
              <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" />
              <path d="M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z" />
              <rect x="40" y="10" width="10" height="20" />
              <rect x="55" y="5" width="10" height="10" />
              <rect x="40" y="40" width="20" height="20" />
              <rect x="70" y="45" width="10" height="25" />
              <rect x="15" y="40" width="15" height="10" />
              <rect x="45" y="70" width="20" height="15" />
              <rect x="75" y="80" width="20" height="15" />
            </svg>
          </div>
          <div className="space-y-0.5">
            <span className="font-mono text-xs font-black text-slate-900">{accessCode}</span>
            <p className="text-[10px] text-purple-600 font-bold">● Valid for 24 Hours Single Entry</p>
          </div>
        </div>

        {/* Guest Details */}
        <div className="p-3.5 rounded-2xl bg-[var(--bg-input)] border border-[var(--border-main)] text-left text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Guest Name:</span>
            <strong className="text-[var(--text-main)]">{guestName}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Host Resident:</span>
            <strong className="text-emerald-600">{user.name} (Flat {user.unitNumber || '2B'})</strong>
          </div>
        </div>

        {/* WhatsApp Share Button */}
        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
            `Hi ${guestName}, here is your digital guest gate pass for Unit ${user.unitNumber || '2B'}, Gulshan Building: Access Code ${accessCode}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow transition-all active:scale-98">
          <span>📱</span> Send Pass to Guest on WhatsApp
        </a>

      </div>
    </div>
  );
};
