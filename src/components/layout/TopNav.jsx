// ============================================================
// src/components/layout/TopNav.jsx
// Sticky top bar showing page title, market status, and date.
// ============================================================
import React from 'react';

const VIEW_META = {
  dashboard: { title: 'Investment Overview',     sub: 'Portfolio snapshot & asset holdings'                  },
  ledger:    { title: 'Money Change Log',        sub: 'Transaction history with stack-based undo / redo'     },
  trading:   { title: 'Trade Submission Queue',  sub: 'FIFO order queue and global ticker search'            },
  network:   { title: 'Clearing Network',        sub: 'Settlement workflow & safe transfer pathfinder'       },
  advisor:   { title: 'Diversification Advisor', sub: 'Risk-based portfolio rebalancing suggestions'         },
};

export function TopNav({ view }) {
  const { title, sub } = VIEW_META[view] ?? VIEW_META.dashboard;
  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <header className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 px-6 py-3.5 flex items-center justify-between flex-shrink-0">
      {/* Page identity */}
      <div>
        <h1 className="text-sm font-bold text-slate-100 tracking-wide">{title}</h1>
        <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
      </div>

      {/* Status cluster */}
      <div className="flex items-center gap-4">
        {/* Live market pulse */}
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">Markets Open</span>
        </div>
        {/* Date */}
        <span className="text-xs text-slate-500 hidden md:block tabular">{dateStr}</span>
      </div>
    </header>
  );
}
