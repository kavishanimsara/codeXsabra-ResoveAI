import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, CheckCircle2, Receipt, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ActionCenter({ customer, isResolved, onResolve, onOpenReceipt }) {
  const { recommendedAction, affectedAmount } = customer;

  const handleExecute = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.55 },
      colors: ['#FF5500', '#10B981', '#FBBF24', '#6366F1'],
    });
    onResolve(customer.id, affectedAmount);
  };

  return (
    <motion.div
      key={customer.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl border-2 border-hutch-orange/30 bg-gradient-to-br from-orange-50/70 via-white to-amber-50/40 shadow-card p-5"
    >
      {/* Ambient glow */}
      <div className="absolute -top-8 -right-8 w-40 h-40 bg-hutch-orange/12 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-hutch-gradient flex items-center justify-center shadow-hutch shrink-0">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">1-Click Resolution Hub</h3>
            <p className="text-[11px] text-slate-500">Copilot Auto-Decisioning · Instant Account Reconcile</p>
          </div>
        </div>

        <AnimatePresence>
          {isResolved && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300 shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> DISPUTE RESOLVED
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Recommended Action Card */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-4 mb-4">
        <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap">
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-extrabold text-hutch-orange uppercase tracking-wider block">
              Copilot Recommendation
            </span>
            <h4 className="text-base font-extrabold text-slate-900 mt-1 leading-snug break-words">
              {recommendedAction.label}
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed break-words">
              {recommendedAction.description}
            </p>
          </div>
          
          <motion.div
            key={affectedAmount}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-right shrink-0 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 self-start"
          >
            <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Adjustment</div>
            <div className="text-lg font-black text-slate-900 font-mono leading-tight mt-0.5 whitespace-nowrap">
              LKR {affectedAmount.toFixed(2)}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Action Buttons */}
      <AnimatePresence mode="wait">
        {!isResolved ? (
          <motion.div
            key="actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleExecute}
              className="btn-hutch flex-1 py-3 px-5 rounded-xl text-white font-extrabold text-sm flex items-center justify-center gap-2 group shadow-md"
            >
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>Approve & Execute Instant Resolution</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => alert(`Case ${customer.id} escalated to L3 Tech Ops.`)}
              className="sm:w-auto py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors shrink-0"
            >
              Escalate L3
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="resolved"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-3.5"
          >
            <div className="flex items-center gap-2.5">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shrink-0"
              >
                <CheckCircle2 className="w-5 h-5" />
              </motion.div>
              <div>
                <div className="text-xs font-bold text-emerald-900 leading-tight">
                  Resolution Executed Successfully
                </div>
                <div className="text-[11px] text-emerald-700 mt-0.5">
                  Account credited · Trust Receipt &amp; SMS dispatched to {customer.phone}
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenReceipt}
              className="w-full sm:w-auto py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm shrink-0 transition-colors"
            >
              <Receipt className="w-3.5 h-3.5" />
              View Trust Receipt
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
