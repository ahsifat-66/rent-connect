import React, { useState } from 'react';
import { Megaphone, X } from 'lucide-react';
import { backend } from '../services/backend';

interface PublishBroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (title: string) => void;
  lang?: 'en' | 'bn';
}

export const PublishBroadcastModal: React.FC<PublishBroadcastModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  lang = 'en'
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'maintenance' | 'security' | 'financial' | 'general'>('maintenance');
  const [isUrgent, setIsUrgent] = useState(false);
  const [target, setTarget] = useState('All Residents');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      backend.addBroadcast(title.trim(), body.trim(), isUrgent);
      setIsSubmitting(false);
      onSuccess(title.trim());
      onClose();
      // Reset form
      setTitle('');
      setBody('');
      setIsUrgent(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#121624] w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Megaphone size={20} strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#111827] dark:text-white">
                {lang === 'en' ? 'Publish Building Notice' : 'বিল্ডিং নোটিশ জারি করুন'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'en' ? 'Broadcast announcement to residents' : 'সকল বাসিন্দাদের কাছে নোটিশ পাঠান'}
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
          {/* Quick Notice Suggestions */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              {lang === 'en' ? 'Quick Templates' : 'দ্রুত টেমপ্লেট'}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { title: 'Elevator Maintenance', cat: 'maintenance' as const, urgent: false },
                { title: 'Generator Diesel Fill & Test', cat: 'maintenance' as const, urgent: false },
                { title: 'Security Biometric Calibration', cat: 'security' as const, urgent: true },
                { title: 'Monthly Utility Bill Reconciliation', cat: 'financial' as const, urgent: false }
              ].map((tpl, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => {
                    setTitle(tpl.title);
                    setCategory(tpl.cat);
                    setIsUrgent(tpl.urgent);
                    setBody(`Official building notice regarding ${tpl.title}. Please contact building manager if you have any questions.`);
                  }}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-600 transition-colors">
                  {tpl.title}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              {lang === 'en' ? 'Notice Title' : 'নোটিশের শিরোনাম'} *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={lang === 'en' ? 'e.g. Water Tank Annual Deep Cleaning' : 'যেমনঃ পানির ট্যাংক পরিষ্কারকরণ'}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-[#111827] dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Category & Audience */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {lang === 'en' ? 'Category' : 'বিভাগ'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-[#111827] dark:text-white">
                <option value="maintenance">Maintenance</option>
                <option value="security">Security</option>
                <option value="financial">Financial</option>
                <option value="general">General</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {lang === 'en' ? 'Audience' : 'প্রাপক'}
              </label>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-[#111827] dark:text-white">
                <option value="All Residents">All Residents</option>
                <option value="Floors 1-2">Floors 1-2</option>
                <option value="Floors 3-4">Floors 3-4</option>
                <option value="Penthouse Units">Penthouse Units</option>
              </select>
            </div>
          </div>

          {/* Urgent Alert Switch */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
            <div>
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200">
                {lang === 'en' ? 'High Priority Alert' : 'জরুরি উচ্চ অগ্রাধিকার'}
              </h4>
              <p className="text-[10px] text-amber-700 dark:text-amber-300">
                {lang === 'en' ? 'Highlight with red banner on resident dashboards' : 'রেসিডেন্টদের ড্যাশবোর্ডে লাল ব্যানারে প্রদর্শন'}
              </p>
            </div>
            <input
              type="checkbox"
              checked={isUrgent}
              onChange={(e) => setIsUrgent(e.target.checked)}
              className="w-5 h-5 accent-red-600 rounded cursor-pointer"
            />
          </div>

          {/* Body */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              {lang === 'en' ? 'Notice Description & Details' : 'নোটিশের বিবরণ'} *
            </label>
            <textarea
              required
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={lang === 'en' ? 'Specify the time, affected floors, and guidelines for tenants...' : 'নির্দিষ্ট সময় ও নির্দেশনাবলী লিখুন...'}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-[#111827] dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {lang === 'en' ? 'Cancel' : 'বাতিল'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !body.trim()}
              className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 active:scale-98 disabled:opacity-50 transition-all flex items-center justify-center gap-1.5">
              <span>{isSubmitting ? (lang === 'en' ? 'Publishing...' : 'প্রকাশ হচ্ছে...') : (lang === 'en' ? 'Publish Notice' : 'নোটিশ প্রকাশ করুন')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
