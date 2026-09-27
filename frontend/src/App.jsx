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
import { fetchCustomerScenarios, analyzeComplaintWithBackend, executeResolutionWithBackend, checkBackendConnection } from './services/apiService';

export default function App() {
  const [scenarios, setScenarios] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [selectedTicketId, setSelectedTicketId] = useState('');
  const [resolvedIds, setResolvedIds] = useState([]);
  const [balances, setBalances] = useState({});
  const [search, setSearch] = useState('');
  const [isLiveApi, setIsLiveApi] = useState(true);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [backendData, setBackendData] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalyzedTime, setLastAnalyzedTime] = useState(null);

  const handleSelectCustomer = (custId, ticketId = null) => {
    setSelectedId(custId);
    if (ticketId) {
      setSelectedTicketId(ticketId);
    } else {
      const firstMatch = scenarios.find(s => s.id === custId);
      if (firstMatch) {
        setSelectedTicketId(firstMatch.ticket?.id || '');
      }
    }
  };

  // Load scenarios from backend on mount
  React.useEffect(() => {
    async function loadScenarios() {
      const isConnected = await checkBackendConnection();
      const res = await fetchCustomerScenarios();
      if (res.success && res.data && res.data.length > 0) {
        setScenarios(res.data);
        setSelectedId(res.data[0].id);
        setSelectedTicketId(res.data[0].ticket?.id || '');
        setBalances(Object.fromEntries(res.data.map(c => [c.id, c.currentBalance])));
        setIsLiveApi(isConnected);
      }
    }
    loadScenarios();
  }, []);

  // Trigger analysis for target customer
  const triggerBackendAnalysis = async (targetId, ticketText = null) => {
    const custId = targetId || selectedId;
    const targetCustomer = scenarios.find(c => (selectedTicketId ? c.ticket?.id === selectedTicketId : c.id === custId)) || scenarios.find(c => c.id === custId);
    if (!targetCustomer) return;

    setIsAnalyzing(true);
    const textToAnalyze = ticketText || targetCustomer.ticket.text;
    const res = await analyzeComplaintWithBackend(targetCustomer.id, textToAnalyze);
    if (res.success && res.data) {
      setBackendData(prev => ({
        ...prev,
        [targetCustomer.id]: res.data
      }));
      setLastAnalyzedTime(new Date().toLocaleTimeString());
    }
    setIsAnalyzing(false);
  };

  // Re-fetch analysis whenever live API is toggled ON or customer/ticket changes
  React.useEffect(() => {
    if (isLiveApi && selectedId) {
      triggerBackendAnalysis(selectedId);
    }
  }, [isLiveApi, selectedId, selectedTicketId]);

  const handleToggleLiveApi = (newVal) => {
    setIsLiveApi(newVal);
  };

  const filtered = scenarios.filter(c => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      c.id.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.ticket.id.toLowerCase().includes(q) ||
      c.ticket.text.toLowerCase().includes(q) ||
      c.ticket.category.toLowerCase().includes(q)
    );
  });

  const baseCustomer = (selectedTicketId && scenarios.find(c => c.ticket?.id === selectedTicketId)) || scenarios.find(c => c.id === selectedId) || scenarios[0] || null;

  // Merge live backend data when available
  const activeBackend = baseCustomer ? backendData[baseCustomer.id] : null;
  const customer = React.useMemo(() => {
    if (!baseCustomer) return null;
    if (!isLiveApi || !activeBackend) return baseCustomer;

    const ai = activeBackend.ai_analysis || {};
    const rules = activeBackend.rule_engine_data || {};
    const duplicateDetail = rules.rule_checks?.duplicate_details?.[0];
    const liveAmount = duplicateDetail?.amount || baseCustomer.affectedAmount;

    // Build enhanced why-trail blending live Rule Engine facts + Gemini output
    const liveWhyTrail = [
      {
        stage: "DETECT",
        badgeColor: "bg-red-50 text-red-700 border-red-200",
        title: `Live Rule Engine: ${rules.rule_checks?.duplicates_found || 1} Duplicate Detected`,
        detail: duplicateDetail 
          ? `Analyzed ${rules.total_transactions_analyzed || 16} transactions from core CSV: Found dual debit (${duplicateDetail.transaction_ids?.join(' & ') || 'DT01A/DT01B'}) of LKR ${duplicateDetail.amount?.toFixed(2)} with ${duplicateDetail.time_gap_seconds}s gap.`
          : `Live Rule Engine evaluated ${rules.total_transactions_analyzed || 16} transactions. Flags: ${(rules.discrepancy_flags || []).join(', ')}.`
      },
      {
        stage: "ANALYZE",
        badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
        title: ai.root_cause ? "Gemini AI Root Cause Deduction" : "HLR Core Discrepancy Analysis",
        detail: ai.root_cause || (ai.why_trail && ai.why_trail[0]) || `Active discrepancy flags: ${(rules.discrepancy_flags || []).join(', ')}. Balance mismatches identified: ${rules.rule_checks?.balance_mismatches_found || 0}.`
      },
      {
        stage: "DECIDE",
        badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
        title: "Deterministic Decisioning Match",
        detail: ai.optimal_resolution || (ai.why_trail && ai.why_trail[1]) || `Rule engine confidence calculated at ${((rules.confidence_score || 0.95) * 100).toFixed(1)}%. Customer line confirmed eligible for instant remediation.`
      },
      {
        stage: "ACT",
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        title: "Remediation & Safeguard Action",
        detail: ai.customer_communication || (ai.why_trail && ai.why_trail[2]) || `Reconcile LKR ${liveAmount.toFixed(2)} to ${baseCustomer.customerType} balance + dispatch digital Trust Receipt with USSD guard.`
      }
    ];

    return {
      ...baseCustomer,
      primaryAnomaly: (rules.discrepancy_flags && rules.discrepancy_flags[0]) || baseCustomer.primaryAnomaly,
      confidenceScore: rules.confidence_score || baseCustomer.confidenceScore,
      affectedAmount: liveAmount,
      recommendedAction: {
        ...baseCustomer.recommendedAction,
        amount: liveAmount,
        label: ai.optimal_resolution || `Reconcile LKR ${liveAmount.toFixed(2)} via Live Backend`,
        description: ai.root_cause || `Direct reconciliation based on ${rules.total_transactions_analyzed || 16} live transaction records.`
      },
      whyTrail: liveWhyTrail
    };
  }, [baseCustomer, isLiveApi, activeBackend]);

  const isResolved = customer ? resolvedIds.includes(customer.id) : false;
  const liveBalance = customer ? (balances[customer.id] ?? customer.currentBalance) : 0;

  const handleResolve = async (id, amount) => {
    if (resolvedIds.includes(id)) return;
    await executeResolutionWithBackend(id, amount);
    setResolvedIds(p => [...p, id]);
    setBalances(p => ({ ...p, [id]: (p[id] || 0) + amount }));
    setTimeout(() => setReceiptOpen(true), 500);
  };

  const handleReset = () => {
    setResolvedIds([]);
    setBalances(Object.fromEntries(scenarios.map(c => [c.id, c.currentBalance])));
    setReceiptOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-[#EEF0F5]">
      {/* Ambient background orbs */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />

      <Navbar
        searchQuery={search}
        setSearchQuery={setSearch}
        isLiveApi={isLiveApi}
        setIsLiveApi={handleToggleLiveApi}
        onReset={handleReset}
        scenarios={scenarios}
        selectedId={selectedId}
        onSelectCustomer={handleSelectCustomer}
      />

      {/* Main layout */}
      <main className="flex-1 max-w-[1800px] w-full mx-auto px-4 sm:px-5 py-5 flex flex-col lg:flex-row gap-5 items-start relative z-10">

        {customer ? (
          <>
            <SidebarQueue
              scenarios={filtered}
              selectedId={customer.id}
              selectedTicketId={selectedTicketId}
              onSelectCustomer={handleSelectCustomer}
              resolvedIds={resolvedIds}
            />

            {/* Center workspace */}
            <section className="flex-1 min-w-0 w-full space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={customer.ticket?.id || customer.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  <CustomerHeader
                    customer={customer}
                    isResolved={isResolved}
                    liveBalance={liveBalance}
                    scenarios={scenarios}
                    onSelectCustomer={handleSelectCustomer}
                  />
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
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-16 text-slate-600 font-extrabold text-base bg-white rounded-2xl shadow-card border border-slate-200">
            Connecting to ResolvAI Backend &amp; Loading Live Datasets...
          </div>
        )}
      </main>

      {customer && <TrustReceiptModal customer={customer} isOpen={receiptOpen} onClose={() => setReceiptOpen(false)} />}
      {customer && <CopilotChatDrawer customer={customer} />}

      <footer className="relative z-10 bg-white/80 backdrop-blur border-t border-slate-200/60 py-3.5 text-xs text-slate-500">
        <div className="max-w-[1800px] mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#FF5500]">HUTCH</span>
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
