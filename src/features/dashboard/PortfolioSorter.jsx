// ============================================================
// src/features/dashboard/PortfolioSorter.jsx
// Holdings list with sort controls (value, alpha, gain, day%).
// Feature (e): Portfolio Value Sorter
// ============================================================
import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { AssetCard }    from './AssetCard';
import { Card }         from '../../components/ui/Card';

const SORT_OPTIONS = [
  { key: 'totalValue-desc', label: 'Value ↓'  },
  { key: 'totalValue-asc',  label: 'Value ↑'  },
  { key: 'alpha-asc',       label: 'A → Z'    },
  { key: 'alpha-desc',      label: 'Z → A'    },
  { key: 'gain-desc',       label: 'Gain ↓'   },
  { key: 'change-desc',     label: 'Day % ↓'  },
];

function SortButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        'text-xs px-2.5 py-1 rounded-md font-semibold transition-colors',
        active
          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
          : 'text-slate-500 hover:text-slate-200 hover:bg-slate-700/60',
      ].join(' ')}
    >
      {label}
    </button>
  );
}

export function PortfolioSorter() {
  const { holdings } = usePortfolio();
  const [sortKey, setSortKey] = useState('totalValue-desc');

  const sorted = useMemo(() => {
    return [...holdings].sort((a, b) => {
      const av = a.qty * a.currentPrice;
      const bv = b.qty * b.currentPrice;
      switch (sortKey) {
        case 'totalValue-desc': return bv - av;
        case 'totalValue-asc':  return av - bv;
        case 'alpha-asc':       return a.id.localeCompare(b.id);
        case 'alpha-desc':      return b.id.localeCompare(a.id);
        case 'gain-desc':
          return (b.currentPrice - b.avgCost) * b.qty - (a.currentPrice - a.avgCost) * a.qty;
        case 'change-desc':     return b.change - a.change;
        default:                return 0;
      }
    });
  }, [holdings, sortKey]);

  const sortControls = (
    <div className="flex items-center gap-1 flex-wrap justify-end">
      {SORT_OPTIONS.map(o => (
        <SortButton
          key={o.key}
          label={o.label}
          active={sortKey === o.key}
          onClick={() => setSortKey(o.key)}
        />
      ))}
    </div>
  );

  return (
    <Card
      title="Holdings"
      subtitle={`${holdings.length} position${holdings.length !== 1 ? 's' : ''}`}
      action={sortControls}
    >
      <div className="px-5 pb-5 pt-3 space-y-1">
        {sorted.map(h => <AssetCard key={h.id} holding={h} />)}
      </div>
    </Card>
  );
}
