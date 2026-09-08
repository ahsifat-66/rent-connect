import React from 'react';
import { User, Unit } from '../types';

interface DashboardViewProps {
  user: User | null;
  units: Unit[];
  onOpenAddFlat: () => void;
  onOpenBroadcast: () => void;
  onOpenTicket: () => void;
  onOpenGatePass: () => void;
  onSelectUnitChat: (unitNumber: string) => void;
  onNavigateMarketplace: () => void;
  lang: 'en' | 'bn';
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  units,
  onOpenAddFlat,
  onOpenBroadcast,
  onOpenTicket,
  onOpenGatePass,
  onSelectUnitChat,
  onNavigateMarketplace,
  lang
}) => {
  const isOwner = user?.role === 'owner';

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      
      {/* Top Welcome & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-[var(--text-main)] tracking-tight">
            {isOwner ? (lang === 'en' ? 'Owner Executive Portfolio' : 'বাড়িওয়ালা এক্সিকিউটিভ ড্যাশবোর্ড') : (lang === 'en' ? 'Resident Suite & Sanctuary' : 'ভাড়াটিয়া পোর্টাল ও নিয়ন্ত্রণকক্ষ')}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium mt-0.5 sm:mt-1">
            {isOwner 
              ? 'Real-time occupancy yield, flat telemetry & automated contractor operations.'
              : `Green Horizon Luxury Tower · Unit ${user?.unitNumber || '4B'} · Verified Tenancy`
            }
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isOwner ? (
            <>
              <button 
                onClick={onOpenAddFlat}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5">
                <span>+</span> {lang === 'en' ? 'Add Flat' : 'নতুন ফ্ল্যাট'}
              </button>
              <button 
                onClick={onOpenBroadcast}
                className="flex-1 sm:flex-initial px-3.5 py-2.5 bg-[var(--bg-surface)] hover:bg-slate-100 dark:hover:bg-slate-800 text-[var(--text-main)] border border-[var(--border-main)] font-bold rounded-2xl text-xs sm:text-sm active:scale-95 flex items-center justify-center gap-1.5">
                <span>📢</span> {lang === 'en' ? 'Broadcast' : 'নোটিশ'}
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button 
                onClick={onOpenGatePass}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-[var(--bg-surface)] border border-[var(--border-main)] text-[var(--text-main)] font-bold rounded-2xl text-xs sm:text-sm shadow active:scale-95 flex items-center justify-center gap-1.5">
                <span>📱</span> {lang === 'en' ? 'Gate Pass' : 'গেট পাস'}
              </button>
              <button 
                onClick={onOpenTicket}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md active:scale-95 flex items-center justify-center gap-1.5">
                <span>🛠️</span> {lang === 'en' ? 'Report Issue' : 'সমস্যা জানান'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* KPI Stats Grid */}
      {isOwner ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          <div className="card-luxury p-4 sm:p-6">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] truncate">Portfolio Yield</p>
            <h3 className="text-lg sm:text-2xl font-black text-[var(--text-main)] mt-1 sm:mt-2">৳ 2,57,000</h3>
            <p className="text-[10px] sm:text-xs text-emerald-600 font-semibold mt-1 truncate">▲ +8.4% growth</p>
          </div>
          <div className="card-luxury p-4 sm:p-6">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] truncate">Monthly Collections</p>
            <h3 className="text-lg sm:text-2xl font-black text-[var(--text-main)] mt-1 sm:mt-2">৳ 1,07,000</h3>
            <p className="text-[10px] sm:text-xs text-emerald-600 font-semibold mt-1 truncate">2 of 4 units paid</p>
          </div>
          <div className="card-luxury p-4 sm:p-6">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] truncate">Outstanding Dues</p>
            <h3 className="text-lg sm:text-2xl font-black text-amber-600 dark:text-amber-400 mt-1 sm:mt-2">৳ 1,50,000</h3>
            <p className="text-[10px] sm:text-xs text-amber-600 font-semibold mt-1 truncate">Units 4B, 5C</p>
          </div>
          <div className="card-luxury p-4 sm:p-6">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] truncate">Occupancy Rate</p>
            <h3 className="text-lg sm:text-2xl font-black text-[var(--text-main)] mt-1 sm:mt-2">50% Occupied</h3>
            <p className="text-[10px] sm:text-xs text-[var(--text-muted)] font-semibold mt-1 truncate">2 Vacant Units</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-6">
          <div className="card-luxury p-4 sm:p-6 border-l-4 border-emerald-500">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-extrabold text-base sm:text-lg text-[var(--text-main)]">
                  {lang === 'en' ? 'Verified Resident Pass' : 'যাচাইকৃত বাসিন্দা পাস'}
                </h4>
                <p className="text-[11px] sm:text-xs text-emerald-600 font-bold mt-0.5">NID: {user?.nid || '19882692610000452'}</p>
              </div>
              <span className="text-xl">🛡️</span>
            </div>
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[var(--border-main)] text-[11px] sm:text-xs text-[var(--text-muted)] space-y-1">
              <p><strong className="text-[var(--text-main)]">Unit:</strong> Flat {user?.unitNumber || '4B'} (Green Horizon)</p>
              <p><strong className="text-[var(--text-main)]">Lease Validity:</strong> Jan 2026 – Dec 2027</p>
            </div>
          </div>

          <div className="card-luxury p-4 sm:p-6">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Rent Status</p>
            <h3 className="text-lg sm:text-xl font-black text-emerald-600 mt-1 sm:mt-2">৳ {user?.rentAmount?.toLocaleString() || '65,000'} (Paid)</h3>
            <p className="text-[11px] sm:text-xs text-[var(--text-muted)] font-semibold mt-1">Next due: Sep 5, 2026</p>
          </div>

          <div className="card-luxury p-4 sm:p-6">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Digital Gate Access</p>
            <h3 className="text-lg sm:text-xl font-black text-[var(--text-main)] mt-1 sm:mt-2">QR Pass Active</h3>
            <p className="text-[11px] sm:text-xs text-emerald-600 font-semibold mt-1">✓ Automated biometric gate</p>
          </div>
        </div>
      )}

      {/* Units Portfolio Overview */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-extrabold text-[var(--text-main)]">
            {lang === 'en' ? 'Portfolio Units Directory' : 'ফ্ল্যাট ডিরেক্টরি'}
          </h3>
          <button onClick={onNavigateMarketplace} className="text-xs font-bold text-emerald-600 hover:underline">
            Explore All →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {units.map(u => (
            <div key={u.id} className="card-luxury overflow-hidden flex flex-col sm:flex-row">
              <div className="sm:w-2/5 h-44 sm:h-auto relative shrink-0">
                <img src={u.photos[0]} alt={`Flat ${u.unitNumber}`} className="w-full h-full object-cover" />
                <span className={`absolute top-2.5 left-2.5 text-[9px] sm:text-[10px] font-black uppercase px-2.5 py-0.5 sm:py-1 rounded-full backdrop-blur-md ${
                  u.status === 'vacant' ? 'bg-emerald-600 text-white' : 'bg-slate-900/80 text-white'
                }`}>
                  {u.status === 'vacant' ? (lang === 'en' ? 'Vacant' : 'খালি') : (lang === 'en' ? 'Occupied' : 'ভাড়া হয়েছে')}
                </span>
              </div>
              <div className="p-4 sm:p-5 sm:w-3/5 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-extrabold text-base sm:text-lg text-[var(--text-main)]">Unit {u.unitNumber}</h4>
                    <span className="font-mono font-bold text-emerald-600 text-sm">৳ {u.rentAmount.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-1 font-medium">{u.sqft} Sq. Ft. · {u.bedrooms} Bed · {u.bathrooms} Bath</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[var(--border-main)]">
                  <span className="text-xs text-[var(--text-muted)] truncate max-w-[140px]">{u.tenant ? u.tenant.name : "Available"}</span>
                  <button 
                    onClick={() => onSelectUnitChat(u.unitNumber)}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 active:scale-95">
                    Chat Unit →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
