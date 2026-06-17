// ============================================================
// src/features/advisor/DiversificationCalculator.jsx
// Computes sector exposure vs ideal and generates trades.
// Feature (h): Diversification Helper
// ============================================================
import React, { useState, useMemo } from 'react';
import { usePortfolio }   from '../../context/PortfolioContext';
import { IDEAL_ALLOCATIONS, SECTOR_REPS, GLOBAL_TICKERS } from '../../data/mockData';
import { RiskSelector }   from './RiskSelector';
import { Card }   from '../../components/ui/Card';
import { Badge }  from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ShieldCheck, RocketLaunch } from "@phosphor-icons/react";

// ── Allocation bar component ─────────────────────────────────
function AllocationBar({ label, currentPct, idealPct, diff }) {
  const abs    = Math.abs(diff);
  const over   = diff > 0;
  const onTrack = abs <= 1.5;

  const barGradient = onTrack
    ? 'from-emerald-500 to-emerald-400'
    : over
      ? 'from-rose-500 to-orange-400'
      : 'from-amber-500 to-yellow-400';

  return (
    <div className="space-y-1.5">
      {/* Label row */}
      <div className="flex items-center justify-between text-xs flex-wrap gap-1">
        <span className="text-slate-300 font-semibold w-24 flex-shrink-0">{label}</span>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <span className="text-slate-400 font-mono tabular">{currentPct.toFixed(1)}%</span>
          <span className="text-slate-600">vs {idealPct}% ideal</span>
          {onTrack
            ? <Badge variant="success" size="xs">✓ On target</Badge>
            : <Badge variant={over ? 'danger' : 'warning'} size="xs">
                {over ? '▲' : '▼'} {abs.toFixed(1)}%
              </Badge>
          }
        </div>
      </div>

      {/* Bar track */}
      <div className="h-2.5 bg-slate-700/60 rounded-full relative overflow-visible">
        {/* Filled portion */}
        <div
          className={`h-full rounded-full bg-gradient-to-r ${barGradient} transition-all duration-700`}
          style={{ width: `${Math.min(currentPct, 100)}%` }}
        />
        {/* Target marker (cyan vertical line) */}
        <div
          className="absolute top-0 bottom-0 w-px bg-cyan-400/80"
          style={{ left: `${idealPct}%` }}
        >
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-cyan-400 font-bold whitespace-nowrap">
            {idealPct}%
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Main calculator ──────────────────────────────────────────
export function DiversificationCalculator() {
  const { holdings, tradeQueue } = usePortfolio();
  const [profile,     setProfile]     = useState('Conservative');
  const [suggestions, setSuggestions] = useState(null);

  const ideal = IDEAL_ALLOCATIONS[profile];

  // Compute total equity and per-sector breakdown
  const totalEquity = useMemo(
    () => holdings.reduce((s, h) => s + h.qty * h.currentPrice, 0),
    [holdings]
  );

  const allSectors = useMemo(() => {
    // Build sector → value map from current holdings
    const sectorValue = {};
    holdings.forEach(h => {
      sectorValue[h.sector] = (sectorValue[h.sector] ?? 0) + h.qty * h.currentPrice;
    });

    // Union of current sectors and ideal sectors
    const sectors = new Set([...Object.keys(sectorValue), ...Object.keys(ideal)]);

    return [...sectors]
      .map(sector => {
        const currentPct = totalEquity > 0
          ? ((sectorValue[sector] ?? 0) / totalEquity) * 100
          : 0;
        const idealPct = ideal[sector] ?? 0;
        return { sector, currentPct, idealPct, diff: currentPct - idealPct };
      })
      .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));   // biggest deviations first
  }, [holdings, ideal, totalEquity]);

  // Generate concrete buy/sell suggestions
  const generateSuggestions = () => {
    const recs = [];

    allSectors.forEach(({ sector, diff, idealPct }) => {
      if (Math.abs(diff) <= 1.5) return;   // within tolerance, skip

      const sectorHoldings = holdings.filter(h => h.sector === sector);

      if (diff > 0) {
        // ── OVERWEIGHT → suggest trimming largest holding ──
        const target = [...sectorHoldings].sort(
          (a, b) => b.qty * b.currentPrice - a.qty * a.currentPrice
        )[0];
        if (!target) return;

        const excessValue = (diff / 100) * totalEquity;
        const qty         = Math.max(1, Math.floor(excessValue / target.currentPrice));

        recs.push({
          action: 'SELL',
          symbol: target.id,
          qty,
          price:  target.currentPrice,
          reason: `${sector} is ${diff.toFixed(1)}% overweight (${profile} target: ${idealPct}%)`,
        });

      } else {
        // ── UNDERWEIGHT → suggest buying representative ticker ──
        const repSymbol = SECTOR_REPS[sector] ?? sectorHoldings[0]?.id ?? '—';
        const repHolding = holdings.find(h => h.id === repSymbol);
        const repTicker  = GLOBAL_TICKERS.find(t => t.symbol === repSymbol);
        const price      = repHolding?.currentPrice ?? repTicker?.price ?? 100;

        const deficitValue = (Math.abs(diff) / 100) * totalEquity;
        const qty          = Math.max(1, Math.floor(deficitValue / price));

        recs.push({
          action: 'BUY',
          symbol: repSymbol,
          qty,
          price,
          reason: `${sector} is ${Math.abs(diff).toFixed(1)}% underweight (${profile} target: ${idealPct}%)`,
        });
      }
    });

    setSuggestions(recs);
  };

  const addToQueue = rec => {
    tradeQueue.enqueue({ symbol: rec.symbol, side: rec.action, qty: rec.qty, price: rec.price });
  };

  const fUSD = n => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

  return (
    <div className="space-y-5 animate-fade-in">

      {/* Risk profile selector */}
      <Card title="Risk Profile" subtitle="Defines the ideal sector weights for your rebalancing target">
        <div className="px-5 pb-5 pt-4">
          <RiskSelector
            value={profile}
            onChange={p => { setProfile(p); setSuggestions(null); }}
          />
        </div>
      </Card>

      {/* Allocation chart */}
      <Card
        title="Sector Allocation vs Ideal"
        subtitle="Cyan line marks the ideal weight for your selected profile"
      >
        <div className="px-5 pb-6 pt-5 space-y-6">
          {allSectors.map(s => (
            <AllocationBar
              key={s.sector}
              label={s.sector}
              currentPct={s.currentPct}
              idealPct={s.idealPct}
              diff={s.diff}
            />
          ))}

          <Button variant="primary" className="w-full mt-2" onClick={generateSuggestions}>
            Generate Rebalancing Plan
          </Button>
        </div>
      </Card>

      {/* Suggestions */}
      {suggestions && (
        <Card
          title="Rebalancing Recommendations"
          subtitle={`${profile} profile · ${suggestions.length} adjustment${suggestions.length !== 1 ? 's' : ''} suggested`}
        >
          <div className="px-5 pb-5 pt-4 space-y-3">
            {suggestions.length === 0 ? (
              <div className="py-8 text-center space-y-1.5">
                <p className="text-emerald-400 font-bold text-sm">🎉 Portfolio is well-balanced!</p>
                <p className="text-slate-400 text-xs">
                  All sectors are within ±1.5% of the {profile} ideal weights. No adjustments needed.
                </p>
              </div>
            ) : (
              suggestions.map((rec, i) => (
                <div
                  key={i}
                  className={[
                    'rounded-xl border px-4 py-4 flex items-start justify-between gap-4',
                    rec.action === 'BUY'
                      ? 'bg-emerald-500/8 border-emerald-500/25'
                      : 'bg-rose-500/8 border-rose-500/25',
                  ].join(' ')}
                >
                  {/* Details */}
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={rec.action === 'BUY' ? 'buy' : 'sell'} size="sm">
                        {rec.action}
                      </Badge>
                      <span className="text-sm font-bold text-slate-100">
                        {rec.qty}× {rec.symbol}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        @ ${rec.price.toFixed(2)}
                      </span>
                      <span className={`text-xs font-bold font-mono ${rec.action === 'BUY' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        ≈ {fUSD(rec.qty * rec.price)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{rec.reason}</p>
                  </div>

                  {/* Queue button */}
                  <button
                    onClick={() => addToQueue(rec)}
                    className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors whitespace-nowrap focus:outline-none"
                  >
                    + Queue
                  </button>
                </div>
              ))
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
