import React, { useState } from 'react';
import { 
  Wrench, 
  Droplets, 
  Zap, 
  Snowflake, 
  Hammer, 
  Sparkles, 
  ShieldCheck, 
  X 
} from 'lucide-react';
import { backend } from '../services/backend';

interface DispatchProModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (trade: string, unit: string) => void;
  isOwner?: boolean;
  initialUnit?: string;
  initialTrade?: string;
  lang?: 'en' | 'bn';
}

export const DispatchProModal: React.FC<DispatchProModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  isOwner = true,
  initialUnit = '2B',
  initialTrade = 'Plumber',
  lang = 'en'
}) => {
  const [unit, setUnit] = useState(initialUnit);
  const [trade, setTrade] = useState(initialTrade);
  const [scheduledTime, setScheduledTime] = useState('Today 03:00 PM');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('high');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const desc = description.trim() || `${trade} diagnosis and service requested for Unit ${unit}.`;

    setTimeout(() => {
      backend.addMaintenanceDispatch(unit, trade, desc);
      setIsSubmitting(false);
      onSuccess(trade, unit);
      onClose();
      setDescription('');
    }, 450);
  };

  const tradeOptions = [
    { name: 'Plumber', icon: Droplets, bn: 'প্লাম্বার' },
    { name: 'Electrician', icon: Zap, bn: 'ইলেকট্রিশিয়ান' },
    { name: 'HVAC / AC Pro', icon: Snowflake, bn: 'এসি মেকানিক' },
    { name: 'Carpenter', icon: Hammer, bn: 'কাঠমিস্ত্রি' },
    { name: 'Deep Cleaning', icon: Sparkles, bn: 'ডিপ ক্লিনিং' },
    { name: 'Pest Control', icon: ShieldCheck, bn: 'পোকামাকড় দমন' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#121624] w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Wrench size={20} strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#111827] dark:text-white">
                {isOwner 
                  ? (lang === 'en' ? 'Dispatch Certified Contractor' : 'সার্টিফাইড মিস্ত্রি পাঠান') 
                  : (lang === 'en' ? 'Report Maintenance Issue' : 'মেরামত সমস্যা জানান')
                }
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'en' ? 'Pre-cleared building pass with digital audit log' : 'ডিজিটাল গেট পাসসহ দ্রুত সার্ভিসিং'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center font-bold text-sm">
            <X size={16} strokeWidth={1.75} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
          
          {/* Trade Selection Chips */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              {lang === 'en' ? 'Select Trade / Specialty' : 'মিস্ত্রির ক্যাটাগরি নির্বাচন'} *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {tradeOptions.map(t => {
                const IconComponent = t.icon;
                return (
                  <button
                    type="button"
                    key={t.name}
                    onClick={() => setTrade(t.name)}
                    className={`p-2.5 rounded-xl border text-center transition-all text-xs font-bold ${
                      trade === t.name
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}>
                    <div className="flex justify-center mb-1 text-slate-700 dark:text-slate-200">
                      <IconComponent size={18} strokeWidth={1.75} />
                    </div>
                    <div>{lang === 'en' ? t.name : t.bn}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Unit & Priority */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {lang === 'en' ? 'Apartment Unit' : 'ফ্ল্যাট নম্বর'} *
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-[#111827] dark:text-white font-mono">
                {['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C', '4A', '4B'].map(u => (
                  <option key={u} value={u}>Flat {u}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {lang === 'en' ? 'Urgency Level' : 'জরুরিতা'}
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-[#111827] dark:text-white">
                <option value="urgent">Urgent (Immediate)</option>
                <option value="high">High (Within 2 hrs)</option>
                <option value="medium">Medium (Same Day)</option>
                <option value="low">Low (Scheduled)</option>
              </select>
            </div>
          </div>

          {/* Scheduled Slot */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              {lang === 'en' ? 'Scheduled Time Window' : 'নির্ধারিত সময়'}
            </label>
            <select
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-[#111827] dark:text-white">
              <option value="Immediate Emergency Dispatch">Immediate Emergency Dispatch (Next 30m)</option>
              <option value="Today 03:00 PM">Today 03:00 PM - 05:00 PM</option>
              <option value="Today 06:00 PM">Today 06:00 PM - 08:00 PM</option>
              <option value="Tomorrow 10:00 AM">Tomorrow 10:00 AM - 12:00 PM</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              {lang === 'en' ? 'Problem Details / Diagnostic Notes' : 'সমস্যার বিস্তারিত বিবরণ'}
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={lang === 'en' ? 'e.g. Master bath mixer leaking under sink valve...' : 'যেমনঃ মাস্টার বেডরুমের বাথরুম মিক্সার লিকেজ...'}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-[#111827] dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Security Gate Pass Clearance Note */}
          <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 flex items-center gap-2">
            <ShieldCheck size={16} strokeWidth={1.75} className="shrink-0 text-blue-600 dark:text-blue-400" />
            <span>{lang === 'en' ? 'Automated visitor gate pass generated for technician with turnstile authorization.' : 'টেকনিশিয়ানের জন্য স্বয়ংক্রিয় গেট পাস ও সিকিউরিটি ক্লিয়ারেন্স ইস্যু হবে।'}</span>
          </div>

          {/* Actions */}
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {lang === 'en' ? 'Cancel' : 'বাতিল'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/30 active:scale-98 disabled:opacity-50 transition-all flex items-center justify-center gap-1.5">
              <span>{isSubmitting ? (lang === 'en' ? 'Dispatching...' : 'পাঠানো হচ্ছে...') : (lang === 'en' ? 'Confirm Dispatch' : 'মিস্ত্রি নিশ্চিত করুন')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
