import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Receipt, ShieldCheck, Copy, Check, Send, Smartphone } from 'lucide-react';

export default function TrustReceiptModal({ customer, isOpen, onClose }) {
  const [lang, setLang] = useState('EN');
  const [copied, setCopied] = useState(false);
  const [dispatched, setDispatched] = useState(false);

  if (!isOpen) return null;

  const receiptId = `HTC-REC-${customer.id}-9942`;
  const ts = new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  const SMS_EN = `Dear Hutch Customer (${customer.id}), your billing dispute has been resolved! Action: ${customer.recommendedAction.label}. Credit: LKR ${customer.affectedAmount.toFixed(2)}. Safeguard: USSD Idempotency Filter active. Trust Receipt: #${receiptId}. Thank you!`;
  const SMS_SI = `හිතවත් Hutch පාරිභෝගිකයිනි (${customer.id}), ඔබගේ ගිණුම් ගැටලුව විසඳන ලදී! සිදු කළ ක්‍රියාව: ${customer.recommendedAction.label}. බැර කළ මුදල: LKR ${customer.affectedAmount.toFixed(2)}. රිසිට්: #${receiptId}. Hutch සමඟ රැඳීම ගැන ස්තූතියි!`;
  const smsText = lang === 'EN' ? SMS_EN : SMS_SI;

  const handleCopy = () => {
    navigator.clipboard.writeText(smsText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };
  const handleDispatch = () => {
    setDispatched(true);
    setTimeout(() => setDispatched(false), 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="receipt-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm"
        >
          {/* ── 3D Flip Card Container ── */}
          <motion.div
            key="receipt-modal"
            initial={{ rotateY: -90, opacity: 0, scale: 0.92 }}
            animate={{ rotateY: 0, opacity: 1, scale: 1 }}
            exit={{ rotateY: 90, opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 240, damping: 22 }}
            onClick={e => e.stopPropagation()}
            className="preserve-3d backface-hidden w-full max-w-[480px] max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200 relative"
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors z-20"
            >
              <X className="w-4 h-4" />
            </motion.button>

            {/* Header */}
            <div className="bg-dark-gradient text-white p-6 pb-5 rounded-t-3xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-hutch-orange text-white flex items-center justify-center text-xs font-black">H</span>
                <span className="font-extrabold text-sm tracking-widest text-hutch-orange uppercase">Hutch Digital Trust Receipt</span>
                <span className="ml-auto mr-6 text-[9px] font-bold bg-white/10 px-2 py-0.5 rounded text-slate-300 border border-white/10">Track A.1.2</span>
              </div>
              <h2 className="text-xl font-black text-white tracking-tight">Transparent Adjustment</h2>
              <p className="text-xs text-slate-400 mt-0.5">Customer-facing audit receipt — what happened &amp; safeguards applied.</p>
            </div>

            {/* Receipt Body */}
            <div className="p-5">

              {/* Paper Receipt */}
              <motion.div
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-5 receipt-perforation shadow-sm mb-4"
              >
                {/* Stamp */}
                <div className="text-center pb-4 border-b border-dashed border-slate-200 mb-4">
                  <div className="text-[10px] font-mono font-bold text-slate-400 tracking-widest">
                    RECEIPT · {receiptId}
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-1">HUTCH SRI LANKA (PVT) LTD</div>
                  <div className="text-[11px] text-slate-500">Core Billing Mediation · AI Resolution Audit</div>
                </div>

                {/* Line items */}
                <div className="space-y-2.5 text-xs">
                  {[
                    ['Customer ID',       customer.id],
                    ['Issue Detected',    customer.primaryAnomaly.replace('_', ' ')],
                    ['Action Executed',   customer.recommendedAction.label],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center gap-2">
                      <span className="text-slate-500">{k}:</span>
                      <span className="font-semibold text-slate-800 text-right">{v}</span>
                    </div>
                  ))}

                  <div className="flex justify-between items-center pt-3 border-t border-slate-100 mt-2">
                    <span className="text-sm font-bold text-slate-700">Account Credit:</span>
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
                      className="text-xl font-black text-emerald-600 font-mono"
                    >
                      + LKR {customer.affectedAmount.toFixed(2)}
                    </motion.span>
                  </div>
                </div>

                {/* Safeguard */}
                <div className="mt-4 pt-3 border-t border-dashed border-slate-200 bg-orange-50/70 rounded-xl p-3 border border-orange-200/50">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-hutch-orange uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Technical Safeguard Applied
                  </div>
                  <p className="text-[11px] text-slate-700 leading-snug">
                    USSD transaction idempotency filter (TTL: 120s) applied to billing gateway switch — prevents duplicate charging on mobile retries.
                  </p>
                </div>

                {/* Footer seal */}
                <div className="mt-4 pt-3 border-t border-dashed border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>Issued: {ts}</span>
                  <span className="flex items-center gap-1 text-emerald-600 font-bold">
                    <ShieldCheck className="w-3 h-3" /> VERIFIED GENUINE
                  </span>
                </div>
              </motion.div>

              {/* SMS Notification */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <Smartphone className="w-4 h-4 text-hutch-orange" /> Customer SMS Preview
                  </div>
                  {/* Language pills */}
                  <div className="flex bg-slate-100 p-0.5 rounded-full text-[11px] font-bold">
                    {[['EN', 'English'], ['SI', 'සිංහල']].map(([id, label]) => (
                      <motion.button
                        key={id}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => setLang(id)}
                        className={`px-2.5 py-0.5 rounded-full transition-all ${lang === id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                      >
                        {label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={lang}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="bg-slate-100 rounded-xl p-3 text-xs text-slate-700 leading-relaxed border border-slate-200 mb-3"
                  >
                    {smsText}
                  </motion.div>
                </AnimatePresence>

                <div className="flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={handleCopy}
                    className="flex-1 py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <AnimatePresence mode="wait">
                      {copied
                        ? <motion.span key="c" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1 text-emerald-600"><Check className="w-3.5 h-3.5" /> Copied!</motion.span>
                        : <motion.span key="n" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1"><Copy className="w-3.5 h-3.5" /> Copy</motion.span>
                      }
                    </AnimatePresence>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleDispatch}
                    disabled={dispatched}
                    className="flex-1 py-2.5 px-3 btn-hutch text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <AnimatePresence mode="wait">
                      {dispatched
                        ? <motion.span key="d" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Sent!</motion.span>
                        : <motion.span key="s" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1"><Send className="w-3.5 h-3.5" /> Send SMS</motion.span>
                      }
                    </AnimatePresence>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
