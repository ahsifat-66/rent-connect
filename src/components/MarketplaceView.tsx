import React, { useState } from 'react';
import { Unit } from '../types';
import { backend } from '../services/backend';

interface MarketplaceViewProps {
  units: Unit[];
  isOwner: boolean;
  onOpenAddFlat: () => void;
  lang?: 'en' | 'bn';
}

const FALLBACK_PHOTO = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800';

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  units = [],
  isOwner,
  onOpenAddFlat,
  lang = 'en'
}) => {
  const [filter, setFilter] = useState<'all' | 'vacant' | 'occupied'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const safeUnits = Array.isArray(units) ? units : [];
  const vacantUnits = safeUnits.filter(u => u && u.status === 'vacant');
  const occupiedUnits = safeUnits.filter(u => u && u.status !== 'vacant');

  const filteredUnits = safeUnits.filter(unit => {
    if (!unit) return false;
    if (filter === 'vacant' && unit.status !== 'vacant') return false;
    if (filter === 'occupied' && unit.status === 'vacant') return false;
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchUnit = (unit.unitNumber || '').toLowerCase().includes(q);
      const matchBldg = (unit.building || '').toLowerCase().includes(q);
      const matchAmenity = (unit.amenities || []).some(a => (a || '').toLowerCase().includes(q));
      const matchTenant = (unit.tenant?.name || '').toLowerCase().includes(q);
      return matchUnit || matchBldg || matchAmenity || matchTenant;
    }
    return true;
  });

  const handleToggleStatus = (unitId: string) => {
    if (unitId) {
      backend.toggleUnitStatus(unitId);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in w-full max-w-7xl mx-auto pb-8">
      
      {/* 1. Header with Title and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider">
              Building Portfolio
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              Gulshan Luxury Tower
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#111827] dark:text-white tracking-tight mt-1">
            Luxury Property Marketplace & Vacants
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage vacancies, list available apartments, and market units directly via WhatsApp.
          </p>
        </div>

        {isOwner && (
          <button
            onClick={onOpenAddFlat}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#00B665] to-[#009E54] hover:from-[#00A35B] hover:to-[#008C4A] text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0 self-start sm:self-auto">
            <span className="text-base">+</span>
            <span>Add Vacant Flat (নতুন ফ্ল্যাট)</span>
          </button>
        )}
      </div>

      {/* 2. Quick Portfolio KPI Metric Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="text-xl sm:text-2xl font-black text-[#111827] dark:text-white">
            {safeUnits.length}
          </div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
            Total Units
          </p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-center">
          <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {vacantUnits.length}
          </div>
          <p className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider mt-0.5">
            🟢 Vacant Ready
          </p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-[#121632]/60 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-200">
            {occupiedUnits.length}
          </div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
            👥 Occupied
          </p>
        </div>
      </div>

      {/* 3. Search Bar & Filter Tab Pills */}
      <div className="space-y-3">
        
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Flat number (e.g. 4A), amenities, or resident name..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 text-xs text-[#111827] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
          <span className="absolute left-3.5 top-3.5 text-slate-400 text-sm">
            🔍
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 font-bold text-xs">
              ✕
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 ${
              filter === 'all'
                ? 'bg-[#121632] text-white shadow-md'
                : 'bg-white dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-400'
            }`}>
            <span>✨ All Listings</span>
            <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">{safeUnits.length}</span>
          </button>

          <button
            onClick={() => setFilter('vacant')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 ${
              filter === 'vacant'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-400'
                : 'bg-white dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-emerald-500'
            }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>🟢 Vacant Only (খালি ফ্ল্যাট)</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/30 text-[10px]">{vacantUnits.length}</span>
          </button>

          <button
            onClick={() => setFilter('occupied')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 ${
              filter === 'occupied'
                ? 'bg-[#121632] text-white shadow-md'
                : 'bg-white dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-400'
            }`}>
            <span>👥 Occupied Units</span>
            <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">{occupiedUnits.length}</span>
          </button>
        </div>
      </div>

      {/* 4. Units Card Grid */}
      {filteredUnits.length === 0 ? (
        <div className="p-10 rounded-[28px] bg-white dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 text-center space-y-3">
          <div className="text-4xl">🏢</div>
          <h3 className="font-extrabold text-base text-[#111827] dark:text-white">
            No listings found
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            No units match the filter "{filter}". Click below to add a new vacant flat to your Gulshan portfolio.
          </p>
          {isOwner && (
            <button
              onClick={onOpenAddFlat}
              className="px-4 py-2.5 rounded-xl bg-[#00B665] text-white font-bold text-xs shadow-md">
              + Add Flat Now
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredUnits.map(unit => {
            const isVacant = unit.status === 'vacant';
            const unitPhoto = (unit.photos && Array.isArray(unit.photos) && unit.photos.length > 0) 
              ? unit.photos[0] 
              : FALLBACK_PHOTO;
            const rent = Number(unit.rentAmount) || 15000;
            const sqft = Number(unit.sqft) || 1600;
            const beds = Number(unit.bedrooms) || 3;
            const baths = Number(unit.bathrooms) || 2;
            const amenitiesList = Array.isArray(unit.amenities) ? unit.amenities : [];
            const tenantName = unit.tenant?.name || 'Verified Resident';
            const tenantPhone = unit.tenant?.phone || 'Leased';

            return (
              <div
                key={unit.id}
                className="rounded-[28px] overflow-hidden bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                
                {/* Photo & Rent Floating Tag */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-900">
                  <img
                    src={unitPhoto}
                    alt={`Flat ${unit.unitNumber}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Vacancy Status Badge */}
                  <div className="absolute top-3 left-3">
                    {isVacant ? (
                      <span className="px-3 py-1 rounded-full bg-emerald-600/95 backdrop-blur-md text-white font-black text-[10px] tracking-wider uppercase shadow-lg border border-emerald-400/40 flex items-center gap-1.5 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                        VACANT · READY TO MOVE
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white font-bold text-[10px] tracking-wider uppercase shadow border border-white/10 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        OCCUPIED · LEASE ACTIVE
                      </span>
                    )}
                  </div>

                  {/* Monthly Rent Floating Pill */}
                  <div className="absolute bottom-3 right-3 bg-[#121632]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-white font-mono font-black text-xs border border-white/20 shadow-md">
                    ৳ {rent.toLocaleString()} <span className="text-[10px] font-normal text-slate-300">/mo</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-2.5">
                    {/* Unit Title & Specs */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-black text-[#111827] dark:text-white">
                          Flat {unit.unitNumber}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium">
                          {unit.building || 'Gulshan Luxury Tower'} · {sqft} Sq. Ft.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#0D1117] px-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-800">
                        <span>🛏️ {beds}</span>
                        <span>·</span>
                        <span>🚿 {baths}</span>
                      </div>
                    </div>

                    {/* Resident Info or Vacancy Notice */}
                    {isVacant ? (
                      <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                        <span className="font-bold">✨ Available for immediate lease</span>
                        <span className="text-[10px] font-black uppercase text-emerald-600 bg-white dark:bg-[#161B22] px-2 py-0.5 rounded-md">
                          Floor {String(unit.unitNumber).replace(/\D/g, '') || '4'}
                        </span>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center text-[10px] font-black">
                            ✓
                          </span>
                          <span className="font-bold text-slate-700 dark:text-slate-200 truncate">
                            {tenantName}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {tenantPhone}
                        </span>
                      </div>
                    )}

                    {/* Amenities Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {amenitiesList.map((am, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded-lg font-semibold">
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions & WhatsApp Marketing */}
                  <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                    
                    {/* Owner Toggle Status Button */}
                    {isOwner && (
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="text-[11px] text-slate-400 font-bold">
                          Current Status:
                        </span>
                        <button
                          onClick={() => handleToggleStatus(unit.id)}
                          className={`px-3 py-1 rounded-xl font-bold text-[11px] transition-all border ${
                            isVacant
                              ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300 hover:bg-amber-100'
                              : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 hover:bg-emerald-100'
                          }`}>
                          {isVacant ? 'Mark as Occupied' : 'Mark as Vacant'}
                        </button>
                      </div>
                    )}

                    {/* WhatsApp Syndication Button */}
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        `✨ LUXURY FLAT AVAILABLE FOR RENT ✨\n\n🏢 Unit: Flat ${unit.unitNumber} (${sqft} Sq. Ft.)\n📍 Location: ${unit.building || 'Gulshan Luxury Tower'}, Gulshan-2, Dhaka\n💰 Asking Rent: ৳${rent.toLocaleString()} / month\n🛏️ Rooms: ${beds} Bedrooms, ${baths} Bathrooms\n🌟 Highlights: ${amenitiesList.join(', ') || 'Lift, Generator Backup, 24/7 Security'}\n\nManaged by Md ABID HASAN SIFAT via RentConnect. Contact directly for private viewing.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#1ebd59] text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 active:scale-95 shadow transition-all">
                      <span>📱</span>
                      <span>Share on WhatsApp</span>
                    </a>

                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
