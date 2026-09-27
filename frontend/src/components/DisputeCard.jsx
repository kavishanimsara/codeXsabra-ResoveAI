import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquareQuote, Clock, Tag, AlertCircle } from 'lucide-react';

export default function DisputeCard({ ticket, affectedAmount }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl border border-orange-200/80 bg-gradient-to-br from-orange-50/80 via-white/80 to-amber-50/50 shadow-card p-5"
    >
      {/* Decorative ambient blur */}
      <div className="absolute -right-6 -top-6 w-32 h-32 bg-hutch-orange/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-hutch-gradient text-white flex items-center justify-center shadow-hutch shrink-0">
            <MessageSquareQuote className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-700">
              Live Customer Complaint
            </span>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 mt-0.5">
              <span className="font-mono font-bold text-slate-700">{ticket.id}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-600">
                <Clock className="w-3 h-3 text-slate-400" />{ticket.loggedTime}
              </span>
              <span>•</span>
              <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-orange-200">
                via {ticket.channel}
              </span>
            </div>
          </div>
        </div>

        <motion.span
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-1.5 bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-xl border border-red-200 shadow-sm shrink-0"
        >
          <AlertCircle className="w-3.5 h-3.5" />
          Dispute · LKR {affectedAmount.toFixed(2)}
        </motion.span>
      </div>

      {/* Quote Bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.35 }}
        className="bg-white/95 border border-orange-100/90 rounded-xl px-4 py-3.5 shadow-sm mb-3"
      >
        <p className="text-sm font-semibold italic text-slate-800 leading-relaxed break-words">
          "{ticket.text}"
        </p>
      </motion.div>

      {/* Footer Category & Ground Truth */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs">
        <span className="flex items-center gap-1.5 text-slate-600">
          <Tag className="w-3.5 h-3.5 text-hutch-orange" />
          Category: <strong className="text-slate-800 ml-1">{ticket.category}</strong>
        </span>
        <span className="bg-amber-50 text-amber-900 border border-amber-200/80 px-2.5 py-1 rounded-lg font-medium text-[11px] leading-tight">
          Historical Ground Truth: <strong className="font-semibold">{ticket.groundTruth}</strong>
        </span>
      </div>
    </motion.div>
  );
}
