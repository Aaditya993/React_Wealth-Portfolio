// ============================================================
// src/features/dashboard/InvestmentOverview.jsx
// Five KPI tiles driven by memoised metrics from context.
// ============================================================
import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

/** Single metric tile */
function MetricTile({ label, value, sub, accent = false, trend }) {
  const trendColor =
    trend === 'up'   ? 'text-emerald-400' :
    trend === 'down' ? 'text-rose-400'    : 'text-slate-400';

  return (
    <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-4 flex flex-col gap-1 hover:border-slate-600/80 transition-colors">
      <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">{label}</p>
      <p className={`text-2xl font-black tracking-tight tabular ${accent ? 'text-cyan-400' : 'text-slate-100'}`}>
        {value}
      </p>
      {sub && <p className={`text-xs font-semibold mt-0.5 ${trendColor}`}>{sub}</p>}
    </div>
  );
}

export function InvestmentOverview() {
  const { metrics } = usePortfolio();
  const { totalValue, totalEquity, cash, totalGainAmt, totalGainPct, dailyChange, dailyChangePct } = metrics;

  // Formatters
  const fUSD = n => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
  const fDelta = n => `${n >= 0 ? '+' : ''}${fUSD(n)}`;
  const fPct   = n => `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`;

  const tiles = [
    {
      label: 'Total Portfolio Value',
      value: fUSD(totalValue),
      sub:   'Equity + Cash',
      accent: true,
    },
    {
      label: 'Equity Value',
      value: fUSD(totalEquity),
      sub:   `${fPct(totalGainPct)} all-time return`,
      trend: totalGainPct >= 0 ? 'up' : 'down',
    },
    {
      label: 'Unrealised Gain / Loss',
      value: fDelta(totalGainAmt),
      sub:   'vs. average cost basis',
      trend: totalGainAmt >= 0 ? 'up' : 'down',
    },
    {
      label: "Today's P&L",
      value: fDelta(dailyChange),
      sub:   fPct(dailyChangePct) + ' day change',
      trend: dailyChange >= 0 ? 'up' : 'down',
    },
    {
      label: 'Cash & Equivalents',
      value: fUSD(cash),
      sub:   `${((cash / totalValue) * 100).toFixed(1)}% of portfolio`,
    },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-5 gap-3">
      {tiles.map(t => <MetricTile key={t.label} {...t} />)}
    </div>
  );
}
