import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, AlertTriangle, CheckCircle2, Clock,
  TrendingDown, Zap, Activity
} from 'lucide-react';
import { KPI_METRICS } from '../data/mockData';

const ANOMALY_META = {
  DUPLICATE_TRANSACTION: { label: 'DUPLICATE', color: 'bg-red-100 text-red-700 border-red-200' },
  FAILED_TRANSACTION:    { label: 'FAILED',    color: 'bg-amber-100 text-amber-700 border-amber-200' },
  USAGE_OVERAGE:         { label: 'OVERAGE',   color: 'bg-blue-100 text-blue-700 border-blue-200' },
  BALANCE_MISMATCH:      { label: 'MISMATCH',  color: 'bg-purple-100 text-purple-700 border-purple-200' },
};

const FILTERS = [
  { id: 'ALL',       label: 'All' },
  { id: 'DUPLICATE', label: 'Duplicate' },
  { id: 'FAILED',    label: 'Failed' },
  { id: 'OVERAGE',   label: 'Usage' },
];

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden: { opacity: 0, x: -14 },
  show:   { opacity: 1, x: 0, transition: { ease: [0.16, 1, 0.3, 1], duration: 0.35 } },
};

export default function SidebarQueue({ scenarios, selectedId, onSelectCustomer, resolvedIds }) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filtered = scenarios.filter(s => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'DUPLICATE') return s.primaryAnomaly === 'DUPLICATE_TRANSACTION';
    if (activeFilter === 'FAILED')    return s.primaryAnomaly === 'FAILED_TRANSACTION';
    if (activeFilter === 'OVERAGE')   return s.primaryAnomaly === 'USAGE_OVERAGE';
    return true;
  });

  return (
    <aside className="w-full lg:w-[320px] xl:w-[340px] shrink-0 flex flex-col gap-4">

      {/* ── Queue Card ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card rounded-2xl shadow-card overflow-hidden bg-white/95 border border-slate-200"
      >
        {/* Header */}
        <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-hutch-orange/10 text-hutch-orange flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-sm font-bold text-slate-900">Priority Queue</h2>
          </div>
          <motion.span
            key={filtered.length}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-hutch-gradient text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-hutch"
          >
            {filtered.length} Cases
          </motion.span>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 px-3 py-2.5 border-b border-slate-100 overflow-x-auto scrollbar-none">
          {FILTERS.map(f => (
            <motion.button
              key={f.id}
              whileTap={{ scale: 0.93 }}
              onClick={() => setActiveFilter(f.id)}
              className={`text-[11px] font-bold px-3 py-1.5 rounded-full shrink-0 transition-all duration-200 ${
                activeFilter === f.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </motion.button>
          ))}
        </div>

        {/* Ticket Feed */}
        <div className="overflow-y-auto max-h-[calc(100vh-320px)] min-h-[220px]">
          <motion.div
            key={activeFilter}
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="divide-y divide-slate-100"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map(cust => {
                const isSelected = cust.id === selectedId;
                const isResolved = resolvedIds.includes(cust.id);
                const meta = ANOMALY_META[cust.primaryAnomaly] || { label: 'OPEN', color: 'bg-slate-100 text-slate-600 border-slate-200' };

                return (
                  <motion.div
                    key={cust.id}
                    variants={itemVariants}
                    layout
                    onClick={() => onSelectCustomer(cust.id)}
                    whileHover={{ backgroundColor: '#f8fafc' }}
                    className={`group relative flex items-start gap-3.5 px-4 py-3.5 cursor-pointer transition-colors ${
                      isSelected ? 'bg-orange-50/80' : ''
                    }`}
                  >
                    {/* Active accent */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          layoutId="sidebar-accent"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          exit={{ scaleY: 0 }}
                          className="absolute left-0 top-2 bottom-2 w-1 bg-hutch-orange rounded-r-full"
                        />
                      )}
                    </AnimatePresence>

                    {/* Avatar */}
                    <div className="relative shrink-0 mt-0.5">
                      <img
                        src={cust.avatar}
                        alt={cust.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                      />
                      <span className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full ring-2 ring-white flex items-center justify-center ${
                        isResolved ? 'bg-emerald-500' : 'bg-hutch-orange'
                      }`}>
                        {isResolved
                          ? <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                          : <Zap className="w-2.5 h-2.5 text-white" />
                        }
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline gap-1 mb-0.5">
                        <span className={`text-[12.5px] font-bold truncate transition-colors ${isSelected ? 'text-hutch-orange' : 'text-slate-900 group-hover:text-hutch-orange'}`}>
                          {cust.name}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0 font-medium">{cust.ticket.loggedTime}</span>
                      </div>
                      
                      <div className="text-[11px] font-mono font-bold text-slate-500 mb-1">
                        {cust.id} · <span className="font-sans font-medium text-slate-600">{cust.customerType}</span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-snug break-words">
                        "{cust.ticket.text}"
                      </p>

                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        {isResolved ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> RESOLVED
                          </span>
                        ) : (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${meta.color}`}>
                            <AlertTriangle className="w-3 h-3" /> {meta.label}
                          </span>
                        )}
                        <span className="text-[11px] font-mono font-bold text-slate-700 ml-auto">
                          LKR {cust.affectedAmount.toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Telemetry KPI Widget ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="bg-dark-gradient rounded-2xl p-4 shadow-card-hover overflow-hidden relative border border-slate-800"
      >
        {/* Ambient glow inside card */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-hutch-orange/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-hutch-orange" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Live Telemetry</span>
          </div>
          <span className="text-[9px] font-bold bg-hutch-orange/20 text-hutch-orange px-2.5 py-0.5 rounded-full border border-hutch-orange/40">
            REAL-TIME
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {[
            { label: 'Avg Resolution', value: KPI_METRICS.avgResolutionTime, sub: `↓ ${KPI_METRICS.timeSavedPercent}`, subColor: 'text-emerald-400' },
            { label: 'First Contact Res.', value: KPI_METRICS.firstContactResolution, sub: '↑ +27.4% higher', subColor: 'text-emerald-400' },
            { label: 'AI Catch Rate', value: KPI_METRICS.anomalyDetectionRate, sub: 'Hybrid Rule+LLM', subColor: 'text-blue-400' },
            { label: 'Auto-Resolved', value: `${KPI_METRICS.autoReconciledToday}`, sub: `of ${KPI_METRICS.disputesHandledToday} today`, subColor: 'text-slate-300' },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.07 }}
              className="bg-white/5 border border-white/10 rounded-xl p-2.5 hover:bg-white/10 transition-colors"
            >
              <div className="text-[10.5px] text-slate-400 mb-0.5 leading-tight">{kpi.label}</div>
              <div className="text-base font-black text-white font-mono">{kpi.value}</div>
              <div className={`text-[10px] font-bold mt-0.5 ${kpi.subColor}`}>{kpi.sub}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </aside>
  );
}
