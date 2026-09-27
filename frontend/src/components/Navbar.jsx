import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, RefreshCw, Zap, ChevronDown } from 'lucide-react';

export default function Navbar({ searchQuery, setSearchQuery, isLiveApi, setIsLiveApi, onReset }) {
  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-sm"
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <motion.div
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl bg-hutch-gradient flex items-center justify-center shadow-hutch font-black text-white text-xl select-none"
          >
            H
          </motion.div>
          <div className="leading-none">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">HUTCH</span>
              <span className="bg-hutch-gradient text-white text-[11px] font-bold px-2.5 py-0.5 rounded-lg shadow-hutch">
                ResolvAI
              </span>
            </div>
            <span className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase">
              IgnitX · Track A · Resolution Copilot
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-lg hidden md:block">
          <div className="relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-hutch-orange transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by customer ID, phone, or ticket…"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-sm placeholder:text-slate-400 rounded-2xl border border-transparent focus:border-hutch-orange focus:ring-3 focus:ring-hutch-orange/15 outline-none transition-all duration-200 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-lg leading-none"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">

          {/* Mode Toggle */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsLiveApi(!isLiveApi)}
            className={`hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold border transition-all duration-300 ${
              isLiveApi
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${isLiveApi ? 'bg-emerald-400 animate-ping' : 'bg-slate-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isLiveApi ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
            </span>
            {isLiveApi ? 'FastAPI Connected' : 'Standalone Engine'}
          </motion.button>

          {/* Reset */}
          <motion.button
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.35 }}
            onClick={onReset}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            title="Reset demo data"
          >
            <RefreshCw className="w-4 h-4" />
          </motion.button>

          {/* Bell */}
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Bell className="w-5 h-5" />
            </motion.button>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-hutch-orange rounded-full ring-2 ring-white" />
          </div>

          <div className="w-px h-6 bg-slate-200 mx-1" />

          {/* Agent Avatar */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80"
                alt="Agent"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-hutch-orange/30 shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-slate-900 leading-tight">Agent #4028</div>
              <div className="text-[10px] font-semibold text-emerald-600">L2 Support · Online</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </motion.div>

        </div>
      </div>
    </motion.header>
  );
}
