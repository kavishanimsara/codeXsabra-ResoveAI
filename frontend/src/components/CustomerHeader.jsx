import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Phone, MapPin, Calendar, Wallet, Radio, UserCheck, ChevronDown } from 'lucide-react';

export default function CustomerHeader({ customer, isResolved, liveBalance, scenarios = [], onSelectCustomer }) {
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
          {/* Customer Selection Dropdown */}
          {scenarios.length > 0 && onSelectCustomer && (
            <div className="relative">
              <select
                value={customer.id}
                onChange={e => onSelectCustomer(e.target.value)}
                className="appearance-none bg-black/50 hover:bg-black/70 text-white font-bold text-xs pl-3 pr-8 py-1.5 rounded-full border border-white/20 outline-none cursor-pointer transition-colors"
              >
                {scenarios.map(s => (
                  <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                    Select Customer: {s.id} ({s.customerType})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-white/80 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          )}

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

          {/* Left: Customer Identity (Name and Avatar removed) */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-hutch-gradient text-white flex items-center justify-center shadow-md shrink-0">
              <UserCheck className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Customer ID: {customer.id}
                </h1>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Line
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

        {/* Complaints List for this Customer */}
        {scenarios && customer && (
          (() => {
            const custComplaints = scenarios.filter(s => s.id === customer.id);
            if (custComplaints.length <= 1) return null;
            return (
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center gap-2 bg-slate-50/80 p-3 rounded-xl border border-slate-200/60">
                <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF5500]" />
                  Customer Complaints List ({custComplaints.length} Filed):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {custComplaints.map(c => {
                    const isActive = c.ticket.id === customer.ticket.id;
                    return (
                      <button
                        key={c.ticket.id}
                        onClick={() => onSelectCustomer(c.id, c.ticket.id)}
                        className={`text-[11px] font-mono font-bold px-3 py-1 rounded-lg border transition-all ${
                          isActive
                            ? 'bg-[#FF5500] text-white border-[#FF5500] shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Ticket #{c.ticket.id} ({c.ticket.category || 'Dispute'})
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })()
        )}

      </div>
    </motion.div>
  );
}
