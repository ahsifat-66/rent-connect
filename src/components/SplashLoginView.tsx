import React, { useState } from 'react';
import { backend } from '../services/backend';

interface SplashLoginViewProps {
  onJoinAsOwner: () => void;
  onJoinAsTenant: () => void;
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}

export const SplashLoginView: React.FC<SplashLoginViewProps> = ({
  onJoinAsOwner,
  onJoinAsTenant,
  theme,
  setTheme
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [selectedRole, setSelectedRole] = useState<'owner' | 'tenant'>('owner');
  const [loginMethod, setLoginMethod] = useState<'biometric' | 'phone' | 'email'>('biometric');
  const [biometricScanning, setBiometricScanning] = useState<string | null>(null);

  // Phone / OTP login state
  const [phoneInput, setPhoneInput] = useState('+880 1711-234567');
  const [emailInput, setEmailInput] = useState('sifat.owner@gulshantower.com');
  const [passwordInput, setPasswordInput] = useState('••••••••');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(['5', '2', '8', '9', '1', '0']);

  // Sign Up Form States
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regNid, setRegNid] = useState('');
  const [regBuilding, setRegBuilding] = useState('Gulshan Luxury Tower');
  const [regUnit, setRegUnit] = useState('2B');
  const [regOccupation, setRegOccupation] = useState('');
  const [regEmergencyPhone, setRegEmergencyPhone] = useState('');

  const handleBiometricClick = (role: 'owner' | 'tenant', method: 'face' | 'touch') => {
    setBiometricScanning(`${role}-${method}`);
    setTimeout(() => {
      setBiometricScanning(null);
      if (role === 'owner') {
        onJoinAsOwner();
      } else {
        onJoinAsTenant();
      }
    }, 800);
  };

  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
      return;
    }
    setBiometricScanning(`${selectedRole}-otp`);
    setTimeout(() => {
      setBiometricScanning(null);
      backend.loginWithCredentials(phoneInput, selectedRole);
    }, 700);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setBiometricScanning(`${selectedRole}-email`);
    setTimeout(() => {
      setBiometricScanning(null);
      backend.loginWithCredentials(emailInput, selectedRole);
    }, 700);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setBiometricScanning(`${selectedRole}-signup`);
    setTimeout(() => {
      setBiometricScanning(null);
      if (selectedRole === 'owner') {
        backend.registerOwner({
          name: regName || 'Md ABID HASAN SIFAT',
          phone: regPhone || '+880 1911-554433',
          email: regEmail || 'owner@estate.com',
          buildingName: regBuilding || 'Gulshan Luxury Tower Portfolio',
          nid: regNid || '19652692610000111'
        });
      } else {
        backend.registerTenant({
          name: regName || 'Tanvir Ahmed',
          phone: regPhone || '+880 1711-234567',
          email: regEmail || 'tenant@estate.com',
          unitNumber: regUnit || '2B',
          buildingName: regBuilding || 'Gulshan Luxury Tower',
          nid: regNid || '19882692610000452',
          occupation: regOccupation || 'Professional Resident',
          emergencyPhone: regEmergencyPhone || '+880 1712-998877'
        });
      }
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0F1026] text-[#111827] dark:text-white flex flex-col justify-between items-center px-4 py-6 sm:py-10 selection:bg-emerald-500 font-sans animate-fade-in relative overflow-hidden transition-colors duration-300">
      
      {/* Background ambient glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Bar with Theme Toggle */}
      <div className="w-full max-w-md flex items-center justify-between z-20">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Secured Gateway</span>
        </div>

        {/* Tactile Theme Switcher */}
        <div className="flex items-center bg-white dark:bg-[#1A1D3D] p-1 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              theme === 'light'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
            }`}>
            <span>☀️</span>
            <span>Light</span>
          </button>
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              theme === 'dark'
                ? 'bg-[#2B2F5C] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
            }`}>
            <span>🌙</span>
            <span>Dark</span>
          </button>
        </div>
      </div>

      {/* Top Branding Section */}
      <div className="flex flex-col items-center text-center pt-2 sm:pt-4 z-10">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-white dark:bg-[#1A1D3D] border border-slate-200 dark:border-slate-700/50 flex items-center justify-center shadow-lg dark:shadow-2xl mb-3 text-[#111827] dark:text-white">
          <svg className="w-8 h-8 sm:w-9 sm:h-9 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
            <rect x="4" y="2" width="16" height="20" rx="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 6h6M9 10h6M9 14h6M9 18h6" strokeLinecap="round"/>
            <rect x="8" y="2" width="8" height="4" rx="1"/>
          </svg>
        </div>
        <h1 className="text-xl sm:text-2xl font-black tracking-[0.25em] text-[#111827] dark:text-white uppercase">
          RENT
        </h1>
        <h2 className="text-lg sm:text-xl font-black tracking-[0.3em] text-[#00B665] uppercase mt-0.5">
          CONNECT
        </h2>
      </div>

      {/* Central Auth Container */}
      <div className="w-full max-w-md my-4 sm:my-6 z-10 space-y-4">
        
        {/* Mode Switcher: Sign In vs Sign Up */}
        <div className="p-1 rounded-2xl bg-white dark:bg-[#1A1D3D] border border-slate-200 dark:border-slate-700/60 flex items-center shadow-sm">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'login'
                ? 'bg-slate-900 text-white dark:bg-[#2B2F5C] dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}>
            <span>🔑</span>
            <span>Sign In (Log In)</span>
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'signup'
                ? 'bg-[#00B665] text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}>
            <span>📝</span>
            <span>Sign Up (Register)</span>
          </button>
        </div>

        {/* Role Selector Tabs (Owner vs Tenant) */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setSelectedRole('owner')}
            className={`p-3 rounded-2xl border text-center transition-all flex items-center justify-center gap-2 ${
              selectedRole === 'owner'
                ? 'border-amber-500 bg-amber-50 dark:bg-amber-500/15 text-slate-900 dark:text-white ring-2 ring-amber-500/40 shadow-sm'
                : 'border-slate-200 dark:border-slate-700/50 bg-white dark:bg-[#1D2040]/70 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#1D2040]'
            }`}>
            <span className="text-xl">🏛️</span>
            <div className="text-left">
              <span className="font-extrabold text-xs block leading-tight text-[#111827] dark:text-white">House Owner</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Landlord Portfolio</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('tenant')}
            className={`p-3 rounded-2xl border text-center transition-all flex items-center justify-center gap-2 ${
              selectedRole === 'tenant'
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/15 text-slate-900 dark:text-white ring-2 ring-emerald-500/40 shadow-sm'
                : 'border-slate-200 dark:border-slate-700/50 bg-white dark:bg-[#1D2040]/70 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#1D2040]'
            }`}>
            <span className="text-xl">🏠</span>
            <div className="text-left">
              <span className="font-extrabold text-xs block leading-tight text-[#111827] dark:text-white">Resident Tenant</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Flat Resident</span>
            </div>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* --- 1. SIGN IN (LOG IN) FLOW --- */}
        {/* ========================================================================= */}
        {authMode === 'login' && (
          <div className="space-y-3.5">
            
            {/* Login Method Pills: 1-Click Biometrics | Phone OTP | Email */}
            <div className="flex items-center justify-between p-1 rounded-xl bg-white dark:bg-[#1A1D3D] border border-slate-200 dark:border-slate-700/40 text-[11px] font-bold shadow-sm">
              <button
                type="button"
                onClick={() => setLoginMethod('biometric')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${loginMethod === 'biometric' ? 'bg-slate-900 text-white dark:bg-[#2B2F5C]' : 'text-slate-500 dark:text-slate-400'}`}>
                Biometric
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('phone')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${loginMethod === 'phone' ? 'bg-slate-900 text-white dark:bg-[#2B2F5C]' : 'text-slate-500 dark:text-slate-400'}`}>
                Phone OTP
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${loginMethod === 'email' ? 'bg-slate-900 text-white dark:bg-[#2B2F5C]' : 'text-slate-500 dark:text-slate-400'}`}>
                Email
              </button>
            </div>

            {/* Method A: Biometric 1-Click Card (Figma Reproduction) */}
            {loginMethod === 'biometric' && (
              <div className="rounded-[28px] p-5 sm:p-6 bg-white dark:bg-[#1D2040]/90 border border-slate-200 dark:border-slate-700/40 shadow-xl backdrop-blur-xl space-y-4">
                <div 
                  onClick={() => selectedRole === 'owner' ? onJoinAsOwner() : onJoinAsTenant()}
                  className="flex items-center gap-4 cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-[#2B2F5C] text-[#111827] dark:text-white flex items-center justify-center shrink-0 shadow-inner">
                    {selectedRole === 'owner' ? (
                      <svg className="w-6 h-6 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                        <rect x="4" y="2" width="16" height="20" rx="3"/>
                        <path d="M9 6h6M9 10h6M9 14h6M9 18h6"/>
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <h3 className="font-extrabold text-base sm:text-lg text-[#111827] dark:text-white leading-tight">
                      Join as {selectedRole === 'owner' ? 'House Owner' : 'Tenant'}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                      {selectedRole === 'owner' ? 'Manage your property' : 'Access your residence'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => handleBiometricClick(selectedRole, 'face')}
                    className="py-2.5 px-3 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-[#2B2F5C]/80 dark:hover:bg-[#383D75] active:scale-95 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-600/40 transition-all shadow-sm">
                    <span className="text-[#00B665] font-mono text-sm">⛶</span>
                    <span>Face ID</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleBiometricClick(selectedRole, 'touch')}
                    className="py-2.5 px-3 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-[#2B2F5C]/80 dark:hover:bg-[#383D75] active:scale-95 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-600/40 transition-all shadow-sm">
                    <span className="text-[#00B665] text-base">🪪</span>
                    <span>Touch ID</span>
                  </button>
                </div>
              </div>
            )}

            {/* Method B: Phone & OTP Flow */}
            {loginMethod === 'phone' && (
              <form onSubmit={handlePhoneLogin} className="rounded-[28px] p-5 sm:p-6 bg-white dark:bg-[#1D2040]/90 border border-slate-200 dark:border-slate-700/40 shadow-xl space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Mobile Number (Bangladeshi +880)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="+880 1711-234567"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700 text-sm font-mono text-[#111827] dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {otpSent && (
                  <div className="space-y-2 pt-1 animate-fade-in">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Enter 6-digit SMS OTP</span>
                      <span className="text-emerald-600 font-mono font-bold">0:45</span>
                    </div>
                    <div className="grid grid-cols-6 gap-1.5">
                      {otpCode.map((digit, i) => (
                        <input
                          key={i}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => {
                            const newArr = [...otpCode];
                            newArr[i] = e.target.value;
                            setOtpCode(newArr);
                          }}
                          className="w-full h-11 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base text-[#111827] dark:text-white focus:outline-none focus:border-emerald-500"
                        />
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#00B665] hover:bg-[#009E54] text-white font-extrabold text-xs sm:text-sm shadow active:scale-95 transition-all">
                  {otpSent ? `Log In as ${selectedRole === 'owner' ? 'Owner' : 'Tenant'} →` : 'Send OTP Verification Code →'}
                </button>
              </form>
            )}

            {/* Method C: Email & Password */}
            {loginMethod === 'email' && (
              <form onSubmit={handleEmailLogin} className="rounded-[28px] p-5 sm:p-6 bg-white dark:bg-[#1D2040]/90 border border-slate-200 dark:border-slate-700/40 shadow-xl space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700 text-sm text-[#111827] dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700 text-sm text-[#111827] dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#00B665] hover:bg-[#009E54] text-white font-extrabold text-xs sm:text-sm shadow active:scale-95 transition-all">
                  Log In as {selectedRole === 'owner' ? 'Owner' : 'Tenant'} →
                </button>
              </form>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* --- 2. SIGN UP (REGISTER NEW ACCOUNT) FLOW --- */}
        {/* ========================================================================= */}
        {authMode === 'signup' && (
          <form onSubmit={handleSignUp} className="rounded-[28px] p-5 sm:p-6 bg-white dark:bg-[#1D2040]/90 border border-slate-200 dark:border-slate-700/40 shadow-xl space-y-3 max-h-[58vh] overflow-y-auto">
            
            <div className="border-b border-slate-200 dark:border-slate-700/60 pb-2">
              <h3 className="font-extrabold text-sm text-[#111827] dark:text-white">
                Create {selectedRole === 'owner' ? 'House Owner Portfolio' : 'Resident Tenant Account'}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {selectedRole === 'owner' ? 'Register building estate & NID verification' : 'Register residential lease & police verification'}
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name (As per NID)</label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder={selectedRole === 'owner' ? 'Md ABID HASAN SIFAT' : 'Tanvir Ahmed'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700 text-xs text-[#111827] dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Mobile Phone</label>
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+880 1711-XXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700 text-xs text-[#111827] dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">National ID (NID)</label>
                <input
                  type="text"
                  required
                  value={regNid}
                  onChange={(e) => setRegNid(e.target.value)}
                  placeholder="1988269261000..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700 text-xs text-[#111827] dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="user@estate.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700 text-xs text-[#111827] dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {selectedRole === 'owner' ? 'Building / Estate Name' : 'Building Name'}
                </label>
                <input
                  type="text"
                  required
                  value={regBuilding}
                  onChange={(e) => setRegBuilding(e.target.value)}
                  placeholder="Gulshan Luxury Tower"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700 text-xs text-[#111827] dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {selectedRole === 'tenant' ? (
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Flat / Unit Number</label>
                  <input
                    type="text"
                    required
                    value={regUnit}
                    onChange={(e) => setRegUnit(e.target.value)}
                    placeholder="Flat 2B"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700 text-xs text-[#111827] dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Total Units Count</label>
                  <input
                    type="number"
                    defaultValue={9}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700 text-xs text-[#111827] dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              )}
            </div>

            {selectedRole === 'tenant' && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Occupation</label>
                  <input
                    type="text"
                    value={regOccupation}
                    onChange={(e) => setRegOccupation(e.target.value)}
                    placeholder="Software Architect"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700 text-xs text-[#111827] dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Emergency Phone</label>
                  <input
                    type="tel"
                    value={regEmergencyPhone}
                    onChange={(e) => setRegEmergencyPhone(e.target.value)}
                    placeholder="+880 1712-XXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700 text-xs text-[#111827] dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00B665] to-[#009E54] hover:opacity-95 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 active:scale-95 transition-all mt-2">
              Complete Sign Up as {selectedRole === 'owner' ? 'Owner' : 'Tenant'} →
            </button>
          </form>
        )}

      </div>

      {/* Footer Security Notes */}
      <div className="text-center space-y-1 pb-2 z-10">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          DHAKA LUXURY MARKET
        </p>
        <p className="text-[10px] text-slate-500 dark:text-slate-500">
          Secured by biometric authentication & End To End Encryption
        </p>
      </div>

      {/* Biometric Scanning Overlay Animation */}
      {biometricScanning && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center space-y-4 animate-fade-in">
          <div className="w-20 h-20 rounded-full border-4 border-emerald-500/30 border-t-emerald-500 animate-spin flex items-center justify-center">
            <span className="text-2xl animate-pulse">✨</span>
          </div>
          <div className="text-center">
            <h4 className="font-extrabold text-sm text-white">Authenticating Credentials...</h4>
            <p className="text-xs text-slate-300 mt-0.5">Encrypted Dhaka Resident Handshake</p>
          </div>
        </div>
      )}

    </div>
  );
};
