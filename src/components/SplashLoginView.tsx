import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Droplets, 
  ShieldCheck, 
  CreditCard, 
  DoorClosed, 
  Zap, 
  Building2, 
  Home, 
  KeyRound, 
  UserPlus, 
  ScanFace, 
  Fingerprint 
} from 'lucide-react';
import { backend } from '../services/backend';
import { Language, t } from '../utils/i18n';

interface SplashLoginViewProps {
  onJoinAsOwner: () => void;
  onJoinAsTenant: () => void;
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const SplashLoginView: React.FC<SplashLoginViewProps> = ({
  onJoinAsOwner,
  onJoinAsTenant,
  theme,
  setTheme,
  lang,
  setLang
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

  // Streamlined Sign Up Form States
  const [regName, setRegName] = useState('');
  const [regContact, setRegContact] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regBuildingOrUnit, setRegBuildingOrUnit] = useState('Gulshan Luxury Tower · Flat 2B');

  const handleBiometricClick = (role: 'owner' | 'tenant', method: 'face' | 'touch') => {
    setBiometricScanning(`${role}-${method}`);
    setTimeout(() => {
      setBiometricScanning(null);
      if (role === 'owner') {
        onJoinAsOwner();
      } else {
        onJoinAsTenant();
      }
    }, 700);
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
    }, 600);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setBiometricScanning(`${selectedRole}-email`);
    setTimeout(() => {
      setBiometricScanning(null);
      backend.loginWithCredentials(emailInput, selectedRole);
    }, 600);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setBiometricScanning(`${selectedRole}-signup`);
    setTimeout(() => {
      setBiometricScanning(null);
      const isEmail = regContact.includes('@');
      if (selectedRole === 'owner') {
        backend.registerOwner({
          name: regName || 'Md ABID HASAN SIFAT',
          phone: isEmail ? '+880 1911-554433' : (regContact || '+880 1911-554433'),
          email: isEmail ? regContact : 'owner@estate.com',
          buildingName: regBuildingOrUnit || 'Gulshan Luxury Tower Portfolio',
          nid: '19652692610000111'
        });
      } else {
        backend.registerTenant({
          name: regName || 'Tanvir Ahmed',
          phone: isEmail ? '+880 1711-234567' : (regContact || '+880 1711-234567'),
          email: isEmail ? regContact : 'tenant@estate.com',
          unitNumber: regBuildingOrUnit.match(/[0-9][A-Z]/i)?.[0]?.toUpperCase() || '2B',
          buildingName: 'Gulshan Luxury Tower',
          nid: '19882692610000452',
          occupation: 'Professional Resident',
          emergencyPhone: '+880 1712-998877'
        });
      }
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0F1026] text-[#111827] dark:text-white flex flex-col justify-between items-center px-4 py-5 sm:py-8 selection:bg-emerald-500 font-sans animate-fade-in relative overflow-hidden transition-colors duration-300">
      
      {/* Background ambient glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Bar with Language Toggle & Theme Toggle */}
      <div className="w-full max-w-6xl flex items-center justify-between z-20">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{t('securedGateway', lang)}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Real-time Language Switcher */}
          <div className="flex items-center bg-white dark:bg-[#1A1D3D] p-1 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all ${
                lang === 'en'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}>
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('bn')}
              className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all ${
                lang === 'bn'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}>
              বাং
            </button>
          </div>

          {/* Tactile Theme Switcher */}
          <div className="flex items-center bg-white dark:bg-[#161B22] p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center ${
                theme === 'light'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-700 dark:text-slate-400'
              }`}>
              <Sun size={14} strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center ${
                theme === 'dark'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}>
              <Moon size={14} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>

      {/* Top Branding Section (Mobile Only - Desktop has left hero column) */}
      <div className="flex flex-col items-center text-center pt-2 sm:pt-3 z-10 lg:hidden">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-white dark:bg-[#1A1D3D] border border-slate-200 dark:border-slate-700/50 flex items-center justify-center shadow-lg dark:shadow-2xl mb-2 text-[#111827] dark:text-white">
          <svg className="w-8 h-8 sm:w-9 sm:h-9 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
            <rect x="4" y="2" width="16" height="20" rx="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 6h6M9 10h6M9 14h6M9 18h6" strokeLinecap="round"/>
            <rect x="8" y="2" width="8" height="4" rx="1"/>
          </svg>
        </div>
        <h1 className="text-xl sm:text-2xl font-black tracking-[0.25em] text-[#111827] dark:text-white uppercase">
          {lang === 'bn' ? 'ভাড়া' : 'RENT'}
        </h1>
        <h2 className="text-lg sm:text-xl font-black tracking-[0.3em] text-[#00B665] uppercase -mt-0.5">
          {lang === 'bn' ? 'কানেক্ট' : 'CONNECT'}
        </h2>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-1">
          {t('tagline', lang)}
        </p>
      </div>

      {/* Central Content Area: Desktop Split-Screen, Mobile Single-Column */}
      <div className="w-full max-w-6xl my-auto py-4 sm:py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10">
        
        {/* Desktop Left Showcase Column */}
        <div className="hidden lg:flex lg:col-span-7 flex-col justify-center space-y-7 pr-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#1A1D3D] border border-slate-200 dark:border-slate-700/60 flex items-center justify-center shadow-lg text-[#111827] dark:text-white">
              <svg className="w-8 h-8 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                <rect x="4" y="2" width="16" height="20" rx="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 6h6M9 10h6M9 14h6M9 18h6" strokeLinecap="round"/>
                <rect x="8" y="2" width="8" height="4" rx="1"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-[0.2em] text-[#111827] dark:text-white uppercase">RENT</span>
                <span className="text-2xl font-black tracking-[0.25em] text-[#00B665] uppercase">CONNECT</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                Dhaka High-Rise Property Operating System
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-[#111827] dark:text-white leading-tight">
              {lang === 'bn' 
                ? 'স্মার্ট আবাসন ও প্রোপার্টি অটোমেশনের পূর্ণাঙ্গ প্ল্যাটফর্ম' 
                : 'Intelligent Real Estate Automation for Modern Bangladesh'}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              {lang === 'bn'
                ? 'আইওটি সাবমিটারিং, স্মার্ট ডোর এক্সেস, ডিজিটাল ভাড়া আদায় এবং ডিএমপি পুলিশ ভেরিফিকেশন সহ আধুনিক ফ্ল্যাট পরিচালনার অত্যাধুনিক সিস্টেম।'
                : 'Unified telemetry for DWASA water flow, DESCO prepaid submeters, facial recognition gate security, automated rent escrow, and DMP citizen registry.'}
            </p>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-2 gap-3.5 max-w-xl">
            <div className="p-4 rounded-xl bg-white/80 dark:bg-[#161B22]/70 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-sm space-y-1">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                <Droplets size={16} strokeWidth={1.75} /> DWASA & DESCO IoT
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                Live submeter flow rates, peak kWh alerts & leak detection.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/80 dark:bg-[#161B22]/70 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-sm space-y-1">
              <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-semibold text-sm">
                <ShieldCheck size={16} strokeWidth={1.75} /> DMP Citizen Auth
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                Automated tenant police verification with NID barcode sync.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/80 dark:bg-[#161B22]/70 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-sm space-y-1">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
                <CreditCard size={16} strokeWidth={1.75} /> Instant Rent Escrow
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                bKash, Nagad, Visa & bank transfer with instant automated receipts.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/80 dark:bg-[#161B22]/70 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-sm space-y-1">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold text-sm">
                <DoorClosed size={16} strokeWidth={1.75} /> Contactless Gates
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                QR visitor passes, guard desk intercom & rooftop electronic locks.
              </p>
            </div>
          </div>

          {/* Verified Stats Bar */}
          <div className="flex items-center gap-6 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <div>
              <span className="font-extrabold text-[#111827] dark:text-white font-mono text-sm block">99.8%</span>
              <span>Collection Rate</span>
            </div>
            <div className="w-px h-6 bg-slate-300 dark:bg-slate-700"></div>
            <div>
              <span className="font-extrabold text-[#111827] dark:text-white font-mono text-sm block">&lt; 3 Sec</span>
              <span>Gate Pass Issuance</span>
            </div>
            <div className="w-px h-6 bg-slate-300 dark:bg-slate-700"></div>
            <div>
              <span className="font-extrabold text-emerald-500 font-mono text-sm block">Bank-Grade</span>
              <span>256-bit TLS Protected</span>
            </div>
          </div>
        </div>

        {/* Central Auth Container */}
        <div className="w-full max-w-md mx-auto lg:max-w-none lg:col-span-5 space-y-3.5">
        
        {/* ========================================================================= */}
        {/* --- 1. PROMINENT 1-CLICK DEMO QUICK-ACTION BUTTONS --- */}
        {/* ========================================================================= */}
        <div className="space-y-2 p-3 sm:p-3.5 rounded-2xl bg-white/90 dark:bg-[#161B22]/90 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Zap size={13} strokeWidth={2} className="text-amber-500" /> Instant 1-Click Demo
            </span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium px-2 py-0.5 rounded-full border border-emerald-500/20">
              Zero-Typing Friction
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Owner Demo Button */}
            <button
              type="button"
              onClick={onJoinAsOwner}
              className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white text-left shadow-sm active:scale-95 transition-all group flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Building2 size={16} strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <span className="font-semibold text-xs block leading-tight truncate">
                  {t('demoOwner', lang)}
                </span>
                <span className="text-[10px] text-slate-300 dark:text-amber-100/90 truncate block">
                  {t('demoOwnerSub', lang)}
                </span>
              </div>
            </button>

            {/* Tenant Demo Button */}
            <button
              type="button"
              onClick={onJoinAsTenant}
              className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-left shadow-sm active:scale-95 transition-all group flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Home size={16} strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <span className="font-semibold text-xs block leading-tight truncate">
                  {t('demoTenant', lang)}
                </span>
                <span className="text-[10px] text-emerald-100/90 truncate block">
                  {t('demoTenantSub', lang)}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mode Switcher: Sign In vs Sign Up */}
        <div className="p-1 rounded-xl bg-white dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 flex items-center shadow-sm">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'login'
                ? 'bg-slate-900 text-white dark:bg-slate-800 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}>
            <KeyRound size={13} strokeWidth={1.75} />
            <span>{t('signIn', lang)}</span>
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'signup'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}>
            <UserPlus size={13} strokeWidth={1.75} />
            <span>{t('signUp', lang)}</span>
          </button>
        </div>

        {/* Role Selector Tabs (Owner vs Tenant) */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setSelectedRole('owner')}
            className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all flex items-center justify-center gap-2.5 ${
              selectedRole === 'owner'
                ? 'border-amber-500/50 bg-amber-500/10 text-slate-900 dark:text-white ring-1 ring-amber-500/30 shadow-sm'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161B22]/70 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#161B22]'
            }`}>
            <Building2 size={18} strokeWidth={1.75} className="text-amber-600 dark:text-amber-400 shrink-0" />
            <div className="text-left min-w-0">
              <span className="font-semibold text-xs block leading-tight text-slate-900 dark:text-white truncate">
                {t('houseOwner', lang)}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate block">
                {t('ownerRoleSub', lang)}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('tenant')}
            className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all flex items-center justify-center gap-2.5 ${
              selectedRole === 'tenant'
                ? 'border-emerald-500/50 bg-emerald-500/10 text-slate-900 dark:text-white ring-1 ring-emerald-500/30 shadow-sm'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161B22]/70 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#161B22]'
            }`}>
            <Home size={18} strokeWidth={1.75} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div className="text-left min-w-0">
              <span className="font-semibold text-xs block leading-tight text-slate-900 dark:text-white truncate">
                {t('residentTenant', lang)}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate block">
                {t('tenantRoleSub', lang)}
              </span>
            </div>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* --- 2. SIGN IN (LOG IN) FLOW --- */}
        {/* ========================================================================= */}
        {authMode === 'login' && (
          <div className="space-y-3">
            
            {/* Login Method Pills: Biometrics | Phone OTP | Email */}
            <div className="flex items-center justify-between p-1 rounded-xl bg-white dark:bg-[#1A1D3D] border border-slate-200 dark:border-slate-700/40 text-[11px] font-bold shadow-sm">
              <button
                type="button"
                onClick={() => setLoginMethod('biometric')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${loginMethod === 'biometric' ? 'bg-slate-900 text-white dark:bg-[#2B2F5C]' : 'text-slate-500 dark:text-slate-400'}`}>
                {t('biometric', lang)}
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('phone')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${loginMethod === 'phone' ? 'bg-slate-900 text-white dark:bg-[#2B2F5C]' : 'text-slate-500 dark:text-slate-400'}`}>
                {t('phoneOtp', lang)}
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${loginMethod === 'email' ? 'bg-slate-900 text-white dark:bg-[#2B2F5C]' : 'text-slate-500 dark:text-slate-400'}`}>
                {t('emailPass', lang)}
              </button>
            </div>

            {/* Method A: Biometric 1-Click Card */}
            {loginMethod === 'biometric' && (
              <div className="rounded-[28px] p-4 sm:p-5 bg-white dark:bg-[#1D2040]/90 border border-slate-200 dark:border-slate-700/40 shadow-xl backdrop-blur-xl space-y-3.5">
                <div 
                  onClick={() => selectedRole === 'owner' ? onJoinAsOwner() : onJoinAsTenant()}
                  className="flex items-center gap-3.5 cursor-pointer">
                  <div className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-[#2B2F5C] text-[#111827] dark:text-white flex items-center justify-center shrink-0 shadow-inner">
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
                    <h3 className="font-extrabold text-sm sm:text-base text-[#111827] dark:text-white leading-tight">
                      {selectedRole === 'owner' ? t('joinAsOwner', lang) : t('joinAsTenant', lang)}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 truncate">
                      {selectedRole === 'owner' ? t('manageProperty', lang) : t('accessResidence', lang)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleBiometricClick(selectedRole, 'face')}
                    className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#161B22] dark:hover:bg-[#1f2633] active:scale-95 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 transition-all shadow-sm">
                    <ScanFace size={16} strokeWidth={1.75} className="text-emerald-600 dark:text-emerald-400" />
                    <span>{t('faceId', lang)}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleBiometricClick(selectedRole, 'touch')}
                    className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#161B22] dark:hover:bg-[#1f2633] active:scale-95 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 transition-all shadow-sm">
                    <Fingerprint size={16} strokeWidth={1.75} className="text-emerald-600 dark:text-emerald-400" />
                    <span>{t('touchId', lang)}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Method B: Phone & OTP Flow */}
            {loginMethod === 'phone' && (
              <form onSubmit={handlePhoneLogin} className="rounded-[28px] p-4 sm:p-5 bg-white dark:bg-[#1D2040]/90 border border-slate-200 dark:border-slate-700/40 shadow-xl space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('mobileNumber', lang)}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="+880 1711-234567"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700 text-sm font-mono text-[#111827] dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {otpSent && (
                  <div className="space-y-2 pt-1 animate-fade-in">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">{t('enterOtp', lang)}</span>
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
                          className="w-full h-10 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-base text-[#111827] dark:text-white focus:outline-none focus:border-emerald-500"
                        />
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-[#00B665] hover:bg-[#009E54] text-white font-extrabold text-xs sm:text-sm shadow active:scale-95 transition-all">
                  {otpSent ? (selectedRole === 'owner' ? t('loginAsOwnerBtn', lang) : t('loginAsTenantBtn', lang)) : t('sendOtp', lang)}
                </button>
              </form>
            )}

            {/* Method C: Email & Password */}
            {loginMethod === 'email' && (
              <form onSubmit={handleEmailLogin} className="rounded-[28px] p-4 sm:p-5 bg-white dark:bg-[#1D2040]/90 border border-slate-200 dark:border-slate-700/40 shadow-xl space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('emailAddress', lang)}
                  </label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700 text-sm text-[#111827] dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('password', lang)}
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700 text-sm text-[#111827] dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-[#00B665] hover:bg-[#009E54] text-white font-extrabold text-xs sm:text-sm shadow active:scale-95 transition-all">
                  {selectedRole === 'owner' ? t('loginAsOwnerBtn', lang) : t('loginAsTenantBtn', lang)}
                </button>
              </form>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* --- 3. STREAMLINED SIGN UP (REGISTER NEW ACCOUNT) FLOW --- */}
        {/* ========================================================================= */}
        {authMode === 'signup' && (
          <form onSubmit={handleSignUp} className="rounded-[28px] p-4 sm:p-5 bg-white dark:bg-[#1D2040]/90 border border-slate-200 dark:border-slate-700/40 shadow-xl space-y-3 animate-fade-in">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/60 pb-2">
              <div>
                <h3 className="font-extrabold text-sm text-[#111827] dark:text-white">
                  {selectedRole === 'owner' ? t('createOwnerAccount', lang) : t('createTenantAccount', lang)}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {selectedRole === 'owner' ? t('ownerRegDesc', lang) : t('tenantRegDesc', lang)}
                </p>
              </div>

              {/* Back to Portal Selection */}
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-extrabold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                {t('backToLogin', lang)}
              </button>
            </div>

            {/* Field 1: Full Name */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t('fullName', lang)}
              </label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder={selectedRole === 'owner' ? 'Md ABID HASAN SIFAT' : 'Tanvir Ahmed'}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700 text-xs text-[#111827] dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Field 2: Mobile Phone / Email */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                {lang === 'bn' ? 'মোবাইল নম্বর অথবা ইমেইল' : 'Mobile Phone / Email'}
              </label>
              <input
                type="text"
                required
                value={regContact}
                onChange={(e) => setRegContact(e.target.value)}
                placeholder={selectedRole === 'owner' ? '+880 1911-554433' : '+880 1711-234567'}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700 text-xs text-[#111827] dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            {/* Field 3: Password */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t('password', lang)}
              </label>
              <input
                type="password"
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700 text-xs text-[#111827] dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            {/* Field 4: Building / Unit ID */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                {selectedRole === 'owner' ? (lang === 'bn' ? 'বিল্ডিং / এস্টেটের নাম' : 'Building / Estate Portfolio') : (lang === 'bn' ? 'বিল্ডিং ও ফ্ল্যাট নম্বর' : 'Building & Unit ID (e.g. 2B)')}
              </label>
              <input
                type="text"
                required
                value={regBuildingOrUnit}
                onChange={(e) => setRegBuildingOrUnit(e.target.value)}
                placeholder={selectedRole === 'owner' ? 'Gulshan Luxury Tower Portfolio' : 'Gulshan Tower · Flat 2B'}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700 text-xs text-[#111827] dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#00B665] to-[#009E54] hover:opacity-95 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 active:scale-95 transition-all mt-1">
              {selectedRole === 'owner' ? t('completeSignUpOwner', lang) : t('completeSignUpTenant', lang)}
            </button>
          </form>
        )}

        </div>
      </div>

      {/* Footer Security Notes */}
      <div className="w-full max-w-6xl text-center space-y-0.5 pb-1 z-10">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          {t('footerSecurity', lang)}
        </p>
      </div>

      {/* Biometric Scanning Overlay Animation */}
      {biometricScanning && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 animate-spin flex items-center justify-center">
            <Fingerprint size={24} strokeWidth={1.75} className="text-emerald-400 animate-pulse" />
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-sm text-white">{t('loading', lang)}</h4>
            <p className="text-xs text-slate-400 mt-0.5">{t('dhakaHandshake', lang)}</p>
          </div>
        </div>
      )}

    </div>
  );
};
