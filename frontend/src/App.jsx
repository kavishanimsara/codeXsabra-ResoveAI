import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import SidebarQueue from './components/SidebarQueue';
import CustomerHeader from './components/CustomerHeader';
import DisputeCard from './components/DisputeCard';
import MultiSourceTimeline from './components/MultiSourceTimeline';
import ExplainableWhyTrail from './components/ExplainableWhyTrail';
import ActionCenter from './components/ActionCenter';
import TrustReceiptModal from './components/TrustReceiptModal';
import CopilotChatDrawer from './components/CopilotChatDrawer';
import { CUSTOMER_SCENARIOS } from './data/mockData';
import { analyzeComplaintWithBackend, checkBackendConnection } from './services/apiService';

export default function App() {
  const [selectedId, setSelectedId] = useState('C00001');
  const [resolvedIds, setResolvedIds] = useState([]);
  const [balances, setBalances] = useState(() =>
    Object.fromEntries(CUSTOMER_SCENARIOS.map(c => [c.id, c.currentBalance]))
  );
  const [search, setSearch] = useState('');
  const [isLiveApi, setIsLiveApi] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [backendData, setBackendData] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Check backend and fetch analysis when live API is enabled
  React.useEffect(() => {
    async function fetchAnalysis() {
      if (!isLiveApi) return;
      const targetCustomer = CUSTOMER_SCENARIOS.find(c => c.id === selectedId);
      if (!targetCustomer) return;

      setIsAnalyzing(true);
      const res = await analyzeComplaintWithBackend(targetCustomer.id, targetCustomer.ticket.text);
      if (res.success && res.data) {
        setBackendData(prev => ({
          ...prev,
          [targetCustomer.id]: res.data
        }));
      }
      setIsAnalyzing(false);
    }

    fetchAnalysis();
  }, [isLiveApi, selectedId]);

  const handleToggleLiveApi = async (newVal) => {
    setIsLiveApi(newVal);
  };

  const filtered = CUSTOMER_SCENARIOS.filter(c => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      c.id.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.ticket.id.toLowerCase().includes(q)
    );
  });

  const baseCustomer = CUSTOMER_SCENARIOS.find(c => c.id === selectedId) || CUSTOMER_SCENARIOS[0];

  // Merge backend data if live API responded
  const activeBackend = backendData[baseCustomer.id];
  const customer = React.useMemo(() => {
    if (!isLiveApi || !activeBackend) return baseCustomer;

    const ai = activeBackend.ai_analysis || {};
    const rules = activeBackend.rule_engine_data || {};

    return {
      ...baseCustomer,
      primaryAnomaly: (rules.discrepancy_flags && rules.discrepancy_flags[0]) || baseCustomer.primaryAnomaly,
      recommendedAction: {
        ...baseCustomer.recommendedAction,
        label: ai.optimal_resolution || baseCustomer.recommendedAction.label,
        description: ai.root_cause || baseCustomer.recommendedAction.description
      },
      whyTrail: ai.why_trail && Array.isArray(ai.why_trail) && ai.why_trail.length > 0 ? [
        {
          stage: "DETECT",
          badgeColor: "bg-red-50 text-red-700 border-red-200",
          title: "Deterministic Rule Engine Match",
          detail: `Flags: ${(rules.discrepancy_flags || []).join(', ') || 'Rule check completed.'}`
        },
        {
          stage: "ANALYZE",
          badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
          title: "Gemini AI Root Cause",
          detail: ai.root_cause || ai.why_trail[0]
        },
        {
          stage: "DECIDE",
          badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
          title: "Optimal AI Decision",
          detail: ai.why_trail[1] || ai.optimal_resolution
        },
        {
          stage: "ACT",
          badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
          title: "Customer Safeguard & Action",
          detail: ai.why_trail[2] || ai.customer_communication || baseCustomer.whyTrail[3].detail
        }
      ] : baseCustomer.whyTrail
    };
  }, [baseCustomer, isLiveApi, activeBackend]);
  const isResolved = resolvedIds.includes(customer.id);
  const liveBalance = balances[customer.id] ?? customer.currentBalance;

  const handleResolve = (id, amount) => {
    if (resolvedIds.includes(id)) return;
    setResolvedIds(p => [...p, id]);
    setBalances(p => ({ ...p, [id]: (p[id] || 0) + amount }));
    setTimeout(() => setReceiptOpen(true), 500); // slight delay for confetti to settle
  };

  const handleReset = () => {
    setResolvedIds([]);
    setBalances(Object.fromEntries(CUSTOMER_SCENARIOS.map(c => [c.id, c.currentBalance])));
    setReceiptOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Ambient background orbs */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />

      <Navbar
        searchQuery={search}
        setSearchQuery={setSearch}
        isLiveApi={isLiveApi}
        setIsLiveApi={setIsLiveApi}
        onReset={handleReset}
      />

      {/* Main layout */}
      <main className="flex-1 max-w-[1800px] w-full mx-auto px-4 sm:px-5 py-5 flex flex-col lg:flex-row gap-5 items-start relative z-10">

        <SidebarQueue
          scenarios={filtered}
          selectedId={customer.id}
          onSelectCustomer={setSelectedId}
          resolvedIds={resolvedIds}
        />

        {/* Center workspace — AnimatePresence swap on customer change */}
        <section className="flex-1 min-w-0 w-full space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <CustomerHeader customer={customer} isResolved={isResolved} liveBalance={liveBalance} />
              <DisputeCard ticket={customer.ticket} affectedAmount={customer.affectedAmount} />
              <ActionCenter
                customer={customer}
                isResolved={isResolved}
                onResolve={handleResolve}
                onOpenReceipt={() => setReceiptOpen(true)}
              />
              <ExplainableWhyTrail customer={customer} />
              <MultiSourceTimeline customer={customer} />
            </motion.div>
          </AnimatePresence>
        </section>
      </main>

      <TrustReceiptModal customer={customer} isOpen={receiptOpen} onClose={() => setReceiptOpen(false)} />
      <CopilotChatDrawer customer={customer} />

      <footer className="relative z-10 bg-white/80 backdrop-blur border-t border-slate-200/60 py-3.5 text-xs text-slate-500">
        <div className="max-w-[1800px] mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-hutch-orange">HUTCH</span>
            <span>IgnitX Hackathon 2026</span>
            <span className="text-slate-300">·</span>
            <span className="font-semibold text-slate-700">Track A: Resolution Copilot</span>
          </div>
          <div>Built by <span className="font-bold text-slate-800">Member 5</span> · React + Vite + Framer Motion</div>
        </div>
      </footer>
    </div>
  );
}
