// ============================================================
// src/features/trading/TradeQueueForm.jsx
// Form to submit Buy/Sell orders into the FIFO queue.
// Feature (c): Trade Submission Queue — input side
// ============================================================
import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Card }         from '../../components/ui/Card';
import { Button }       from '../../components/ui/Button';
import { Input }        from '../../components/ui/Input';

/** @param {string} prefillSymbol — symbol pre-filled from TickerSearch */
export function TradeQueueForm({ prefillSymbol = '' }) {
  const { tradeQueue, metrics } = usePortfolio();

  const [form, setForm] = useState({
    symbol: prefillSymbol,
    side:   'BUY',
    qty:    '',
    price:  '',
  });

  // When parent passes a new prefill (user clicked a ticker), update symbol
  useEffect(() => {
    if (prefillSymbol) setForm(f => ({ ...f, symbol: prefillSymbol }));
  }, [prefillSymbol]);

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleEnqueue = () => {
    if (!form.symbol.trim() || !form.qty) return;
    tradeQueue.enqueue({
      symbol: form.symbol.toUpperCase().trim(),
      side:   form.side,
      qty:    parseInt(form.qty, 10),
      price:  parseFloat(form.price) || null,   // null = market price
    });
    // Reset qty/price but keep symbol for quick follow-up orders
    setForm(f => ({ ...f, qty: '', price: '' }));
  };

  const fCash = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(metrics.cash);

  return (
    <Card title="Submit Order" subtitle="Orders enter the FIFO queue and execute one-by-one">
      <div className="px-5 pt-4 pb-5 space-y-4">

        {/* Buy / Sell toggle */}
        <div>
          <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">Order Side</p>
          <div className="flex rounded-lg overflow-hidden border border-slate-600">
            {['BUY', 'SELL'].map(side => (
              <button
                key={side}
                type="button"
                onClick={() => setForm(f => ({ ...f, side }))}
                className={[
                  'flex-1 py-2.5 text-sm font-bold transition-colors focus:outline-none',
                  form.side === side
                    ? side === 'BUY'
                      ? 'bg-emerald-600 text-white shadow-inner'
                      : 'bg-rose-600 text-white shadow-inner'
                    : 'bg-slate-800/80 text-slate-500 hover:text-slate-200',
                ].join(' ')}
              >
                {side}
              </button>
            ))}
          </div>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Symbol"
            id="tsym"
            value={form.symbol}
            onChange={set('symbol')}
            placeholder="e.g. AAPL"
          />
          <Input
            label="Quantity"
            id="tqty"
            type="number"
            value={form.qty}
            onChange={set('qty')}
            placeholder="1"
          />
          <Input
            label="Limit Price (blank = market)"
            id="tlimit"
            type="number"
            value={form.price}
            onChange={set('price')}
            placeholder="Market"
            prefix="$"
            className="col-span-2"
          />
        </div>

        {/* Cash info */}
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-700/20 rounded-lg px-3 py-2.5">
          <span>💵 Available Cash:</span>
          <span className="text-cyan-400 font-mono font-bold tabular">{fCash}</span>
        </div>

        <Button
          variant="primary"
          className="w-full"
          onClick={handleEnqueue}
          disabled={!form.symbol.trim() || !form.qty}
        >
          Add to Queue
        </Button>
      </div>
    </Card>
  );
}
