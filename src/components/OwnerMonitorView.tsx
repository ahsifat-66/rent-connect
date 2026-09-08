import React, { useState, useEffect } from 'react';
import { backend, BackendState } from '../services/backend';
import { TelemetryDiagnosisModal } from './TelemetryDiagnosisModal';
import { UnitSubmeterDetailModal, UnitSubmeterData } from './UnitSubmeterDetailModal';

interface OwnerMonitorViewProps {
  onBack?: () => void;
  onShowToast?: (msg: string) => void;
}

export const OwnerMonitorView: React.FC<OwnerMonitorViewProps> = ({ onBack, onShowToast }) => {
  const [backendState, setBackendState] = useState<BackendState>(backend.getState());
  const [filter, setFilter] = useState<'both' | 'water' | 'electricity'>('both');
  const [showLeakModal, setShowLeakModal] = useState(false);
  const [selectedSubmeterUnit, setSelectedSubmeterUnit] = useState<UnitSubmeterData | null>(null);

  useEffect(() => {
    return backend.subscribe(() => {
      setBackendState({ ...backend.getState() });
    });
  }, []);

  const waterLeak = backendState.criticalAlerts.find(a => a.unit === '1B' && a.type === 'water_leak' && a.active);

  // Realistic 9-unit IoT Smart Submeter Roster
  const fullSubmeterRoster: UnitSubmeterData[] = [
    {
      unit: '1A',
      tenantName: 'Fatima Rahman',
      waterFlow: 125,
      waterStatus: 'normal',
      waterMeterId: 'DWASA-SUB-1A-SMART',
      waterCostEst: 2.06,
      elecUsage: 34,
      elecStatus: 'normal',
      elecMeterId: 'DESCO-EL-1A-PREPAID',
      elecCostEst: 278.80,
      elecPrepaidBalance: 2450.00,
      gasPressure: '0.52 PSI (Normal)',
      lastUpdated: '2 min ago'
    },
    {
      unit: '1B',
      tenantName: 'Karim Ahmed',
      waterFlow: 420,
      waterStatus: waterLeak ? 'leak' : 'normal',
      waterMeterId: 'DWASA-SUB-1B-SMART',
      waterCostEst: 6.93,
      elecUsage: 36,
      elecStatus: 'normal',
      elecMeterId: 'DESCO-EL-1B-PREPAID',
      elecCostEst: 295.20,
      elecPrepaidBalance: 1820.00,
      gasPressure: '0.51 PSI (Normal)',
      lastUpdated: 'Live Streaming'
    },
    {
      unit: '1C',
      tenantName: 'Shabnam Begum',
      waterFlow: 120,
      waterStatus: 'normal',
      waterMeterId: 'DWASA-SUB-1C-SMART',
      waterCostEst: 1.98,
      elecUsage: 48,
      elecStatus: 'normal',
      elecMeterId: 'DESCO-EL-1C-PREPAID',
      elecCostEst: 393.60,
      elecPrepaidBalance: 1640.00,
      gasPressure: '0.52 PSI (Normal)',
      lastUpdated: '1 min ago'
    },
    {
      unit: '2A',
      tenantName: 'Rizwan Hasan',
      waterFlow: 115,
      waterStatus: 'normal',
      waterMeterId: 'DWASA-SUB-2A-SMART',
      waterCostEst: 1.90,
      elecUsage: 38,
      elecStatus: 'normal',
      elecMeterId: 'DESCO-EL-2A-PREPAID',
      elecCostEst: 311.60,
      elecPrepaidBalance: 3100.00,
      gasPressure: '0.53 PSI (Normal)',
      lastUpdated: '3 min ago'
    },
    {
      unit: '2B',
      tenantName: 'Tanvir Ahmed',
      waterFlow: 122,
      waterStatus: 'normal',
      waterMeterId: 'DWASA-SUB-2B-SMART',
      waterCostEst: 2.01,
      elecUsage: 52,
      elecStatus: 'high',
      elecMeterId: 'DESCO-EL-2B-PREPAID',
      elecCostEst: 426.40,
      elecPrepaidBalance: 2890.00,
      gasPressure: '0.00 PSI (Solenoid Closed)',
      lastUpdated: 'Live Streaming'
    },
    {
      unit: '2C',
      tenantName: 'Ariful Islam',
      waterFlow: 118,
      waterStatus: 'normal',
      waterMeterId: 'DWASA-SUB-2C-SMART',
      waterCostEst: 1.95,
      elecUsage: 36,
      elecStatus: 'normal',
      elecMeterId: 'DESCO-EL-2C-PREPAID',
      elecCostEst: 295.20,
      elecPrepaidBalance: 1980.00,
      gasPressure: '0.52 PSI (Normal)',
      lastUpdated: '4 min ago'
    },
    {
      unit: '3A',
      tenantName: 'Tasnim Ahmed',
      waterFlow: 135,
      waterStatus: 'normal',
      waterMeterId: 'DWASA-SUB-3A-SMART',
      waterCostEst: 2.23,
      elecUsage: 44,
      elecStatus: 'normal',
      elecMeterId: 'DESCO-EL-3A-PREPAID',
      elecCostEst: 360.80,
      elecPrepaidBalance: 2750.00,
      gasPressure: '0.52 PSI (Normal)',
      lastUpdated: '5 min ago'
    },
    {
      unit: '3B',
      tenantName: 'Mehedi Hasan',
      waterFlow: 130,
      waterStatus: 'normal',
      waterMeterId: 'DWASA-SUB-3B-SMART',
      waterCostEst: 2.15,
      elecUsage: 41,
      elecStatus: 'normal',
      elecMeterId: 'DESCO-EL-3B-PREPAID',
      elecCostEst: 336.20,
      elecPrepaidBalance: 2120.00,
      gasPressure: '0.53 PSI (Normal)',
      lastUpdated: '6 min ago'
    },
    {
      unit: '3C',
      tenantName: 'Sadia Sultana',
      waterFlow: 128,
      waterStatus: 'normal',
      waterMeterId: 'DWASA-SUB-3C-SMART',
      waterCostEst: 2.11,
      elecUsage: 45,
      elecStatus: 'normal',
      elecMeterId: 'DESCO-EL-3C-PREPAID',
      elecCostEst: 369.00,
      elecPrepaidBalance: 1890.00,
      gasPressure: '0.51 PSI (Normal)',
      lastUpdated: '2 min ago'
    }
  ];

  // Combined 7-Day IoT Telemetry Dataset with both Water (DWASA) & Electricity (DESCO)
  const telemetry7Days = [
    { day: 'Mon', water: 125, waterCost: '৳2.06', elec: 38, elecCost: '৳311.60', isWaterLeak: false, isElecPeak: false, desc: 'Normal weekday usage' },
    { day: 'Tue', water: 118, waterCost: '৳1.95', elec: 35, elecCost: '৳287.00', isWaterLeak: false, isElecPeak: false, desc: 'Normal weekday baseline' },
    { day: 'Wed', water: 132, waterCost: '৳2.18', elec: 42, elecCost: '৳344.40', isWaterLeak: false, isElecPeak: false, desc: 'Routine tank fill cycle' },
    { day: 'Thu', water: 120, waterCost: '৳1.98', elec: 39, elecCost: '৳319.80', isWaterLeak: false, isElecPeak: false, desc: 'Normal weekday baseline' },
    { day: 'Fri', water: 145, waterCost: '৳2.39', elec: 48, elecCost: '৳393.60', isWaterLeak: false, isElecPeak: false, desc: 'Jumma prayer & guest peak' },
    { day: 'Sat', water: 420, waterCost: '৳6.93', elec: 52, elecCost: '৳426.40', isWaterLeak: true, isElecPeak: true, desc: '⚠️ Water Leak Spike (Flat 1B) & Weekend AC Peak' },
    { day: 'Sun', water: 135, waterCost: '৳2.23', elec: 46, elecCost: '৳377.20', isWaterLeak: false, isElecPeak: false, desc: 'Post-inspection baseline' }
  ];

  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(5); // Default to Saturday (Spike day)

  // SVG Chart Geometry Constants
  // ViewBox: 0 0 500 240
  const svgW = 500;
  const svgH = 220;
  const padL = 48; // Left padding for Water Y-axis
  const padR = 48; // Right padding for Electricity Y-axis
  const padT = 25; // Top padding
  const padB = 35; // Bottom padding for X-axis labels
  const plotW = svgW - padL - padR; // 404
  const plotH = svgH - padT - padB; // 160

  // Coordinates Generator
  const getX = (index: number) => padL + (index / (telemetry7Days.length - 1)) * plotW;
  const getWaterY = (val: number) => padT + plotH - (Math.min(val, 450) / 450) * plotH;
  const getElecY = (val: number) => padT + plotH - (Math.min(val, 60) / 60) * plotH;

  // Path generator for SVG Smooth Bezier Splines
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

  const waterPoints = telemetry7Days.map((d, i) => ({ x: getX(i), y: getWaterY(d.water) }));
  const elecPoints = telemetry7Days.map((d, i) => ({ x: getX(i), y: getElecY(d.elec) }));

  const waterPath = createSmoothPath(waterPoints);
  const elecPath = createSmoothPath(elecPoints);

  // Closed paths for gradient area fills
  const waterAreaPath = `${waterPath} L ${waterPoints[waterPoints.length - 1].x},${padT + plotH} L ${waterPoints[0].x},${padT + plotH} Z`;
  const elecAreaPath = `${elecPath} L ${elecPoints[elecPoints.length - 1].x},${padT + plotH} L ${elecPoints[0].x},${padT + plotH} Z`;

  const selectedData = telemetry7Days[selectedDayIndex];

  return (
    <div className="space-y-5 animate-fade-in max-w-lg mx-auto pb-6">
      
      {/* 1. Header with Back Button */}
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-base shadow-sm active:scale-95">
            ←
          </button>
        )}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] dark:text-white tracking-tight">
            Ghost Bill Monitor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Real-time IoT Submeter Telemetry (DWASA, DESCO, Titas)
          </p>
        </div>
      </div>

      {/* 2. Live Infrastructure Pulse Status Bar */}
      <div className="p-3.5 rounded-2xl bg-white dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-sm text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-extrabold text-[11px] text-slate-400 uppercase tracking-wider">
            Smart Utility Feeds
          </span>
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Telemetry Online
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
          <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/50">
            <span className="text-sky-700 dark:text-sky-300 font-bold block">💧 DWASA Water</span>
            <span className="font-mono text-[10px] text-slate-600 dark:text-slate-400">14.8 L/min · 2.8 bar</span>
          </div>
          <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/50">
            <span className="text-amber-700 dark:text-amber-300 font-bold block">⚡ DESCO Grid</span>
            <span className="font-mono text-[10px] text-slate-600 dark:text-slate-400">226.4V · PF 0.98</span>
          </div>
          <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50">
            <span className="text-purple-700 dark:text-purple-300 font-bold block">🔥 Titas Gas</span>
            <span className="font-mono text-[10px] text-slate-600 dark:text-slate-400">0.52 PSI Normal</span>
          </div>
        </div>
      </div>

      {/* 3. Leak Alert Detected Banner */}
      {waterLeak && (
        <div className="rounded-[28px] p-5 sm:p-6 bg-gradient-to-r from-[#FF4D2D] via-[#FF3B30] to-[#E63518] text-white shadow-xl shadow-red-500/20 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shrink-0 border border-white/20">
              ⚠️
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg tracking-tight">
                Leak Alert Detected
              </h3>
              <p className="text-xs text-red-100 font-medium mt-0.5">
                Abnormal continuous water flow in Flat 1B (Karim Ahmed)
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <span className="px-3 py-1.5 rounded-full bg-black/20 text-white text-xs font-black font-mono">
              420 L/day (↑235% Spike · Est. ৳6.93/day)
            </span>

            <button
              onClick={() => setShowLeakModal(true)}
              className="px-4 py-2 rounded-xl bg-white text-[#FF3B30] hover:bg-red-50 font-black text-xs uppercase tracking-wider shadow active:scale-95 transition-all">
              VIEW DETAILS
            </button>
          </div>
        </div>
      )}

      {/* 4. Filter Segmented Control */}
      <div className="flex items-center justify-between p-1 rounded-2xl bg-white dark:bg-[#161B22] border border-slate-200 dark:border-slate-800 shadow-sm">
        <button
          onClick={() => setFilter('both')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
            filter === 'both'
              ? 'bg-[#121632] text-white shadow-sm ring-1 ring-white/10'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}>
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#00B665] to-[#E58325]"></span>
          Both (2 Lines)
        </button>

        <button
          onClick={() => setFilter('water')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
            filter === 'water'
              ? 'bg-[#00B665] text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}>
          <span className="w-2 h-2 rounded-full bg-sky-400"></span>
          💧 Water (L)
        </button>

        <button
          onClick={() => setFilter('electricity')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
            filter === 'electricity'
              ? 'bg-[#E58325] text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}>
          <span className="w-2 h-2 rounded-full bg-amber-300"></span>
          ⚡ Electricity (kWh)
        </button>
      </div>

      {/* 5. Realistic Weekly Usage Trends Dual Line Chart */}
      <div className="rounded-[28px] p-5 sm:p-6 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
        
        {/* Title & Legend Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <h3 className="font-extrabold text-base text-[#111827] dark:text-white flex items-center gap-2">
              <span>Weekly Telemetry Comparison</span>
            </h3>
            <p className="text-xs text-slate-400">
              Dual-Stream IoT Sensor Telemetry (Dhaka WASA & DESCO)
            </p>
          </div>

          {/* Interactive Legends */}
          <div className="flex items-center gap-3 text-xs font-bold font-mono">
            {(filter === 'both' || filter === 'water') && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#00B665] dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
                <span className="w-2.5 h-1 rounded-full bg-[#00B665]"></span>
                <span>💧 Water (L)</span>
              </div>
            )}
            {(filter === 'both' || filter === 'electricity') && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-[#E58325] dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
                <span className="w-2.5 h-1 rounded-full bg-[#E58325]"></span>
                <span>⚡ Elec (kWh)</span>
              </div>
            )}
          </div>
        </div>

        {/* SVG Dual-Line Telemetry Canvas */}
        <div className="relative w-full overflow-hidden select-none bg-slate-50/70 dark:bg-[#0D1117]/70 rounded-2xl p-2 border border-slate-100 dark:border-slate-800/80">
          <svg
            viewBox={`0 0 ${svgW} ${svgH}`}
            className="w-full h-56 sm:h-64 overflow-visible"
            style={{ touchAction: 'manipulation' }}>
            
            <defs>
              {/* Water Gradient Fill */}
              <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00B665" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#00B665" stopOpacity="0.0" />
              </linearGradient>

              {/* Electricity Gradient Fill */}
              <linearGradient id="elecGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E58325" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#E58325" stopOpacity="0.0" />
              </linearGradient>

              {/* Glow Filters */}
              <filter id="glowWater" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#00B665" floodOpacity="0.5" />
              </filter>
              <filter id="glowElec" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#E58325" floodOpacity="0.5" />
              </filter>
            </defs>

            {/* Horizontal Gridlines & Y-Axis Scale Marks */}
            {[0, 0.25, 0.5, 0.75, 1.0].map((ratio, idx) => {
              const yPos = padT + plotH * (1 - ratio);
              const waterVal = Math.round(ratio * 450);
              const elecVal = Math.round(ratio * 60);

              return (
                <g key={idx} className="opacity-60">
                  {/* Dotted Grid Line */}
                  <line
                    x1={padL}
                    y1={yPos}
                    x2={svgW - padR}
                    y2={yPos}
                    stroke="currentColor"
                    strokeDasharray="3 3"
                    className="text-slate-300 dark:text-slate-700 stroke-[1]"
                  />
                  
                  {/* Left Y-Axis Label: Water (Liters) */}
                  {(filter === 'both' || filter === 'water') && (
                    <text
                      x={padL - 6}
                      y={yPos + 3.5}
                      textAnchor="end"
                      className="fill-[#00B665] font-mono font-bold text-[10px]">
                      {waterVal}
                    </text>
                  )}

                  {/* Right Y-Axis Label: Electricity (kWh) */}
                  {(filter === 'both' || filter === 'electricity') && (
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
            {(filter === 'both' || filter === 'water') && (
              <text
                x={padL - 6}
                y={padT - 10}
                textAnchor="end"
                className="fill-[#00B665] font-black text-[9px] uppercase tracking-wider">
                💧 Liter
              </text>
            )}
            {(filter === 'both' || filter === 'electricity') && (
              <text
                x={svgW - padR + 6}
                y={padT - 10}
                textAnchor="start"
                className="fill-[#E58325] font-black text-[9px] uppercase tracking-wider">
                ⚡ kWh
              </text>
            )}

            {/* Active Day Vertical Selection Highlight Pillar */}
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

            {/* 1. WATER LAYER (Area & Line) */}
            {(filter === 'both' || filter === 'water') && (
              <g>
                <path d={waterAreaPath} fill="url(#waterGrad)" />
                <path
                  d={waterPath}
                  fill="none"
                  stroke="#00B665"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#glowWater)"
                />
                {waterPoints.map((pt, i) => {
                  const isSelected = selectedDayIndex === i;
                  const isSpike = telemetry7Days[i].isWaterLeak;
                  return (
                    <g key={`w-${i}`}>
                      {isSpike && (
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="12"
                          className="fill-red-500/30 animate-ping"
                        />
                      )}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isSelected ? 6 : isSpike ? 5.5 : 4}
                        fill={isSpike ? '#EF4444' : '#00B665'}
                        stroke="#ffffff"
                        strokeWidth={isSelected ? 2.5 : 1.5}
                        className="transition-all duration-300 cursor-pointer"
                      />
                    </g>
                  );
                })}
              </g>
            )}

            {/* 2. ELECTRICITY LAYER (Area & Line) */}
            {(filter === 'both' || filter === 'electricity') && (
              <g>
                <path d={elecAreaPath} fill="url(#elecGrad)" />
                <path
                  d={elecPath}
                  fill="none"
                  stroke="#E58325"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#glowElec)"
                />
                {elecPoints.map((pt, i) => {
                  const isSelected = selectedDayIndex === i;
                  const isPeak = telemetry7Days[i].isElecPeak;
                  return (
                    <g key={`e-${i}`}>
                      {isPeak && (
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="10"
                          className="fill-amber-500/30 animate-ping"
                        />
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

            {/* X-Axis Day Labels & Click Targets */}
            {telemetry7Days.map((item, i) => {
              const xPos = getX(i);
              const isSelected = selectedDayIndex === i;
              return (
                <g
                  key={`day-${i}`}
                  onClick={() => setSelectedDayIndex(i)}
                  className="cursor-pointer group">
                  {/* Invisible broad click target for easy mobile tapping */}
                  <rect
                    x={xPos - 25}
                    y={padT}
                    width="50"
                    height={plotH + padB}
                    fill="transparent"
                  />
                  <text
                    x={xPos}
                    y={padT + plotH + 18}
                    textAnchor="middle"
                    className={`text-[11px] font-bold font-mono transition-colors ${
                      isSelected
                        ? 'fill-slate-900 dark:fill-white font-extrabold text-[12px]'
                        : 'fill-slate-400 dark:fill-slate-500 group-hover:fill-slate-700 dark:group-hover:fill-slate-300'
                    }`}>
                    {item.day}
                  </text>
                </g>
              );
            })}

          </svg>
        </div>

        {/* 6. Active Day Telemetry Inspector Card */}
        {selectedData && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <h4 className="font-extrabold text-sm text-[#111827] dark:text-white">
                  {selectedData.day} Telemetry Breakdown
                </h4>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                {selectedData.desc}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              {/* Water Metric */}
              <div className={`p-3 rounded-xl border ${
                selectedData.isWaterLeak
                  ? 'bg-red-500/10 border-red-400 dark:border-red-800'
                  : 'bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500/20'
              }`}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[#00B665] flex items-center gap-1">
                    💧 Water (DWASA)
                  </span>
                  {selectedData.isWaterLeak && (
                    <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase animate-pulse">
                      LEAK SPIKE
                    </span>
                  )}
                </div>
                <div className="text-lg font-black text-[#111827] dark:text-white font-mono mt-1">
                  {selectedData.water} Liters
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  Est. Daily Cost: <strong className="text-emerald-600 dark:text-emerald-400">{selectedData.waterCost}</strong>
                </div>
              </div>

              {/* Electricity Metric */}
              <div className={`p-3 rounded-xl border ${
                selectedData.isElecPeak
                  ? 'bg-amber-500/10 border-amber-400 dark:border-amber-800'
                  : 'bg-amber-500/5 dark:bg-amber-950/20 border-amber-500/20'
              }`}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[#E58325] flex items-center gap-1">
                    ⚡ Electricity (DESCO)
                  </span>
                  {selectedData.isElecPeak && (
                    <span className="bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase">
                      PEAK LOAD
                    </span>
                  )}
                </div>
                <div className="text-lg font-black text-[#111827] dark:text-white font-mono mt-1">
                  {selectedData.elec} kWh
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  Est. Daily Cost: <strong className="text-amber-600 dark:text-amber-400">{selectedData.elecCost}</strong>
                </div>
              </div>
            </div>

            {/* Combined Day Cost Total */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800/80 text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                Combined Day Utility Total:
              </span>
              <span className="font-black font-mono text-[#111827] dark:text-white text-sm">
                ৳{(parseFloat(selectedData.waterCost.replace('৳', '')) + parseFloat(selectedData.elecCost.replace('৳', ''))).toFixed(2)}
              </span>
            </div>

          </div>
        )}

      </div>

      {/* 6. Flat-by-Flat Real-Time IoT Submeter Roster */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-extrabold text-sm text-[#111827] dark:text-white">
            Unit Submeter Telemetry (9 Units)
          </h3>
          <span className="text-[11px] text-slate-400 font-medium">Tap flat for live diagnostics</span>
        </div>

        {fullSubmeterRoster.map(sub => {
          const isLeak = sub.waterStatus === 'leak';
          const isHigh = sub.elecStatus === 'high';

          return (
            <div
              key={sub.unit}
              onClick={() => setSelectedSubmeterUnit(sub)}
              className={`p-4 rounded-[24px] transition-all flex items-center justify-between shadow-sm cursor-pointer hover:shadow-md active:scale-98 ${
                isLeak
                  ? 'bg-red-500/5 dark:bg-red-950/20 border-2 border-red-500/60'
                  : 'bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 hover:border-emerald-500/30'
              }`}>
              
              {/* Left Info */}
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-base font-black shrink-0 ${
                  isLeak
                    ? 'bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-300'
                    : 'bg-slate-100 dark:bg-[#0D1117] text-[#111827] dark:text-white border border-slate-200 dark:border-slate-800'
                }`}>
                  {sub.unit}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-sm text-[#111827] dark:text-white truncate">
                      Flat {sub.unit} · {sub.tenantName}
                    </h4>
                    {isLeak && (
                      <span className="bg-red-100 text-red-600 text-[9px] font-black uppercase px-2 py-0.5 rounded-full animate-pulse">
                        LEAK
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <span>💧</span> {sub.waterFlow} L/d
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <span>⚡</span> {sub.elecUsage} kWh
                    </span>
                    <span className="text-[10px]">· {sub.lastUpdated}</span>
                  </div>
                </div>
              </div>

              {/* Right Metrics */}
              <div className="text-right shrink-0">
                <div className="text-xs font-black font-mono text-[#00B665]">
                  ৳{((sub.waterCostEst * 30) + (sub.elecCostEst * 30)).toFixed(0)}/mo
                </div>
                <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                  Est. Utility Bill
                </span>
                <span className="text-[10px] text-sky-600 dark:text-sky-400 font-bold block mt-0.5">
                  Inspect →
                </span>
              </div>

            </div>
          );
        })}
      </div>

      {/* Diagnosis Modal for Flat 1B */}
      <TelemetryDiagnosisModal
        isOpen={showLeakModal}
        onClose={() => setShowLeakModal(false)}
        unitNumber="1B"
        onDispatched={() => {
          if (onShowToast) onShowToast("Emergency plumber dispatched to Flat 1B!");
        }}
      />

      {/* Detailed Submeter Inspection Modal for Any Flat */}
      <UnitSubmeterDetailModal
        isOpen={!!selectedSubmeterUnit}
        onClose={() => setSelectedSubmeterUnit(null)}
        data={selectedSubmeterUnit}
        onDispatchTech={(unit, trade) => {
          backend.addMaintenanceDispatch(unit, trade, `Submeter diagnostic service for Unit ${unit}`);
        }}
        onShowToast={onShowToast}
      />

    </div>
  );
};
