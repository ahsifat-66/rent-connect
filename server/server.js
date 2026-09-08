import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'data', 'db.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initial Seed Database
const getInitialState = () => ({
  currentUser: {
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
  },
  isLoggedIn: true,
  isOwnerView: true,
  rentCollected: 85000,
  rentTotal: 142000,
  rooftopLocked: true,
  checkinsToday: 14,
  complianceRate: 98,
  units: [
    { id: '1a', unitNumber: '1A', floor: 1, building: 'Gulshan Luxury Tower', tenantName: 'Fatima Rahman', rentAmount: 12000, rentStatus: 'paid', status: 'occupied', sqft: 1400, bedrooms: 2, bathrooms: 2, amenities: ['Lift', 'Generator', 'Balcony'], photos: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'], waterUsageLitres: 125, elecUsageKwh: 34, nidVerified: true, hasEmergencyAlert: false, assignedParking: 'P-1' },
    { id: '1b', unitNumber: '1B', floor: 1, building: 'Gulshan Luxury Tower', tenantName: 'Karim Ahmed', rentAmount: 12000, rentStatus: 'paid', status: 'occupied', sqft: 1400, bedrooms: 2, bathrooms: 2, amenities: ['Lift', 'Generator', 'Water Sensor'], photos: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'], waterUsageLitres: 420, elecUsageKwh: 36, nidVerified: true, hasEmergencyAlert: true, alertType: 'water_leak', assignedParking: 'P-2' },
    { id: '1c', unitNumber: '1C', floor: 1, building: 'Gulshan Luxury Tower', tenantName: 'Shabnam Begum', rentAmount: 12000, rentStatus: 'paid', status: 'occupied', sqft: 1400, bedrooms: 2, bathrooms: 2, amenities: ['Lift', 'Generator', 'East Facing'], photos: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], waterUsageLitres: 120, elecUsageKwh: 48, nidVerified: true, hasEmergencyAlert: false, assignedParking: 'P-3' },
    { id: '2a', unitNumber: '2A', floor: 2, building: 'Gulshan Luxury Tower', tenantName: 'Rizwan Hasan', rentAmount: 14000, rentStatus: 'paid', status: 'occupied', sqft: 1600, bedrooms: 3, bathrooms: 2, amenities: ['Central AC', 'Lift', 'Generator'], photos: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'], waterUsageLitres: 115, elecUsageKwh: 38, nidVerified: true, hasEmergencyAlert: false, assignedParking: 'P-4' },
    { id: '2b', unitNumber: '2B', floor: 2, building: 'Gulshan Luxury Tower', tenantName: 'Tanvir Ahmed', rentAmount: 28000, rentStatus: 'paid', status: 'occupied', sqft: 1850, bedrooms: 3, bathrooms: 3, amenities: ['Central AC', 'South Balcony', 'Generator', 'Parking', '24/7 Security'], photos: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'], waterUsageLitres: 122, elecUsageKwh: 52, nidVerified: true, hasEmergencyAlert: true, alertType: 'gas_leak', assignedParking: 'P-14' },
    { id: '2c', unitNumber: '2C', floor: 2, building: 'Gulshan Luxury Tower', tenantName: 'Ariful Haque', rentAmount: 14000, rentStatus: 'paid', status: 'occupied', sqft: 1600, bedrooms: 3, bathrooms: 2, amenities: ['Lift', 'Generator', 'IPS Ready'], photos: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'], waterUsageLitres: 118, elecUsageKwh: 36, nidVerified: true, hasEmergencyAlert: false, assignedParking: 'P-6' },
    { id: '3a', unitNumber: '3A', floor: 3, building: 'Gulshan Luxury Tower', tenantName: 'Tasnim Jahan', rentAmount: 15000, rentStatus: 'pending', status: 'occupied', sqft: 1750, bedrooms: 3, bathrooms: 3, amenities: ['Top Floor', 'Rooftop Access', 'Generator'], photos: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'], waterUsageLitres: 135, elecUsageKwh: 44, nidVerified: true, hasEmergencyAlert: false, assignedParking: 'P-7' },
    { id: '3b', unitNumber: '3B', floor: 3, building: 'Gulshan Luxury Tower', tenantName: 'Mehedi Zaman', rentAmount: 15000, rentStatus: 'pending', status: 'occupied', sqft: 1750, bedrooms: 3, bathrooms: 3, amenities: ['North View', 'Lift', 'Generator'], photos: ['https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800'], waterUsageLitres: 130, elecUsageKwh: 41, nidVerified: true, hasEmergencyAlert: false, assignedParking: 'P-8' },
    { id: '3c', unitNumber: '3C', floor: 3, building: 'Gulshan Luxury Tower', tenantName: 'Sadia Afreen', rentAmount: 15000, rentStatus: 'pending', status: 'occupied', sqft: 1750, bedrooms: 3, bathrooms: 3, amenities: ['Corner Unit', 'Lift', 'Generator'], photos: ['https://images.unsplash.com/photo-1600585155469-8a356db6fef7?w=800'], waterUsageLitres: 128, elecUsageKwh: 45, nidVerified: true, hasEmergencyAlert: false, assignedParking: 'P-9' },
    { id: '4a', unitNumber: '4A', floor: 4, building: 'Gulshan Luxury Tower', tenantName: 'Vacant (Ready to Move)', rentAmount: 32000, rentStatus: 'vacant', status: 'vacant', sqft: 1850, bedrooms: 3, bathrooms: 3, amenities: ['Central AC', 'South Balcony', 'Generator', 'Covered Parking', '24/7 Security'], photos: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'], waterUsageLitres: 0, elecUsageKwh: 0, nidVerified: false, hasEmergencyAlert: false, assignedParking: 'P-10' },
    { id: '4b', unitNumber: '4B', floor: 4, building: 'Gulshan Luxury Tower', tenantName: 'Vacant (Ready to Move)', rentAmount: 45000, rentStatus: 'vacant', status: 'vacant', sqft: 2250, bedrooms: 4, bathrooms: 4, amenities: ['Penthouse Terrace', 'Central AC', 'Generator', 'Dual Parking', 'Smart Lock'], photos: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'], waterUsageLitres: 0, elecUsageKwh: 0, nidVerified: false, hasEmergencyAlert: false, assignedParking: 'P-11' }
  ],
  criticalAlerts: [
    { id: 'alt-gas-2b', unit: '2B', type: 'gas_leak', title: 'CRITICAL ALERT: Gas Leak in Flat 2B', subtitle: 'Sensor triggered 0.82 PSI drop', active: true, timestamp: '10 mins ago' },
    { id: 'alt-water-1b', unit: '1B', type: 'water_leak', title: 'WATER LEAK: Flat 1B Overflow', subtitle: 'Continuous flow 420 L/day (+235%)', active: true, timestamp: '25 mins ago' }
  ],
  receipts: [
    { id: 'REC-2026-03-2B', month: 'March 2026', amount: 28000, paidOn: 'Mar 4, 2026', paymentMethod: 'bKash', transactionId: 'BK9X2B7721M', status: 'confirmed' },
    { id: 'REC-2026-03-1A', month: 'March 2026', amount: 12000, paidOn: 'Mar 3, 2026', paymentMethod: 'Nagad', transactionId: 'NG4X1A8820K', status: 'confirmed' },
    { id: 'REC-2026-03-2A', month: 'March 2026', amount: 14000, paidOn: 'Mar 2, 2026', paymentMethod: 'bKash', transactionId: 'BK7X2A9912L', status: 'confirmed' }
  ],
  dispatches: [
    { id: 'dsp-1', title: 'AC Inverter Master Cleaning & Gas Recharge', unit: 'Flat 2B', technician: 'Rahim Uddin (Verified Pro)', phone: '+880 1711-889900', status: 'completed', cost: 1200, scheduledTime: 'Today 11:30 AM', category: 'HVAC' },
    { id: 'dsp-2', title: 'Emergency Master Bathroom Solenoid Valve', unit: 'Flat 1B', technician: 'Belal Hossain (Lead Plumber)', phone: '+880 1812-334455', status: 'in_progress', cost: 500, scheduledTime: 'Today 02:00 PM', category: 'Plumbing' },
    { id: 'dsp-3', title: 'IPS Battery Terminal & Inverter Check', unit: 'Flat 2C', technician: 'Tariqul Islam (Certified Electrician)', phone: '+880 1912-778899', status: 'pending', cost: 600, scheduledTime: 'Tomorrow 10:00 AM', category: 'Electrical' }
  ],
  broadcasts: [
    { id: 'bc-1', title: 'Elevator Maintenance Schedule', body: 'Passenger Lift 2 will undergo quarterly safety calibration on Sunday between 10:00 AM and 01:00 PM.', target: 'All Residents', date: 'March 08, 2026', author: 'Md ABID HASAN SIFAT (Owner)', category: 'maintenance', priority: 'medium' },
    { id: 'bc-2', title: 'Smart Gate Facial Recognition Upgrade', body: 'New biometric sensors live at Basement 1 and Lobby turnstiles. Register guest QR passes via resident app.', target: 'All Residents', date: 'March 07, 2026', author: 'Building Security Command', category: 'security', priority: 'high' }
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
      messages: [
        { id: 'm1', senderId: 'usr-owner-1', senderName: 'Md ABID HASAN SIFAT', text: 'Assalamu Alaikum Tanvir Bhai! How is everything with Flat 2B?', timestamp: '10:30 AM', isOwner: true },
        { id: 'm2', senderId: 'usr-tenant-2b', senderName: 'Tanvir Ahmed', text: 'Walaikum Assalam Sifat Bhai! All great. AC is running smoothly after servicing.', timestamp: '10:32 AM', isOwner: false }
      ]
    }
  ],
  recentActivities: [
    { id: 'act-1', text: 'Rent payment of ৳28,000 received for Flat 2B via bKash', time: '10m ago', type: 'success' },
    { id: 'act-2', text: 'Guest QR Pass generated for Kamal Hossain (Flat 2B)', time: '25m ago', type: 'info' },
    { id: 'act-3', text: 'Warning: Abnormal water flow alert detected in Flat 1B', time: '40m ago', type: 'warning' },
    { id: 'act-4', text: 'Rooftop access door securely locked by Owner Command', time: '1h ago', type: 'info' }
  ],
  gateLogs: [
    { id: 'gl-1', location: 'Main Gate Access', guardName: 'Kamal Hossain (Guest · Flat 2B)', time: '10:15 AM · Entry Approved', isLive: true, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
    { id: 'gl-2', location: 'Courier Turnstile', guardName: 'Pathao Delivery (Flat 1A)', time: '09:40 AM · Verified Gate Pass', isLive: false, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150' }
  ],
  marketplaceListings: [
    { id: 'mp-1', title: 'Basement Parking Spot (Slot P-12)', type: 'parking', price: 3000, period: 'monthly', seller: 'Tanvir Ahmed (Flat 2B)', phone: '+880 1711-234567', description: 'Covered basement level B1 near passenger lift. Available immediately.', image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=400' },
    { id: 'mp-2', title: 'Solid Teak Wood Dining Set (6 Seater)', type: 'furniture', price: 24000, seller: 'Shabnam Begum (Flat 1C)', phone: '+880 1819-223344', description: 'Chittagong Teak with tempered glass top, pristine condition.', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400' }
  ]
});

// Load DB from file or initialize
let db = getInitialState();
if (fs.existsSync(DB_PATH)) {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    db = JSON.parse(raw);
    console.log(`[RentConnect DB] Loaded database state from ${DB_PATH}`);
  } catch (err) {
    console.error('[RentConnect DB] Failed reading db.json, using initial state:', err);
  }
} else {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
  console.log(`[RentConnect DB] Initialized fresh database at ${DB_PATH}`);
}

const saveDb = () => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
  } catch (err) {
    console.error('[RentConnect DB] Error persisting database:', err);
  }
};

// ==========================================
// REST API ROUTES
// ==========================================

// 1. Health & Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'RentConnect Property Management Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    stats: {
      units: db.units.length,
      rentCollected: db.rentCollected,
      activeAlerts: db.criticalAlerts.filter(a => a.active).length
    }
  });
});

// 2. Full State
app.get('/api/state', (req, res) => {
  res.json(db);
});

// 3. Auth
app.post('/api/auth/login', (req, res) => {
  const { role, method } = req.body;
  if (role === 'owner') {
    db.isLoggedIn = true;
    db.isOwnerView = true;
    db.currentUser = {
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
  } else {
    db.isLoggedIn = true;
    db.isOwnerView = false;
    db.currentUser = {
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
      occupation: 'Senior Software Architect'
    };
  }
  saveDb();
  res.json({ success: true, user: db.currentUser, isOwnerView: db.isOwnerView });
});

app.post('/api/auth/register', (req, res) => {
  const { name, phone, email, nid, role, unit } = req.body;
  const user = {
    id: `usr-${Date.now()}`,
    name: name || 'Registered Resident',
    phone: phone || '+880 1700-000000',
    email: email || 'resident@example.com',
    nid: nid || '1990000000000',
    nidVerified: true,
    role: role || 'tenant',
    unitNumber: unit || '2B',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    buildingName: 'Gulshan Luxury Tower'
  };
  db.currentUser = user;
  db.isLoggedIn = true;
  db.isOwnerView = (role === 'owner');
  saveDb();
  res.json({ success: true, user, message: 'Account registered with verified NID.' });
});

app.post('/api/auth/logout', (req, res) => {
  db.isLoggedIn = false;
  saveDb();
  res.json({ success: true, message: 'Logged out successfully.' });
});

// 4. Units & Portfolio
app.get('/api/units', (req, res) => {
  res.json(db.units);
});

app.post('/api/units', (req, res) => {
  const { unitNumber, floor, rentAmount, tenantName, status, sqft, bedrooms, bathrooms, amenities, photos } = req.body;
  const unitNo = (unitNumber || '4A').toUpperCase();
  const newUnit = {
    id: `u-${unitNo.toLowerCase()}-${Date.now()}`,
    unitNumber: unitNo,
    floor: Number(floor) || parseInt(unitNo.replace(/\D/g, '')) || 4,
    rentAmount: Number(rentAmount) || 30000,
    tenantName: status === 'vacant' ? 'Vacant (Ready to Move)' : (tenantName || 'Resident'),
    rentStatus: status === 'vacant' ? 'vacant' : 'pending',
    status: status || 'vacant',
    sqft: Number(sqft) || 1600,
    bedrooms: Number(bedrooms) || 3,
    bathrooms: Number(bathrooms) || 2,
    amenities: amenities || ['Lift', 'Generator', 'Balcony'],
    photos: photos && photos.length > 0 ? photos : ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60'],
    waterUsageLitres: 0,
    elecUsageKwh: 0,
    nidVerified: false,
    hasEmergencyAlert: false,
    assignedParking: `P-${db.units.length + 1}`
  };
  
  const existingIdx = db.units.findIndex(u => u.unitNumber === unitNo);
  if (existingIdx >= 0) {
    db.units[existingIdx] = { ...db.units[existingIdx], ...newUnit };
  } else {
    db.units.push(newUnit);
    db.rentTotal += newUnit.rentAmount;
  }

  db.recentActivities.unshift({
    id: `act-${Date.now()}`,
    text: `Flat ${unitNo} (${newUnit.status === 'vacant' ? 'Vacant' : 'Occupied'}) added to building portfolio`,
    time: 'Just now',
    type: 'success'
  });

  saveDb();
  res.status(201).json({ success: true, unit: newUnit });
});

app.patch('/api/units/:id/status', (req, res) => {
  const { status } = req.body;
  const param = String(req.params.id).toLowerCase();
  const unit = db.units.find(u => u.id.toLowerCase() === param || u.unitNumber.toLowerCase() === param);
  if (!unit) return res.status(404).json({ error: 'Unit not found' });

  unit.status = status || (unit.status === 'vacant' ? 'occupied' : 'vacant');
  unit.rentStatus = unit.status === 'vacant' ? 'vacant' : 'paid';
  if (unit.status === 'vacant') {
    unit.tenantName = 'Vacant (Ready to Move)';
  }

  saveDb();
  res.json({ success: true, unit });
});

// 5. Rent Payment & Receipts
app.get('/api/receipts', (req, res) => {
  res.json(db.receipts);
});

app.post('/api/rent/pay', (req, res) => {
  const { unitNumber, amount, paymentMethod } = req.body;
  const payAmount = Number(amount) || 28000;
  const txId = `BK9X${unitNumber || '2B'}${Math.floor(1000 + Math.random() * 9000)}M`;
  
  const receipt = {
    id: `REC-${Date.now()}`,
    month: 'March 2026',
    amount: payAmount,
    paidOn: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    paymentMethod: paymentMethod || 'bKash',
    transactionId: txId,
    status: 'confirmed'
  };

  db.rentCollected = Math.min(db.rentTotal, db.rentCollected + payAmount);
  db.receipts.unshift(receipt);

  // Update unit status
  const u = db.units.find(x => x.unitNumber === (unitNumber || '2B'));
  if (u) u.rentStatus = 'paid';

  // Add Activity
  db.recentActivities.unshift({
    id: `act-${Date.now()}`,
    text: `Rent payment of ৳${payAmount.toLocaleString()} received for Flat ${unitNumber || '2B'} via ${paymentMethod || 'bKash'}`,
    time: 'Just now',
    type: 'success'
  });

  saveDb();
  res.json({ success: true, receipt, rentCollected: db.rentCollected });
});

// 6. Telemetry & Alerts
app.get('/api/telemetry', (req, res) => {
  const telemetry = {
    dwasaOnline: true,
    descoOnline: true,
    titasPressurePsi: 0.52,
    unitsSubmeters: db.units.map(u => ({
      unit: u.unitNumber,
      tenant: u.tenantName,
      water: u.waterUsageLitres,
      elec: u.elecUsageKwh,
      hasAlert: u.hasEmergencyAlert,
      alertType: u.alertType
    }))
  };
  res.json(telemetry);
});

app.post('/api/telemetry/resolve-gas', (req, res) => {
  const { unit } = req.body;
  const alert = db.criticalAlerts.find(a => a.unit === (unit || '2B') && a.type === 'gas_leak');
  if (alert) alert.active = false;
  const u = db.units.find(x => x.unitNumber === (unit || '2B'));
  if (u && u.alertType === 'gas_leak') u.hasEmergencyAlert = false;

  db.recentActivities.unshift({
    id: `act-${Date.now()}`,
    text: `Emergency gas shutoff valve engaged for Flat ${unit || '2B'}. Resolved.`,
    time: 'Just now',
    type: 'info'
  });
  saveDb();
  res.json({ success: true, message: `Gas leak alert resolved for Flat ${unit || '2B'}.` });
});

app.post('/api/telemetry/resolve-water', (req, res) => {
  const { unit } = req.body;
  const alert = db.criticalAlerts.find(a => a.unit === (unit || '1B') && a.type === 'water_leak');
  if (alert) alert.active = false;
  const u = db.units.find(x => x.unitNumber === (unit || '1B'));
  if (u) {
    u.hasEmergencyAlert = false;
    u.waterUsageLitres = 120; // reset to normal flow
  }

  db.recentActivities.unshift({
    id: `act-${Date.now()}`,
    text: `Emergency plumber dispatched to Flat ${unit || '1B'}. Water leak resolved.`,
    time: 'Just now',
    type: 'success'
  });
  saveDb();
  res.json({ success: true, message: `Water leak resolved for Flat ${unit || '1B'}.` });
});

// 7. Security Controls
app.get('/api/security', (req, res) => {
  res.json({
    rooftopLocked: db.rooftopLocked,
    checkinsToday: db.checkinsToday,
    complianceRate: db.complianceRate,
    gateLogs: db.gateLogs
  });
});

app.post('/api/security/rooftop/toggle', (req, res) => {
  db.rooftopLocked = !db.rooftopLocked;
  db.recentActivities.unshift({
    id: `act-${Date.now()}`,
    text: `Rooftop access door ${db.rooftopLocked ? 'locked' : 'unlocked'} by admin.`,
    time: 'Just now',
    type: 'info'
  });
  saveDb();
  res.json({ success: true, rooftopLocked: db.rooftopLocked });
});

app.post('/api/security/guest-pass', (req, res) => {
  const { guestName, unitNumber, validUntil } = req.body;
  db.checkinsToday += 1;
  const logItem = {
    id: `gl-${Date.now()}`,
    location: 'Turnstile B1 & Main Lobby',
    guardName: `${guestName || 'Visitor Guest'} (Flat ${unitNumber || '2B'})`,
    time: 'Just now · Entry Authorized',
    isLive: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  };
  db.gateLogs.unshift(logItem);
  saveDb();
  res.json({ success: true, qrToken: `PASS-${Date.now()}-2B`, gateLog: logItem });
});

app.post('/api/security/sos', (req, res) => {
  const { unitNumber } = req.body;
  db.recentActivities.unshift({
    id: `act-${Date.now()}`,
    text: `🚨 EMERGENCY SOS ALARM triggered from Flat ${unitNumber || '2B'}. Security guard dispatched.`,
    time: 'Just now',
    type: 'warning'
  });
  saveDb();
  res.json({ success: true, message: 'Emergency dispatch triggered.' });
});

// 8. Messages & Chat
app.get('/api/messages', (req, res) => {
  const conv = db.conversations[0];
  res.json(conv ? conv.messages : []);
});

app.post('/api/messages', (req, res) => {
  const { text, isOwner } = req.body;
  if (!text || !text.trim()) return res.status(400).json({ error: 'Text required' });

  const msg = {
    id: `m-${Date.now()}`,
    senderId: isOwner ? 'usr-owner-1' : 'usr-tenant-2b',
    senderName: isOwner ? 'Md ABID HASAN SIFAT' : 'Tanvir Ahmed',
    text: text.trim(),
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isOwner: Boolean(isOwner)
  };

  if (!db.conversations[0]) {
    db.conversations = [{
      id: 'c-2b',
      unitNumber: '2B',
      tenantName: 'Tanvir Ahmed',
      tenantAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      unreadCount: 0,
      lastMessage: msg.text,
      lastMessageTime: msg.timestamp,
      messages: [msg]
    }];
  } else {
    db.conversations[0].messages.push(msg);
    db.conversations[0].lastMessage = msg.text;
    db.conversations[0].lastMessageTime = msg.timestamp;
  }

  saveDb();
  res.json({ success: true, message: msg });
});

// 9. Broadcast Notices
app.get('/api/broadcasts', (req, res) => {
  res.json(db.broadcasts);
});

app.post('/api/broadcasts', (req, res) => {
  const { title, body, category, priority } = req.body;
  const newNotice = {
    id: `bc-${Date.now()}`,
    title: title || 'Official Building Announcement',
    body: body || 'Important notice for all building residents.',
    target: 'All Residents',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    author: 'Md ABID HASAN SIFAT (Owner)',
    category: category || 'general',
    priority: priority || 'medium'
  };
  db.broadcasts.unshift(newNotice);
  saveDb();
  res.status(201).json({ success: true, broadcast: newNotice });
});

// 10. Services & Pro Dispatch
app.get('/api/services', (req, res) => {
  res.json(db.dispatches);
});

app.post('/api/services/book', (req, res) => {
  const { serviceTitle, category, cost, unitNumber } = req.body;
  const newDispatch = {
    id: `dsp-${Date.now()}`,
    title: serviceTitle || 'AC Maintenance & Servicing',
    unit: `Flat ${unitNumber || '2B'}`,
    technician: 'Kamrul Hasan (Verified Pro)',
    phone: '+880 1711-445566',
    status: 'in_progress',
    cost: Number(cost) || 1200,
    scheduledTime: 'Today 03:00 PM',
    category: category || 'HVAC'
  };
  db.dispatches.unshift(newDispatch);
  db.recentActivities.unshift({
    id: `act-${Date.now()}`,
    text: `New service booked: ${newDispatch.title} for ${newDispatch.unit}`,
    time: 'Just now',
    type: 'info'
  });
  saveDb();
  res.status(201).json({ success: true, dispatch: newDispatch });
});

// 11. Marketplace
app.get('/api/marketplace', (req, res) => {
  res.json(db.marketplaceListings);
});

app.post('/api/marketplace', (req, res) => {
  const { title, price, description, type, seller, phone, image } = req.body;
  const listing = {
    id: `mp-${Date.now()}`,
    title: title || 'Resident Community Item',
    type: type || 'item',
    price: Number(price) || 5000,
    seller: seller || 'Tanvir Ahmed (Flat 2B)',
    phone: phone || '+880 1711-234567',
    description: description || 'Available for pickup at Gulshan Luxury Tower.',
    image: image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'
  };
  db.marketplaceListings.unshift(listing);
  saveDb();
  res.status(201).json({ success: true, listing });
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 RentConnect Backend REST API running on Port ${PORT}`);
  console.log(`📡 Healthcheck: http://localhost:${PORT}/api/health`);
  console.log(`💾 Database file: ${DB_PATH}`);
  console.log(`====================================================`);
});
