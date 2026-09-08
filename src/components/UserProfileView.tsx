import React, { useState } from 'react';
import { User } from '../types';
import { backend } from '../services/backend';

interface UserProfileViewProps {
  user: User;
  isOwner: boolean;
  onBack: () => void;
  onLogout: () => void;
  onShowToast?: (msg: string) => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  user,
  isOwner,
  onBack,
  onLogout,
  onShowToast
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [occupation, setOccupation] = useState(user.occupation || (isOwner ? 'Property Managing Director' : 'Senior Software Architect'));
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [activeDocModal, setActiveDocModal] = useState<string | null>(null);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    if (onShowToast) {
      onShowToast("✅ Profile details updated successfully!");
    }
  };

  return (
    <div className="space-y-5 animate-fade-in max-w-lg mx-auto pb-6">
      
      {/* 1. Header Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-base shadow-sm active:scale-95">
            ←
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] dark:text-white tracking-tight">
              My Profile
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              {isOwner ? 'House Owner & Landlord Account' : `Resident Tenant · Flat ${user.unitNumber || '2B'}`}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-3.5 py-2 rounded-2xl font-extrabold text-xs shadow-sm transition-all flex items-center gap-1.5 active:scale-95 ${
            isEditing
              ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white'
              : 'bg-[#00B665] hover:bg-[#009E54] text-white'
          }`}>
          <span>{isEditing ? '✕ Cancel' : '✏️ Edit'}</span>
        </button>
      </div>

      {/* 2. Luxury Profile Header Card */}
      <div className="rounded-[32px] p-6 bg-gradient-to-br from-[#121632] via-[#1E2348] to-[#121632] text-white border border-slate-700 shadow-xl space-y-4 relative overflow-hidden">
        
        {/* Background glow circle */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 relative z-10">
          {/* Avatar Ring */}
          <div className="relative w-20 h-20 rounded-3xl overflow-hidden ring-4 ring-emerald-500/80 shadow-xl shrink-0 self-center sm:self-auto">
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60'}
              alt={user.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#121632] rounded-full"></span>
          </div>

          <div className="text-center sm:text-left min-w-0">
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-black truncate">
                {name}
              </h2>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                isOwner
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
              }`}>
                {isOwner ? '👑 House Owner' : '🛡️ Verified Resident'}
              </span>
            </div>

            <p className="text-xs text-slate-300 mt-1 font-medium">
              {isOwner ? 'Gulshan Luxury Tower Portfolio (9 Units)' : `Flat ${user.unitNumber || '2B'} · Gulshan Luxury Tower`}
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-3 mt-2 text-[11px] text-slate-400 font-mono">
              <span>NID: {user.nid ? `${user.nid.slice(0, 4)}...${user.nid.slice(-4)}` : '1988...0452'}</span>
              <span>·</span>
              <span className="text-emerald-400 font-bold">✓ NID Verified</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Edit Form or Details View */}
      {isEditing ? (
        <form onSubmit={handleSaveProfile} className="p-5 rounded-[28px] bg-white dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h3 className="font-extrabold text-base text-[#111827] dark:text-white">
            Edit Personal Details
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Full Legal Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-xs text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Phone Number
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-xs text-[#111827] dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-xs text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Profession / Occupation
            </label>
            <input
              type="text"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-xs text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-[#00B665] hover:bg-[#009E54] active:scale-95 text-white font-black text-xs uppercase tracking-wider shadow transition-all">
            Save Profile Changes →
          </button>
        </form>
      ) : (
        /* 4. Role-Specific Information Overview */
        <div className="space-y-4">
          
          {/* Tenant Information Cards */}
          {!isOwner && (
            <>
              {/* Flat & Tenancy Summary */}
              <div className="p-5 rounded-[28px] bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <h3 className="font-extrabold text-sm text-[#111827] dark:text-white flex items-center gap-2">
                    <span>🏢</span> Tenancy & Lease Specifications
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                    ACTIVE LEASE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0D1117] space-y-0.5">
                    <span className="text-slate-400 text-[10px]">Assigned Flat</span>
                    <div className="font-black text-[#111827] dark:text-white text-sm">Flat 2B (Floor 2)</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0D1117] space-y-0.5">
                    <span className="text-slate-400 text-[10px]">Parking Slot</span>
                    <div className="font-black text-[#111827] dark:text-white text-sm">Slot P-14 (Basement)</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0D1117] space-y-0.5">
                    <span className="text-slate-400 text-[10px]">Monthly Rent</span>
                    <div className="font-black text-emerald-600 text-sm font-mono">৳28,000 / mo</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0D1117] space-y-0.5">
                    <span className="text-slate-400 text-[10px]">Escrow Deposit Held</span>
                    <div className="font-black text-slate-800 dark:text-white text-sm font-mono">৳56,000</div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0D1117] text-xs flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Lease Agreement Term:</span>
                  <strong className="text-[#111827] dark:text-white font-mono">Jan 1, 2026 – Dec 31, 2026</strong>
                </div>
              </div>

              {/* Emergency Contact & Police Verification */}
              <div className="p-5 rounded-[28px] bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-sm space-y-3 text-xs">
                <h3 className="font-extrabold text-sm text-[#111827] dark:text-white flex items-center gap-2">
                  <span>🛡️</span> DMP Verification & Emergency Contact
                </h3>

                <div className="space-y-2">
                  <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117]">
                    <span className="text-slate-400">Emergency Contact:</span>
                    <strong className="text-[#111827] dark:text-white">Dr. Rehana Parvin (Spouse)</strong>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117]">
                    <span className="text-slate-400">Emergency Phone:</span>
                    <strong className="font-mono text-[#111827] dark:text-white">+880 1712-998877</strong>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117]">
                    <span className="text-slate-400">Family Members in Residence:</span>
                    <strong className="text-[#111827] dark:text-white">3 Persons</strong>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Owner Information Cards */}
          {isOwner && (
            <>
              {/* Portfolio Statistics */}
              <div className="p-5 rounded-[28px] bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <h3 className="font-extrabold text-sm text-[#111827] dark:text-white flex items-center gap-2">
                    <span>🏛️</span> Real Estate Portfolio Overview
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                    100% OCCUPIED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0D1117] space-y-0.5">
                    <span className="text-slate-400 text-[10px]">Total Building Units</span>
                    <div className="font-black text-[#111827] dark:text-white text-sm">9 Units (Floors 1-3)</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0D1117] space-y-0.5">
                    <span className="text-slate-400 text-[10px]">Monthly Rent Potential</span>
                    <div className="font-black text-[#00B665] text-sm font-mono">৳142,000 / mo</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0D1117] space-y-0.5">
                    <span className="text-slate-400 text-[10px]">DNCC Holding Tax ID</span>
                    <div className="font-black text-[#111827] dark:text-white text-xs font-mono">HOLD-DNCC-991</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0D1117] space-y-0.5">
                    <span className="text-slate-400 text-[10px]">e-TIN Tax Registration</span>
                    <div className="font-black text-[#111827] dark:text-white text-xs font-mono">TIN-882190-GUL</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* 5. Document Vault Downloads */}
          <div className="p-5 rounded-[28px] bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="font-extrabold text-sm text-[#111827] dark:text-white flex items-center gap-2">
              <span>📄</span> Official Documents Vault
            </h3>

            <div className="space-y-2 text-xs">
              {[
                { title: isOwner ? 'Registered Title Deed (Khatian / Porcha)' : 'Signed Tenancy Agreement (2026)', icon: '📜', status: 'VERIFIED' },
                { title: isOwner ? 'Rajuk Approved Building Plan' : 'DMP Police Verification Certificate', icon: '🛡️', status: 'CLEARED' },
                { title: 'Smart National ID Card (NID Front & Back)', icon: '🪪', status: 'AUTHENTICATED' }
              ].map((doc, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveDocModal(doc.title);
                    if (onShowToast) onShowToast(`📄 Opening ${doc.title}...`);
                  }}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0D1117] border border-slate-100 dark:border-slate-800 hover:border-emerald-500/40 cursor-pointer flex justify-between items-center transition-all active:scale-98">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{doc.icon}</span>
                    <div>
                      <span className="font-bold text-[#111827] dark:text-white block">{doc.title}</span>
                      <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">✓ {doc.status}</span>
                    </div>
                  </div>
                  <span className="text-xs text-sky-600 dark:text-sky-400 font-bold">
                    View →
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Account & Security Settings */}
          <div className="p-5 rounded-[28px] bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-[#111827] dark:text-white flex items-center gap-2">
              <span>⚙️</span> Security & Preferences
            </h3>

            <div className="space-y-3 text-xs">
              {/* Biometrics */}
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-[#111827] dark:text-white block">Biometric Authentication</span>
                  <span className="text-[11px] text-slate-400">Face ID & Touch ID login</span>
                </div>
                <button
                  type="button"
                  onClick={() => setBiometricsEnabled(!biometricsEnabled)}
                  className={`w-12 h-7 p-1 rounded-full flex items-center transition-colors ${
                    biometricsEnabled ? 'bg-[#00B665] justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                  }`}>
                  <div className="w-5 h-5 bg-white rounded-full shadow"></div>
                </button>
              </div>

              {/* Push Notifications */}
              <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <span className="font-bold text-[#111827] dark:text-white block">Utility & Rent Alerts</span>
                  <span className="text-[11px] text-slate-400">Gas leaks, DESCO recharge & gate passes</span>
                </div>
                <button
                  type="button"
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`w-12 h-7 p-1 rounded-full flex items-center transition-colors ${
                    notificationsEnabled ? 'bg-[#00B665] justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                  }`}>
                  <div className="w-5 h-5 bg-white rounded-full shadow"></div>
                </button>
              </div>
            </div>
          </div>

          {/* 7. Log Out Action */}
          <button
            onClick={onLogout}
            className="w-full py-4 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 font-extrabold text-xs uppercase tracking-wider border border-red-500/20 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2">
            <span>🚪</span>
            <span>Log Out of RentConnect</span>
          </button>

        </div>
      )}

      {/* Document Preview Modal */}
      {activeDocModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-[#161B22] rounded-3xl p-6 space-y-4 border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-extrabold text-sm">{activeDocModal}</h3>
              <button onClick={() => setActiveDocModal(null)} className="font-bold">✕</button>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-[#0D1117] rounded-2xl text-xs space-y-2 text-center">
              <div className="text-3xl">📄</div>
              <p className="font-bold text-slate-700 dark:text-slate-300">{activeDocModal}</p>
              <p className="text-[10px] text-slate-400">Digitally authenticated by RentConnect DMP Vault</p>
            </div>
            <button
              onClick={() => {
                setActiveDocModal(null);
                window.print();
              }}
              className="w-full py-3 bg-[#00B665] text-white font-bold text-xs rounded-2xl">
              ⬇️ Download / Print Official Copy
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
