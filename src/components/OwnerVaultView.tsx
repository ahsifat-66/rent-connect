import React, { useState, useEffect } from 'react';
import { backend, BackendState } from '../services/backend';
import { QuickReceiptModal } from './QuickReceiptModal';
import { TelemetryDiagnosisModal } from './TelemetryDiagnosisModal';
import { RentReceipt, Unit } from '../types';

interface OwnerVaultViewProps {
  onBack?: () => void;
  onSelectUnit?: (unitNo: string) => void;
  onShowToast?: (msg: string) => void;
}

export const OwnerVaultView: React.FC<OwnerVaultViewProps> = ({ onBack, onSelectUnit, onShowToast }) => {
  const [backendState, setBackendState] = useState<BackendState>(backend.getState());
  const [selectedReceipt, setSelectedReceipt] = useState<RentReceipt | null>(null);
  const [selectedUnitForReceipt, setSelectedUnitForReceipt] = useState<{ unit: string; tenant: string } | null>(null);
  const [diagnosisUnit, setDiagnosisUnit] = useState<string | null>(null);

  useEffect(() => {
    return backend.subscribe(() => {
      setBackendState({ ...backend.getState() });
    });
  }, []);

  const units = backendState.units;
  const vacantUnits = units.filter(u => u.status === 'vacant');
  const occupiedUnits = units.filter(u => u.status !== 'vacant');
  const totalRent = units.reduce((acc, u) => acc + (u.rentAmount || 0), 0);
  const occupancyPercentage = units.length > 0 ? Math.round((occupiedUnits.length / units.length) * 100) : 100;

  const openReceiptForUnit = (unitNo: string, tenantName: string, amount: number) => {
    const r: RentReceipt = {
      id: `REC-2026-03-${unitNo}`,
      month: 'March 2026',
      amount,
      paidOn: 'Mar 4, 2026',
      paymentMethod: 'bKash',
      transactionId: `BK9X${unitNo}7721M`,
      status: 'confirmed'
    };
    setSelectedReceipt(r);
    setSelectedUnitForReceipt({ unit: unitNo, tenant: tenantName });
  };

  // Group units by floor
  const floorMap = new Map<number, Unit[]>();
  units.forEach(u => {
    const floorNum = parseInt(u.unitNumber.replace(/\D/g, '')) || 1;
    if (!floorMap.has(floorNum)) {
      floorMap.set(floorNum, []);
    }
    floorMap.get(floorNum)!.push(u);
  });

  const sortedFloors = Array.from(floorMap.keys()).sort((a, b) => a - b);

  return (
    <div className="space-y-6 animate-fade-in w-full pb-6">
      
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
            NID Vault
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Building Portfolio & Unit Verifications
          </p>
        </div>
      </div>

      {/* 2. Top Metric KPI Cards (Total Units, Verified, Vacant) */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4 lg:gap-6">
        
        {/* Total Units */}
        <div className="rounded-[24px] p-3.5 sm:p-5 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-center space-y-0.5">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111827] dark:text-white">
            {units.length}
          </div>
          <p className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400">
            Total Units
          </p>
        </div>

        {/* Verified Occupied (Green) */}
        <div className="rounded-[24px] p-3.5 sm:p-5 bg-[#00B665] text-white shadow-lg shadow-emerald-500/20 text-center space-y-0.5">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-black">
            {occupiedUnits.length}
          </div>
          <p className="text-[10px] sm:text-xs font-bold text-emerald-100">
            Occupied
          </p>
        </div>

        {/* Vacant Units (Amber/Blue) */}
        <div className="rounded-[24px] p-3.5 sm:p-5 bg-gradient-to-br from-[#E58325] to-[#D97706] text-white shadow-lg shadow-amber-500/20 text-center space-y-0.5">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-black">
            {vacantUnits.length}
          </div>
          <p className="text-[10px] sm:text-xs font-bold text-amber-100">
            🟢 Vacant
          </p>
        </div>

      </div>

      {/* 3. Floors Breakdown (Dynamically Rendered) */}
      <div className="space-y-6 pt-1">
        {sortedFloors.map(floorNum => {
          const floorUnits = floorMap.get(floorNum) || [];

          return (
            <div key={floorNum} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#121632] text-white text-xs font-black tracking-wide">
                  Floor {floorNum}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {floorUnits.length} Units
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {floorUnits.map(unit => {
                  const isVacant = unit.status === 'vacant';
                  const isUnitAlert = backendState.criticalAlerts.some(a => a.unit === unit.unitNumber && a.active);
                  const alertItem = backendState.criticalAlerts.find(a => a.unit === unit.unitNumber && a.active);

                  if (isUnitAlert) {
                    return (
                      <div
                        key={unit.id}
                        className="rounded-[20px] p-3 bg-gradient-to-b from-[#FF4D2D] to-[#E63518] text-white shadow-lg shadow-red-500/35 text-center flex flex-col justify-between space-y-2 relative overflow-hidden animate-pulse">
                        <div className="space-y-1">
                          <span className="w-6 h-6 mx-auto rounded-full bg-white/20 text-white flex items-center justify-center text-xs font-bold">
                            ⚠️
                          </span>
                          <h4 className="font-black text-sm">{unit.unitNumber}</h4>
                          <p className="text-[10px] text-red-100 truncate font-semibold">
                            {unit.tenant?.name || 'Resident'}
                          </p>
                          <div className="text-[10px] font-extrabold text-white uppercase tracking-wider">
                            {alertItem?.type === 'gas_leak' ? 'Gas Alert' : 'Water Leak'}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            if (alertItem?.type === 'gas_leak') {
                              backend.resolveGasLeakAlert(unit.unitNumber);
                              if (onShowToast) onShowToast(`Gas shutoff valve closed for Flat ${unit.unitNumber}.`);
                            } else {
                              setDiagnosisUnit(unit.unitNumber);
                            }
                          }}
                          className="w-full py-1.5 rounded-xl bg-black/20 hover:bg-black/30 text-[9px] font-black uppercase tracking-wider text-white active:scale-95 transition-all">
                          {alertItem?.type === 'gas_leak' ? 'SHUTOFF VALVE' : 'DIAGNOSIS'}
                        </button>
                      </div>
                    );
                  }

                  if (isVacant) {
                    return (
                      <div
                        key={unit.id}
                        className="rounded-[20px] p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border-2 border-dashed border-emerald-500/40 text-center flex flex-col justify-between space-y-2">
                        <div className="space-y-1">
                          <span className="w-6 h-6 mx-auto rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-black">
                            🟢
                          </span>
                          <h4 className="font-black text-sm text-emerald-800 dark:text-emerald-300">
                            {unit.unitNumber}
                          </h4>
                          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                            Vacant Ready
                          </p>
                          <div className="font-mono font-black text-xs text-emerald-700 dark:text-emerald-300">
                            ৳{unit.rentAmount.toLocaleString()}
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (onSelectUnit) onSelectUnit(unit.unitNumber);
                            if (onShowToast) onShowToast(`Opening Flat ${unit.unitNumber} on Marketplace...`);
                          }}
                          className="w-full py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold shadow-sm active:scale-95 transition-all">
                          Market Flat
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={unit.id}
                      className="rounded-[20px] p-3 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-sm text-center flex flex-col justify-between space-y-2">
                      <div className="space-y-1">
                        <span className="w-6 h-6 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#00B665] flex items-center justify-center text-xs font-bold">
                          🛡️
                        </span>
                        <h4 className="font-black text-sm text-[#111827] dark:text-white">
                          {unit.unitNumber}
                        </h4>
                        <p className="text-[10px] text-slate-500 truncate">
                          {unit.tenant?.name || 'Verified Resident'}
                        </p>
                        <div className="font-mono font-bold text-xs text-slate-800 dark:text-slate-200">
                          ৳{unit.rentAmount.toLocaleString()}
                        </div>
                      </div>

                      <button
                        onClick={() => openReceiptForUnit(unit.unitNumber, unit.tenant?.name || 'Resident', unit.rentAmount)}
                        className="w-full py-1.5 rounded-xl bg-slate-50 dark:bg-[#0D1117] text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all">
                        Quick Receipt
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Portfolio Summary Card */}
      <div className="rounded-[28px] p-5 sm:p-6 bg-white dark:bg-[#161B22] border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">📈</span>
          <h3 className="font-extrabold text-base text-[#111827] dark:text-white">
            Portfolio Summary
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-1">
          <div>
            <span className="text-xs text-slate-400 font-medium block">
              Gross Monthly Rent
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-[#111827] dark:text-white mt-0.5">
              ৳{totalRent.toLocaleString()}
            </div>
          </div>

          <div>
            <span className="text-xs text-slate-400 font-medium block">
              Occupancy Rate
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#00B665] font-mono mt-0.5">
              {occupancyPercentage}%
            </div>
          </div>
        </div>
      </div>

      {/* Quick Receipt Modal */}
      <QuickReceiptModal
        isOpen={!!selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
        receipt={selectedReceipt}
        unitNumber={selectedUnitForReceipt?.unit}
        tenantName={selectedUnitForReceipt?.tenant}
      />

      {/* Telemetry Diagnosis Modal */}
      <TelemetryDiagnosisModal
        isOpen={!!diagnosisUnit}
        onClose={() => setDiagnosisUnit(null)}
        unitNumber={diagnosisUnit || '1B'}
        onDispatched={() => {
          if (onShowToast) onShowToast("Plumber dispatched to Flat 1B successfully!");
        }}
      />

    </div>
  );
};
