// ============================================================
// src/features/trading/TickerSearch.jsx
// Instant client-side search across the GLOBAL_TICKERS array.
// Feature (d): Ticker Search
// ============================================================
import React, { useState, useMemo } from 'react';
import { GLOBAL_TICKERS } from '../../data/mockData';
import { Card }  from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export function TickerSearch({ onSelect }) {
  const [query, setQuery] = useState('');

  // Filter tickers — runs synchronously in the browser (no debounce needed for 30 items)
  const results = useMemo(() => {
    const q = query.trim().toUpperCase();
    if (!q) return [];
    return GLOBAL_TICKERS.filter(
      t => t.symbol.includes(q) || t.name.toUpperCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  const handleSelect = ticker => {
    onSelect && onSelect(ticker);
    setQuery('');
  };

  return (
    <Card
      title="Ticker Search"
      subtitle={`Instant search across ${GLOBAL_TICKERS.length} global tickers — click to pre-fill order form`}
    >
      <div className="px-5 pt-3 pb-5 space-y-3">
        {/* Search input */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">🔍</span>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Symbol or company name…"
            className="w-full bg-slate-900/80 border border-slate-600 text-slate-100 text-sm rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 placeholder:text-slate-500 transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors text-sm"
            >
              ✕
            </button>
          )}
        </div>

        {/* No results */}
        {query && results.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-4">
            No tickers match "{query}"
          </p>
        )}

        {/* Result rows */}
        {results.length > 0 && (
          <div className="space-y-1 animate-fade-in">
            {results.map(t => {
              const isUp = t.change >= 0;
              return (
                <button
                  key={t.symbol}
                  onClick={() => handleSelect(t)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-slate-700/50 transition-colors group text-left"
                >
                  {/* Left: avatar + identity */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-slate-700/70 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-black text-cyan-400">{t.symbol.slice(0, 2)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-100">{t.symbol}</p>
                      <p className="text-xs text-slate-400">{t.name} · {t.exchange}</p>
                    </div>
                  </div>

                  {/* Right: price + change */}
                  <div className="text-right flex items-center gap-3">
                    <div>
                      <p className="text-sm font-mono font-bold text-slate-100 tabular">${t.price.toFixed(2)}</p>
                      <p className={`text-xs font-semibold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isUp ? '▲' : '▼'} {Math.abs(t.change).toFixed(2)}%
                      </p>
                    </div>
                    <span className="text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                      Add →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Idle prompt */}
        {!query && (
          <p className="text-xs text-slate-600 text-center py-2">
            Start typing to search {GLOBAL_TICKERS.length} tickers…
          </p>
        )}
      </div>
    </Card>
  );
}
