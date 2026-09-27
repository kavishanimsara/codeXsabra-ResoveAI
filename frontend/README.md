# 🎨 ResolvAI Frontend UI (`frontend/`)

> **React 18 + Vite 5 + Tailwind CSS + Framer Motion Application**

The frontend application provides a high-fidelity resolution copilot interface tailored for Hutch customer support agents.

---

## 🏗️ Architecture & Component Tree

```
frontend/src/
├── components/
│   ├── Navbar.jsx               # Navigation bar, Live API toggle, Customer ID dropdown selector
│   ├── SidebarQueue.jsx         # Priority queue, anomaly filter pills, real-time telemetry
│   ├── CustomerHeader.jsx       # Customer profile, HLR active indicator, multi-complaint tabs
│   ├── DisputeCard.jsx          # Live customer complaint quote bubble, category & ground truth
│   ├── ActionCenter.jsx         # 1-Click resolution hub, instant reconcile & escalation
│   ├── ExplainableWhyTrail.jsx  # 4-stage explainable audit trail (Detect, Analyze, Decide, Act)
│   ├── MultiSourceTimeline.jsx  # Multi-source timeline tab view (Transactions, Usage, Logged Ticket)
│   ├── TrustReceiptModal.jsx    # Digital trust receipt modal & bilingual SMS preview (EN / SI)
│   └── CopilotChatDrawer.jsx    # Floating copilot AI chat drawer
├── services/
│   └── apiService.js            # Resilient API adapter with multi-URL fallback
├── App.jsx                      # Main application view & active customer state
├── main.jsx                     # React entry point
└── index.css                    # Tailwind CSS directives & global custom animations
```

---

## ✨ Key UI Capabilities

1. **Multi-Complaint Customer View**: Search by Customer ID (`C03619`, `C00001`, `C04694`) or choose from the dropdown selector. If a customer has multiple complaints, switch between complaints using the **Customer Complaints List Bar**.
2. **Explainable Why-Trail**: Displays a 4-stage deterministic reasoning breakdown (**Detect**, **Analyze**, **Decide**, **Act**) with color-coded severity badges.
3. **1-Click Instant Resolution Hub**: Reconcile account balance discrepancies in LKR with visual celebration feedback (`canvas-confetti`).
4. **Digital Trust Receipt Modal**: Interactive 3D flip card presenting customer audit details, technical safeguards (USSD idempotency filters), and bilingual SMS dispatch previews in **English** and **Sinhala (සිංහල)**.
5. **Multi-Source Ledger Timeline**: Inspect transaction history with anomaly tags (`ANOMALY`, `VERIFIED`), data usage meters, and channel interaction logs.

---

## 🛠️ Development & Build Commands

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
*App will start on `http://localhost:3000` with Vite HMR (Hot Module Replacement).*

### Build for Production
```bash
npm run build
```
*Compiles optimized static bundle into `dist/`.*

### Preview Production Build
```bash
npm run preview
```

---

## 🌐 API Adapter & Proxy Configuration

- **Vite Proxy (`vite.config.js`)**: Routes requests from `/api/*` to `http://127.0.0.1:8000`.
- **Resilient API Adapter (`apiService.js`)**: Tries relative proxy paths and direct backend URLs (`http://127.0.0.1:8000`), ensuring 100% reliable data loading whether running in development or production.
