export type UserRole = 'owner' | 'tenant';

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  avatar: string;
  nid: string;
  nidVerified: boolean;
  unitNumber?: string;
  buildingName?: string;
  leaseStartDate?: string;
  leaseEndDate?: string;
  rentAmount?: number;
  securityDeposit?: number;
  parkingSlot?: string;
  occupation?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  familyMembersCount?: number;
}

export interface Unit {
  id: string;
  unitNumber: string;
  building: string;
  rentAmount: number;
  sqft: number;
  status: 'vacant' | 'occupied';
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  photos: string[];
  tenant?: {
    name: string;
    phone: string;
    nid: string;
    leaseUntil: string;
    avatar: string;
  } | null;
}

export interface UtilityRecord {
  id: string;
  type: 'electricity' | 'gas' | 'water' | 'service';
  title: string;
  provider: string; // DESCO, DPDC, Titas, WASA, Estate Service
  meterNumber?: string;
  currentBalance?: number;
  lastBilledAmount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'due';
  usageDetail: string;
}

export interface MaintenanceDispatch {
  id: string;
  unitNumber: string;
  trade: string;
  contractorName: string;
  phone: string;
  status: 'dispatched' | 'in_progress' | 'completed';
  scheduledTime: string;
  description: string;
  reportedBy?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
}

export interface RentReceipt {
  id: string;
  month: string;
  amount: number;
  paidOn: string;
  paymentMethod: 'bKash' | 'Nagad' | 'Bank Transfer' | 'Card';
  transactionId: string;
  status: 'confirmed';
}

export interface BroadcastNotice {
  id: string;
  title: string;
  body: string;
  urgent: boolean;
  date: string;
  author: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
}

export interface Conversation {
  id: string;
  unitNumber: string;
  participantName: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  messages: ChatMessage[];
}
