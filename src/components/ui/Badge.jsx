// ============================================================
// src/components/ui/Badge.jsx
// Coloured pill label for statuses and transaction types.
// ============================================================
import React from 'react';

/**
 * @param {string} variant  default | success | danger | warning | info | buy | sell
 * @param {string} size     xs | sm | md
 */
export function Badge({ children, variant = 'default', size = 'sm' }) {
  const variants = {
    default: 'bg-slate-700 text-slate-300',
    success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    danger:  'bg-rose-500/15 text-rose-400 border border-rose-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    info:    'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30',
    buy:     'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    sell:    'bg-rose-500/20 text-rose-300 border border-rose-500/30',
  };

  const sizes = {
    xs: 'text-[10px] px-1.5 py-0.5 leading-none',
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
  };

  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${variants[variant] ?? variants.default} ${sizes[size] ?? sizes.sm}`}>
      {children}
    </span>
  );
}
