# 🏢 RentConnect — Luxury Smart Property Management Platform

> Next-generation property management and resident portal tailored for luxury high-rise residences in Dhaka, Bangladesh (Gulshan, Banani, Dhanmondi, Bashundhara).

![RentConnect Banner](https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Key Features

### 👨‍💼 House Owner & Landlord Suite
- **⚡ Live DWASA & DESCO IoT Telemetry**: Dual-line continuous telemetry monitoring Water (liters) and Electricity (kWh) with submeter diagnostics.
- **💰 Financial Health & Ledger**: Real-time monthly gross yield, automated bKash/Nagad/Bank rent collections, invoice reconciliations, and late fee processing.
- **👥 Unit & Tenant Directory**: Comprehensive occupancy tracking across all units (Flat 2B, 4A, Penthouse 8A, etc.) with verified NID records and DMP registration status.
- **🛠️ Maintenance Command**: Incident triaging, technician dispatch tracking, and digital contractor approvals.

### 🛋️ Resident Tenant Suite
- **📊 Real-Time Utilities Analytics**: In-depth submeter telemetry graphs with daily consumption breakdown.
- **💳 Instant Digital Payments**: Seamless one-tap rent and utility billing with bKash, Nagad, Visa, and Mastercard.
- **🛠️ Hire a Pro**: On-demand certified AC servicing, plumbing, electrical/IPS repairs, deep cleaning, and pest control with pre-cleared building gate passes.
- **🛍️ Resident Community Marketplace**: Internal marketplace for buying/selling furniture, electronics, and basement parking sublets.
- **💬 Direct Landlord Chat**: Instant direct messaging channel with Landlord (*Md ABID HASAN SIFAT*) with quick inquiry chips and status indicators.
- **🛡️ Legal & DMP Profile Vault**: Digital tenancy agreement, DMP Police tenant registration verification, and biometric security controls.

---

## 🚀 Tech Stack & Architecture

- **Backend REST API**: Node.js, Express, CORS, Persistent JSON File Engine (`server/data/db.json`)
- **Frontend Client**: React 18, TypeScript, Tailwind CSS, Vite
- **Stand-alone Mode**: Single-file self-contained distribution available at `standalone.html`

---

## 📡 Backend REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service healthcheck & active metrics |
| `GET` | `/api/state` | Full application database state |
| `POST` | `/api/auth/login` | Authenticate as House Owner or Tenant |
| `POST` | `/api/auth/register` | Register resident with NID & DMP clearance |
| `GET` / `POST` | `/api/units` | List units & add vacant units to portfolio |
| `POST` | `/api/rent/pay` | Process digital rent payment via bKash/Nagad |
| `GET` | `/api/receipts` | Ledger of all verified rent receipts |
| `GET` | `/api/telemetry` | DWASA & DESCO IoT submeter telemetry feeds |
| `POST` | `/api/telemetry/resolve-gas` | Emergency solenoid shutoff for Flat 2B |
| `POST` | `/api/telemetry/resolve-water` | Resolve water leak & dispatch emergency plumber |
| `GET` | `/api/security` | Security status, rooftop lock, visitor logs |
| `POST` | `/api/security/rooftop/toggle` | Toggle smart rooftop door access |
| `POST` | `/api/security/guest-pass` | Generate visitor QR gate pass |
| `POST` | `/api/security/sos` | Broadcast emergency SOS alarm |
| `GET` / `POST` | `/api/messages` | Direct chat with instant landlord response |
| `GET` / `POST` | `/api/broadcasts` | Building announcements board |
| `GET` / `POST` | `/api/services/book` | Book technician service slot (AC/Plumbing) |
| `GET` / `POST` | `/api/marketplace` | Resident marketplace & parking sublets |

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Running Frontend + Backend Together

```bash
# 1. Install dependencies
npm install

# 2. Start both Backend Server (port 5000) and Frontend (port 5173) concurrently
npm run dev:all
```

> **Frontend**: `http://localhost:5173`  
> **Backend API**: `http://localhost:5000/api/health`

### Running Backend or Frontend Separately

```bash
# Run Backend API Server only
npm run server

# Run Frontend Vite Client only
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 📄 License
MIT License. Built with ❤️ for modern property ecosystems.
