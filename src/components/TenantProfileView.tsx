import React, { useState } from 'react';
import { User, RentReceipt, UtilityRecord } from '../types';

interface TenantProfileViewProps {
  user: User;
  onOpenGatePass: () => void;
  onOpenRentPay: () => void;
  onOpenDmpForm: () => void;
  onOpenTicketModal: () => void;
  onLogout: () => void;
  lang: 'en' | 'bn';
}

export const TenantProfileView: React.FC<TenantProfileViewProps> = ({
  user,
  onOpenGatePass,
  onOpenRentPay,
  onOpenDmpForm,
  onOpenTicketModal,
  onLogout,
  lang
}) => {
  const [showNid, setShowNid] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'utilities' | 'ledger' | 'directory'>('overview');

  // Mock Rent Receipts
  const [receipts] = useState<RentReceipt[]>([
    { id: 'REC-2026-08', month: 'August 2026', amount: 65000, paidOn: 'Aug 04, 2026', paymentMethod: 'bKash', transactionId: 'BK9X882910M', status: 'confirmed' },
    { id: 'REC-2026-07', month: 'July 2026', amount: 65000, paidOn: 'Jul 03, 2026', paymentMethod: 'Bank Transfer', transactionId: 'EBL-TR-9921', status: 'confirmed' },
    { id: 'REC-2026-06', month: 'June 2026', amount: 65000, paidOn: 'Jun 05, 2026', paymentMethod: 'Nagad', transactionId: 'NG77192002A', status: 'confirmed' }
  ]);

  // Mock Utilities
  const [utilities] = useState<UtilityRecord[]>([
    { id: 'ut-1', type: 'electricity', title: 'DESCO Smart Prepaid Meter', provider: 'DESCO', meterNumber: '3491-8820-11', currentBalance: 1450, lastBilledAmount: 3200, dueDate: 'Active', status: 'paid', usageDetail: '284 kWh this month (Est. 12 days remaining)' },
    { id: 'ut-2', type: 'water', title: 'Dhaka WASA & Sewerage', provider: 'Dhaka WASA', lastBilledAmount: 850, dueDate: 'Sep 10, 2026', status: 'paid', usageDetail: 'Submeter 4B billed with building common pump' },
    { id: 'ut-3', type: 'gas', title: 'Titas Gas Line Distribution', provider: 'Titas Gas T&D', lastBilledAmount: 1080, dueDate: 'Sep 15, 2026', status: 'paid', usageDetail: '2 Burner pipeline connection active' },
    { id: 'ut-4', type: 'service', title: 'Estate Service & Generator Backup', provider: 'Green Horizon Estate', lastBilledAmount: 6500, dueDate: 'Sep 05, 2026', status: 'due', usageDetail: '24/7 CCTV, Lift, Security Guards, Common cleaning' }
  ]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      
      {/* 1. Tenant Hero Profile Header Card */}
      <div className="card-luxury p-5 sm:p-8 bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-surface-secondary)] border border-[var(--border-main)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          
          {/* Avatar & User Details */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 ring-4 ring-emerald-500 shimmer-glow-emerald shrink-0">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover rounded-full"
              />
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] text-white">
                ✓
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--text-main)] truncate">
                  {user.name}
                </h2>
                <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  {lang === 'en' ? 'Verified Resident' : 'যাচাইকৃত বাসিন্দা'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-emerald-600 font-semibold mt-0.5">
                {user.buildingName || 'Green Horizon Luxury Tower'} · <strong className="text-[var(--text-main)]">Unit {user.unitNumber || '4B'}</strong>
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)] mt-2">
                <span className="flex items-center gap-1 font-mono">
                  📞 {user.phone}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  🆔 NID: {showNid ? user.nid : `${user.nid.slice(0, 4)} •••• •••• ${user.nid.slice(-4)}`}
                  <button
                    onClick={() => setShowNid(!showNid)}
                    className="text-[10px] text-emerald-600 font-bold ml-1 hover:underline">
                    {showNid ? 'Hide' : 'Show'}
                  </button>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons on Hero Card */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-[var(--border-main)]">
            <button
              onClick={onOpenGatePass}
              className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow active:scale-95 transition-all flex items-center justify-center gap-1.5">
              <span>📱</span> {lang === 'en' ? 'QR Gate Pass' : 'কিউআর গেট পাস'}
            </button>
            <button
              onClick={onOpenRentPay}
              className="px-3.5 py-2.5 rounded-xl bg-[#E2136E] hover:bg-[#c90f61] text-white text-xs font-extrabold shadow active:scale-95 transition-all flex items-center justify-center gap-1.5">
              <span>৳</span> {lang === 'en' ? 'Pay Rent' : 'ভাড়া পরিশোধ'}
            </button>
            <button
              onClick={onOpenDmpForm}
              className="px-3 py-2.5 rounded-xl bg-[var(--bg-input)] hover:bg-slate-200 dark:hover:bg-slate-800 text-[var(--text-main)] border border-[var(--border-main)] text-xs font-bold active:scale-95 transition-all flex items-center justify-center gap-1.5">
              <span>👮</span> {lang === 'en' ? 'DMP Police Form' : 'পুলিশ ফরম'}
            </button>
            <button
              onClick={onLogout}
              className="px-3 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 text-xs font-bold active:scale-95 transition-all">
              {lang === 'en' ? 'Sign Out' : 'লগআউট'}
            </button>
          </div>

        </div>

        {/* Lease Progress Banner */}
        <div className="mt-6 pt-5 border-t border-[var(--border-main)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div>
              <span className="text-[var(--text-muted)] font-medium">{lang === 'en' ? 'Tenancy Lease Validity:' : 'ভাড়া চুক্তির মেয়াদ:'}</span>
              <strong className="text-[var(--text-main)] ml-1.5">{user.leaseStartDate} – {user.leaseEndDate}</strong>
            </div>
            <span className="text-emerald-600 font-bold text-[11px] bg-emerald-500/10 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
              ✓ 16 Months Remaining (Renewal Available)
            </span>
          </div>
          <div className="w-full bg-[var(--bg-input)] h-2 rounded-full mt-2.5 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full w-2/5"></div>
          </div>
        </div>

      </div>

      {/* 2. Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'overview', label: lang === 'en' ? 'Tenancy Overview' : 'সারসংক্ষেপ', icon: '📋' },
          { id: 'utilities', label: lang === 'en' ? 'Dhaka Utility Monitoring' : 'ইউটিলিটি ও বিল', icon: '⚡' },
          { id: 'ledger', label: lang === 'en' ? 'Rent Payment Ledger' : 'ভাড়া ও রসিদ', icon: '💳' },
          { id: 'directory', label: lang === 'en' ? 'Building Contacts' : 'জরুরি নম্বর', icon: '📞' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold shrink-0 transition-all flex items-center gap-1.5 active:scale-95 ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-main)] hover:text-[var(--text-main)]'
            }`}>
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 3. TAB 1: Tenancy Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Key Metrics */}
          <div className="card-luxury p-5 space-y-3">
            <div className="flex justify-between items-center text-xs text-[var(--text-muted)]">
              <span className="font-bold uppercase tracking-wider">Monthly Rent</span>
              <span className="text-emerald-600 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">Auto Due 5th</span>
            </div>
            <h3 className="text-2xl font-black text-[var(--text-main)]">৳ {user.rentAmount?.toLocaleString() || '65,000'}</h3>
            <p className="text-xs text-[var(--text-muted)]">Service charge & parking included</p>
            <div className="pt-3 border-t border-[var(--border-main)] flex justify-between items-center text-xs">
              <span className="text-[var(--text-muted)]">Security Deposit:</span>
              <strong className="text-[var(--text-main)] font-mono">৳ {user.securityDeposit?.toLocaleString() || '1,30,000'}</strong>
            </div>
          </div>

          <div className="card-luxury p-5 space-y-3">
            <div className="flex justify-between items-center text-xs text-[var(--text-muted)]">
              <span className="font-bold uppercase tracking-wider">Allocated Amenities</span>
              <span className="text-emerald-600 font-bold">2 Slots</span>
            </div>
            <h3 className="text-lg font-extrabold text-[var(--text-main)]">Slot {user.parkingSlot || 'P-14 & P-15'}</h3>
            <p className="text-xs text-[var(--text-muted)]">Basement Level-1 Protected EV Ready</p>
            <div className="pt-3 border-t border-[var(--border-main)] flex justify-between items-center text-xs">
              <span className="text-[var(--text-muted)]">Building Access:</span>
              <strong className="text-emerald-600">Dual Lift + Generator</strong>
            </div>
          </div>

          <div className="card-luxury p-5 space-y-3">
            <div className="flex justify-between items-center text-xs text-[var(--text-muted)]">
              <span className="font-bold uppercase tracking-wider">DMP Police Verification</span>
              <span className="text-emerald-600 font-bold">Verified</span>
            </div>
            <h3 className="text-lg font-extrabold text-[var(--text-main)]">ভাড়াটিয়া তথ্য ফরম</h3>
            <p className="text-xs text-[var(--text-muted)]">Registered at Gulshan Police Station</p>
            <div className="pt-3 border-t border-[var(--border-main)] flex justify-between items-center text-xs">
              <button
                onClick={onOpenDmpForm}
                className="text-emerald-600 font-bold hover:underline">
                View Official Police Form →
              </button>
            </div>
          </div>

          {/* Resident Details Full Card */}
          <div className="md:col-span-3 card-luxury p-5 sm:p-6 space-y-4">
            <h3 className="font-extrabold text-base text-[var(--text-main)]">
              {lang === 'en' ? 'Registered Tenancy Particulars' : 'ভাড়াটিয়া নিবন্ধনের বিবরণ'}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-[var(--bg-input)] border border-[var(--border-main)] space-y-1">
                <span className="text-[var(--text-muted)] block">Occupation / Profession</span>
                <strong className="text-[var(--text-main)] text-sm">{user.occupation || 'Senior Software Architect'}</strong>
              </div>

              <div className="p-3.5 rounded-2xl bg-[var(--bg-input)] border border-[var(--border-main)] space-y-1">
                <span className="text-[var(--text-muted)] block">Family / Resident Count</span>
                <strong className="text-[var(--text-main)] text-sm">{user.familyMembersCount || 3} Registered Persons</strong>
              </div>

              <div className="p-3.5 rounded-2xl bg-[var(--bg-input)] border border-[var(--border-main)] space-y-1">
                <span className="text-[var(--text-muted)] block">Emergency Contact</span>
                <strong className="text-[var(--text-main)] text-sm">{user.emergencyContact?.name || 'Dr. Rehana Parvin'}</strong>
                <span className="text-[10px] text-emerald-600 block">{user.emergencyContact?.phone}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[var(--bg-input)] border border-[var(--border-main)] space-y-1">
                <span className="text-[var(--text-muted)] block">Digital Tenancy Contract</span>
                <strong className="text-emerald-600 text-sm block">Signed & Encrypted</strong>
                <span className="text-[10px] text-[var(--text-muted)]">Hash: 0x9f88a...4b12</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--border-main)]">
              <span className="text-xs text-[var(--text-muted)]">
                Have a maintenance request in your flat?
              </span>
              <button
                onClick={onOpenTicketModal}
                className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow active:scale-95">
                🛠️ Log Maintenance Ticket
              </button>
            </div>
          </div>

        </div>
      )}

      {/* 4. TAB 2: Dhaka Utility Monitoring */}
      {activeTab === 'utilities' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-extrabold text-lg text-[var(--text-main)]">Dhaka Utility Telemetry & Submeters</h3>
              <p className="text-xs text-[var(--text-muted)]">Real-time balances and submeter allocations for Unit 4B.</p>
            </div>
            <button
              onClick={() => alert("Recharge gateway connected for DESCO Smart Meter.")}
              className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow self-start sm:self-auto">
              ⚡ Instant Meter Recharge (bKash)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {utilities.map(ut => (
              <div key={ut.id} className="card-luxury p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                        {ut.provider}
                      </span>
                      <h4 className="font-extrabold text-base text-[var(--text-main)] mt-1">{ut.title}</h4>
                    </div>
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                      ut.status === 'paid' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ut.status}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--text-muted)] mt-2">{ut.usageDetail}</p>
                </div>

                <div className="pt-3 border-t border-[var(--border-main)] flex justify-between items-center text-xs">
                  {ut.currentBalance !== undefined ? (
                    <div>
                      <span className="text-[var(--text-muted)] block text-[10px]">Prepaid Balance</span>
                      <strong className="text-emerald-600 text-base font-mono">৳ {ut.currentBalance.toLocaleString()}</strong>
                    </div>
                  ) : (
                    <div>
                      <span className="text-[var(--text-muted)] block text-[10px]">Last Billed</span>
                      <strong className="text-[var(--text-main)] text-sm font-mono">৳ {ut.lastBilledAmount.toLocaleString()}</strong>
                    </div>
                  )}

                  <span className="text-[11px] text-[var(--text-muted)]">
                    Due: <strong className="text-[var(--text-main)]">{ut.dueDate}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. TAB 3: Rent Payment Ledger & History */}
      {activeTab === 'ledger' && (
        <div className="card-luxury p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-extrabold text-lg text-[var(--text-main)]">Verified Rent Receipts Ledger</h3>
              <p className="text-xs text-[var(--text-muted)]">Cryptographically verified payment slips generated for Gulshan-2 Flat 4B.</p>
            </div>
            <button
              onClick={onOpenRentPay}
              className="px-4 py-2.5 bg-[#E2136E] hover:bg-[#c90f61] text-white font-bold text-xs rounded-xl shadow self-start sm:self-auto flex items-center gap-1.5">
              <span>৳</span> Pay Current Month Rent
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[540px]">
              <thead>
                <tr className="border-b border-[var(--border-main)] text-[var(--text-muted)] font-bold">
                  <th className="py-3 px-3">Receipt No</th>
                  <th className="py-3 px-3">Billing Month</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Paid Date</th>
                  <th className="py-3 px-3">Method / TxID</th>
                  <th className="py-3 px-3">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-main)]">
                {receipts.map(r => (
                  <tr key={r.id} className="hover:bg-[var(--bg-input)]">
                    <td className="py-3.5 px-3 font-mono font-bold">{r.id}</td>
                    <td className="py-3.5 px-3 font-bold text-[var(--text-main)]">{r.month}</td>
                    <td className="py-3.5 px-3 font-mono font-extrabold text-emerald-600">৳ {r.amount.toLocaleString()}</td>
                    <td className="py-3.5 px-3">{r.paidOn}</td>
                    <td className="py-3.5 px-3">
                      <span className="block font-semibold">{r.paymentMethod}</span>
                      <span className="font-mono text-[10px] text-[var(--text-muted)]">{r.transactionId}</span>
                    </td>
                    <td className="py-3.5 px-3">
                      <button
                        onClick={() => alert(`Generating Official PDF receipt for ${r.id}...`)}
                        className="px-2.5 py-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-main)] text-emerald-600 font-bold hover:bg-emerald-500 hover:text-white transition-colors">
                        PDF Slip 📄
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. TAB 4: Building Directory & Emergency */}
      {activeTab === 'directory' && (
        <div className="card-luxury p-5 sm:p-6 space-y-4">
          <div>
            <h3 className="font-extrabold text-lg text-[var(--text-main)]">Green Horizon Estate Directory</h3>
            <p className="text-xs text-[var(--text-muted)]">Direct 24/7 hotlines for security, building management, and emergency response.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            {[
              { role: 'Building Caretaker & Manager', name: 'Md. Alamgir Hossain', phone: '+880 1711-223344', icon: '🏢' },
              { role: 'Main Lobby & Gate Security Guard', name: 'Guard Station (Gate 1)', phone: '+880 1819-001122', icon: '👮' },
              { role: 'Lift & Elevator Emergency Dispatch', name: 'Otis Hotline Support', phone: '+880 1912-334455', icon: '🛗' },
              { role: 'Generator & Substation Operator', name: 'Eng. Tareq Hasan', phone: '+880 1713-889900', icon: '⚡' },
              { role: 'Gulshan Fire Station & Rescue', name: 'Fire Service HQ (Gulshan)', phone: '+880 2-9882222', icon: '🚒' },
              { role: 'Gulshan Thana (Police Control)', name: 'Dhaka Metropolitan Police', phone: '+880 2-9880234', icon: '🚓' }
            ].map((contact, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[var(--bg-input)] border border-[var(--border-main)] flex items-start justify-between">
                <div>
                  <span className="text-xl mb-1 block">{contact.icon}</span>
                  <h4 className="font-bold text-[var(--text-main)] text-sm">{contact.role}</h4>
                  <p className="text-xs text-[var(--text-muted)]">{contact.name}</p>
                  <p className="font-mono font-bold text-emerald-600 mt-1">{contact.phone}</p>
                </div>
                <a
                  href={`tel:${contact.phone}`}
                  className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow active:scale-95">
                  Call
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
