// ============================================================
// src/features/ledger/MoneyChangeLog.jsx
// Transaction log with Stack-based undo/redo.
// Feature (b): Money Change Log
// ============================================================
import React, { useState } from 'react';
import { usePortfolio }  from '../../context/PortfolioContext';
import { Card }          from '../../components/ui/Card';
import { Button }        from '../../components/ui/Button';
import { Badge }         from '../../components/ui/Badge';
import { Input, Select } from '../../components/ui/Input';
import { DataTable }     from '../../components/ui/DataTable';

// Badge variant lookup
const TX_BADGE_MAP = {
  BUY:      'buy',
  SELL:     'sell',
  DIVIDEND: 'success',
  DEPOSIT:  'info',
  FEE:      'warning',
};

const TX_TYPE_OPTIONS = [
  { value: 'BUY',      label: 'Buy'       },
  { value: 'SELL',     label: 'Sell'      },
  { value: 'DIVIDEND', label: 'Dividend'  },
  { value: 'DEPOSIT',  label: 'Deposit'   },
  { value: 'FEE',      label: 'Fee'       },
];

// Helper: positive types add cash; negative types deduct cash
const POSITIVE_TYPES = new Set(['SELL', 'DIVIDEND', 'DEPOSIT']);

function AmountCell({ type, amount }) {
  const isPos = POSITIVE_TYPES.has(type);
  const fmt   = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  return (
    <span className={`font-mono font-semibold ${isPos ? 'text-emerald-400' : 'text-rose-400'}`}>
      {isPos ? '+' : '-'}{fmt}
    </span>
  );
}

// Table column definitions
const COLUMNS = [
  { key: 'date',   label: 'Date',   render: v => <span className="text-slate-400 font-mono text-xs">{v}</span> },
  { key: 'type',   label: 'Type',   render: v => <Badge variant={TX_BADGE_MAP[v] ?? 'default'} size="xs">{v}</Badge> },
  { key: 'symbol', label: 'Symbol', render: v => <span className="font-bold text-cyan-400 tracking-wider">{v}</span> },
  { key: 'qty',    label: 'Qty',    render: v => <span className="text-slate-300 font-mono">{v || '—'}</span> },
  { key: 'price',  label: 'Price',
    render: v => v ? <span className="text-slate-300 font-mono">${Number(v).toFixed(2)}</span> : <span className="text-slate-600">—</span>
  },
  { key: 'amount', label: 'Amount',
    render: (v, row) => <AmountCell type={row.type} amount={v} />
  },
  { key: 'note',   label: 'Note',   render: v => <span className="text-slate-400 text-xs italic">{v}</span> },
];

const EMPTY_FORM = { type: 'BUY', symbol: '', qty: '', price: '', note: '' };

export function MoneyChangeLog() {
  const { ledger, addLedgerEntry, undoLedger, redoLedger, canUndo, canRedo, undoDepth } = usePortfolio();
  const [form, setForm]       = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);

  const setField = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleAdd = () => {
    if (!form.symbol.trim()) return;
    const qty    = parseFloat(form.qty) || 0;
    const price  = parseFloat(form.price) || 0;
    const amount = qty * price || price;   // fallback: treat price as total if no qty
    addLedgerEntry({
      type:   form.type,
      symbol: form.symbol.toUpperCase().trim(),
      qty,
      price,
      amount,
      note: form.note.trim() || 'Manual entry',
    });
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  return (
    <div className="space-y-4 animate-fade-in">

      {/* ── Controls bar ───────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="secondary" size="sm" onClick={undoLedger} disabled={!canUndo}>
            ↩ Undo
          </Button>
          <Button variant="secondary" size="sm" onClick={redoLedger} disabled={!canRedo}>
            Redo ↪
          </Button>
          {canUndo && (
            <span className="text-xs text-slate-500 tabular">
              {undoDepth} snapshot{undoDepth !== 1 ? 's' : ''} in stack
            </span>
          )}
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowForm(v => !v)}>
          {showForm ? '✕ Cancel' : '+ Log Entry'}
        </Button>
      </div>

      {/* ── Stack explainer banner ─────────────────────── */}
      <div className="bg-amber-500/8 border border-amber-500/20 rounded-xl px-4 py-3 flex items-start gap-3">
        <span className="text-amber-400 text-lg flex-shrink-0">⚡</span>
        <div>
          <p className="text-xs font-bold text-amber-300 mb-0.5">Stack-based Undo / Redo</p>
          <p className="text-xs text-amber-300/70 leading-relaxed">
            Every ledger change snapshots the entire array onto an undo stack (LIFO).
            <strong className="text-amber-300"> Undo</strong> pops the last snapshot and moves it to the redo stack.
            <strong className="text-amber-300"> Redo</strong> replays it. Adding a new entry clears the redo branch.
          </p>
        </div>
      </div>

      {/* ── Add entry form ─────────────────────────────── */}
      {showForm && (
        <Card title="New Ledger Entry" className="border-cyan-500/25 animate-fade-in">
          <div className="px-5 pb-5 pt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            <Select label="Type"     id="ltype"  value={form.type}   onChange={setField('type')}   options={TX_TYPE_OPTIONS} />
            <Input  label="Symbol"   id="lsym"   value={form.symbol} onChange={setField('symbol')} placeholder="AAPL" />
            <Input  label="Quantity" id="lqty"   type="number" value={form.qty}    onChange={setField('qty')}    placeholder="0" />
            <Input  label="Price / Amount" id="lprice" type="number" value={form.price} onChange={setField('price')} placeholder="0.00" prefix="$" />
            <Input  label="Note (optional)"      id="lnote"  value={form.note}   onChange={setField('note')}   placeholder="Add context…" className="col-span-2" />
          </div>
          <div className="px-5 pb-5 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => { setShowForm(false); setForm(EMPTY_FORM); }}>Cancel</Button>
            <Button variant="primary" onClick={handleAdd} disabled={!form.symbol.trim()}>Add to Ledger</Button>
          </div>
        </Card>
      )}

      {/* ── Transaction table ──────────────────────────── */}
      <Card title="Transaction History" subtitle={`${ledger.length} entries — most recent first`}>
        <DataTable
          columns={COLUMNS}
          rows={ledger}
          emptyText="No transactions logged yet. Add the first entry above."
        />
      </Card>
    </div>
  );
}
