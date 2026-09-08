import React from 'react';
import { User } from '../types';

interface DmpFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  lang: 'en' | 'bn';
}

export const DmpFormModal: React.FC<DmpFormModalProps> = ({ isOpen, onClose, user, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="card-luxury w-full max-w-2xl bg-[var(--bg-surface)] p-5 sm:p-7 space-y-4 rounded-b-none sm:rounded-b-[28px] max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600/10 text-emerald-600 flex items-center justify-center text-xl font-bold">
              👮
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-[var(--text-main)]">
                ঢাকা মেট্রোপলিটন পুলিশ (DMP) — নাগরিক/ভাড়াটিয়া তথ্য ফরম
              </h3>
              <p className="text-[11px] text-emerald-600 font-semibold">
                ✓ Gulshan Police Station Digital Registry Verified · Thana Code #GL-2026
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] text-xl font-bold">
            ✕
          </button>
        </div>

        {/* Form Body Preview */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[var(--bg-input)] border border-[var(--border-main)] space-y-4 text-xs">
          
          <div className="text-center border-b border-[var(--border-main)] pb-3">
            <h4 className="font-black text-sm text-[var(--text-main)]">বাংলাদেশ পুলিশ — ঢাকা মেট্রোপলিটন পুলিশ</h4>
            <p className="text-[11px] text-[var(--text-muted)]">ভাড়াটিয়া নিবন্ধন ও নিরাপত্তা যাচাইকরণ ডাটাবেজ</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <span className="text-[var(--text-muted)] block text-[10px]">১. ভাড়াটিয়ার নাম (Tenant Name):</span>
              <strong className="text-[var(--text-main)] text-xs">{user.name}</strong>
            </div>

            <div>
              <span className="text-[var(--text-muted)] block text-[10px]">২. জাতীয় পরিচয়পত্র নম্বর (Smart NID):</span>
              <strong className="text-[var(--text-main)] font-mono text-xs">{user.nid}</strong>
            </div>

            <div>
              <span className="text-[var(--text-muted)] block text-[10px]">৩. মোবাইল নম্বর (Mobile Number):</span>
              <strong className="text-[var(--text-main)] font-mono text-xs">{user.phone}</strong>
            </div>

            <div>
              <span className="text-[var(--text-muted)] block text-[10px]">৪. পেশা ও কর্মস্থল (Occupation):</span>
              <strong className="text-[var(--text-main)] text-xs">{user.occupation || 'Senior Software Architect'}</strong>
            </div>

            <div>
              <span className="text-[var(--text-muted)] block text-[10px]">৫. বর্তমান বাসার ঠিকানা (Building & Unit):</span>
              <strong className="text-[var(--text-main)] text-xs">ফ্ল্যাট {user.unitNumber || '4B'}, গ্রীন হরাইজন লাক্সারি টাওয়ার, গুলশান-২</strong>
            </div>

            <div>
              <span className="text-[var(--text-muted)] block text-[10px]">৬. জরুরি যোগাযোগ (Emergency Contact):</span>
              <strong className="text-[var(--text-main)] text-xs">{user.emergencyContact?.name} ({user.emergencyContact?.phone})</strong>
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--border-main)] flex items-center justify-between text-[11px]">
            <span className="text-[var(--text-muted)]">
              Digital Signature Verified: <strong className="text-emerald-600 font-mono">DMP-QR-HASH-4B</strong>
            </span>
            <span className="text-emerald-600 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
              Status: APPROVED & FILED
            </span>
          </div>

        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={() => alert("Downloading official Bangladesh Police DMP Form PDF...")}
            className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow active:scale-95">
            📄 Download Official DMP PDF
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[var(--bg-input)] text-[var(--text-main)] text-xs font-bold rounded-xl">
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
