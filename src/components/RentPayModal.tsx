import React, { useState } from 'react';
import { CreditCard, X, ShieldCheck, Loader2 } from 'lucide-react';
import { User, RentReceipt } from '../types';
import { backend } from '../services/backend';

interface RentPayModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onPaymentSuccess: (receipt: RentReceipt) => void;
  lang: 'en' | 'bn';
}

export const RentPayModal: React.FC<RentPayModalProps> = ({
  isOpen,
  onClose,
  user,
  onPaymentSuccess,
  lang
}) => {
  const [method, setMethod] = useState<'bkash' | 'nagad' | 'card' | 'bank'>('bkash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [walletPhone, setWalletPhone] = useState('01711234567');
  const [walletPin, setWalletPin] = useState('•••••');

  if (!isOpen) return null;

  const rentAmount = user.rentAmount || 28000;
  const serviceCharge = 3500;
  const totalAmount = rentAmount + serviceCharge;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const paymentMethodStr = method === 'bkash' ? 'bKash' : method === 'nagad' ? 'Nagad' : method === 'card' ? 'Card' : 'Bank Transfer';
      const newReceipt = backend.payRent(rentAmount, paymentMethodStr);
      onPaymentSuccess(newReceipt);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="card-luxury w-full max-w-md bg-[var(--bg-surface)] p-5 sm:p-7 space-y-5 rounded-b-none sm:rounded-2xl max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
          <div className="flex items-center gap-2.5">
            <CreditCard size={22} strokeWidth={1.75} className="text-emerald-500" />
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-[var(--text-main)]">
                {lang === 'en' ? 'Rent & Utility Checkout' : 'ভাড়া ও ইউটিলিটি পরিশোধ'}
              </h3>
              <p className="text-[11px] text-[var(--text-muted)]">Secure Automated Landlord Settlement</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] font-bold">
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        {/* Breakdown Card */}
        <div className="p-4 rounded-2xl bg-[var(--bg-input)] border border-[var(--border-main)] space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Flat Rent (Unit {user.unitNumber || '2B'}):</span>
            <strong className="font-mono">৳ {rentAmount.toLocaleString()}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Building Service & Generator:</span>
            <strong className="font-mono">৳ {serviceCharge.toLocaleString()}</strong>
          </div>
          <div className="pt-2 border-t border-[var(--border-main)] flex justify-between items-center text-sm">
            <span className="font-bold text-[var(--text-main)]">Total Settlement:</span>
            <strong className="font-mono font-black text-[#00B665] text-lg">৳ {totalAmount.toLocaleString()}</strong>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[var(--text-muted)]">Select Payment Channel</label>
          <div className="grid grid-cols-3 gap-2">
            
            {/* bKash */}
            <button
              type="button"
              onClick={() => setMethod('bkash')}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                method === 'bkash'
                  ? 'border-[#E2136E] bg-[#E2136E]/10 ring-2 ring-[#E2136E]'
                  : 'border-[var(--border-main)] bg-[var(--bg-surface)]'
              }`}>
              <span className="font-black text-sm text-[#E2136E]">bKash</span>
              <span className="text-[10px] text-[var(--text-muted)]">Instant MFS</span>
            </button>

            {/* Nagad */}
            <button
              type="button"
              onClick={() => setMethod('nagad')}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                method === 'nagad'
                  ? 'border-[#F7941D] bg-[#F7941D]/10 ring-2 ring-[#F7941D]'
                  : 'border-[var(--border-main)] bg-[var(--bg-surface)]'
              }`}>
              <span className="font-black text-sm text-[#F7941D]">Nagad</span>
              <span className="text-[10px] text-[var(--text-muted)]">Zero Fee</span>
            </button>

            {/* Visa / Master / Nexus */}
            <button
              type="button"
              onClick={() => setMethod('card')}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                method === 'card'
                  ? 'border-indigo-600 bg-indigo-600/10 ring-2 ring-indigo-600'
                  : 'border-[var(--border-main)] bg-[var(--bg-surface)]'
              }`}>
              <span className="font-black text-xs text-indigo-600">Card / EBL</span>
              <span className="text-[10px] text-[var(--text-muted)]">Visa/Master</span>
            </button>
          </div>
        </div>

        {/* Input Simulation */}
        <form onSubmit={handlePay} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[var(--text-muted)] mb-1">
              {method === 'card' ? 'Card Number / Phone' : `${method.toUpperCase()} Mobile Number`}
            </label>
            <input
              type="text"
              required
              value={walletPhone}
              onChange={(e) => setWalletPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] border border-[var(--border-main)] text-sm font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--text-muted)] mb-1">
              {method === 'card' ? 'CVV / OTP' : `${method.toUpperCase()} PIN`}
            </label>
            <input
              type="password"
              required
              value={walletPin}
              onChange={(e) => setWalletPin(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] border border-[var(--border-main)] text-sm font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 rounded-2xl bg-[#00B665] hover:bg-[#009E54] text-white font-black text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-50">
            {isProcessing ? (
              <Loader2 size={16} strokeWidth={2} className="animate-spin" />
            ) : (
              <ShieldCheck size={16} strokeWidth={1.75} />
            )}
            <span>
              {isProcessing
                ? 'Processing Bank Gateway Handshake...'
                : `Confirm ৳ ${totalAmount.toLocaleString()} Payment`}
            </span>
          </button>
        </form>

      </div>
    </div>
  );
};
