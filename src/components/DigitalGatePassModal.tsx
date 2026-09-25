import React, { useState } from 'react';
import { ShieldCheck, X, Home, Users, Check, Share2 } from 'lucide-react';
import { User } from '../types';

interface DigitalGatePassModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  lang: 'en' | 'bn';
}

export const DigitalGatePassModal: React.FC<DigitalGatePassModalProps> = ({ isOpen, onClose, user, lang }) => {
  const [passType, setPassType] = useState<'resident' | 'visitor'>('resident');
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [generatedVisitorCode, setGeneratedVisitorCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerateVisitorPass = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `RC-VISIT-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedVisitorCode(code);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="card-luxury w-full max-w-md bg-[var(--bg-surface)] p-5 sm:p-7 space-y-5 rounded-b-none sm:rounded-2xl max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={22} strokeWidth={1.75} className="text-emerald-500" />
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-[var(--text-main)]">
                {lang === 'en' ? 'Digital Gate & Security Pass' : 'ডিজিটাল গেট ও সিকিউরিটি পাস'}
              </h3>
              <p className="text-[11px] text-[var(--text-muted)]">Green Horizon Luxury Tower · Main Security Barrier</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] font-bold">
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        {/* Pass Type Switcher */}
        <div className="grid grid-cols-2 gap-2 bg-[var(--bg-input)] p-1 rounded-2xl border border-[var(--border-main)] text-xs font-bold">
          <button
            onClick={() => setPassType('resident')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${passType === 'resident' ? 'bg-emerald-600 text-white shadow-sm' : 'text-[var(--text-muted)]'}`}>
            <Home size={14} strokeWidth={1.75} />
            <span>{lang === 'en' ? 'My Resident Pass' : 'আমার বাসিন্দা পাস'}</span>
          </button>
          <button
            onClick={() => setPassType('visitor')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${passType === 'visitor' ? 'bg-emerald-600 text-white shadow-sm' : 'text-[var(--text-muted)]'}`}>
            <Users size={14} strokeWidth={1.75} />
            <span>{lang === 'en' ? 'Guest / Visitor Pass' : 'গেস্ট / ভিজিটর পাস'}</span>
          </button>
        </div>

        {/* Resident Pass View */}
        {passType === 'resident' && (
          <div className="space-y-4 text-center">
            
            {/* Dynamic QR Display Box */}
            <div className="p-6 rounded-3xl bg-white border-2 border-emerald-500 shadow-xl max-w-[260px] mx-auto flex flex-col items-center justify-center space-y-3">
              <div className="w-44 h-44 bg-slate-900 rounded-2xl flex items-center justify-center p-3 text-white">
                {/* SVG QR Code Simulation */}
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
                <span className="font-mono text-xs font-black text-slate-900 tracking-wider">RC-UNIT-{user.unitNumber || '4B'}-2026</span>
                <p className="text-[10px] text-emerald-600 font-bold">● Active Digital Gate Authorization</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--bg-input)] border border-[var(--border-main)] text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Authorized Resident:</span>
                <strong className="text-[var(--text-main)]">{user.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Assigned Flat:</span>
                <strong className="text-emerald-600">Unit {user.unitNumber || '4B'}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Parking RFID:</span>
                <strong className="text-[var(--text-main)] font-mono">{user.parkingSlot || 'Slot P-14'} (Auto Sensor)</strong>
              </div>
            </div>

            <p className="text-[11px] text-[var(--text-muted)]">
              Scan at the main boom barrier or lobby elevator scanner for automated contact-free entry.
            </p>
          </div>
        )}

        {/* Visitor Pass View */}
        {passType === 'visitor' && (
          <div className="space-y-4">
            {!generatedVisitorCode ? (
              <form onSubmit={handleGenerateVisitorPass} className="space-y-3 text-xs font-semibold">
                <div>
                  <label className="block text-[var(--text-muted)] mb-1">Guest Full Name</label>
                  <input
                    type="text"
                    required
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="e.g. Asif Mahmud"
                    className="w-full p-2.5 rounded-xl bg-[var(--bg-input)] border border-[var(--border-main)] text-xs text-[var(--text-main)]"
                  />
                </div>
                <div>
                  <label className="block text-[var(--text-muted)] mb-1">Guest Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={visitorPhone}
                    onChange={(e) => setVisitorPhone(e.target.value)}
                    placeholder="+880 1811-XXXXXX"
                    className="w-full p-2.5 rounded-xl bg-[var(--bg-input)] border border-[var(--border-main)] text-xs text-[var(--text-main)] font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow active:scale-95 transition-all">
                  Generate 24-Hour Guest QR Pass &rarr;
                </button>
              </form>
            ) : (
              <div className="text-center space-y-3 animate-fade-in">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
                  <p className="text-xs font-bold flex items-center justify-center gap-1.5">
                    <Check size={14} strokeWidth={2.5} />
                    <span>Visitor Pass Generated</span>
                  </p>
                  <p className="text-lg font-mono font-black mt-1">{generatedVisitorCode}</p>
                  <p className="text-[11px] mt-1 text-[var(--text-muted)]">Guest: <strong>{visitorName}</strong> ({visitorPhone})</p>
                </div>
                <button
                  onClick={() => {
                    const text = `Here is your 24-Hour Guest Gate Pass for Unit ${user.unitNumber || '4B'} at Green Horizon Tower: ${generatedVisitorCode}`;
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="w-full py-2.5 bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow active:scale-95 transition-all">
                  <Share2 size={14} strokeWidth={1.75} />
                  <span>Share Guest Pass on WhatsApp</span>
                </button>
                <button
                  onClick={() => setGeneratedVisitorCode(null)}
                  className="text-xs text-[var(--text-muted)] hover:underline">
                  Generate Another Pass
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
