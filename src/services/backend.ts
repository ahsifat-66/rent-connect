import { User, Unit, RentReceipt, MaintenanceDispatch, BroadcastNotice, Conversation, ChatMessage } from '../types';

export interface ActivityItem {
  id: string;
  text: string;
  time: string;
  type: 'success' | 'warning' | 'info';
}

export interface GateLogItem {
  id: string;
  location: string;
  guardName: string;
  time: string;
  isLive: boolean;
  avatar: string;
}

export interface TelemetryItem {
  id: string;
  flat: string;
  type: 'water' | 'electricity';
  amount: number;
  unit: string;
  time: string;
  isAlert: boolean;
  status?: string;
}

export interface CriticalAlert {
  id: string;
  unit: string;
  type: 'gas_leak' | 'water_leak' | 'sos';
  title: string;
  subtitle: string;
  active: boolean;
  timestamp: string;
}

export interface BackendState {
  currentUser: User;
  isLoggedIn: boolean;
  isOwnerView: boolean;
  units: Unit[];
  rentCollected: number;
  rentTotal: number;
  receipts: RentReceipt[];
  dispatches: MaintenanceDispatch[];
  broadcasts: BroadcastNotice[];
  conversations: Conversation[];
  criticalAlerts: CriticalAlert[];
  gateLogs: GateLogItem[];
  recentActivities: ActivityItem[];
  rooftopLocked: boolean;
  checkinsToday: number;
  complianceRate: number;
  telemetry: TelemetryItem[];
}

const STORAGE_KEY = 'rentconnect_backend_state_v1';
const API_BASE = '/api';

export const defaultTenantUser: User = {
  id: 'usr-tenant-2b',
  name: 'Tanvir Ahmed',
  phone: '+880 1711-234567',
  email: 'tanvir.ahmed@example.com',
  role: 'tenant',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
  nid: '19882692610000452',
  nidVerified: true,
  unitNumber: '2B',
  buildingName: 'Gulshan Luxury Tower',
  leaseStartDate: 'Jan 1, 2026',
  leaseEndDate: 'Dec 31, 2026',
  rentAmount: 28000,
  securityDeposit: 56000,
  parkingSlot: 'P-14',
  occupation: 'Senior Software Architect',
  emergencyContact: {
    name: 'Dr. Rehana Parvin',
    relationship: 'Spouse',
    phone: '+880 1712-998877'
  },
  familyMembersCount: 3
};

export const defaultOwnerUser: User = {
  id: 'usr-owner-1',
  name: 'Md ABID HASAN SIFAT',
  phone: '+880 1911-554433',
  email: 'sifat.owner@gulshantower.com',
  role: 'owner',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60',
  nid: '19652692610000111',
  nidVerified: true,
  buildingName: 'Gulshan Luxury Tower Portfolio',
  occupation: 'Property Managing Director & Investor'
};

const initialDefaultState: BackendState = {
  currentUser: defaultTenantUser,
  isLoggedIn: false,
  isOwnerView: false,
  rentCollected: 85000,
  rentTotal: 142000,
  rooftopLocked: true,
  checkinsToday: 14,
  complianceRate: 98,
  units: [
    {
      id: 'u-1a',
      unitNumber: '1A',
      building: 'Gulshan Luxury Tower',
      rentAmount: 12000,
      sqft: 1400,
      status: 'occupied',
      bedrooms: 2,
      bathrooms: 2,
      amenities: ['Lift', 'Generator', 'Balcony'],
      photos: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60'],
      tenant: {
        name: 'Fatima Rahman',
        phone: '+880 1711-112233',
        nid: '19882692610000101',
        leaseUntil: 'Dec 31, 2026',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60'
      }
    },
    {
      id: 'u-1b',
      unitNumber: '1B',
      building: 'Gulshan Luxury Tower',
      rentAmount: 12000,
      sqft: 1400,
      status: 'occupied',
      bedrooms: 2,
      bathrooms: 2,
      amenities: ['Lift', 'Generator', 'Water Sensor'],
      photos: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60'],
      tenant: {
        name: 'Karim Ahmed',
        phone: '+880 1819-223344',
        nid: '19852692610000202',
        leaseUntil: 'Dec 31, 2026',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60'
      }
    },
    {
      id: 'u-1c',
      unitNumber: '1C',
      building: 'Gulshan Luxury Tower',
      rentAmount: 12000,
      sqft: 1400,
      status: 'occupied',
      bedrooms: 2,
      bathrooms: 2,
      amenities: ['Lift', 'Generator', 'East Facing'],
      photos: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60'],
      tenant: {
        name: 'Shabnam Begum',
        phone: '+880 1912-334455',
        nid: '19902692610000303',
        leaseUntil: 'Dec 31, 2026',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=60'
      }
    },
    {
      id: 'u-2a',
      unitNumber: '2A',
      building: 'Gulshan Luxury Tower',
      rentAmount: 14000,
      sqft: 1600,
      status: 'occupied',
      bedrooms: 3,
      bathrooms: 2,
      amenities: ['Central AC', 'Lift', 'Generator'],
      photos: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60'],
      tenant: {
        name: 'Rizwan Hasan',
        phone: '+880 1713-445566',
        nid: '19872692610000404',
        leaseUntil: 'Dec 31, 2026',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
      }
    },
    {
      id: 'u-2b',
      unitNumber: '2B',
      building: 'Gulshan Luxury Tower',
      rentAmount: 28000,
      sqft: 1850,
      status: 'occupied',
      bedrooms: 3,
      bathrooms: 3,
      amenities: ['Central AC', 'South Balcony', 'Generator', 'Parking', '24/7 Security'],
      photos: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60'],
      tenant: {
        name: 'Tanvir Ahmed',
        phone: '+880 1711-234567',
        nid: '19882692610000452',
        leaseUntil: 'Dec 31, 2026',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60'
      }
    },
    {
      id: 'u-2c',
      unitNumber: '2C',
      building: 'Gulshan Luxury Tower',
      rentAmount: 14000,
      sqft: 1600,
      status: 'occupied',
      bedrooms: 3,
      bathrooms: 2,
      amenities: ['Lift', 'Generator', 'IPS Ready'],
      photos: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60'],
      tenant: {
        name: 'Ariful Haque',
        phone: '+880 1611-556677',
        nid: '19892692610000505',
        leaseUntil: 'Dec 31, 2026',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=60'
      }
    },
    {
      id: 'u-3a',
      unitNumber: '3A',
      building: 'Gulshan Luxury Tower',
      rentAmount: 15000,
      sqft: 1750,
      status: 'occupied',
      bedrooms: 3,
      bathrooms: 3,
      amenities: ['Top Floor', 'Rooftop Access', 'Generator'],
      photos: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60'],
      tenant: {
        name: 'Tasnim Jahan',
        phone: '+880 1718-990011',
        nid: '19922692610000606',
        leaseUntil: 'Dec 31, 2026',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60'
      }
    },
    {
      id: 'u-3b',
      unitNumber: '3B',
      building: 'Gulshan Luxury Tower',
      rentAmount: 15000,
      sqft: 1750,
      status: 'occupied',
      bedrooms: 3,
      bathrooms: 3,
      amenities: ['North View', 'Lift', 'Generator'],
      photos: ['https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=60'],
      tenant: {
        name: 'Mehedi Zaman',
        phone: '+880 1811-224466',
        nid: '19842692610000707',
        leaseUntil: 'Dec 31, 2026',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60'
      }
    },
    {
      id: 'u-3c',
      unitNumber: '3C',
      building: 'Gulshan Luxury Tower',
      rentAmount: 15000,
      sqft: 1750,
      status: 'occupied',
      bedrooms: 3,
      bathrooms: 3,
      amenities: ['Corner Unit', 'Lift', 'Generator'],
      photos: ['https://images.unsplash.com/photo-1600585155469-8a356db6fef7?w=800&auto=format&fit=crop&q=60'],
      tenant: {
        name: 'Sadia Afreen',
        phone: '+880 1913-778899',
        nid: '19932692610000808',
        leaseUntil: 'Dec 31, 2026',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=60'
      }
    },
    {
      id: 'u-4a',
      unitNumber: '4A',
      building: 'Gulshan Luxury Tower',
      rentAmount: 32000,
      sqft: 1850,
      status: 'vacant',
      bedrooms: 3,
      bathrooms: 3,
      amenities: ['Central AC', 'South Balcony', 'Generator', 'Covered Parking', '24/7 Security'],
      photos: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60'],
      tenant: null
    },
    {
      id: 'u-4b',
      unitNumber: '4B',
      building: 'Gulshan Luxury Tower',
      rentAmount: 45000,
      sqft: 2250,
      status: 'vacant',
      bedrooms: 4,
      bathrooms: 4,
      amenities: ['Penthouse Terrace', 'Central AC', 'Generator', 'Dual Parking', 'Smart Lock'],
      photos: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60'],
      tenant: null
    }
  ],
  criticalAlerts: [
    {
      id: 'alt-gas-2b',
      unit: '2B',
      type: 'gas_leak',
      title: 'CRITICAL ALERT: Gas Leak in Flat 2B',
      subtitle: 'Sensor triggered 0.82 PSI drop',
      active: true,
      timestamp: '10 mins ago'
    },
    {
      id: 'alt-water-1b',
      unit: '1B',
      type: 'water_leak',
      title: 'WATER LEAK: Flat 1B Overflow',
      subtitle: 'Continuous flow 420 L/day (+235%)',
      active: true,
      timestamp: '25 mins ago'
    }
  ],
  receipts: [
    {
      id: 'REC-2026-03-2B',
      month: 'March 2026',
      amount: 28000,
      paidOn: 'Mar 4, 2026',
      paymentMethod: 'bKash',
      transactionId: 'BK9X2B7721M',
      status: 'confirmed'
    },
    {
      id: 'REC-2026-03-1A',
      month: 'March 2026',
      amount: 12000,
      paidOn: 'Mar 3, 2026',
      paymentMethod: 'Nagad',
      transactionId: 'NG4X1A8820K',
      status: 'confirmed'
    },
    {
      id: 'REC-2026-03-2A',
      month: 'March 2026',
      amount: 14000,
      paidOn: 'Mar 2, 2026',
      paymentMethod: 'bKash',
      transactionId: 'BK7X2A9912L',
      status: 'confirmed'
    }
  ],
  dispatches: [
    {
      id: 'dsp-1',
      title: 'AC Inverter Master Cleaning & Gas Recharge',
      unit: 'Flat 2B',
      technician: 'Rahim Uddin (Verified Pro)',
      phone: '+880 1711-889900',
      status: 'completed',
      cost: 1200,
      scheduledTime: 'Today 11:30 AM',
      category: 'HVAC'
    },
    {
      id: 'dsp-2',
      title: 'Emergency Master Bathroom Solenoid Valve',
      unit: 'Flat 1B',
      technician: 'Belal Hossain (Lead Plumber)',
      phone: '+880 1812-334455',
      status: 'in_progress',
      cost: 500,
      scheduledTime: 'Today 02:00 PM',
      category: 'Plumbing'
    }
  ],
  broadcasts: [
    {
      id: 'bc-1',
      title: 'Elevator Maintenance Schedule',
      body: 'Passenger Lift 2 will undergo quarterly safety calibration on Sunday between 10:00 AM and 01:00 PM.',
      target: 'All Residents',
      date: 'March 08, 2026',
      author: 'Md ABID HASAN SIFAT (Owner)',
      urgent: false
    }
  ],
  conversations: [
    {
      id: 'c-2b',
      unitNumber: '2B',
      tenantName: 'Tanvir Ahmed',
      tenantAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
      unreadCount: 0,
      lastMessage: 'AC is running smoothly after servicing!',
      lastMessageTime: '10:32 AM',
      timestamp: '10:32 AM',
      messages: [
        { id: 'm1', sender: 'Md ABID HASAN SIFAT', text: 'Assalamu Alaikum Tanvir Bhai! How is everything with Flat 2B?', time: '10:30 AM', isMe: false },
        { id: 'm2', sender: 'Tanvir Ahmed', text: 'Walaikum Assalam Sifat Bhai! All great. AC is running smoothly after servicing.', time: '10:32 AM', isMe: true }
      ]
    }
  ],
  recentActivities: [
    { id: 'act-1', text: 'Rent payment of ৳28,000 received for Flat 2B via bKash', time: '10m ago', type: 'success' },
    { id: 'act-2', text: 'Guest QR Pass generated for Kamal Hossain (Flat 2B)', time: '25m ago', type: 'info' },
    { id: 'act-3', text: 'Warning: Abnormal water flow alert detected in Flat 1B', time: '40m ago', type: 'warning' }
  ],
  gateLogs: [
    { id: 'gl-1', location: 'Main Gate Access', guardName: 'Kamal Hossain (Guest · Flat 2B)', time: '10:15 AM · Entry Approved', isLive: true, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
    { id: 'gl-2', location: 'Courier Turnstile', guardName: 'Pathao Delivery (Flat 1A)', time: '09:40 AM · Verified Gate Pass', isLive: false, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150' }
  ],
  telemetry: [
    { id: 'tel-1', flat: 'Flat 1A', type: 'water', amount: 125, unit: 'L/day', time: 'Just now', isAlert: false },
    { id: 'tel-2', flat: 'Flat 1B', type: 'water', amount: 420, unit: 'L/day', time: 'Active Alert', isAlert: true, status: 'LEAK_DETECTED' },
    { id: 'tel-3', flat: 'Flat 2B', type: 'water', amount: 122, unit: 'L/day', time: 'Live Stream', isAlert: false }
  ]
};

const DEFAULT_UNIT_PHOTOS: Record<string, string> = {
  '1A': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
  '1B': 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
  '1C': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
  '2A': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
  '2B': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
  '2C': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
  '3A': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
  '3B': 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800',
  '3C': 'https://images.unsplash.com/photo-1600585155469-8a356db6fef7?w=800',
  '4A': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
  '4B': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
};

function normalizeUnit(raw: any): Unit {
  if (!raw) {
    return {
      id: 'u-1a',
      unitNumber: '1A',
      building: 'Gulshan Luxury Tower',
      rentAmount: 12000,
      sqft: 1400,
      status: 'occupied',
      bedrooms: 2,
      bathrooms: 2,
      amenities: ['Lift', 'Generator', 'Balcony'],
      photos: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'],
      tenant: null
    };
  }

  const unitNumber = String(raw.unitNumber || raw.unit || '1A').toUpperCase().replace(/^FLAT\s*/i, '').replace(/^UNIT\s*/i, '');
  const floorNum = Number(raw.floor) || parseInt(unitNumber.replace(/\D/g, '')) || 1;
  const isVacant = raw.status === 'vacant' || raw.rentStatus === 'vacant' || (!raw.tenantName && !raw.tenant) || raw.tenantName === 'Vacant (Ready to Move)' || raw.tenantName === 'Vacant Unit';
  
  const defaultPhoto = DEFAULT_UNIT_PHOTOS[unitNumber] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800';
  let photos: string[] = [];
  if (Array.isArray(raw.photos) && raw.photos.length > 0) {
    photos = raw.photos;
  } else if (typeof raw.photo === 'string' && raw.photo) {
    photos = [raw.photo];
  } else {
    photos = [defaultPhoto];
  }

  let amenities: string[] = [];
  if (Array.isArray(raw.amenities) && raw.amenities.length > 0) {
    amenities = raw.amenities;
  } else {
    amenities = ['Lift', 'Generator Backup', '24/7 CCTV Security', 'Balcony'];
  }

  let tenantObj = null;
  if (!isVacant) {
    if (typeof raw.tenant === 'object' && raw.tenant !== null) {
      tenantObj = raw.tenant;
    } else {
      tenantObj = {
        name: raw.tenantName || 'Verified Resident',
        phone: raw.phone || '+880 1711-000000',
        nid: raw.nid || '19882692610000000',
        leaseUntil: raw.leaseUntil || 'Dec 31, 2026',
        avatar: raw.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
      };
    }
  }

  return {
    id: String(raw.id || `u-${unitNumber.toLowerCase()}`),
    unitNumber,
    building: String(raw.building || 'Gulshan Luxury Tower'),
    rentAmount: Number(raw.rentAmount) || (12000 + floorNum * 2000),
    sqft: Number(raw.sqft) || (1300 + floorNum * 150),
    status: isVacant ? 'vacant' : 'occupied',
    bedrooms: Number(raw.bedrooms) || Number(raw.beds) || (floorNum >= 3 ? 3 : 2),
    bathrooms: Number(raw.bathrooms) || Number(raw.baths) || (floorNum >= 3 ? 3 : 2),
    amenities,
    photos,
    tenant: tenantObj
  };
}

class BackendService {
  private state: BackendState;
  private listeners: (() => void)[] = [];

  constructor() {
    this.state = this.loadState();
    this.syncFromApi();
  }

  private loadState(): BackendState {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const merged = { ...initialDefaultState, ...parsed };
        if (Array.isArray(merged.units)) {
          merged.units = merged.units.map(normalizeUnit);
        }
        return merged;
      }
    } catch (e) {
      console.warn('Could not load stored state:', e);
    }
    const def = JSON.parse(JSON.stringify(initialDefaultState));
    def.units = def.units.map(normalizeUnit);
    return def;
  }

  private saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Could not save state:', e);
    }
    this.notify();
  }

  private async syncFromApi() {
    try {
      const res = await fetch(`${API_BASE}/state`);
      if (res.ok) {
        const apiData = await res.json();
        if (apiData && Array.isArray(apiData.units)) {
          this.state.units = apiData.units.map(normalizeUnit);
          if (typeof apiData.rentCollected === 'number') this.state.rentCollected = apiData.rentCollected;
          if (typeof apiData.rooftopLocked === 'boolean') this.state.rooftopLocked = apiData.rooftopLocked;
          if (typeof apiData.checkinsToday === 'number') this.state.checkinsToday = apiData.checkinsToday;
          this.saveState();
        }
      }
    } catch (err) {
      // Backend starting or offline - fallback to local storage
    }
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  public getState(): BackendState {
    return this.state;
  }

  // --- Auth Actions ---
  public loginAsOwner() {
    this.state.isLoggedIn = true;
    this.state.isOwnerView = true;
    this.state.currentUser = defaultOwnerUser;
    this.saveState();
    fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'owner' })
    }).catch(() => {});
  }

  public loginAsTenant() {
    this.state.isLoggedIn = true;
    this.state.isOwnerView = false;
    this.state.currentUser = defaultTenantUser;
    this.saveState();
    fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'tenant' })
    }).catch(() => {});
  }

  public logout() {
    this.state.isLoggedIn = false;
    this.saveState();
    fetch(`${API_BASE}/auth/logout`, { method: 'POST' }).catch(() => {});
  }

  public toggleViewMode(isOwner: boolean) {
    this.state.isOwnerView = isOwner;
    this.state.currentUser = isOwner ? defaultOwnerUser : defaultTenantUser;
    this.saveState();
  }

  // --- Utility & Emergency Actions ---
  public resolveGasLeakAlert(unitNumber = '2B') {
    const alertIndex = this.state.criticalAlerts.findIndex(a => a.unit === unitNumber && a.type === 'gas_leak');
    if (alertIndex !== -1) {
      this.state.criticalAlerts[alertIndex].active = false;
    }
    this.state.recentActivities.unshift({
      id: `act-${Date.now()}`,
      text: `Emergency gas solenoid shutoff executed for Flat ${unitNumber}`,
      time: 'Just now',
      type: 'success'
    });
    this.saveState();
    fetch(`${API_BASE}/telemetry/resolve-gas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ unit: unitNumber })
    }).catch(() => {});
  }

  public dispatchPlumberForLeak(unitNumber = '1B') {
    const newDispatch: MaintenanceDispatch = {
      id: `dsp-${Date.now()}`,
      unitNumber,
      trade: 'Plumber',
      contractorName: 'Master Rafiq (Emergency Plumbing Pro)',
      phone: '+880 1819-334455',
      status: 'in_progress',
      scheduledTime: 'Immediate Dispatch',
      description: `Emergency water pipe diagnosis for Flat ${unitNumber}`,
      priority: 'urgent',
      createdAt: 'Just now'
    };
    this.state.dispatches.unshift(newDispatch);

    const alert = this.state.criticalAlerts.find(a => a.unit === unitNumber && a.type === 'water_leak');
    if (alert) alert.active = false;

    this.state.recentActivities.unshift({
      id: `act-${Date.now()}`,
      text: `Plumber dispatched to Flat ${unitNumber}`,
      time: 'Just now',
      type: 'info'
    });
    this.saveState();
    fetch(`${API_BASE}/telemetry/resolve-water`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ unit: unitNumber })
    }).catch(() => {});
  }

  // --- Rent Payment ---
  public payRent(amount = 28000, method: 'bKash' | 'Nagad' | 'Bank Transfer' | 'Card' = 'bKash') {
    const txId = `${method.toUpperCase().slice(0, 2)}${Math.floor(10000000 + Math.random() * 90000000)}M`;
    const newReceipt: RentReceipt = {
      id: `REC-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-2B`,
      month: 'March 2026',
      amount,
      paidOn: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      paymentMethod: method,
      transactionId: txId,
      status: 'confirmed'
    };

    this.state.receipts.unshift(newReceipt);
    this.state.rentCollected = Math.min(this.state.rentTotal, this.state.rentCollected + amount);
    
    this.state.recentActivities.unshift({
      id: `act-${Date.now()}`,
      text: `Rent ৳${amount.toLocaleString()} collected from Flat 2B (${method})`,
      time: 'Just now',
      type: 'success'
    });

    this.saveState();

    fetch(`${API_BASE}/rent/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ unitNumber: '2B', amount, paymentMethod: method })
    }).catch(() => {});

    return newReceipt;
  }

  // --- Security ---
  public toggleRooftopLock() {
    this.state.rooftopLocked = !this.state.rooftopLocked;
    this.state.recentActivities.unshift({
      id: `act-${Date.now()}`,
      text: `Rooftop access ${this.state.rooftopLocked ? 'locked' : 'unlocked'} by owner`,
      time: 'Just now',
      type: 'info'
    });
    this.saveState();

    fetch(`${API_BASE}/security/rooftop/toggle`, {
      method: 'POST'
    }).catch(() => {});

    return this.state.rooftopLocked;
  }

  public generateGuestPass(guestName: string, hostUnit = '2B') {
    this.state.checkinsToday += 1;
    const newLog: GateLogItem = {
      id: `log-${Date.now()}`,
      location: 'Main Gate',
      guardName: `Pass: ${guestName} (Unit ${hostUnit})`,
      time: 'Just now',
      isLive: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=60'
    };
    this.state.gateLogs.unshift(newLog);
    this.saveState();

    fetch(`${API_BASE}/security/guest-pass`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guestName, unitNumber: hostUnit })
    }).catch(() => {});
  }

  public triggerSos(unitNumber = '2B') {
    this.state.recentActivities.unshift({
      id: `act-${Date.now()}`,
      text: `🚨 EMERGENCY SOS triggered from Unit ${unitNumber}!`,
      time: 'Just now',
      type: 'warning'
    });
    this.saveState();

    fetch(`${API_BASE}/security/sos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ unitNumber })
    }).catch(() => {});
  }

  // --- Messenger ---
  public sendMessage(conversationId: string, text: string, isMe = true) {
    const convo = this.state.conversations.find(c => c.id === conversationId);
    if (convo) {
      const msg: ChatMessage = {
        id: `m-${Date.now()}`,
        sender: isMe ? this.state.currentUser.name : 'Recipient',
        text,
        time: 'Just now',
        isMe
      };
      convo.messages.push(msg);
      convo.lastMessage = text;
      convo.timestamp = 'Just now';
      this.saveState();

      fetch(`${API_BASE}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, isOwner: this.state.isOwnerView })
      }).catch(() => {});
    }
  }

  // --- Broadcasts ---
  public addBroadcast(title: string, body: string, urgent = false) {
    const newBc: BroadcastNotice = {
      id: `bc-${Date.now()}`,
      title,
      body,
      urgent,
      date: 'Just now',
      author: this.state.currentUser.name
    };
    this.state.broadcasts.unshift(newBc);
    this.saveState();

    fetch(`${API_BASE}/broadcasts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, priority: urgent ? 'high' : 'medium' })
    }).catch(() => {});
  }

  // --- Pro Services ---
  public bookService(serviceTitle: string, category = 'HVAC', cost = 1200) {
    const newDsp: MaintenanceDispatch = {
      id: `dsp-${Date.now()}`,
      title: serviceTitle,
      unit: `Flat ${this.state.currentUser.unitNumber || '2B'}`,
      technician: 'Kamrul Hasan (Verified Pro)',
      phone: '+880 1711-445566',
      status: 'in_progress',
      cost,
      scheduledTime: 'Today 03:00 PM',
      category
    };
    this.state.dispatches.unshift(newDsp);
    this.saveState();

    fetch(`${API_BASE}/services/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serviceTitle, category, cost, unitNumber: this.state.currentUser.unitNumber || '2B' })
    }).catch(() => {});
  }

  // --- Unit & Vacant Management ---
  public addUnit(unitData: Partial<Unit>): Unit {
    const unitNo = (unitData.unitNumber || '4A').toUpperCase();
    const newUnit: Unit = {
      id: `u-${unitNo.toLowerCase()}-${Date.now()}`,
      unitNumber: unitNo,
      building: unitData.building || 'Gulshan Luxury Tower',
      rentAmount: Number(unitData.rentAmount) || 30000,
      sqft: Number(unitData.sqft) || 1600,
      status: unitData.status || 'vacant',
      bedrooms: Number(unitData.bedrooms) || 3,
      bathrooms: Number(unitData.bathrooms) || 2,
      amenities: unitData.amenities || ['Lift', 'Generator', 'Balcony'],
      photos: unitData.photos && unitData.photos.length > 0 ? unitData.photos : ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60'],
      tenant: unitData.status === 'occupied' ? (unitData.tenant || null) : null
    };

    // Prevent duplicate unit numbers by replacing or appending
    const existingIndex = this.state.units.findIndex(u => u.unitNumber === unitNo);
    if (existingIndex >= 0) {
      this.state.units[existingIndex] = newUnit;
    } else {
      this.state.units.push(newUnit);
      this.state.rentTotal += newUnit.rentAmount;
    }

    this.state.recentActivities.unshift({
      id: `act-${Date.now()}`,
      text: `Flat ${newUnit.unitNumber} (${newUnit.status === 'vacant' ? 'Vacant' : 'Occupied'}) added to building portfolio.`,
      time: 'Just now',
      type: 'success'
    });

    this.saveState();

    fetch(`${API_BASE}/units`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        unitNumber: newUnit.unitNumber,
        rentAmount: newUnit.rentAmount,
        sqft: newUnit.sqft,
        status: newUnit.status,
        bedrooms: newUnit.bedrooms,
        bathrooms: newUnit.bathrooms,
        amenities: newUnit.amenities,
        photos: newUnit.photos
      })
    }).catch(() => {});

    return newUnit;
  }

  public toggleUnitStatus(unitIdOrNumber: string) {
    const unit = this.state.units.find(u => u.id === unitIdOrNumber || u.unitNumber === unitIdOrNumber);
    if (unit) {
      unit.status = unit.status === 'vacant' ? 'occupied' : 'vacant';
      if (unit.status === 'vacant') {
        unit.tenant = null;
      }
      this.state.recentActivities.unshift({
        id: `act-${Date.now()}`,
        text: `Flat ${unit.unitNumber} status updated to ${unit.status === 'vacant' ? 'Vacant (খালি)' : 'Occupied (ভাড়া)'}`,
        time: 'Just now',
        type: 'info'
      });
      this.saveState();

      fetch(`${API_BASE}/units/${unit.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: unit.status })
      }).catch(() => {});
    }
  }

  public setUnitStatus(unitIdOrNumber: string, status: 'vacant' | 'occupied') {
    const unit = this.state.units.find(u => u.id === unitIdOrNumber || u.unitNumber === unitIdOrNumber);
    if (unit) {
      unit.status = status;
      if (status === 'vacant') {
        unit.tenant = null;
      }
      this.state.recentActivities.unshift({
        id: `act-${Date.now()}`,
        text: `Flat ${unit.unitNumber} status changed to ${status}`,
        time: 'Just now',
        type: 'info'
      });
      this.saveState();

      fetch(`${API_BASE}/units/${unit.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      }).catch(() => {});
    }
  }

  // --- Reset ---
  public resetState() {
    this.state = JSON.parse(JSON.stringify(initialDefaultState));
    this.saveState();
  }
}

export const backend = new BackendService();
