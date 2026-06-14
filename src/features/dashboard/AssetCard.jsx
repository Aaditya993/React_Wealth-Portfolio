// ============================================================
// src/features/dashboard/AssetCard.jsx
// Single row card for one equity holding.
// ============================================================
import React from 'react';
import { Badge } from '../../components/ui/Badge';

export function AssetCard({ holding }) {
  const { id, name, sector, qty, avgCost, currentPrice, change } = holding;

  const totalValue = qty * currentPrice;
  const gainAmt = (currentPrice - avgCost) * qty;
  const gainPct = ((currentPrice - avgCost) / avgCost) * 100;
  const isUp = change >= 0;

  const fUSD = n => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

  return (
    <div className="flex items-center justify-between px-4 py-2.5 rounded-lg border border-transparent hover:bg-slate-700/30 hover:border-slate-700/40 transition-all duration-150 group">

      {/* Left: avatar + symbol + name */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm">
          <img
            src={`/logos/${id}.png`}
            alt={`${id} logo`}
            className="w-full h-full object-contain p-1"
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-100 truncate">{id}</p>
          <p className="text-xs text-slate-500 truncate">{name}</p>
        </div>
      </div>

      {/* Right: metrics cluster */}
      <div className="flex items-center gap-4 lg:gap-6 text-right flex-shrink-0">
        <div className="hidden sm:block">
          <p className="text-[10px] text-slate-500 uppercase tracking-wide">Qty</p>
          <p className="text-sm text-slate-200 font-mono">{qty}</p>
        </div>
        <div className="hidden md:block">
          <p className="text-[10px] text-slate-500 uppercase tracking-wide">Price</p>
          <p className="text-sm text-slate-200 font-mono">{fUSD(currentPrice)}</p>
        </div>
        <div className="hidden lg:block">
          <p className="text-[10px] text-slate-500 uppercase tracking-wide">Gain / Loss</p>
          <p className={`text-sm font-semibold font-mono ${gainAmt >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {gainAmt >= 0 ? '+' : ''}{fUSD(gainAmt)}{' '}
            <span className="text-[10px]">({gainPct >= 0 ? '+' : ''}{gainPct.toFixed(1)}%)</span>
          </p>
        </div>
        <div>
          <p className="text-[10px] text-slate-500 uppercase tracking-wide">Value</p>
          <p className="text-sm font-bold text-slate-100 font-mono">{fUSD(totalValue)}</p>
        </div>
        <Badge variant={isUp ? 'success' : 'danger'} size="xs">
          {isUp ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
        </Badge>
      </div>
    </div>
  );
}
