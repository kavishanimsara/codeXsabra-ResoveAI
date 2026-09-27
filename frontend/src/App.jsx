import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Activity, Cpu, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
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
  const [lastAnalyzedTime, setLastAnalyzedTime] = useState(null);

  // Trigger analysis for target customer
  const triggerBackendAnalysis = async (targetId) => {
    const custId = targetId || selectedId;
    const targetCustomer = CUSTOMER_SCENARIOS.find(c => c.id === custId);
    if (!targetCustomer) return;

    setIsAnalyzing(true);
    const res = await analyzeComplaintWithBackend(targetCustomer.id, targetCustomer.ticket.text);
    if (res.success && res.data) {
      setBackendData(prev => ({
        ...prev,
        [targetCustomer.id]: res.data
      }));
      setLastAnalyzedTime(new Date().toLocaleTimeString());
    }
    setIsAnalyzing(false);
  };

  // Re-fetch analysis whenever live API is toggled ON or customer changes
  React.useEffect(() => {
    if (isLiveApi) {
      triggerBackendAnalysis(selectedId);
    }
  }, [isLiveApi, selectedId]);

  const handleToggleLiveApi = (newVal) => {
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

  // Merge live backend data when available
  const activeBackend = backendData[baseCustomer.id];
  const customer = React.useMemo(() => {
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

  const isResolved = resolvedIds.includes(customer.id);
  const liveBalance = balances[customer.id] ?? customer.currentBalance;

  const handleResolve = (id, amount) => {
    if (resolvedIds.includes(id)) return;
    setResolvedIds(p => [...p, id]);
    setBalances(p => ({ ...p, [id]: (p[id] || 0) + amount }));
    setTimeout(() => setReceiptOpen(true), 500);
  };

  const handleReset = () => {
    setResolvedIds([]);
    setBalances(Object.fromEntries(CUSTOMER_SCENARIOS.map(c => [c.id, c.currentBalance])));
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
      />

      {/* Main layout */}
      <main className="flex-1 max-w-[1800px] w-full mx-auto px-4 sm:px-5 py-5 flex flex-col lg:flex-row gap-5 items-start relative z-10">

        <SidebarQueue
          scenarios={filtered}
          selectedId={customer.id}
          onSelectCustomer={setSelectedId}
          resolvedIds={resolvedIds}
        />

        {/* Center workspace */}
        <section className="flex-1 min-w-0 w-full space-y-4">

          {/* ── LIVE BACKEND STATUS BANNER (VISIBLE WHEN TOGGLED) ── */}
          <AnimatePresence>
            {isLiveApi && (
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#1E242B] text-white rounded-2xl p-4 border border-emerald-500/40 shadow-xl relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="relative mt-1 sm:mt-0 shrink-0">
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-sm" />
                      <div className="absolute inset-0 w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black tracking-wider text-emerald-400 uppercase flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5" /> FastAPI Backend Live
                        </span>
                        <span className="text-[10px] bg-white/10 text-slate-300 font-mono px-2 py-0.5 rounded-md border border-white/10">
                          POST /analyze-complaint (Port 8000)
                        </span>
                        {lastAnalyzedTime && (
                          <span className="text-[10px] text-emerald-300 font-mono">
                            Synced @ {lastAnalyzedTime}
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-300 mt-1 flex items-center gap-2 flex-wrap">
                        {isAnalyzing ? (
                          <span className="flex items-center gap-1.5 text-amber-300 font-bold animate-pulse">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            Executing Member 2 Rule Engine &amp; Member 3 Gemini AI for {customer.id}…
                          </span>
                        ) : activeBackend ? (
                          <span>
                            ✓ <strong>Live Facts:</strong> {activeBackend.rule_engine_data?.total_transactions_analyzed || 16} Transactions Evaluated · Discrepancies: <strong>{activeBackend.rule_engine_data?.discrepancy_flags?.join(', ') || 'OK'}</strong> · Confidence: <strong>{((activeBackend.rule_engine_data?.confidence_score || 0.95) * 100).toFixed(0)}%</strong>
                          </span>
                        ) : (
                          <span className="text-slate-400">
                            Connected to backend. Click "Re-Analyze Case" to query live API.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => triggerBackendAnalysis(customer.id)}
                    disabled={isAnalyzing}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shrink-0 shadow-md self-start sm:self-auto"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                    {isAnalyzing ? 'Analyzing…' : 'Re-Analyze Case'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
