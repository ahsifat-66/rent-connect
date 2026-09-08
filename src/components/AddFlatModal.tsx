import React, { useState } from 'react';
import { backend } from '../services/backend';
import { Unit } from '../types';

interface AddFlatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (unit: Unit) => void;
}

const PHOTO_PRESETS = [
  {
    label: 'Luxury Living Room with Balcony',
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60'
  },
  {
    label: 'Modern Minimalist Master Bed',
    url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60'
  },
  {
    label: 'Contemporary Kitchen & Dining',
    url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60'
  },
  {
    label: 'Gulshan Skyline Panoramic View',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60'
  },
  {
    label: 'Executive Penthouse Suite',
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60'
  }
];

const AVAILABLE_AMENITIES = [
  'Central AC',
  'South Facing Balcony',
  'Generator Backup',
  'Dedicated Car Parking',
  'Passenger & Cargo Lift',
  '24/7 CCTV Security',
  'Smart Gas Leak Sensor',
  'Smart Water Submeter',
  'Servant Room & Bath',
  'Rooftop Garden Access'
];

export const AddFlatModal: React.FC<AddFlatModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [unitNumber, setUnitNumber] = useState('');
  const [floor, setFloor] = useState('4');
  const [rentAmount, setRentAmount] = useState('35000');
  const [sqft, setSqft] = useState('1850');
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(3);
  const [status, setStatus] = useState<'vacant' | 'occupied'>('vacant');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Central AC',
    'South Facing Balcony',
    'Generator Backup',
    'Dedicated Car Parking',
    '24/7 CCTV Security'
  ]);
  const [selectedPhoto, setSelectedPhoto] = useState(PHOTO_PRESETS[0].url);
  const [customPhotoUrl, setCustomPhotoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!unitNumber.trim() || !rentAmount || !sqft) return;

    setIsSubmitting(true);

    const finalPhoto = customPhotoUrl.trim() || selectedPhoto;
    const cleanUnitNo = unitNumber.trim().toUpperCase().replace(/^FLAT\s*/i, '').replace(/^UNIT\s*/i, '');

    const newUnit: Partial<Unit> = {
      unitNumber: cleanUnitNo,
      building: 'Gulshan Luxury Tower',
      rentAmount: parseFloat(rentAmount) || 30000,
      sqft: parseFloat(sqft) || 1600,
      status: status,
      bedrooms: Number(bedrooms) || 3,
      bathrooms: Number(bathrooms) || 2,
      amenities: selectedAmenities.length > 0 ? selectedAmenities : ['Lift', 'Generator', 'Balcony'],
      photos: [finalPhoto]
    };

    const created = backend.addUnit(newUnit);

    setIsSubmitting(false);
    onClose();

    if (onSuccess && created) {
      onSuccess(created);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-white dark:bg-[#161B22] rounded-t-[32px] sm:rounded-[32px] p-6 space-y-5 border border-slate-200 dark:border-slate-800 shadow-2xl animate-slide-up max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase">
                Owner Command
              </span>
              <span className="text-xs text-slate-400">Gulshan Tower</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#111827] dark:text-white mt-1">
              Add Vacant / New Flat
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              List vacant units for instant resident marketplace & WhatsApp syndication
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold flex items-center justify-center hover:bg-slate-200 active:scale-95 transition-all">
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Status Selector (Vacant vs Occupied) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Initial Unit Status
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setStatus('vacant')}
                className={`py-3 px-4 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 border transition-all ${
                  status === 'vacant'
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30'
                    : 'bg-slate-50 dark:bg-[#0D1117] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                }`}>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-pulse"></span>
                <span>🟢 Vacant (খালি ফ্ল্যাট)</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus('occupied')}
                className={`py-3 px-4 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 border transition-all ${
                  status === 'occupied'
                    ? 'bg-[#121632] text-white border-slate-700 shadow-md'
                    : 'bg-slate-50 dark:bg-[#0D1117] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                }`}>
                <span>👥 Occupied (ভাড়া দেওয়া)</span>
              </button>
            </div>
          </div>

          {/* Unit Number & Floor */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Unit Number *
              </label>
              <input
                type="text"
                required
                value={unitNumber}
                onChange={(e) => setUnitNumber(e.target.value)}
                placeholder="e.g. 4A, 4B, 5A"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-xs font-bold text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Floor Level *
              </label>
              <input
                type="number"
                min="1"
                max="30"
                required
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                placeholder="e.g. 4"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-xs font-bold text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Rent & Sqft */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Monthly Rent (BDT ৳) *
              </label>
              <input
                type="number"
                step="500"
                required
                value={rentAmount}
                onChange={(e) => setRentAmount(e.target.value)}
                placeholder="35000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Total Area (Sq. Ft.) *
              </label>
              <input
                type="number"
                required
                value={sqft}
                onChange={(e) => setSqft(e.target.value)}
                placeholder="1850"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Bedrooms
              </label>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map(b => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBedrooms(b)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-extrabold border transition-all ${
                      bedrooms === b
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-slate-50 dark:bg-[#0D1117] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                    }`}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Bathrooms
              </label>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map(b => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBathrooms(b)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-extrabold border transition-all ${
                      bathrooms === b
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-slate-50 dark:bg-[#0D1117] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                    }`}>
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Photo Presets */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Apartment Photo Showcase
            </label>
            <div className="grid grid-cols-5 gap-2">
              {PHOTO_PRESETS.map((preset, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedPhoto(preset.url);
                    setCustomPhotoUrl('');
                  }}
                  className={`relative h-14 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                    selectedPhoto === preset.url && !customPhotoUrl
                      ? 'border-emerald-500 ring-2 ring-emerald-500/40 scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}>
                  <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Amenities Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Select Amenities & Luxury Highlights
            </label>
            <div className="flex flex-wrap gap-1.5">
              {AVAILABLE_AMENITIES.map((am) => {
                const isSelected = selectedAmenities.includes(am);
                return (
                  <button
                    key={am}
                    type="button"
                    onClick={() => toggleAmenity(am)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                        : 'bg-slate-50 dark:bg-[#0D1117] border-slate-200 dark:border-slate-800 text-slate-500'
                    }`}>
                    {isSelected ? '✓ ' : '+ '}
                    {am}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 active:scale-95 transition-all">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-[2] py-3.5 rounded-2xl bg-gradient-to-r from-[#00B665] to-[#009E54] hover:from-[#00A35B] hover:to-[#008C4A] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 active:scale-95 transition-all flex items-center justify-center gap-2">
              <span>✓</span>
              <span>Publish Flat to Portfolio</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
