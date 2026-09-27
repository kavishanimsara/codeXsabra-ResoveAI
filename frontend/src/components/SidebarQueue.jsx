import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, AlertTriangle, CheckCircle2, Clock,
  Zap, Activity, Sparkles
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
  show: { transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  show:   { opacity: 1, x: 0, transition: { ease: [0.16, 1, 0.3, 1], duration: 0.3 } },
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
    <aside className="w-full lg:w-[320px] xl:w-[350px] shrink-0 lg:sticky lg:top-20 flex flex-col">

      {/* ── Continuous Full-Height Queue Card ── */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card rounded-2xl shadow-card overflow-hidden bg-white border border-slate-200 flex flex-col lg:h-[calc(100vh-6rem)]"
      >
        {/* Header */}
        <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900 leading-tight">Priority Queue</h2>
              <span className="text-[10px] text-slate-400 font-semibold">Incoming Complaints</span>
            </div>
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
        <div className="flex gap-1.5 px-3 py-2.5 border-b border-slate-100 overflow-x-auto scrollbar-none shrink-0 bg-slate-50/50">
          {FILTERS.map(f => (
            <motion.button
              key={f.id}
              whileTap={{ scale: 0.93 }}
              onClick={() => setActiveFilter(f.id)}
              className={`text-[11px] font-bold px-3 py-1.5 rounded-full shrink-0 transition-all duration-200 ${
                activeFilter === f.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100'
              }`}
            >
              {f.label}
            </motion.button>
          ))}
        </div>

        {/* Ticket Feed — Extends all the way down */}
        <div className="flex-1 overflow-y-auto min-h-0">
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
                      isSelected ? 'bg-orange-50/90' : ''
                    }`}
                  >
                    {/* Active accent bar */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          layoutId="sidebar-accent"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          exit={{ scaleY: 0 }}
                          className="absolute left-0 top-2 bottom-2 w-1.5 bg-[#FF5500] rounded-r-full"
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
                        isResolved ? 'bg-emerald-500' : 'bg-[#FF5500]'
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
                        <span className={`text-[12.5px] font-bold truncate transition-colors ${isSelected ? 'text-[#FF5500]' : 'text-slate-900 group-hover:text-[#FF5500]'}`}>
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

        {/* ── Integrated Compact Telemetry Footer ── */}
        <div className="p-3 bg-[#111827] text-white border-t border-slate-800 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-[#FF5500]" /> Telemetry
            </span>
            <span className="text-[9px] font-bold bg-[#FF5500]/20 text-[#FF5500] px-2 py-0.5 rounded-full border border-[#FF5500]/30">
              REAL-TIME
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 text-center">
            <div className="bg-white/5 rounded-lg p-1.5 border border-white/5">
              <div className="text-[9px] text-slate-400 font-medium">Avg FCR</div>
              <div className="text-xs font-black text-white font-mono mt-0.5">{KPI_METRICS.firstContactResolution}</div>
            </div>
            <div className="bg-white/5 rounded-lg p-1.5 border border-white/5">
              <div className="text-[9px] text-slate-400 font-medium">Speed</div>
              <div className="text-xs font-black text-emerald-400 font-mono mt-0.5">{KPI_METRICS.avgResolutionTime}</div>
            </div>
            <div className="bg-white/5 rounded-lg p-1.5 border border-white/5">
              <div className="text-[9px] text-slate-400 font-medium">AI Catch</div>
              <div className="text-xs font-black text-blue-400 font-mono mt-0.5">{KPI_METRICS.anomalyDetectionRate}</div>
            </div>
            <div className="bg-white/5 rounded-lg p-1.5 border border-white/5">
              <div className="text-[9px] text-slate-400 font-medium">Auto-Res</div>
              <div className="text-xs font-black text-white font-mono mt-0.5">{KPI_METRICS.autoReconciledToday}</div>
            </div>
          </div>
        </div>

      </motion.div>

    </aside>
  );
}
