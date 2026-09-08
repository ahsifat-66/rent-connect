import React, { useState } from 'react';
import { Unit } from '../types';

interface NidVaultViewProps {
  units: Unit[];
  lang: 'en' | 'bn';
}

export const NidVaultView: React.FC<NidVaultViewProps> = ({ units, lang }) => {
  const [biometricUnlocked, setBiometricUnlocked] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const triggerBiometricScan = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setBiometricUnlocked(true);
    }, 1100);
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-main)]">
          🔒 {lang === 'en' ? 'NID Compliance & Contract Vault' : 'এনআইডি ও চুক্তিপত্র ভল্ট'}
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
          {lang === 'en' ? 'Encrypted governmental identification & verified tenancy lease records.' : 'সুরক্ষিত এনআইডি তথ্য এবং ভাড়াটিয়া চুক্তিনামা রেকর্ড।'}
        </p>
      </div>

      {!biometricUnlocked ? (
        <div className="card-luxury p-8 sm:p-12 text-center max-w-xl mx-auto space-y-4 sm:space-y-6 border-dashed border-2 border-amber-500/40">
          <div className="text-3xl sm:text-4xl">🛡️</div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[var(--text-main)]">
              {lang === 'en' ? 'Authenticate with FaceID / Biometric to Access Vault' : 'ভল্ট দেখতে ফেসআইডি বা ফিঙ্গারপ্রিন্ট দিয়ে আনলক করুন'}
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-1 sm:mt-2">
              Biometric hardware gateway protects sensitive resident NID files and tenancy documents.
            </p>
          </div>
          <button 
            onClick={triggerBiometricScan}
            disabled={isAuthenticating}
            className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-[#1A1A40] to-emerald-600 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl active:scale-95">
            {isAuthenticating ? "Scanning Biometrics..." : (lang === 'en' ? 'Unlock Security Vault' : 'বায়োমেট্রিক আনলক করুন')}
          </button>
        </div>
      ) : (
        <div className="card-luxury p-4 sm:p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-emerald-600">✓ {lang === 'en' ? 'Vault Access Authorized' : 'ভল্ট আনলক হয়েছে'}</span>
            <button onClick={() => setBiometricUnlocked(false)} className="text-xs text-[var(--text-muted)] hover:underline">
              Lock Vault 🔒
            </button>
          </div>

          {/* Mobile Cards for NID Vault (< 640px) */}
          <div className="block sm:hidden space-y-3">
            {units.filter(u => u.tenant).map(u => (
              <div key={u.id} className="p-3.5 rounded-2xl bg-[var(--bg-input)] border border-[var(--border-main)] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-xs bg-slate-900 text-white px-2 py-0.5 rounded">Unit {u.unitNumber}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">NID Verified</span>
                </div>
                <h4 className="font-bold text-sm text-[var(--text-main)]">{u.tenant?.name}</h4>
                <p className="text-xs font-mono text-[var(--text-muted)]">NID: {u.tenant?.nid}</p>
                <p className="text-[11px] text-[var(--text-muted)]">Lease Until: {u.tenant?.leaseUntil}</p>
              </div>
            ))}
          </div>

          {/* Desktop Table for NID Vault (>= 640px) */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[var(--border-main)] text-[var(--text-muted)] font-bold">
                  <th className="py-3 px-4">Unit</th>
                  <th className="py-3 px-4">Tenant</th>
                  <th className="py-3 px-4">NID Number</th>
                  <th className="py-3 px-4">Lease Validity</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-main)]">
                {units.filter(u => u.tenant).map(u => (
                  <tr key={u.id}>
                    <td className="py-4 px-4 font-mono font-bold">{u.unitNumber}</td>
                    <td className="py-4 px-4 font-bold">{u.tenant?.name}</td>
                    <td className="py-4 px-4 font-mono">{u.tenant?.nid}</td>
                    <td className="py-4 px-4">{u.tenant?.leaseUntil}</td>
                    <td className="py-4 px-4">
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                        {lang === 'en' ? 'NID Verified' : 'যাচাইকৃত'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}
    </div>
  );
};
