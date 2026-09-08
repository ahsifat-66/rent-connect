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
  checkinsToday: 42,
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
      amenities: ['Lift', 'Generator', 'Balcony'],
      photos: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60'],
      tenant: {
        name: 'Ariful Islam',
        phone: '+880 1811-556677',
        nid: '19912692610000505',
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
      amenities: ['Lift', 'Generator', 'High Floor'],
      photos: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60'],
      tenant: {
        name: 'Tasnim Ahmed',
        phone: '+880 1714-667788',
        nid: '19892692610000606',
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
      amenities: ['Lift', 'Generator', 'Balcony'],
      photos: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60'],
      tenant: {
        name: 'Mehedi Hasan',
        phone: '+880 1915-778899',
        nid: '19932692610000707',
        leaseUntil: 'Dec 31, 2026',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=60'
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
      amenities: ['Lift', 'Generator', 'Corner View'],
      photos: ['https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=60'],
      tenant: {
        name: 'Sadia Sultana',
        phone: '+880 1812-889900',
        nid: '19922692610000808',
        leaseUntil: 'Dec 31, 2026',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=60'
      }
    }
  ],
  receipts: [
    {
      id: 'REC-2026-03-2B',
      month: 'March 2026',
      amount: 28000,
      paidOn: 'Mar 5, 2026',
      paymentMethod: 'bKash',
      transactionId: 'BK9X882910M',
      status: 'confirmed'
    },
    {
      id: 'REC-2026-02-2B',
      month: 'February 2026',
      amount: 28000,
      paidOn: 'Feb 4, 2026',
      paymentMethod: 'bKash',
      transactionId: 'BK8X119283A',
      status: 'confirmed'
    },
    {
      id: 'REC-2026-01-2B',
      month: 'January 2026',
      amount: 28000,
      paidOn: 'Jan 5, 2026',
      paymentMethod: 'Bank Transfer',
      transactionId: 'EBL-TR-9921',
      status: 'confirmed'
    }
  ],
  criticalAlerts: [
    {
      id: 'alt-gas-2b',
      unit: '2B',
      type: 'gas_leak',
      title: 'CRITICAL ALERT',
      subtitle: 'Gas Leak in Flat 2B',
      active: true,
      timestamp: '10 min ago'
    },
    {
      id: 'alt-water-1b',
      unit: '1B',
      type: 'water_leak',
      title: 'Leak Alert Detected',
      subtitle: 'Abnormal water usage detected in Flat 1B (420 L/day)',
      active: true,
      timestamp: '25 min ago'
    }
  ],
  dispatches: [
    {
      id: 'dsp-1',
      unitNumber: '1B',
      trade: 'Plumber',
      contractorName: 'Master Rafiq (Emergency Plumbing Pro)',
      phone: '+880 1819-334455',
      status: 'in_progress',
      scheduledTime: 'Today 2:00 PM',
      description: 'Abnormal water leak detected on Submeter 1B.',
      priority: 'urgent',
      createdAt: 'Today'
    }
  ],
  broadcasts: [
    {
      id: 'bc-1',
      title: 'Elevator service scheduled for Sunday 10 AM',
      body: 'Regular monthly maintenance for Passenger Lift #1 on Sunday from 10:00 AM to 12:00 PM.',
      urgent: false,
      date: 'Mar 8, 2026',
      author: 'Management Office'
    },
    {
      id: 'bc-2',
      title: 'New facial recognition gate sensors live at Lobby',
      body: 'Contactless high-speed security boom barrier is now active for all verified residents.',
      urgent: true,
      date: 'Mar 7, 2026',
      author: 'Security Desk'
    }
  ],
  conversations: [
    {
      id: 'c-2b',
      unitNumber: '2B',
      participantName: 'Tanvir Ahmed (Flat 2B)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
      lastMessage: 'Hi, I paid March rent via bKash. Receipt attached!',
      timestamp: '10:45 AM',
      unread: 1,
      messages: [
        { id: 'm1', sender: 'Tanvir Ahmed', text: 'Hi, I paid March rent via bKash.', time: '10:40 AM', isMe: false },
        { id: 'm2', sender: 'Management', text: 'Thank you Tanvir, verified and receipt logged!', time: '10:45 AM', isMe: true }
      ]
    }
  ],
  gateLogs: [
    {
      id: 'l1',
      location: 'Main Gate',
      guardName: 'Kamal Uddin',
      time: '12:30 AM',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=60',
      isLive: true
    },
    {
      id: 'l2',
      location: 'Parking Area',
      guardName: 'Rahim Ali',
      time: '12:00 AM',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=60',
      isLive: false
    },
    {
      id: 'l3',
      location: 'Main Gate',
      guardName: 'Kamal Uddin',
      time: '11:30 PM',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=60',
      isLive: false
    },
    {
      id: 'l4',
      location: 'Rooftop',
      guardName: 'Rahim Ali',
      time: '11:00 PM',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=60',
      isLive: false
    },
    {
      id: 'l5',
      location: 'Main Gate',
      guardName: 'Kamal Uddin',
      time: '10:30 PM',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=60',
      isLive: false
    }
  ],
  recentActivities: [
    { id: 'act-1', text: 'Rent collected from Flat 2A', time: '2 hours ago', type: 'success' },
    { id: 'act-2', text: 'Maintenance request: Flat 3B', time: '4 hours ago', type: 'warning' },
    { id: 'act-3', text: 'New tenant verified: Flat 1A', time: '6 hours ago', type: 'success' },
    { id: 'act-4', text: 'High water usage: Flat 2B', time: '8 hours ago', type: 'warning' }
  ],
  telemetry: [
    { id: '1a', flat: 'Flat 1A', type: 'water', amount: 125, unit: 'L/day', time: '2 min ago', isAlert: false },
    { id: '1b', flat: 'Flat 1B', type: 'water', amount: 420, unit: 'L/day', time: 'Live', isAlert: true, status: 'CRITICAL' },
    { id: '1c', flat: 'Flat 1C', type: 'electricity', amount: 48, unit: 'kWh', time: '1 min ago', isAlert: false },
    { id: '2a', flat: 'Flat 2A', type: 'water', amount: 115, unit: 'L/day', time: '3 min ago', isAlert: false },
    { id: '2b', flat: 'Flat 2B', type: 'electricity', amount: 52, unit: 'kWh', time: '1 min ago', isAlert: false },
    { id: '2c', flat: 'Flat 2C', type: 'water', amount: 118, unit: 'L/day', time: '4 min ago', isAlert: false }
  ]
};

class BackendService {
  private state: BackendState;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.state = this.loadState();
  }

  private loadState(): BackendState {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved backend state, using defaults', e);
    }
    return initialDefaultState;
  }

  private saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save backend state to localStorage', e);
    }
    this.notify();
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb());
  }

  public getState(): BackendState {
    return this.state;
  }

  // --- Auth Methods ---
  public loginAsOwner() {
    this.state.currentUser = defaultOwnerUser;
    this.state.isOwnerView = true;
    this.state.isLoggedIn = true;
    this.saveState();
    return this.state.currentUser;
  }

  public loginAsTenant() {
    this.state.currentUser = defaultTenantUser;
    this.state.isOwnerView = false;
    this.state.isLoggedIn = true;
    this.saveState();
    return this.state.currentUser;
  }

  public registerOwner(data: { name: string; phone: string; email: string; buildingName: string; nid: string }) {
    const newOwner: User = {
      id: `usr-owner-${Date.now()}`,
      name: data.name,
      phone: data.phone,
      email: data.email,
      role: 'owner',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60',
      nid: data.nid,
      nidVerified: true,
      buildingName: data.buildingName || 'Gulshan Luxury Tower Portfolio',
      occupation: 'Property Owner & Investor'
    };
    this.state.currentUser = newOwner;
    this.state.isOwnerView = true;
    this.state.isLoggedIn = true;
    this.state.recentActivities.unshift({
      id: `act-${Date.now()}`,
      text: `New Landlord Account Registered: ${data.name}`,
      time: 'Just now',
      type: 'success'
    });
    this.saveState();
    return newOwner;
  }

  public registerTenant(data: {
    name: string;
    phone: string;
    email: string;
    unitNumber: string;
    buildingName: string;
    nid: string;
    occupation?: string;
    emergencyPhone?: string;
    rentAmount?: number;
  }) {
    const newTenant: User = {
      id: `usr-tenant-${Date.now()}`,
      name: data.name,
      phone: data.phone,
      email: data.email,
      role: 'tenant',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
      nid: data.nid,
      nidVerified: true,
      unitNumber: data.unitNumber || '2B',
      buildingName: data.buildingName || 'Gulshan Luxury Tower',
      leaseStartDate: 'Jan 1, 2026',
      leaseEndDate: 'Dec 31, 2026',
      rentAmount: data.rentAmount || 28000,
      securityDeposit: (data.rentAmount || 28000) * 2,
      parkingSlot: 'P-14',
      occupation: data.occupation || 'Executive Professional',
      emergencyContact: {
        name: 'Emergency Contact',
        relationship: 'Family',
        phone: data.emergencyPhone || '+880 1700-000000'
      },
      familyMembersCount: 2
    };
    this.state.currentUser = newTenant;
    this.state.isOwnerView = false;
    this.state.isLoggedIn = true;
    this.state.recentActivities.unshift({
      id: `act-${Date.now()}`,
      text: `New Verified Resident Registered: ${data.name} (Unit ${data.unitNumber || '2B'})`,
      time: 'Just now',
      type: 'success'
    });
    this.saveState();
    return newTenant;
  }

  public loginWithCredentials(phoneOrEmail: string, role: 'owner' | 'tenant') {
    if (role === 'owner') {
      const user: User = {
        ...defaultOwnerUser,
        phone: phoneOrEmail.includes('@') ? defaultOwnerUser.phone : phoneOrEmail,
        email: phoneOrEmail.includes('@') ? phoneOrEmail : defaultOwnerUser.email
      };
      this.state.currentUser = user;
      this.state.isOwnerView = true;
      this.state.isLoggedIn = true;
      this.saveState();
      return user;
    } else {
      const user: User = {
        ...defaultTenantUser,
        phone: phoneOrEmail.includes('@') ? defaultTenantUser.phone : phoneOrEmail,
        email: phoneOrEmail.includes('@') ? phoneOrEmail : defaultTenantUser.email
      };
      this.state.currentUser = user;
      this.state.isOwnerView = false;
      this.state.isLoggedIn = true;
      this.saveState();
      return user;
    }
  }

  public logout() {
    this.state.isLoggedIn = false;
    this.saveState();
  }

  public toggleViewMode(isOwner: boolean) {
    this.state.isOwnerView = isOwner;
    this.state.currentUser = isOwner ? defaultOwnerUser : defaultTenantUser;
    this.saveState();
  }

  // --- Emergency / Utility Actions ---
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
    
    // update telemetry status
    const item = this.state.telemetry.find(t => t.flat.includes(unitNumber));
    if (item) {
      item.isAlert = false;
      item.status = 'DISPATCHED';
    }

    this.state.recentActivities.unshift({
      id: `act-${Date.now()}`,
      text: `Plumber dispatched to Flat ${unitNumber}`,
      time: 'Just now',
      type: 'info'
    });

    this.saveState();
  }

  // --- Rent Payment Action ---
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

    // add confirmation message to conversation
    const convo = this.state.conversations.find(c => c.unitNumber === '2B');
    if (convo) {
      convo.messages.push({
        id: `m-${Date.now()}`,
        sender: 'Payment Gateway',
        text: `Payment Receipt confirmed for ৳${amount.toLocaleString()} (TxID: ${txId})`,
        time: 'Just now',
        isMe: false
      });
      convo.lastMessage = `Payment Receipt confirmed for ৳${amount.toLocaleString()}`;
      convo.timestamp = 'Just now';
    }

    this.saveState();
    return newReceipt;
  }

  // --- Security & Gate Actions ---
  public toggleRooftopLock() {
    this.state.rooftopLocked = !this.state.rooftopLocked;
    this.state.recentActivities.unshift({
      id: `act-${Date.now()}`,
      text: `Rooftop access ${this.state.rooftopLocked ? 'locked' : 'unlocked'} by owner`,
      time: 'Just now',
      type: 'info'
    });
    this.saveState();
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
  }

  public triggerSos(unitNumber = '2B') {
    this.state.recentActivities.unshift({
      id: `act-${Date.now()}`,
      text: `🚨 EMERGENCY SOS triggered from Unit ${unitNumber}!`,
      time: 'Just now',
      type: 'warning'
    });
    this.saveState();
  }

  // --- Messenger Actions ---
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
  }

  // --- Maintenance ---
  public addMaintenanceDispatch(unitNumber: string, trade: string, description: string) {
    const newDsp: MaintenanceDispatch = {
      id: `dsp-${Date.now()}`,
      unitNumber,
      trade,
      contractorName: 'Assigned Master Pro',
      phone: '+880 1819-001122',
      status: 'in_progress',
      scheduledTime: 'Tomorrow 10:00 AM',
      description,
      priority: 'high',
      createdAt: 'Just now'
    };
    this.state.dispatches.unshift(newDsp);
    this.saveState();
  }

  // --- Reset to Fresh Demo State ---
  public resetState() {
    this.state = JSON.parse(JSON.stringify(initialDefaultState));
    this.saveState();
  }
}

export const backend = new BackendService();
