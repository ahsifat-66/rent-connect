import React, { useState, useEffect } from 'react';
import { User, Unit, Conversation, MaintenanceDispatch, BroadcastNotice } from './types';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { OwnerBottomNav } from './components/OwnerBottomNav';

// Backend Service Layer
import { backend, BackendState } from './services/backend';

// Splash / Landing Login Screen (Exact Figma Upload)
import { SplashLoginView } from './components/SplashLoginView';

// Tenant Screens (Exact Figma & Extensions)
import { TenantHomeView } from './components/TenantHomeView';
import { TenantLeaseView } from './components/TenantLeaseView';
import { TenantPayView } from './components/TenantPayView';
import { TenantSecurityGuestsView } from './components/TenantSecurityGuestsView';
import { TenantHireProView } from './components/TenantHireProView';
import { TenantChatWithOwnerView } from './components/TenantChatWithOwnerView';
import { TenantMarketplaceView } from './components/TenantMarketplaceView';
import { UserProfileView } from './components/UserProfileView';

// Owner Screens (Exact Figma)
import { OwnerHomeView } from './components/OwnerHomeView';
import { OwnerVaultView } from './components/OwnerVaultView';
import { OwnerMonitorView } from './components/OwnerMonitorView';
import { OwnerSecurityView } from './components/OwnerSecurityView';

// Interactive Modals
import { SosPanicModal } from './components/SosPanicModal';
import { GuestQrModal } from './components/GuestQrModal';
import { RentPayModal } from './components/RentPayModal';
import { DigitalGatePassModal } from './components/DigitalGatePassModal';
import { DmpFormModal } from './components/DmpFormModal';

// Secondary Views
import { MarketplaceView } from './components/MarketplaceView';
import { MessengerView } from './components/MessengerView';
import { ServiceDispatchView } from './components/ServiceDispatchView';
import { BroadcastsView } from './components/BroadcastsView';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('rc_theme');
      return (saved === 'dark' || saved === 'light') ? saved : 'light';
    } catch {
      return 'light';
    }
  });

  const [backendState, setBackendState] = useState<BackendState>(backend.getState());
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeChatId, setActiveChatId] = useState<string>('c-2b');
  const [mobileChatThreadOpen, setMobileChatThreadOpen] = useState(false);

  // Modals
  const [showSosModal, setShowSosModal] = useState(false);
  const [showGuestQrModal, setShowGuestQrModal] = useState(false);
  const [selectedGuestName, setSelectedGuestName] = useState('Rashed Khan');
  const [showRentPayModal, setShowRentPayModal] = useState(false);
  const [showGatePassModal, setShowGatePassModal] = useState(false);
  const [showDmpFormModal, setShowDmpFormModal] = useState(false);
  const [showAddFlatModal, setShowAddFlatModal] = useState(false);
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    return backend.subscribe(() => {
      setBackendState({ ...backend.getState() });
    });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('rc_theme', theme);
    } catch {}
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleJoinAsOwner = () => {
    backend.loginAsOwner();
    setActiveTab('home');
    showToast("Welcome back, Md ABID HASAN SIFAT! Owner Command Center loaded.");
  };

  const handleJoinAsTenant = () => {
    backend.loginAsTenant();
    setActiveTab('home');
    showToast("Welcome back, Tanvir Ahmed! Resident Sanctuary loaded.");
  };

  const handleLogout = () => {
    backend.logout();
  };

  const handleOpenGuestQr = (guestName: string) => {
    setSelectedGuestName(guestName);
    setShowGuestQrModal(true);
  };

  const handleSendMessage = (chatId: string, text: string) => {
    backend.sendMessage(chatId, text, true);
  };

  // =========================================================================
  // IF NOT LOGGED IN: Render the exact luxury Figma Splash Login Screen first!
  // =========================================================================
  if (!backendState.isLoggedIn) {
    return (
      <SplashLoginView
        onJoinAsOwner={handleJoinAsOwner}
        onJoinAsTenant={handleJoinAsTenant}
        theme={theme}
        setTheme={setTheme}
      />
    );
  }

  const currentUser = backendState.currentUser;
  const isOwnerView = backendState.isOwnerView;

  // =========================================================================
  // LOGGED IN PORTAL (Tenant & Owner Views)
  // =========================================================================
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] dark:bg-[#0B0E14] text-[#111827] dark:text-white transition-colors duration-300">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 sm:top-auto sm:bottom-24 sm:right-6 left-4 right-4 sm:left-auto z-50 bg-[#121632] text-white px-4 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-fade-in">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0"></span>
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Sticky Header with Log Out / Switch Option */}
      <Navbar
        user={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        setTheme={setTheme}
        onOpenAuthModal={handleLogout}
        isOwnerView={isOwnerView}
        setIsOwnerView={(val) => {
          backend.toggleViewMode(val);
          setActiveTab('home');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-md sm:max-w-4xl mx-auto p-4 sm:p-6 pb-28">
        
        {/* ========================================================= */}
        {/* --- 1. RESIDENT / TENANT MODE (Exact Figma Screenshots) --- */}
        {/* ========================================================= */}
        {!isOwnerView && (
          <>
            {/* 1. HOME TAB */}
            {activeTab === 'home' && (
              <TenantHomeView
                user={currentUser}
                onNavigateTab={setActiveTab}
                onOpenGatePass={() => setShowGatePassModal(true)}
              />
            )}

            {/* 2. HIRE A PRO (AC, Plumbing, Electrical, Cleaning) */}
            {activeTab === 'hirepro' && (
              <TenantHireProView
                user={currentUser}
                onBack={() => setActiveTab('home')}
                onShowToast={showToast}
              />
            )}

            {/* 3. RESIDENT MARKETPLACE (Buy, Sell & Parking Sublets) */}
            {activeTab === 'marketplace' && (
              <TenantMarketplaceView
                units={backendState.units}
                user={currentUser}
                onBack={() => setActiveTab('home')}
                onShowToast={showToast}
              />
            )}

            {/* 4. CHAT TO OWNER (Direct Line with Landlord Md ABID HASAN SIFAT) */}
            {(activeTab === 'chat' || activeTab === 'messenger') && (
              <TenantChatWithOwnerView
                user={currentUser}
                onBack={() => setActiveTab('home')}
                onShowToast={showToast}
              />
            )}

            {/* 5. LEASE TAB */}
            {activeTab === 'lease' && (
              <TenantLeaseView
                user={currentUser}
                onOpenDmpForm={() => setShowDmpFormModal(true)}
              />
            )}

            {/* 6. PAY TAB */}
            {activeTab === 'pay' && (
              <TenantPayView
                user={currentUser}
                onOpenRentPay={() => setShowRentPayModal(true)}
              />
            )}

            {/* 7. GUESTS / SECURITY TAB */}
            {activeTab === 'guests' && (
              <TenantSecurityGuestsView
                user={currentUser}
                onTriggerSos={() => setShowSosModal(true)}
                onOpenGuestQr={handleOpenGuestQr}
              />
            )}

            {/* 8. TENANT PROFILE */}
            {activeTab === 'profile' && (
              <UserProfileView
                user={currentUser}
                isOwner={false}
                onBack={() => setActiveTab('home')}
                onLogout={handleLogout}
                onShowToast={showToast}
              />
            )}
          </>
        )}

        {/* ===================================================== */}
        {/* --- 2. HOUSE OWNER MODE (Exact Figma Screenshots) --- */}
        {/* ===================================================== */}
        {isOwnerView && (
          <>
            {/* 1. OWNER HOME TAB: Command Center */}
            {activeTab === 'home' && (
              <OwnerHomeView
                user={currentUser}
                onNavigateTab={setActiveTab}
                onOpenBroadcast={() => setActiveTab('broadcasts')}
                onOpenMarketplace={() => setActiveTab('marketplace')}
                onOpenMessenger={() => setActiveTab('messenger')}
                onOpenHirePro={() => setActiveTab('hirepro')}
                onShowToast={showToast}
              />
            )}

            {/* 2. OWNER VAULT TAB: NID Vault Building Portfolio */}
            {activeTab === 'vault' && (
              <OwnerVaultView
                onBack={() => setActiveTab('home')}
                onSelectUnit={(unitNo) => {
                  setActiveTab('messenger');
                  setMobileChatThreadOpen(true);
                }}
                onShowToast={showToast}
              />
            )}

            {/* 3. OWNER MONITOR TAB: Ghost Bill Monitor */}
            {activeTab === 'monitor' && (
              <OwnerMonitorView
                onBack={() => setActiveTab('home')}
                onShowToast={showToast}
              />
            )}

            {/* 4. OWNER SECURITY TAB: Security Shield */}
            {activeTab === 'security' && (
              <OwnerSecurityView
                onBack={() => setActiveTab('home')}
                onOpenGuestQrModal={() => handleOpenGuestQr('Visitor Guest')}
                onShowToast={showToast}
              />
            )}

            {/* 5. OWNER PROFILE */}
            {activeTab === 'profile' && (
              <UserProfileView
                user={currentUser}
                isOwner={true}
                onBack={() => setActiveTab('home')}
                onLogout={handleLogout}
                onShowToast={showToast}
              />
            )}

            {/* Sub-screens from Management Grid */}
            {activeTab === 'marketplace' && (
              <div className="space-y-4">
                <button onClick={() => setActiveTab('home')} className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
                  ← Back to Command Center
                </button>
                <MarketplaceView
                  units={backendState.units}
                  isOwner={true}
                  onOpenAddFlat={() => setShowAddFlatModal(true)}
                  lang="en"
                />
              </div>
            )}

            {activeTab === 'messenger' && (
              <div className="space-y-4">
                <button onClick={() => setActiveTab('home')} className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
                  ← Back to Command Center
                </button>
                <MessengerView
                  conversations={backendState.conversations}
                  activeChatId={activeChatId}
                  setActiveChatId={setActiveChatId}
                  mobileChatThreadOpen={mobileChatThreadOpen}
                  setMobileChatThreadOpen={setMobileChatThreadOpen}
                  onSendMessage={handleSendMessage}
                  user={currentUser}
                  lang="en"
                />
              </div>
            )}

            {activeTab === 'hirepro' && (
              <div className="space-y-4">
                <button onClick={() => setActiveTab('home')} className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
                  ← Back to Command Center
                </button>
                <ServiceDispatchView
                  dispatches={backendState.dispatches}
                  isOwner={true}
                  onOpenDispatchModal={() => setShowDispatchModal(true)}
                  onOpenTicketModal={() => setShowTicketModal(true)}
                  lang="en"
                />
              </div>
            )}

            {activeTab === 'broadcasts' && (
              <div className="space-y-4">
                <button onClick={() => setActiveTab('home')} className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
                  ← Back to Command Center
                </button>
                <BroadcastsView
                  broadcasts={backendState.broadcasts}
                  isOwner={true}
                  onOpenBroadcastModal={() => setShowBroadcastModal(true)}
                  lang="en"
                />
              </div>
            )}
          </>
        )}

      </main>

      {/* Bottom Navigation Bar */}
      {!isOwnerView ? (
        <MobileBottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ) : (
        <OwnerBottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}

      {/* SOS Panic Alert Modal */}
      <SosPanicModal
        isOpen={showSosModal}
        onClose={() => setShowSosModal(false)}
        user={currentUser}
      />

      {/* Guest QR Code Modal */}
      <GuestQrModal
        isOpen={showGuestQrModal}
        onClose={() => setShowGuestQrModal(false)}
        guestName={selectedGuestName}
        user={currentUser}
      />

      {/* bKash Rent Pay Modal */}
      <RentPayModal
        isOpen={showRentPayModal}
        onClose={() => setShowRentPayModal(false)}
        user={currentUser}
        onPaymentSuccess={(receipt) => {
          showToast(`Rent paid successfully via bKash! TxID: ${receipt.transactionId}`);
        }}
        lang="en"
      />

      {/* Digital QR Gate Pass Modal */}
      <DigitalGatePassModal
        isOpen={showGatePassModal}
        onClose={() => setShowGatePassModal(false)}
        user={currentUser}
        lang="en"
      />

      {/* DMP Police Verification Form Modal */}
      <DmpFormModal
        isOpen={showDmpFormModal}
        onClose={() => setShowDmpFormModal(false)}
        user={currentUser}
        lang="en"
      />

    </div>
  );
};

export default App;
