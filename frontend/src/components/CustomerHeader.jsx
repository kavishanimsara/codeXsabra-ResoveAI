import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Phone, MapPin, Calendar, Wallet, Radio } from 'lucide-react';

export default function CustomerHeader({ customer, isResolved, liveBalance }) {
  return (
    <motion.div
      key={customer.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl shadow-card overflow-hidden bg-white border border-slate-200"
    >
      {/* Cover Banner with Hutch Branding */}
      <div className="h-16 sm:h-20 bg-gradient-to-r from-[#111827] via-[#1E242B] to-[#FF5500]/80 relative px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-white/90 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
            Customer Profile &amp; Verification
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 flex items-center gap-1.5 shadow-sm">
            <Radio className="w-3 h-3 text-[#FF5500] animate-pulse" />
            HLR Active
          </span>
        </div>

        {/* Resolved Banner Overlay */}
        {isResolved && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-emerald-950/70 backdrop-blur-sm flex items-center justify-center z-10"
          >
            <span className="bg-emerald-500 text-white text-xs font-extrabold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-emerald-400">
              <ShieldCheck className="w-4 h-4" /> DISPUTE RESOLVED
            </span>
          </motion.div>
        )}
      </div>

      {/* Profile Details Container - Clean Flow, ZERO Negative Margins */}
      <div className="p-5 sm:p-6 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-5 border-b border-slate-100">

          {/* Left: Avatar + Customer Identity */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <img
                src={customer.avatar}
                alt={customer.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-slate-200 shadow-md bg-slate-50"
              />
              <span 
                className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full ring-2 ring-white shadow-sm"
                title="Active Account"
              />
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {customer.name}
                </h1>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified
                </span>
                <span className="bg-slate-100 text-slate-800 text-xs font-mono font-bold px-2.5 py-0.5 rounded-md border border-slate-200">
                  {customer.id}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 mt-2">
                <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <Phone className="w-3.5 h-3.5 text-[#FF5500]" /> {customer.phone}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {customer.region}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Joined {customer.registrationDate}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Live Available Balance Card */}
          <motion.div
            key={liveBalance}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-3.5 bg-emerald-50/90 border border-emerald-200/90 px-4 py-3 rounded-2xl shadow-sm shrink-0 self-start sm:self-auto"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/20">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Available Balance
              </div>
              <div className={`text-xl font-black font-mono leading-tight mt-0.5 ${liveBalance >= 0 ? 'text-emerald-700' : 'text-red-500'}`}>
                LKR {liveBalance.toFixed(2)}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Attributes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Account Type
            </span>
            <span className="text-xs font-bold text-slate-800 block mt-1">
              {customer.customerType} Account
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Active Tariff Plan
            </span>
            <span className="text-xs font-bold text-slate-800 truncate block mt-1" title={customer.planName}>
              {customer.planName}
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Preferred Channel
            </span>
            <span className="text-xs font-bold text-slate-800 block mt-1">
              {customer.preferredChannel}
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Resolution Status
            </span>
            <span className={`text-xs font-extrabold truncate block mt-1 ${isResolved ? 'text-emerald-600' : 'text-[#FF5500]'}`}>
              {isResolved ? '● Resolved (Receipt Issued)' : '● Pending Copilot Action'}
            </span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
