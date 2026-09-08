import React from 'react';
import { Unit } from '../types';

interface MarketplaceViewProps {
  units: Unit[];
  isOwner: boolean;
  onOpenAddFlat: () => void;
  lang: 'en' | 'bn';
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  units,
  isOwner,
  onOpenAddFlat,
  lang
}) => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-main)]">
            {lang === 'en' ? 'Luxury Property Marketplace' : 'লাক্সারি ফ্ল্যাট মার্কেটপ্লেস'}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
            {lang === 'en' ? 'Browse vacant luxury apartments in Gulshan-2 or share listings directly via WhatsApp.' : 'গুলশান-২ এলাকার অভিজাত ফ্ল্যাট দেখুন অথবা হোয়াটসঅ্যাপে শেয়ার করুন।'}
          </p>
        </div>
        {isOwner && (
          <button 
            onClick={onOpenAddFlat}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md active:scale-95 self-start sm:self-auto">
            + {lang === 'en' ? 'Add Flat' : 'নতুন ফ্ল্যাট'}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {units.map(unit => (
          <div key={unit.id} className="card-luxury overflow-hidden flex flex-col">
            <div className="relative h-48 sm:h-56">
              <img src={unit.photos[0]} alt={`Flat ${unit.unitNumber}`} className="w-full h-full object-cover" />
              <span className={`absolute top-2.5 left-2.5 text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                unit.status === 'vacant' ? 'bg-emerald-600 text-white' : 'bg-slate-900/80 text-white'
              }`}>
                {unit.status === 'vacant' ? (lang === 'en' ? 'Vacant' : 'খালি আছে') : (lang === 'en' ? 'Occupied' : 'ভাড়া হয়েছে')}
              </span>
              <div className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-xl text-white font-mono font-bold text-xs">
                ৳ {unit.rentAmount.toLocaleString()} / mo
              </div>
            </div>

            <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[var(--text-main)]">Unit {unit.unitNumber}</h3>
                <p className="text-xs text-[var(--text-muted)] mt-1 font-medium">{unit.building} · {unit.sqft} Sq. Ft.</p>
                
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {unit.amenities.map((am, i) => (
                    <span key={i} className="text-[10px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-lg font-semibold">
                      {am}
                    </span>
                  ))}
                </div>
              </div>

              {/* WhatsApp Web Sharing Intent */}
              <div className="pt-3 border-t border-[var(--border-main)] flex items-center gap-2">
                <a 
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `Check out this luxury flat on RentConnect: Unit ${unit.unitNumber} (${unit.sqft} sqft, ৳${unit.rentAmount}/mo) at ${unit.building}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-3 bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 active:scale-95 shadow-sm">
                  📱 {lang === 'en' ? 'Share on WhatsApp' : 'হোয়াটসঅ্যাপে শেয়ার'}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
