import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Receipt, Wifi, Terminal, CheckCircle2, AlertTriangle, Database } from 'lucide-react';

const TABS = [
  { id: 'TRANSACTIONS', label: 'Transactions Ledger', icon: Receipt },
  { id: 'USAGE',        label: 'Usage & Quota',       icon: Wifi },
  { id: 'LOGS',         label: 'Mediation Logs',      icon: Terminal },
];

export default function MultiSourceTimeline({ customer }) {
  const [activeTab, setActiveTab] = useState('TRANSACTIONS');
  const { transactions, usage } = customer;
  const pctUsed = Math.min(usage.percentUsed, 100);

  return (
    <motion.div
      key={customer.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.28, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card rounded-2xl shadow-card overflow-hidden"
    >
      {/* Header + Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-5 pt-4 pb-0 border-b border-slate-100">
        <div className="flex items-center gap-2 mb-3">
          <Database className="w-4 h-4 text-hutch-orange" />
          <h3 className="text-sm font-bold text-slate-900">Multi-Source Ingestion</h3>
        </div>
        <div className="flex gap-0.5 mb-0 overflow-x-auto">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-1.5 px-3.5 py-2.5 text-[11px] font-bold border-b-2 transition-all -mb-px whitespace-nowrap ${
                  active ? 'border-hutch-orange text-hutch-orange' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
                {active && (
                  <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-hutch-orange" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">

        {/* ─── Tab: Transactions ─── */}
        {activeTab === 'TRANSACTIONS' && (
          <motion.div
            key="tx"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="overflow-x-auto p-4"
          >
            <table className="w-full text-left text-[11.5px] min-w-[640px]">
              <thead>
                <tr className="text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  {['Transaction ID', 'Time', 'Type', 'Amount', 'Method', 'Balance', 'Status'].map(h => (
                    <th key={h} className="pb-2 pr-4 last:pr-0 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/70">
                {transactions.map((tx, i) => (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className={`transition-colors ${tx.isAnomaly ? 'bg-red-50/60 hover:bg-red-50' : 'hover:bg-slate-50/70'}`}
                  >
                    <td className="py-2.5 pr-4 font-mono font-bold text-slate-800">{tx.id}</td>
                    <td className="py-2.5 pr-4 text-slate-500 whitespace-nowrap">{tx.time}</td>
                    <td className="py-2.5 pr-4 font-semibold text-slate-800">{tx.type}</td>
                    <td className="py-2.5 pr-4 font-black font-mono text-slate-900">LKR {tx.amount.toFixed(2)}</td>
                    <td className="py-2.5 pr-4">
                      <span className="bg-slate-100 px-2 py-0.5 rounded-lg text-slate-600 text-[11px]">{tx.method}</span>
                    </td>
                    <td className="py-2.5 pr-4 font-mono text-[11px] text-slate-500">
                      {tx.balanceBefore.toFixed(0)} → <span className="font-bold text-slate-800">{tx.balanceAfter.toFixed(0)}</span>
                    </td>
                    <td className="py-2.5">
                      {tx.isAnomaly ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200 whitespace-nowrap">
                          <AlertTriangle className="w-2.5 h-2.5" />{tx.tag}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
                          <CheckCircle2 className="w-2.5 h-2.5" />{tx.tag}
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* ─── Tab: Usage ─── */}
        {activeTab === 'USAGE' && (
          <motion.div
            key="usage"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="p-5"
          >
            {/* Metric chips */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'Data Used',  value: `${(usage.totalDataMb / 1024).toFixed(2)} GB`, limit: usage.packageLimit },
                { label: 'Voice',      value: `${usage.voiceMin} min` },
                { label: 'SMS',        value: `${usage.sms} messages` },
              ].map(({ label, value, limit }) => (
                <div key={label} className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">{label}</span>
                  <div className="text-base font-black text-slate-900 font-mono mt-0.5">{value}</div>
                  {limit && <div className="text-[10px] text-slate-500 mt-0.5">Included: {limit}</div>}
                </div>
              ))}
            </div>

            {/* 3D-feel animated progress bar */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-slate-700">Data Quota Consumption</span>
                <span className={usage.percentUsed > 100 ? 'text-red-600' : 'text-hutch-orange'}>
                  {usage.percentUsed.toFixed(1)}% used
                </span>
              </div>
              {/* Track */}
              <div className="relative h-4 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                {/* Striped overlay for 3D depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full pointer-events-none z-10" />
                <motion.div
                  className={`h-full rounded-full ${usage.percentUsed > 100 ? 'bg-gradient-to-r from-hutch-orange to-red-500' : 'bg-hutch-gradient'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${pctUsed}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
                />
              </div>
              {usage.percentUsed > 100 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[11px] text-red-600 font-semibold mt-2 flex items-center gap-1"
                >
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  Exceeded bundle by {((usage.totalDataMb - usage.quotaMb) / 1024).toFixed(2)} GB — PAYG rate applied.
                </motion.p>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── Tab: Logs ─── */}
        {activeTab === 'LOGS' && (
          <motion.div
            key="logs"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="bg-slate-950 rounded-b-2xl overflow-x-auto"
          >
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-800">
              {['#EF4444','#F59E0B','#10B981'].map(c => (
                <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
              ))}
              <span className="text-[10px] text-slate-500 font-mono ml-1">hutch-mediation-cdrd · session #{customer.id}</span>
            </div>
            <div className="px-4 py-3 space-y-1 font-mono text-[11px] leading-5">
              {[
                { c: 'text-slate-400',  t: `[HLR_AUTH]  IMSI:413020089201 · status:AUTHENTICATED · region:${customer.region}` },
                { c: 'text-slate-400',  t: `[USSD_GW]   String '*123#' received from ${customer.phone}` },
                { c: 'text-blue-400',   t: `[OCS_DEBIT] LKR ${customer.affectedAmount.toFixed(2)} authorised · tariff:${customer.planId}` },
                { c: 'text-amber-400',  t: '[USSD_RETRY] Re-transmission without previous session teardown (Δ38s)' },
                { c: 'text-red-400',    t: `[ANOMALY]   ⚠  Discrepancy flag → ${customer.primaryAnomaly}` },
                { c: 'text-emerald-400',t: '[COPILOT]   ✓  Registered in ResolvAI Priority Queue → Confidence 98.4%' },
              ].map(({ c, t }, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className={c}
                >
                  {t}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  );
}
