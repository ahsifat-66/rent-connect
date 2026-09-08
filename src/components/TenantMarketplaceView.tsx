import React, { useState } from 'react';
import { Unit, User } from '../types';

interface CommunityItem {
  id: string;
  title: string;
  category: 'Furniture' | 'Electronics' | 'Parking' | 'Home Decor' | 'Appliances';
  price: number;
  sellerUnit: string;
  sellerName: string;
  postedTime: string;
  photo: string;
  description: string;
  phone: string;
}

interface TenantMarketplaceViewProps {
  units: Unit[];
  user: User;
  onBack: () => void;
  onShowToast?: (msg: string) => void;
}

export const TenantMarketplaceView: React.FC<TenantMarketplaceViewProps> = ({
  units,
  user,
  onBack,
  onShowToast
}) => {
  const [tab, setTab] = useState<'community' | 'apartments'>('community');
  const [showPostModal, setShowPostModal] = useState(false);
  
  // Community items listed by residents
  const [communityItems, setCommunityItems] = useState<CommunityItem[]>([
    {
      id: 'item-1',
      title: 'Italian Leather 3-Seater Recliner Sofa',
      category: 'Furniture',
      price: 35000,
      sellerUnit: 'Flat 3A',
      sellerName: 'Tasnim Ahmed',
      postedTime: '2 hours ago',
      photo: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=60',
      description: 'Imported teak wood frame with genuine soft tan leather. Like new condition, moving abroad.',
      phone: '+8801714667788'
    },
    {
      id: 'item-2',
      title: 'Covered Basement Parking Slot Sublet (P-12)',
      category: 'Parking',
      price: 3500,
      sellerUnit: 'Flat 1C',
      sellerName: 'Shabnam Begum',
      postedTime: 'Yesterday',
      photo: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&auto=format&fit=crop&q=60',
      description: 'Dedicated secured parking bay with CCTV & contactless RFID boom barrier access.',
      phone: '+8801711223344'
    },
    {
      id: 'item-3',
      title: 'Samsung 65" 4K OLED Smart TV (2025 Model)',
      category: 'Electronics',
      price: 62000,
      sellerUnit: 'Flat 2A',
      sellerName: 'Rizwan Hasan',
      postedTime: '3 days ago',
      photo: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&auto=format&fit=crop&q=60',
      description: 'With wall mount bracket, Samsung SolarCell remote and original invoice with warranty.',
      phone: '+8801811556677'
    },
    {
      id: 'item-4',
      title: 'Gree 1.5 Ton Dual Inverter Split AC',
      category: 'Appliances',
      price: 38000,
      sellerUnit: 'Flat 3B',
      sellerName: 'Mehedi Hasan',
      postedTime: '4 days ago',
      photo: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&auto=format&fit=crop&q=60',
      description: '100% copper condenser, energy saving rating 5-star, barely used for 8 months.',
      phone: '+8801915778899'
    }
  ]);

  // Form State for new item
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<CommunityItem['category']>('Furniture');
  const [newPrice, setNewPrice] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handlePostItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrice) return;

    const newItem: CommunityItem = {
      id: `item-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      price: parseFloat(newPrice) || 0,
      sellerUnit: `Flat ${user.unitNumber || '2B'}`,
      sellerName: user.name || 'Tanvir Ahmed',
      postedTime: 'Just now',
      photo: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&auto=format&fit=crop&q=60',
      description: newDesc.trim() || 'Listed by resident in Gulshan Luxury Tower.',
      phone: user.phone || '+8801711234567'
    };

    setCommunityItems([newItem, ...communityItems]);
    setShowPostModal(false);
    setNewTitle('');
    setNewPrice('');
    setNewDesc('');
    if (onShowToast) {
      onShowToast("🎉 Item listed on Resident Marketplace!");
    }
  };

  return (
    <div className="space-y-5 animate-fade-in max-w-lg mx-auto pb-6">
      
      {/* 1. Header with Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-base shadow-sm active:scale-95">
            ←
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] dark:text-white tracking-tight">
              Marketplace
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Gulshan Luxury Tower & Community Exchange
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowPostModal(true)}
          className="px-3.5 py-2 rounded-2xl bg-[#00B665] hover:bg-[#009E54] active:scale-95 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5 shrink-0">
          <span>+</span> List Item
        </button>
      </div>

      {/* 2. Mode Switcher (Community Buy/Sell vs Vacant Apartments) */}
      <div className="flex items-center p-1 rounded-2xl bg-white dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-sm">
        <button
          onClick={() => setTab('community')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
            tab === 'community'
              ? 'bg-[#121632] text-white shadow-sm ring-1 ring-white/10'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}>
          <span>🛍️</span> Resident Buy & Sell ({communityItems.length})
        </button>

        <button
          onClick={() => setTab('apartments')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
            tab === 'apartments'
              ? 'bg-[#121632] text-white shadow-sm ring-1 ring-white/10'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}>
          <span>🏢</span> Vacant Flats ({units.length})
        </button>
      </div>

      {/* 3. Resident Community Listings */}
      {tab === 'community' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Neighbor Items & Rentals
            </span>
            <span className="text-xs text-emerald-600 font-bold">
              Direct Resident Chat & WhatsApp
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {communityItems.map(item => (
              <div
                key={item.id}
                className="rounded-[28px] overflow-hidden bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row">
                
                {/* Photo */}
                <div className="relative h-44 sm:h-auto sm:w-44 shrink-0 overflow-hidden">
                  <img
                    src={item.photo}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {item.category}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-extrabold text-sm sm:text-base text-[#111827] dark:text-white leading-tight">
                        {item.title}
                      </h3>
                      <div className="text-right shrink-0">
                        <span className="text-base sm:text-lg font-black text-[#00B665] font-mono">
                          ৳{item.price.toLocaleString()}
                        </span>
                        {item.category === 'Parking' && (
                          <span className="text-[10px] text-slate-400 block font-medium">/month</span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        {item.sellerUnit}
                      </span>
                      <span>· {item.sellerName}</span>
                    </div>

                    <a
                      href={`https://api.whatsapp.com/send?phone=${item.phone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(
                        `Hi ${item.sellerName}, I am from RentConnect (Flat ${user.unitNumber || '2B'}). I saw your listing for "${item.title}" (৳${item.price.toLocaleString()}). Is it still available?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all">
                      <span>📱</span> WhatsApp
                    </a>
                  </div>

                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Vacant Luxury Flats in Gulshan */}
      {tab === 'apartments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Available Building Units
            </span>
            <span className="text-xs text-slate-400">
              Share with colleagues & friends
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {units.map(unit => (
              <div
                key={unit.id}
                className="rounded-[28px] overflow-hidden bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                
                <div className="relative h-44 sm:h-52">
                  <img
                    src={unit.photos[0]}
                    alt={`Flat ${unit.unitNumber}`}
                    className="w-full h-full object-cover"
                  />
                  <span className={`absolute top-2.5 left-2.5 text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                    unit.status === 'vacant' ? 'bg-emerald-600 text-white' : 'bg-slate-900/80 text-white'
                  }`}>
                    {unit.status === 'vacant' ? 'Vacant Ready' : 'Occupied'}
                  </span>
                  <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl text-white font-mono font-bold text-xs border border-white/20">
                    ৳ {unit.rentAmount.toLocaleString()} / mo
                  </div>
                </div>

                <div className="p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-[#111827] dark:text-white">
                        Flat {unit.unitNumber} · {unit.building}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {unit.sqft} Sq. Ft. · {unit.bedrooms} Beds · {unit.bathrooms} Baths
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {unit.amenities.map((am, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 rounded-lg font-semibold border border-emerald-500/20">
                        {am}
                      </span>
                    ))}
                  </div>

                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `Check out Flat ${unit.unitNumber} (${unit.sqft} sqft, ৳${unit.rentAmount.toLocaleString()}/mo) at ${unit.building} on RentConnect!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#25D366] hover:bg-[#1ebd59] text-white font-extrabold text-xs rounded-2xl flex items-center justify-center gap-2 active:scale-95 shadow transition-all">
                    <span>📱</span> Share Listing via WhatsApp
                  </a>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Post Item Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#161B22] rounded-t-[32px] sm:rounded-[32px] p-6 space-y-4 border border-slate-200 dark:border-slate-800 animate-slide-up">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-[#111827] dark:text-white">
                  Post to Resident Marketplace
                </h3>
                <p className="text-xs text-slate-400">
                  Visible to verified tenants of Gulshan Luxury Tower
                </p>
              </div>
              <button
                onClick={() => setShowPostModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold flex items-center justify-center">
                ✕
              </button>
            </div>

            <form onSubmit={handlePostItem} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Item / Listing Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Dining table 6-seater, microwave oven, parking slot..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-xs text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-xs text-[#111827] dark:text-white focus:outline-none">
                    <option value="Furniture">Furniture</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Parking">Parking Sublet</option>
                    <option value="Appliances">Appliances</option>
                    <option value="Home Decor">Home Decor</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Price (BDT)
                  </label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="৳ Amount"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-xs text-[#111827] dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Description & Condition
                </label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Mention condition, pickup from Flat, dimensions..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-xs text-[#111827] dark:text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#00B665] hover:bg-[#009E54] active:scale-95 text-white font-black text-sm shadow transition-all">
                Publish Listing to Community →
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
