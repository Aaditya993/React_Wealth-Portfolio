// ============================================================
// src/components/layout/Sidebar.jsx
// Collapsible left navigation rail.
// ============================================================
import React from 'react';
import { 
  SquaresFour, Receipt, ArrowsLeftRight, Graph, Crosshair 
} from "@phosphor-icons/react";

const NAV_ITEMS = [
  { id: 'dashboard', icon: <SquaresFour size={20} weight="fill" />,  label: 'Overview',  tag: 'Dashboard'   },
  { id: 'ledger',    icon: <Receipt size={20} weight="fill" />,      label: 'Ledger',    tag: 'Transactions' },
  { id: 'trading',   icon: <ArrowsLeftRight size={20} weight="fill"/>,label: 'Trading',   tag: 'Orders'       },
  { id: 'network',   icon: <Graph size={20} weight="fill" />,        label: 'Network',   tag: 'Clearing'     },
  { id: 'advisor',   icon: <Crosshair size={20} weight="fill" />,    label: 'Advisor',   tag: 'Diversify'    },
];q

export function Sidebar({ activeView, onNavigate }) {
  return (
    <aside className="w-16 lg:w-56 bg-slate-900 border-r border-slate-700/50 flex flex-col h-screen sticky top-0 z-20 flex-shrink-0">

      {/* ── Logo ─────────────────────────────────────────── */}
      <div className="px-3 lg:px-5 py-5 border-b border-slate-700/50 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <img
            src="/finance logo.png"
            alt="App Logo"
            className="w-8 h-8 rounded-lg object-cover flex-shrink-0 shadow-lg shadow-cyan-500/20"
          />
          <div className="hidden lg:block">
            <p className="text-slate-100 font-bold text-sm leading-tight">Monato</p>
            <p className="text-cyan-400 text-[10px] font-bold tracking-[0.22em] uppercase mt-0.5">Wealth Suite</p>
          </div>
        </div>
      </div>

      {/* ── Navigation ───────────────────────────────────── */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(item => {
          const active = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={[
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium',
                'transition-all duration-150 group focus:outline-none focus:ring-1 focus:ring-cyan-500/40',
                active
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60',
              ].join(' ')}
            >
              {/* Icon */}
              <span className={`text-base flex-shrink-0 transition-colors ${active ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
                {item.icon}
              </span>

              {/* Label (hidden on narrow sidebar) */}
              <div className="hidden lg:flex lg:flex-col lg:items-start min-w-0 flex-1">
                <span className="leading-tight truncate">{item.label}</span>
                <span className="text-[10px] text-slate-500 leading-tight">{item.tag}</span>
              </div>

              {/* Active indicator */}
              {active && (
                <div className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </nav>

      {/* ── User footer ──────────────────────────────────── */}
      <div className="px-3 lg:px-4 py-4 border-t border-slate-700/50 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <img
            src="/user-avatar.png"
            alt="Alex Morgan Avatar"
            className="w-7 h-7 rounded-full object-cover flex-shrink-0 shadow-md"
          />
          <div className="hidden lg:block min-w-0">
            <p className="text-xs font-semibold text-slate-300 truncate">Alex Morgan</p>
            <p className="text-[10px] text-emerald-400 font-medium">Pro Account</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
