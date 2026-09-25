import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Droplets, 
  Zap, 
  Flame, 
  Wrench, 
  ShoppingBag, 
  MessageSquare, 
  QrCode, 
  X, 
  Calendar 
} from 'lucide-react';
import { User } from '../types';
import { UnitSubmeterDetailModal, UnitSubmeterData } from './UnitSubmeterDetailModal';
import { Language, t } from '../utils/i18n';

interface TenantHomeViewProps {
  user: User;
  onNavigateTab: (tab: string) => void;
  onOpenGatePass: () => void;
  onShowToast?: (msg: string) => void;
  lang?: Language;
}

export const TenantHomeView: React.FC<TenantHomeViewProps> = ({
  user,
  onNavigateTab,
  onOpenGatePass,
  onShowToast,
  lang = 'en'
}) => {
  const [selectedSubmeter, setSelectedSubmeter] = useState<UnitSubmeterData | null>(null);
  const [utilityFilter, setUtilityFilter] = useState<'both' | 'water' | 'electricity'>('both');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(5); // Default to Saturday (Peak AC day)
  const [selectedNotice, setSelectedNotice] = useState<{
    category: string;
    categoryColor: string;
    title: string;
    date: string;
    details: string;
    actionText?: string;
  } | null>(null);

  const tenantSubmeterData: UnitSubmeterData = {
    unit: user.unitNumber || '2B',
    tenantName: user.name || 'Tanvir Ahmed',
    waterFlow: 122,
    waterStatus: 'normal',
    waterMeterId: `DWASA-SUB-${user.unitNumber || '2B'}-SMART`,
    waterCostEst: 2.01,
    elecUsage: 52,
    elecStatus: 'high',
    elecMeterId: `DESCO-EL-${user.unitNumber || '2B'}-PREPAID`,
    elecCostEst: 426.40,
    elecPrepaidBalance: 2890.00,
    gasPressure: '0.52 PSI (Normal)',
    lastUpdated: 'Live Streaming'
  };

  // Flat 2B 7-Day IoT Telemetry Dataset
  const tenantTelemetry7Days = [
    { day: lang === 'bn' ? 'সোম' : 'Mon', water: 122, waterCost: '৳2.01', elec: 38, elecCost: '৳311.60', isWaterLeak: false, isElecPeak: false, desc: 'Normal weekday baseline' },
    { day: lang === 'bn' ? 'মঙ্গল' : 'Tue', water: 118, waterCost: '৳1.95', elec: 36, elecCost: '৳295.20', isWaterLeak: false, isElecPeak: false, desc: 'Normal weekday baseline' },
    { day: lang === 'bn' ? 'বুধ' : 'Wed', water: 125, waterCost: '৳2.06', elec: 44, elecCost: '৳360.80', isWaterLeak: false, isElecPeak: false, desc: 'Geyser & laundry cycle' },
    { day: lang === 'bn' ? 'বৃহঃ' : 'Thu', water: 120, waterCost: '৳1.98', elec: 39, elecCost: '৳319.80', isWaterLeak: false, isElecPeak: false, desc: 'Normal weekday baseline' },
    { day: lang === 'bn' ? 'শুক্র' : 'Fri', water: 135, waterCost: '৳2.23', elec: 48, elecCost: '৳393.60', isWaterLeak: false, isElecPeak: false, desc: 'Weekend family cooking' },
    { day: lang === 'bn' ? 'শনি' : 'Sat', water: 142, waterCost: '৳2.34', elec: 52, elecCost: '৳426.40', isWaterLeak: false, isElecPeak: true, desc: 'Weekend Inverter AC Peak (52 kWh)' },
    { day: lang === 'bn' ? 'রবি' : 'Sun', water: 128, waterCost: '৳2.11', elec: 45, elecCost: '৳369.00', isWaterLeak: false, isElecPeak: false, desc: 'Routine household baseline' }
  ];

  // SVG Chart Geometry Constants
  const svgW = 500;
  const svgH = 220;
  const padL = 48; // Left padding for Water Y-axis
  const padR = 48; // Right padding for Electricity Y-axis
  const padT = 25; // Top padding
  const padB = 35; // Bottom padding for X-axis labels
  const plotW = svgW - padL - padR; // 404
  const plotH = svgH - padT - padB; // 160

  const getX = (index: number) => padL + (index / (tenantTelemetry7Days.length - 1)) * plotW;
  const getWaterY = (val: number) => padT + plotH - (Math.min(val, 200) / 200) * plotH;
  const getElecY = (val: number) => padT + plotH - (Math.min(val, 60) / 60) * plotH;

  const createSmoothPath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(i - 1, 0)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(i + 2, points.length - 1)];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
    }
    return d;
  };

  const waterPoints = tenantTelemetry7Days.map((d, i) => ({ x: getX(i), y: getWaterY(d.water) }));
  const elecPoints = tenantTelemetry7Days.map((d, i) => ({ x: getX(i), y: getElecY(d.elec) }));

  const waterPath = createSmoothPath(waterPoints);
  const elecPath = createSmoothPath(elecPoints);

  const waterAreaPath = `${waterPath} L ${waterPoints[waterPoints.length - 1].x},${padT + plotH} L ${waterPoints[0].x},${padT + plotH} Z`;
  const elecAreaPath = `${elecPath} L ${elecPoints[elecPoints.length - 1].x},${padT + plotH} L ${elecPoints[0].x},${padT + plotH} Z`;

  const selectedData = tenantTelemetry7Days[selectedDayIndex];

  return (
    <div className="space-y-6 animate-fade-in w-full pb-6">
      
      {/* 1. Header with Greeting & Location */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] dark:text-white tracking-tight">
            {t('welcomeHome', lang)}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
            Flat {user.unitNumber || '2B'} · {user.buildingName || 'Gulshan Luxury Tower'}
          </p>
        </div>

        {/* Avatar Profile Ring */}
        <div 
          onClick={() => onNavigateTab('profile')}
          title="Click to open My Profile"
          className="relative w-11 h-11 rounded-full ring-2 ring-emerald-500 overflow-hidden shadow-md shrink-0 cursor-pointer active:scale-95 transition-transform hover:scale-105">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60'}
            alt={user.name}
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#00B665] border-2 border-white dark:border-slate-900 rounded-full"></span>
        </div>
      </div>

      {/* 2. Verified Resident Status Card */}
      <div className="rounded-2xl p-5 sm:p-6 bg-slate-900 dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 text-white shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <ShieldCheck size={22} strokeWidth={1.75} className="text-emerald-400" />
          </div>
          <div>
            <h3 className="font-semibold text-base sm:text-lg leading-tight text-white">
              {t('verifiedResident', lang)}
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              {t('nidAuthComplete', lang)} · Flat {user.unitNumber || '2B'}
            </p>
          </div>
        </div>

        <span className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-wider">
          {t('activeStatus', lang)}
        </span>
      </div>

      {/* Main Grid: Desktop Dual-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left Column (Desktop 7 cols): IoT Telemetry Analytics + Notices */}
        <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
          {/* 6. FULL REALISTIC IOT UTILITIES ANALYTICS */}
          <div className="space-y-4">
            
            {/* Section Header */}
            <div className="flex items-center justify-between px-1">
              <div>
                <h3 className="font-semibold text-base text-slate-900 dark:text-white">
                  {t('telemetryAnalytics', lang)}
                </h3>
                <p className="text-xs text-slate-400">
                  {t('telemetrySub', lang)}
                </p>
              </div>
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                {t('online', lang)}
              </span>
            </div>

            {/* Live Infrastructure Pulse Status Bar */}
            <div className="p-3 rounded-xl bg-white dark:bg-[#161B22] border border-slate-200/80 dark:border-slate-800 shadow-sm grid grid-cols-3 gap-2 text-[11px]">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 font-semibold mb-0.5">
                  <Droplets size={13} strokeWidth={1.75} /> DWASA Water
                </div>
                <span className="font-mono text-[10px] text-slate-600 dark:text-slate-400">12.2 L/min · 2.8 bar</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold mb-0.5">
                  <Zap size={13} strokeWidth={1.75} /> DESCO Grid
                </div>
                <span className="font-mono text-[10px] text-slate-600 dark:text-slate-400">228.1V · PF 0.99</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-semibold mb-0.5">
                  <Flame size={13} strokeWidth={1.75} /> Titas Gas
                </div>
                <span className="font-mono text-[10px] text-slate-600 dark:text-slate-400">0.52 PSI Normal</span>
              </div>
            </div>

            {/* Filter Segmented Control */}
            <div className="flex items-center justify-between p-1 rounded-2xl bg-white dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-sm">
              <button
                onClick={() => setUtilityFilter('both')}
                className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1 ${
                  utilityFilter === 'both'
                    ? 'bg-[#121632] text-white shadow-sm ring-1 ring-white/10'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#00B665] to-[#E58325]"></span>
                {t('bothLines', lang)}
              </button>

              <button
                onClick={() => setUtilityFilter('water')}
                className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1 ${
                  utilityFilter === 'water'
                    ? 'bg-[#00B665] text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                {t('waterL', lang)}
              </button>

              <button
                onClick={() => setUtilityFilter('electricity')}
                className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1 ${
                  utilityFilter === 'electricity'
                    ? 'bg-[#E58325] text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300"></span>
                {t('elecKwh', lang)}
              </button>
            </div>

            {/* Dual-Line Weekly Analytics Chart Card */}
            <div className="rounded-[28px] p-5 sm:p-6 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
              
              {/* Header & Legends */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-extrabold text-base text-[#111827] dark:text-white">
                    {t('telemetryTrends', lang)} · Flat {user.unitNumber || '2B'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {t('weeklyComparison', lang)}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold font-mono">
                  {(utilityFilter === 'both' || utilityFilter === 'water') && (
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 text-[10px]">
                      <Droplets size={12} strokeWidth={1.75} />
                      <span>Water (L)</span>
                    </div>
                  )}
                  {(utilityFilter === 'both' || utilityFilter === 'electricity') && (
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50 text-[10px]">
                      <Zap size={12} strokeWidth={1.75} />
                      <span>Elec (kWh)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* SVG Canvas */}
              <div className="relative w-full overflow-hidden select-none bg-slate-50/70 dark:bg-[#0D1117]/70 rounded-2xl p-2 border border-slate-100 dark:border-slate-800/80">
                <svg
                  viewBox={`0 0 ${svgW} ${svgH}`}
                  className="w-full h-52 sm:h-60 overflow-visible"
                  style={{ touchAction: 'manipulation' }}>
                  
                  <defs>
                    <linearGradient id="tenantWaterGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00B665" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#00B665" stopOpacity="0.0" />
                    </linearGradient>

                    <linearGradient id="tenantElecGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#E58325" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#E58325" stopOpacity="0.0" />
                    </linearGradient>

                    <filter id="glowTenantW" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#00B665" floodOpacity="0.5" />
                    </filter>
                    <filter id="glowTenantE" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#E58325" floodOpacity="0.5" />
                    </filter>
                  </defs>

                  {/* Gridlines & Y-Axis Scales */}
                  {[0, 0.25, 0.5, 0.75, 1.0].map((ratio, idx) => {
                    const yPos = padT + plotH * (1 - ratio);
                    const waterVal = Math.round(ratio * 200);
                    const elecVal = Math.round(ratio * 60);

                    return (
                      <g key={idx} className="opacity-60">
                        <line
                          x1={padL}
                          y1={yPos}
                          x2={svgW - padR}
                          y2={yPos}
                          stroke="currentColor"
                          strokeDasharray="3 3"
                          className="text-slate-300 dark:text-slate-700 stroke-[1]"
                        />
                        
                        {(utilityFilter === 'both' || utilityFilter === 'water') && (
                          <text
                            x={padL - 6}
                            y={yPos + 3.5}
                            textAnchor="end"
                            className="fill-[#00B665] font-mono font-bold text-[10px]">
                            {waterVal}
                          </text>
                        )}

                        {(utilityFilter === 'both' || utilityFilter === 'electricity') && (
                          <text
                            x={svgW - padR + 6}
                            y={yPos + 3.5}
                            textAnchor="start"
                            className="fill-[#E58325] font-mono font-bold text-[10px]">
                            {elecVal}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {/* Y-Axis Titles */}
                  {(utilityFilter === 'both' || utilityFilter === 'water') && (
                    <text x={padL - 6} y={padT - 10} textAnchor="end" className="fill-[#00B665] font-semibold text-[9px] uppercase tracking-wider">
                      Liters
                    </text>
                  )}
                  {(utilityFilter === 'both' || utilityFilter === 'electricity') && (
                    <text x={svgW - padR + 6} y={padT - 10} textAnchor="start" className="fill-[#E58325] font-semibold text-[9px] uppercase tracking-wider">
                      kWh
                    </text>
                  )}

                  {/* Active Day Selection Vertical Pillar */}
                  {selectedDayIndex !== null && (
                    <g>
                      <line
                        x1={getX(selectedDayIndex)}
                        y1={padT}
                        x2={getX(selectedDayIndex)}
                        y2={padT + plotH}
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                        className="text-slate-400 dark:text-slate-500"
                      />
                      <circle
                        cx={getX(selectedDayIndex)}
                        cy={padT + plotH + 18}
                        r="3"
                        className="fill-slate-600 dark:fill-slate-300"
                      />
                    </g>
                  )}

                  {/* Water Layer */}
                  {(utilityFilter === 'both' || utilityFilter === 'water') && (
                    <g>
                      <path d={waterAreaPath} fill="url(#tenantWaterGrad)" />
                      <path
                        d={waterPath}
                        fill="none"
                        stroke="#00B665"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#glowTenantW)"
                      />
                      {waterPoints.map((pt, i) => {
                        const isSelected = selectedDayIndex === i;
                        return (
                          <circle
                            key={`tw-${i}`}
                            cx={pt.x}
                            cy={pt.y}
                            r={isSelected ? 6 : 4}
                            fill="#00B665"
                            stroke="#ffffff"
                            strokeWidth={isSelected ? 2.5 : 1.5}
                            className="transition-all duration-300 cursor-pointer"
                          />
                        );
                      })}
                    </g>
                  )}

                  {/* Electricity Layer */}
                  {(utilityFilter === 'both' || utilityFilter === 'electricity') && (
                    <g>
                      <path d={elecAreaPath} fill="url(#tenantElecGrad)" />
                      <path
                        d={elecPath}
                        fill="none"
                        stroke="#E58325"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#glowTenantE)"
                      />
                      {elecPoints.map((pt, i) => {
                        const isSelected = selectedDayIndex === i;
                        const isPeak = tenantTelemetry7Days[i].isElecPeak;
                        return (
                          <g key={`te-${i}`}>
                            {isPeak && (
                              <circle cx={pt.x} cy={pt.y} r="10" className="fill-amber-500/30 animate-ping" />
                            )}
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r={isSelected ? 6 : isPeak ? 5 : 4}
                              fill={isPeak ? '#F59E0B' : '#E58325'}
                              stroke="#ffffff"
                              strokeWidth={isSelected ? 2.5 : 1.5}
                              className="transition-all duration-300 cursor-pointer"
                            />
                          </g>
                        );
                      })}
                    </g>
                  )}

                  {/* X-Axis Day Labels */}
                  {tenantTelemetry7Days.map((item, i) => {
                    const xPos = getX(i);
                    const isSelected = selectedDayIndex === i;
                    return (
                      <g key={`tday-${i}`} onClick={() => setSelectedDayIndex(i)} className="cursor-pointer">
                        <rect x={xPos - 25} y={padT} width="50" height={plotH + padB} fill="transparent" />
                        <text
                          x={xPos}
                          y={padT + plotH + 18}
                          textAnchor="middle"
                          className={`text-[11px] font-bold font-mono ${
                            isSelected
                              ? 'fill-slate-900 dark:fill-white font-extrabold text-[12px]'
                              : 'fill-slate-400 dark:fill-slate-500'
                          }`}>
                          {item.day}
                        </text>
                      </g>
                    );
                  })}

                </svg>
              </div>

              {/* Active Day Inspector */}
              {selectedData && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-sm text-[#111827] dark:text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      {selectedData.day} Telemetry Breakdown
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400">
                      {selectedData.desc}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    {/* Water */}
                    <div className="p-3 rounded-xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20">
                      <span className="font-semibold text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-1">
                        <Droplets size={13} strokeWidth={1.75} /> Water (DWASA)
                      </span>
                      <div className="text-lg font-bold text-slate-900 dark:text-white font-mono mt-1">
                        {selectedData.water} Liters
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
                        Est. Cost: <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">{selectedData.waterCost}</strong>
                      </span>
                    </div>

                    {/* Electricity */}
                    <div className="p-3 rounded-xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20">
                      <span className="font-semibold text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1.5 mb-1">
                        <Zap size={13} strokeWidth={1.75} /> Electricity (DESCO)
                      </span>
                      <div className="text-lg font-bold text-slate-900 dark:text-white font-mono mt-1">
                        {selectedData.elec} kWh
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
                        Est. Cost: <strong className="text-amber-600 dark:text-amber-400 font-semibold">{selectedData.elecCost}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800/80 text-xs">
                    <span className="text-slate-500 dark:text-slate-400">
                      Combined Day Utility Expense:
                    </span>
                    <span className="font-black font-mono text-[#111827] dark:text-white text-sm">
                      ৳{(parseFloat(selectedData.waterCost.replace('৳', '')) + parseFloat(selectedData.elecCost.replace('৳', ''))).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              {/* Submeter Drill-down Shortcut Tile */}
              <div
                onClick={() => setSelectedSubmeter(tenantSubmeterData)}
                className="p-3.5 rounded-2xl bg-white dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 flex items-center justify-between cursor-pointer shadow-sm active:scale-98 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#0D1117] flex items-center justify-center font-black text-sm">
                    2B
                  </div>
                  <div>
                    <h5 className="font-extrabold text-xs sm:text-sm text-[#111827] dark:text-white">
                      Flat 2B IoT Submeter Diagnostics
                    </h5>
                    <p className="text-[10px] text-slate-400 font-mono">
                      DWASA-SUB-2B-SMART · DESCO-EL-2B-PREPAID (৳2,890.00 Balance)
                    </p>
                  </div>
                </div>
                <span className="text-xs text-sky-600 dark:text-sky-400 font-bold">
                  Inspect Diagnostics →
                </span>
              </div>

            </div>

          </div>

          {/* 5. Building Notices Horizontal Carousel */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-extrabold text-base text-[#111827] dark:text-white">
                {t('buildingNotices', lang)}
              </h3>
              <span className="text-xs text-slate-400 font-medium">{t('swipeNotice', lang)}</span>
            </div>

            <div className="flex gap-3.5 overflow-x-auto pb-2 scrollbar-none snap-x sm:grid sm:grid-cols-3 sm:overflow-visible">
              
              {/* Notice Card 1 */}
              <div 
                onClick={() => setSelectedNotice({
                  category: 'MAINTENANCE',
                  categoryColor: 'amber',
                  title: 'Elevator service scheduled for Sunday 10 AM',
                  date: 'Sunday, Mar 8 · 10:00 AM - 12:00 PM',
                  details: 'Routine safety inspection and cable tensioning of Passenger Lift #1 by Otis Bangladesh engineers. Service elevator #2 will remain fully operational during this window.',
                  actionText: 'Got It, Noted'
                })}
                className="min-w-[240px] sm:min-w-0 rounded-[24px] p-4 bg-gradient-to-br from-[#121632] to-[#1E2348] text-white shadow-md hover:shadow-lg hover:border-amber-400/50 border border-transparent flex flex-col justify-between space-y-3 shrink-0 snap-start cursor-pointer active:scale-95 transition-all group">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                    MAINTENANCE
                  </span>
                  <span className="text-[10px] text-amber-300/80 font-bold group-hover:text-amber-300 transition-colors">Read Details →</span>
                </div>
                <p className="text-xs font-semibold leading-relaxed text-slate-100">
                  Elevator service scheduled for Sunday 10 AM
                </p>
              </div>

              {/* Notice Card 2 */}
              <div 
                onClick={() => setSelectedNotice({
                  category: 'SECURITY',
                  categoryColor: 'emerald',
                  title: 'New facial recognition gate sensors live at Lobby',
                  date: 'Active from March 1, 2026',
                  details: 'Automated biometric turnstiles and ANPR camera barrier are now live at the main entrance. Registered residents and pre-cleared guests can scan contactless QR passes.',
                  actionText: 'Understood'
                })}
                className="min-w-[240px] sm:min-w-0 rounded-[24px] p-4 bg-gradient-to-br from-[#121632] to-[#1E2348] text-white shadow-md hover:shadow-lg hover:border-emerald-400/50 border border-transparent flex flex-col justify-between space-y-3 shrink-0 snap-start cursor-pointer active:scale-95 transition-all group">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    SECURITY
                  </span>
                  <span className="text-[10px] text-emerald-300/80 font-bold group-hover:text-emerald-300 transition-colors">Read Details →</span>
                </div>
                <p className="text-xs font-semibold leading-relaxed text-slate-100">
                  New facial recognition gate sensors live at Lobby
                </p>
              </div>

              {/* Notice Card 3 */}
              <div 
                onClick={() => setSelectedNotice({
                  category: 'COMMUNITY',
                  categoryColor: 'sky',
                  title: 'Rooftop garden open for evening resident walks',
                  date: 'Daily 5:00 PM – 10:00 PM',
                  details: 'Residents and family members can access the rooftop botanical garden. Please ensure rooftop smart lock is cleared via Security or intercom.',
                  actionText: 'Enjoy Rooftop'
                })}
                className="min-w-[240px] sm:min-w-0 rounded-[24px] p-4 bg-gradient-to-br from-[#121632] to-[#1E2348] text-white shadow-md hover:shadow-lg hover:border-sky-400/50 border border-transparent flex flex-col justify-between space-y-3 shrink-0 snap-start cursor-pointer active:scale-95 transition-all group">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                    COMMUNITY
                  </span>
                  <span className="text-[10px] text-sky-300/80 font-bold group-hover:text-sky-300 transition-colors">Read Details →</span>
                </div>
                <p className="text-xs font-semibold leading-relaxed text-slate-100">
                  Rooftop garden open for evening resident walks
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column (Desktop 5 cols): Direct Line to Landlord, Services Hub, Gate Security */}
        <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">

          {/* 4. Direct Line to Landlord Banner */}
          <div className="rounded-[28px] p-4 sm:p-5 bg-gradient-to-r from-[#121632] via-[#1E2348] to-[#121632] text-white border border-slate-700 shadow-lg flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-11 h-11 rounded-2xl overflow-hidden ring-2 ring-emerald-500 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60"
                  alt="Owner"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#00B665] border-2 border-[#121632] rounded-full"></span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-xs sm:text-sm truncate">
                    Md ABID HASAN SIFAT
                  </h4>
                  <span className="text-[9px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.2 rounded">
                    {lang === 'bn' ? 'বাড়িওয়ালা' : 'Owner'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 truncate mt-0.5">
                  {t('landlordOnline', lang)}
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('chat')}
              className="px-3.5 py-2 rounded-xl bg-[#00B665] hover:bg-[#009E54] active:scale-95 text-white font-black text-xs uppercase tracking-wider shadow shrink-0 transition-all">
              {t('chatNow', lang)}
            </button>
          </div>

          {/* 3. Essential Resident Services Grid (Hire Pro, Marketplace, Chat to Owner) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-extrabold text-base text-[#111827] dark:text-white">
                {t('residentServicesHub', lang)}
              </h3>
              <span className="text-xs text-slate-400 font-medium">{t('quickAccess', lang)}</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              
              {/* 1. Hire Pro */}
              <div
                onClick={() => onNavigateTab('hirepro')}
                className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-[#161B22] border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/40 shadow-sm hover:shadow-md cursor-pointer active:scale-95 transition-all text-center flex flex-col items-center justify-between space-y-2 group">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-colors">
                  <Wrench size={18} strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                    {t('navHirePro', lang)}
                  </h4>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium block mt-0.5">
                    {t('acPlumber', lang)}
                  </span>
                </div>
              </div>

              {/* 2. Marketplace */}
              <div
                onClick={() => onNavigateTab('marketplace')}
                className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-[#161B22] border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/40 shadow-sm hover:shadow-md cursor-pointer active:scale-95 transition-all text-center flex flex-col items-center justify-between space-y-2 group">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 flex items-center justify-center transition-colors">
                  <ShoppingBag size={18} strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                    {t('marketplace', lang)}
                  </h4>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium block mt-0.5">
                    {t('buySellBay', lang)}
                  </span>
                </div>
              </div>

              {/* 3. Chat to Owner */}
              <div
                onClick={() => onNavigateTab('chat')}
                className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-[#161B22] border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/40 shadow-sm hover:shadow-md cursor-pointer active:scale-95 transition-all text-center flex flex-col items-center justify-between space-y-2 group">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 flex items-center justify-center transition-colors relative">
                  <MessageSquare size={18} strokeWidth={1.75} />
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 border border-white dark:border-[#161B22]"></span>
                </div>
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                    {t('chatOwner', lang)}
                  </h4>
                  <span className="text-[10px] text-sky-600 dark:text-sky-400 font-medium block mt-0.5">
                    {t('directLine', lang)}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* 7. Gate Security Status Card */}
          <div className="rounded-2xl p-5 sm:p-6 bg-white dark:bg-[#161B22] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-base text-slate-900 dark:text-white">
                Gate Security
              </h3>
              <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                LIVE
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="space-y-0.5">
                <span className="text-xs text-slate-400 font-medium">Main Gate Access</span>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  Contactless Barrier Ready
                </div>
              </div>

              <button
                onClick={onOpenGatePass}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-xs tracking-wider shadow-sm transition-all flex items-center gap-1.5">
                <QrCode size={14} strokeWidth={1.75} />
                <span>Gate Pass</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Unit Submeter Detail Modal */}
      <UnitSubmeterDetailModal
        isOpen={!!selectedSubmeter}
        onClose={() => setSelectedSubmeter(null)}
        data={selectedSubmeter}
        onShowToast={onShowToast}
      />

      {/* Interactive Building Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#161B22] rounded-t-3xl sm:rounded-2xl p-6 space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                  selectedNotice.categoryColor === 'amber'
                    ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-400/30'
                    : selectedNotice.categoryColor === 'emerald'
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-400/30'
                    : 'bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-400/30'
                }`}>
                  {selectedNotice.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">Building Notice</span>
              </div>
              <button
                onClick={() => setSelectedNotice(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center">
                <X size={16} strokeWidth={1.75} />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {selectedNotice.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1.5">
                <Calendar size={13} strokeWidth={1.75} />
                <span>{selectedNotice.date}</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {selectedNotice.details}
            </div>

            <div className="flex gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => {
                  if (onShowToast) onShowToast(`Notice acknowledged: "${selectedNotice.title}"`);
                  setSelectedNotice(null);
                }}
                className="w-full py-3.5 rounded-2xl bg-[#00B665] hover:bg-[#009E54] active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider shadow transition-all">
                {selectedNotice.actionText || 'Acknowledge Notice'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
