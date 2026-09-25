import React from 'react';
import { Megaphone, Calendar } from 'lucide-react';
import { BroadcastNotice } from '../types';

interface BroadcastsViewProps {
  broadcasts: BroadcastNotice[];
  isOwner: boolean;
  onOpenBroadcastModal: () => void;
  lang: 'en' | 'bn';
}

export const BroadcastsView: React.FC<BroadcastsViewProps> = ({
  broadcasts,
  isOwner,
  onOpenBroadcastModal,
  lang
}) => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-main)]">
            {lang === 'en' ? 'Community Notice Board' : 'নোটিশ বোর্ড'}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
            {lang === 'en' ? 'Official announcements and estate management updates.' : 'বিল্ডিং ব্যবস্থাপনা ও গুরুত্বপূর্ণ নোটিশ।'}
          </p>
        </div>
        {isOwner && (
          <button 
            onClick={onOpenBroadcastModal} 
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm active:scale-95 shadow flex items-center gap-1.5 transition-all">
            <Megaphone size={14} strokeWidth={1.75} />
            <span>{lang === 'en' ? 'Publish Notice' : 'নোটিশ পাঠান'}</span>
          </button>
        )}
      </div>

      <div className="space-y-3 sm:space-y-4">
        {broadcasts.map(bc => (
          <div key={bc.id} className={`card-luxury p-4 sm:p-6 rounded-2xl ${bc.urgent ? 'border-l-4 border-red-500 bg-red-500/5' : ''}`}>
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex items-center gap-1.5">
                {bc.urgent && (
                  <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md">
                    {lang === 'en' ? 'URGENT ALERT' : 'জরুরি নোটিশ'}
                  </span>
                )}
                <h3 className="text-sm sm:text-lg font-extrabold text-[var(--text-main)]">{bc.title}</h3>
              </div>
              <span className="text-[10px] sm:text-xs text-[var(--text-muted)] shrink-0 flex items-center gap-1">
                <Calendar size={12} strokeWidth={1.75} />
                <span>{bc.date}</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">{bc.body}</p>
            <p className="text-[10px] text-[var(--text-muted)] mt-2 font-medium">Issued by: <strong>{bc.author}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};
