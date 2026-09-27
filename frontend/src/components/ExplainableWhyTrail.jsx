import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Search, Cpu, Lightbulb, CheckCircle2, ShieldCheck } from 'lucide-react';

const STAGE_ICONS = { DETECT: Search, ANALYZE: Cpu, DECIDE: Lightbulb, ACT: CheckCircle2 };
const STAGE_COLORS = {
  DETECT:  { ring: 'ring-red-300',     bg: 'bg-red-100',    text: 'text-red-600',     line: 'bg-red-200' },
  ANALYZE: { ring: 'ring-amber-300',   bg: 'bg-amber-100',  text: 'text-amber-600',   line: 'bg-amber-200' },
  DECIDE:  { ring: 'ring-indigo-300',  bg: 'bg-indigo-100', text: 'text-indigo-600',  line: 'bg-indigo-200' },
  ACT:     { ring: 'ring-emerald-300', bg: 'bg-emerald-100',text: 'text-emerald-600', line: 'bg-emerald-200' },
};

export default function ExplainableWhyTrail({ customer }) {
  const { whyTrail, confidenceScore, primaryAnomaly } = customer;

  const isNormal = primaryAnomaly === 'ALL_CHECKS_PASSED';

  return (
    <motion.div
      key={customer.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card rounded-2xl shadow-card p-5"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
              Explainable AI "Why" Reasoning
            </h3>
            <p className="text-[11px] text-slate-500">
              4-Stage Root-Cause Deduction · Hybrid Rule + LLM
            </p>
          </div>
        </div>

        {/* Confidence dial */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
        >
          <div className="relative w-8 h-8">
            <svg viewBox="0 0 36 36" className="w-8 h-8 -rotate-90">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#E5E7EB" strokeWidth="3" />
              <motion.circle
                cx="18" cy="18" r="15"
                fill="none"
                stroke={isNormal ? '#10B981' : '#FF5500'}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 15}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 15 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 15 * (1 - confidenceScore) }}
                transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
            </div>
          </div>
          <div>
            <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Confidence</div>
            <div className="text-sm font-black text-slate-900 font-mono leading-tight">
              {(confidenceScore * 100).toFixed(1)}%
            </div>
          </div>
        </motion.div>
      </div>

      {/* 4-Stage Timeline */}
      <div className="space-y-3">
        {whyTrail.map((step, idx) => {
          const Icon = STAGE_ICONS[step.stage] || BrainCircuit;
          const col = STAGE_COLORS[step.stage] || STAGE_COLORS.DETECT;
          const isLast = idx === whyTrail.length - 1;

          return (
            <motion.div
              key={`${customer.id}-${step.stage}`}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + idx * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex gap-3"
            >
              {/* Vertical connector */}
              {!isLast && (
                <div className={`absolute left-[18px] top-9 bottom-0 w-0.5 ${col.line} translate-x-px`} />
              )}

              {/* Icon bubble */}
              <motion.div
                whileHover={{ scale: 1.12, rotate: 5 }}
                className={`w-9 h-9 rounded-full ring-2 ${col.ring} ${col.bg} flex items-center justify-center shrink-0 shadow-sm z-10`}
              >
                <Icon className={`w-4 h-4 ${col.text}`} />
              </motion.div>

              {/* Card */}
              <motion.div
                whileHover={{ x: 2, boxShadow: '0 4px 16px -4px rgba(0,0,0,0.10)' }}
                className="stage-card flex-1 bg-slate-50/80 hover:bg-white border border-slate-200/80 rounded-xl p-3.5 transition-all duration-200 cursor-default"
              >
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-md border ${step.badgeColor}`}>
                    {step.stage}
                  </span>
                  <span className="text-[12px] font-bold text-slate-900">{step.title}</span>
                </div>
                <p className="text-[11.5px] text-slate-600 leading-relaxed">{step.detail}</p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
