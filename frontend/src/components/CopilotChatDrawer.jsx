import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Sparkles, X, MessageSquare } from 'lucide-react';
const PRESET_CHATS = [
  { sender: 'copilot', text: 'Hello! I am ResolvAI Copilot. How can I assist you in resolving this customer dispute today?' }
];

const QUICK_PROMPTS = [
  "Why was this customer billed twice?",
  "Data usage trend?",
  "Churn risk level?",
];

export default function CopilotChatDrawer({ customer }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(PRESET_CHATS);
  const [input, setInput] = useState('');

  const sendMsg = (text) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setMessages(prev => [...prev, { sender: 'agent', text: msg }]);
    setInput('');

    setTimeout(() => {
      const lower = msg.toLowerCase();
      let reply;
      if (lower.includes('twice') || lower.includes('duplicate')) {
        reply = `Customer ${customer.id} had 2 USSD transactions within 38s. Gateway ACK delay caused an unconfirmed retry deduction of LKR ${customer.affectedAmount.toFixed(2)}. Recommend instant refund.`;
      } else if (lower.includes('churn')) {
        reply = `Customer ${customer.id} has been a Hutch subscriber since ${customer.registrationDate}. Unresolved dispute raises churn probability to ~74%. Executing the 1-click resolution should restore trust rating to >95%.`;
      } else if (lower.includes('usage') || lower.includes('data')) {
        reply = `Customer ${customer.id} is on ${customer.planName}. Current usage: ${(customer.usage.totalDataMb / 1024).toFixed(2)} GB (${customer.usage.percentUsed.toFixed(0)}% of ${customer.usage.packageLimit} quota).`;
      } else {
        reply = `ResolvAI Copilot reviewed ${customer.id}: primary anomaly = ${customer.primaryAnomaly.replace('_', ' ')}. Confidence: ${(customer.confidenceScore * 100).toFixed(1)}%. Recommended action: "${customer.recommendedAction.label}".`;
      }
      setMessages(prev => [...prev, { sender: 'copilot', text: reply }]);
    }, 650);
  };

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 280, damping: 18 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setOpen(!open)}
        className="fixed right-6 bottom-6 z-50 btn-hutch h-14 px-5 rounded-full flex items-center justify-center gap-2.5 shadow-2xl"
        title={open ? "Close Copilot" : "Ask Copilot AI"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span 
              key="x" 
              initial={{ rotate: -90, opacity: 0 }} 
              animate={{ rotate: 0, opacity: 1 }} 
              exit={{ rotate: 90, opacity: 0 }}
              className="flex items-center gap-2"
            >
              <X className="w-5 h-5 text-white" />
              <span className="text-xs font-bold text-white tracking-wide">Close</span>
            </motion.span>
          ) : (
            <motion.span 
              key="b" 
              initial={{ rotate: 90, opacity: 0 }} 
              animate={{ rotate: 0, opacity: 1 }} 
              exit={{ rotate: -90, opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Bot className="w-5 h-5 text-white" />
              <span className="text-xs font-bold text-white tracking-wide">Ask Copilot AI</span>
            </motion.span>
          )}
        </AnimatePresence>

        {!open && (
          <span className="absolute inset-0 rounded-full ring-4 ring-hutch-orange/30 ping-ring pointer-events-none" />
        )}
      </motion.button>

      {/* Floating Chat Modal Panel - STRICTLY BOUNDED IN VIEWPORT */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            className="fixed right-4 sm:right-6 bottom-24 top-auto max-h-[calc(100vh-7.5rem)] w-[400px] max-w-[calc(100vw-2rem)] z-50 bg-white rounded-3xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden"
            style={{ height: 'min(580px, calc(100vh - 8rem))' }}
          >
            {/* Header - Fixed Height & High Contrast */}
            <div className="bg-[#111827] px-4 py-3.5 flex items-center justify-between shrink-0 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-hutch-gradient flex items-center justify-center shadow-hutch shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-white tracking-wide flex items-center gap-1.5">
                    ResolvAI Assistant
                    <span className="bg-[#FF5500] text-white text-[9px] font-bold px-1.5 py-0.2 rounded">L2</span>
                  </div>
                  <div className="text-[10.5px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Case {customer.id} · {customer.name}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Prompts Bar */}
            <div className="flex gap-1.5 px-3 py-2 overflow-x-auto shrink-0 bg-slate-50 border-b border-slate-200/80 scrollbar-none">
              {QUICK_PROMPTS.map(q => (
                <button
                  key={q}
                  onClick={() => sendMsg(q)}
                  className="text-[10.5px] font-bold bg-white hover:bg-orange-50 hover:text-hutch-orange text-slate-700 px-3 py-1 rounded-full border border-slate-200 shrink-0 transition-colors shadow-2xs"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Messages Container with Smooth Scroll */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFC]">
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex gap-2.5 ${m.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                  >
                    {m.sender === 'copilot' && (
                      <div className="w-6 h-6 rounded-lg bg-hutch-gradient flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <Bot className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[82%] text-xs leading-relaxed px-3.5 py-2.5 rounded-2xl ${
                      m.sender === 'agent'
                        ? 'bg-hutch-gradient text-white rounded-tr-xs shadow-sm font-medium'
                        : 'bg-white text-slate-800 rounded-tl-xs border border-slate-200/90 shadow-sm'
                    }`}>
                      {m.text}
                    </div>
                    {m.sender === 'agent' && (
                      <div className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 text-[9px] font-black">
                        AG
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Input Form */}
            <form
              onSubmit={e => { e.preventDefault(); sendMsg(); }}
              className="flex items-center gap-2 p-3 bg-white border-t border-slate-200 shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask Copilot about this case…"
                className="flex-1 text-xs bg-slate-100 hover:bg-slate-100 focus:bg-white px-4 py-2.5 rounded-full border border-transparent focus:border-hutch-orange outline-none transition-all placeholder:text-slate-400"
              />
              <motion.button
                whileTap={{ scale: 0.92 }}
                type="submit"
                className="w-9 h-9 btn-hutch rounded-full flex items-center justify-center shrink-0 shadow-md"
              >
                <Send className="w-4 h-4 text-white" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
