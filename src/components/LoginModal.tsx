import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
  lang?: 'en' | 'bn';
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin, lang = 'en' }) => {
  const [authMode, setAuthMode] = useState<'quick' | 'phone' | 'email' | 'register'>('quick');
  const [selectedRole, setSelectedRole] = useState<UserRole>('tenant');
  
  // Phone OTP Flow State
  const [phone, setPhone] = useState('+880 1711-234567');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState(['5', '2', '8', '9', '1', '0']);
  const [otpCountdown, setOtpCountdown] = useState(45);

  // Email Flow State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regNid, setRegNid] = useState('');
  const [regUnit, setRegUnit] = useState('2B');
  const [regOccupation, setRegOccupation] = useState('');

  if (!isOpen) return null;

  const handleQuickDemoLogin = (role: UserRole) => {
    if (role === 'tenant') {
      onLogin({
        id: 'usr-tenant-2b',
        name: 'Tanvir Ahmed',
        phone: '+880 1711-234567',
        email: 'tanvir.ahmed@example.com',
        role: 'tenant',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
        nid: '19882692610000452',
        nidVerified: true,
        unitNumber: '2B',
        buildingName: 'Gulshan Building',
        leaseStartDate: 'Jan 1, 2026',
        leaseEndDate: 'Dec 31, 2026',
        rentAmount: 28000,
        securityDeposit: 56000,
        parkingSlot: 'P-14',
        occupation: 'Senior Software Architect',
        emergencyContact: {
          name: 'Dr. Rehana Parvin',
          relationship: 'Spouse',
          phone: '+880 1712-998877'
        },
        familyMembersCount: 3
      });
    } else {
      onLogin({
        id: 'usr-owner-1',
        name: 'Syed Rafiqul Islam (Landlord)',
        phone: '+880 1911-554433',
        email: 'rafiqul.owner@greenhorizon.com',
        role: 'owner',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60',
        nid: '19652692610000111',
        nidVerified: true,
        buildingName: 'Gulshan Luxury Tower, Gulshan-2',
        occupation: 'Property Investor & Managing Director'
      });
    }
    onClose();
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    handleQuickDemoLogin(selectedRole);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="card-luxury w-full max-w-md bg-white dark:bg-[#161B22] p-5 sm:p-7 space-y-5 rounded-b-none sm:rounded-b-[28px] max-h-[92vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#121632] to-[#00B665] flex items-center justify-center text-white font-black text-sm shadow">
              RC
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-[#111827] dark:text-white">
                Sign In to RentConnect
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                Select your role to access your dashboard
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white text-xl font-bold">
            ✕
          </button>
        </div>

        {/* 1. Large 1-Click Role Login Cards */}
        <div className="space-y-3">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Quick 1-Click Role Sign In
          </label>

          <div className="grid grid-cols-1 gap-2.5">
            
            {/* Tenant Login Option */}
            <div
              onClick={() => handleQuickDemoLogin('tenant')}
              className="p-4 rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 dark:hover:bg-emerald-500/15 cursor-pointer flex items-center justify-between transition-all active:scale-98 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00B665] text-white flex items-center justify-center text-xl shadow-md">
                  🏠
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#111827] dark:text-white">
                    Sign In as Resident / Tenant
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Flat 2B · Gulshan Building (Tanvir Ahmed)
                  </p>
                </div>
              </div>
              <span className="text-xs font-black text-[#00B665]">
                Log In →
              </span>
            </div>

            {/* Owner Login Option */}
            <div
              onClick={() => handleQuickDemoLogin('owner')}
              className="p-4 rounded-2xl border-2 border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 dark:hover:bg-amber-500/15 cursor-pointer flex items-center justify-between transition-all active:scale-98 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-slate-900 flex items-center justify-center text-xl shadow-md">
                  🏛️
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#111827] dark:text-white">
                    Sign In as House Owner / Landlord
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Gulshan Tower Estate Portfolio (Syed Rafiqul)
                  </p>
                </div>
              </div>
              <span className="text-xs font-black text-[#D4AF37]">
                Log In →
              </span>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 dark:border-slate-800 w-full"></div>
          <span className="bg-white dark:bg-[#161B22] px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider relative">
            Or Sign in with Phone / Email
          </span>
        </div>

        {/* Auth Mode Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-semibold">
          <button
            onClick={() => { setAuthMode('phone'); setOtpStep(false); }}
            className={`pb-2 px-3 border-b-2 transition-colors ${
              authMode === 'phone' ? 'border-emerald-500 text-emerald-600 font-bold' : 'border-transparent text-slate-400'
            }`}>
            📱 Phone OTP
          </button>
          <button
            onClick={() => setAuthMode('email')}
            className={`pb-2 px-3 border-b-2 transition-colors ${
              authMode === 'email' ? 'border-emerald-500 text-emerald-600 font-bold' : 'border-transparent text-slate-400'
            }`}>
            ✉️ Email Login
          </button>
          <button
            onClick={() => setAuthMode('register')}
            className={`pb-2 px-3 border-b-2 transition-colors ${
              authMode === 'register' ? 'border-emerald-500 text-emerald-600 font-bold' : 'border-transparent text-slate-400'
            }`}>
            📝 New Registration
          </button>
        </div>

        {/* Phone OTP Mode */}
        {authMode === 'phone' && (
          <div className="space-y-4">
            {!otpStep ? (
              <form onSubmit={(e) => { e.preventDefault(); setOtpStep(true); }} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Mobile Number (Bangladesh)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 1711-XXXXXX"
                    required
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 text-[#111827] dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#00B665] hover:bg-[#009E54] text-white font-bold text-sm rounded-2xl shadow active:scale-95 transition-all">
                  Send 6-Digit OTP Code →
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4 animate-fade-in">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Enter 6-Digit OTP Code
                    </label>
                    <button
                      type="button"
                      onClick={() => setOtpStep(false)}
                      className="text-[11px] text-emerald-600 font-bold hover:underline">
                      Change Phone
                    </button>
                  </div>
                  <div className="flex justify-between gap-1.5">
                    {otpCode.map((digit, i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => {
                          const newCode = [...otpCode];
                          newCode[i] = e.target.value;
                          setOtpCode(newCode);
                        }}
                        className="w-11 h-12 text-center text-lg font-mono font-black rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-[#111827] dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#00B665] hover:bg-[#009E54] text-white font-bold text-sm rounded-2xl shadow active:scale-95 transition-all">
                  Verify & Open Portal
                </button>
              </form>
            )}
          </div>
        )}

        {/* Email Mode */}
        {authMode === 'email' && (
          <form onSubmit={handleVerifyOtp} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="resident@gulshanbuilding.com"
                required
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-sm text-[#111827] dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-sm text-[#111827] dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-[#00B665] text-white font-bold text-sm rounded-2xl shadow active:scale-95">
              Sign In →
            </button>
          </form>
        )}

        {/* New Registration Mode */}
        {authMode === 'register' && (
          <form onSubmit={handleVerifyOtp} className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Full Name (As per NID)</label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="Tanvir Ahmed"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-xs text-[#111827] dark:text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Mobile Phone</label>
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+880 1711-XXXXXX"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-xs text-[#111827] dark:text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Allocated Flat</label>
                <input
                  type="text"
                  required
                  value={regUnit}
                  onChange={(e) => setRegUnit(e.target.value)}
                  placeholder="2B"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-xs text-[#111827] dark:text-white font-mono"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Smart National NID</label>
              <input
                type="text"
                required
                value={regNid}
                onChange={(e) => setRegNid(e.target.value)}
                placeholder="19882692610000452"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-xs text-[#111827] dark:text-white font-mono"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-[#00B665] text-white font-bold text-xs sm:text-sm rounded-2xl shadow active:scale-95">
              Register & Access Portal →
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
