import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Phone, 
  Snowflake, 
  Droplets, 
  Zap, 
  Sparkles, 
  Hammer, 
  ShieldAlert, 
  Wrench, 
  X, 
  Check, 
  Building2, 
  Clock 
} from 'lucide-react';
import { MaintenanceDispatch, User } from '../types';
import { backend } from '../services/backend';

interface TenantHireProViewProps {
  user: User;
  onBack: () => void;
  onShowToast?: (msg: string) => void;
}

interface ServiceCategory {
  id: string;
  name: string;
  banglaName: string;
  icon: string;
  basePrice: number;
  estTime: string;
  description: string;
  rating: number;
  completedJobs: number;
  badge?: string;
}

export const TenantHireProView: React.FC<TenantHireProViewProps> = ({
  user,
  onBack,
  onShowToast
}) => {
  const [selectedService, setSelectedService] = useState<ServiceCategory | null>(null);
  const [problemDescription, setProblemDescription] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('Today 2:00 PM - 4:00 PM');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const renderServiceIcon = (id: string, className = "text-slate-700 dark:text-slate-300") => {
    switch (id) {
      case 'ac':
        return <Snowflake size={18} strokeWidth={1.75} className={className} />;
      case 'plumbing':
        return <Droplets size={18} strokeWidth={1.75} className={className} />;
      case 'electrician':
        return <Zap size={18} strokeWidth={1.75} className={className} />;
      case 'cleaning':
        return <Sparkles size={18} strokeWidth={1.75} className={className} />;
      case 'carpentry':
        return <Hammer size={18} strokeWidth={1.75} className={className} />;
      case 'pest':
        return <ShieldAlert size={18} strokeWidth={1.75} className={className} />;
      default:
        return <Wrench size={18} strokeWidth={1.75} className={className} />;
    }
  };

  const serviceCategories: ServiceCategory[] = [
    {
      id: 'ac',
      name: 'AC Master Servicing & Gas Refill',
      banglaName: 'এসি সার্ভিসিং ও গ্যাস রিফিল',
      icon: 'ac',
      basePrice: 1200,
      estTime: '45 mins',
      description: 'Jet pump deep coil cleaning, electrical capacitor test & refrigerant pressure top-up.',
      rating: 4.9,
      completedJobs: 142,
      badge: 'POPULAR'
    },
    {
      id: 'plumbing',
      name: 'Emergency Plumbing & Sanitary Fix',
      banglaName: 'প্লাম্বিং ও পাইপলাইন মেরামত',
      icon: 'plumbing',
      basePrice: 500,
      estTime: '30 mins',
      description: 'Concealed leak repair, faucet replacement, commode flush valve & water heater check.',
      rating: 4.8,
      completedJobs: 210,
      badge: 'URGENT 24/7'
    },
    {
      id: 'electrician',
      name: 'Electrician & Inverter/IPS Specialist',
      banglaName: 'ইলেকট্রিশিয়ান ও আইপিএস চেক',
      icon: 'electrician',
      basePrice: 600,
      estTime: '30 mins',
      description: 'Short circuit diagnosis, switchboard replacement, chandelier mount & IPS battery health check.',
      rating: 4.9,
      completedJobs: 185
    },
    {
      id: 'cleaning',
      name: 'Deep Apartment Sanitization & Cleaning',
      banglaName: 'ডিপ ক্লিন ও জীবাণুমুক্তকরণ',
      icon: 'cleaning',
      basePrice: 2500,
      estTime: '2.5 hrs',
      description: 'Full kitchen degreasing, bathroom descaling, balcony scrubbing & floor machine buffing.',
      rating: 4.7,
      completedJobs: 98
    },
    {
      id: 'carpentry',
      name: 'Carpenter & Furniture Restoration',
      banglaName: 'কাঠমিস্ত্রি ও ফার্নিচার ফিটিং',
      icon: 'carpentry',
      basePrice: 800,
      estTime: '1 hr',
      description: 'Door lock cylinder change, cabinet hydraulic hinge fix & customized shelf mounting.',
      rating: 4.8,
      completedJobs: 76
    },
    {
      id: 'pest',
      name: 'Pest Control & Bedbug Extermination',
      banglaName: 'পেস্ট কন্ট্রোল ও ছারপোকা দমন',
      icon: 'pest',
      basePrice: 1500,
      estTime: '1 hr',
      description: 'Odorless herbal gel baiting for cockroaches, termites and anti-bedbug heat steaming.',
      rating: 4.9,
      completedJobs: 114
    }
  ];

  const timeSlots = [
    'Today 2:00 PM - 4:00 PM',
    'Today 5:00 PM - 7:00 PM',
    'Tomorrow 10:00 AM - 12:00 PM',
    'Tomorrow 3:00 PM - 5:00 PM'
  ];

  const handleBookService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    setIsSubmitting(true);
    setTimeout(() => {
      backend.addMaintenanceDispatch(
        user.unitNumber || '2B',
        selectedService.name,
        problemDescription.trim() || `Requested ${selectedService.name} service for Flat ${user.unitNumber || '2B'}`
      );
      setIsSubmitting(false);
      setBookingSuccess(true);
      if (onShowToast) {
        onShowToast(`Verified Pro Booked: ${selectedService.name} scheduled for ${selectedTimeSlot}!`);
      }
    }, 600);
  };

  const activeDispatches = backend.getState().dispatches.filter(
    d => d.unitNumber === (user.unitNumber || '2B')
  );

  return (
    <div className="space-y-6 animate-fade-in w-full max-w-6xl mx-auto pb-6">
      
      {/* 1. Header with Back Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shadow-sm active:scale-95">
          <ArrowLeft size={16} strokeWidth={1.75} />
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Hire a Verified Pro
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Building-certified technicians for Flat {user.unitNumber || '2B'}
          </p>
        </div>
      </div>

      {/* 2. Trust Assurance Guarantee Card */}
      <div className="rounded-2xl p-4 bg-slate-900 dark:bg-[#161B22] text-white border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <ShieldCheck size={18} strokeWidth={1.75} />
          </div>
          <div>
            <h4 className="font-semibold text-xs sm:text-sm text-white">
              RentConnect Quality Guarantee
            </h4>
            <p className="text-[11px] text-slate-400">
              Police verified, DMP logged & upfront standardized pricing.
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold tracking-wider uppercase shrink-0">
          VERIFIED
        </span>
      </div>

      {/* 3. Active Bookings / Dispatches for this flat if any */}
      {activeDispatches.length > 0 && (
        <div className="space-y-2.5">
          <h3 className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <span>Active Service Requests</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold">
              {activeDispatches.length} active
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeDispatches.map(item => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-white dark:bg-[#161B22] border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">
                      {item.trade}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[9px] font-semibold uppercase">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                    <span>Pro: {item.contractorName}</span>
                    <span className="text-slate-300 dark:text-slate-700">·</span>
                    <Clock size={10} strokeWidth={1.75} />
                    <span>{item.scheduledTime}</span>
                  </p>
                </div>

                <a
                  href={`tel:${item.phone}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-xs border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 active:scale-95 transition-all">
                  <Phone size={12} strokeWidth={1.75} className="text-emerald-600 dark:text-emerald-400" />
                  <span>Call</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Service Categories Roster */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-extrabold text-base text-[#111827] dark:text-white">
            Select a Pro Service
          </h3>
          <span className="text-xs text-slate-400 font-medium">Standard Gulshan Rates</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {serviceCategories.map(cat => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedService(cat);
                setBookingSuccess(false);
              }}
              className="p-4 rounded-[24px] bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 hover:border-emerald-500/40 cursor-pointer shadow-sm hover:shadow-md active:scale-98 transition-all flex flex-col justify-between space-y-3">
              
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-900/40">
                    {renderServiceIcon(cat.icon)}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#111827] dark:text-white leading-tight">
                      {cat.name}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      {cat.banglaName}
                    </span>
                  </div>
                </div>
                {cat.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[9px] font-black uppercase shrink-0 border border-amber-500/20">
                    {cat.badge}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {cat.description}
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-[#00B665] font-mono">
                    ৳{cat.basePrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-1">
                    (Est. {cat.estTime})
                  </span>
                </div>

                <button className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#00B665] hover:text-white text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors">
                  Book Pro &rarr;
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* 5. Booking Modal Sheet */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#161B22] rounded-t-[32px] sm:rounded-[32px] p-6 space-y-4 border border-slate-200 dark:border-slate-800 animate-slide-up max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/40">
                  {renderServiceIcon(selectedService.icon)}
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-[#111827] dark:text-white">
                    Book {selectedService.name}
                  </h3>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                    Starting from ৳{selectedService.basePrice}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold flex items-center justify-center hover:bg-slate-200">
                <X size={16} strokeWidth={1.75} />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#00B665] flex items-center justify-center mx-auto border-2 border-emerald-500">
                  <Check size={28} strokeWidth={2.5} />
                </div>
                <h3 className="font-black text-lg text-[#111827] dark:text-white">
                  Technician Dispatched!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                  Master Contractor has been notified for Flat {user.unitNumber || '2B'}. Gate pass authorization has been pre-cleared with Security Desk.
                </p>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0D1117] text-left text-xs space-y-1.5 border">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Scheduled Time:</span>
                    <strong>{selectedTimeSlot}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fixed Rate:</span>
                    <strong className="text-emerald-600 font-mono">৳{selectedService.basePrice}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pro Contact:</span>
                    <strong className="font-mono">+880 1819-334455</strong>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full py-3.5 rounded-2xl bg-[#00B665] text-white font-black text-sm shadow active:scale-95 transition-all">
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookService} className="space-y-4">
                {/* Flat & Location Confirmation */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0D1117] text-xs flex items-center justify-between border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Building2 size={15} strokeWidth={1.75} className="text-slate-400" />
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      Service Address:
                    </span>
                  </div>
                  <span className="font-extrabold text-[#111827] dark:text-white">
                    Flat {user.unitNumber || '2B'} · Gulshan Luxury Tower
                  </span>
                </div>

                {/* Time Slot Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Preferred Time Slot
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {timeSlots.map(slot => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`p-2.5 rounded-xl text-left text-xs font-semibold border transition-all flex items-center justify-between ${
                          selectedTimeSlot === slot
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold'
                            : 'bg-white dark:bg-[#0D1117] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}>
                        <div className="flex items-center gap-2">
                          <Clock size={13} strokeWidth={1.75} className="text-slate-400" />
                          <span>{slot}</span>
                        </div>
                        {selectedTimeSlot === slot && <Check size={14} strokeWidth={2} className="text-emerald-600 dark:text-emerald-400" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Problem Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Specific Issue or Instructions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={problemDescription}
                    onChange={(e) => setProblemDescription(e.target.value)}
                    placeholder="e.g. AC cooling low in master bedroom, or leaking faucet in guest bath..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Pricing Summary */}
                <div className="p-3 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Inspection & Labor Fee:</span>
                    <strong className="font-mono text-slate-800 dark:text-slate-200">৳{selectedService.basePrice}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Gate Security Pre-clearance:</span>
                    <strong className="text-emerald-600 font-bold">FREE (Auto-approved)</strong>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-[#00B665] hover:bg-[#009E54] active:scale-95 text-white font-black text-sm shadow transition-all flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <span>Booking Technician...</span>
                  ) : (
                    <span>Confirm & Book Pro Now →</span>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
