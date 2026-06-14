// ============================================================
// src/context/PortfolioContext.jsx
//
// Global state hub for PortfolioWealth Suite.
// Provides via React Context:
//   • holdings       — current equity positions
//   • cash           — available cash balance
//   • ledger         — transaction history (undo/redo enabled)
//   • tradeQueue     — FIFO pending orders (from useTradeQueue)
//   • metrics        — derived dashboard numbers (memoised)
//   • executeNextTrade — processes front of queue, updates all state
// ============================================================
import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { INITIAL_HOLDINGS, INITIAL_LEDGER, GLOBAL_TICKERS } from '../data/mockData';
import { useUndoStack }  from '../hooks/useUndoStack';
import { useTradeQueue } from '../hooks/useTradeQueue';

const PortfolioContext = createContext(null);

// ─────────────────────────────────────────────────────────────
export function PortfolioProvider({ children }) {

  // ── 1. Holdings (array of position objects) ───────────────
  const [holdings, setHoldings] = useState(INITIAL_HOLDINGS);

  // ── 2. Cash balance ───────────────────────────────────────
  const [cash, setCash] = useState(47_320.85);

  // ── 3. Ledger backed by undo/redo stack ───────────────────
  const {
    state:   ledger,
    push:    pushLedger,
    undo:    undoLedger,
    redo:    redoLedger,
    canUndo,
    canRedo,
    undoDepth,
  } = useUndoStack(INITIAL_LEDGER);

  // ── 4. Trade Queue (FIFO) ─────────────────────────────────
  const tradeQueue = useTradeQueue([]);

  // ── 5. Derived metrics (recomputed on holdings/cash change) ─
  const metrics = useMemo(() => {
    const totalEquity    = holdings.reduce((s, h) => s + h.qty * h.currentPrice, 0);
    const totalCost      = holdings.reduce((s, h) => s + h.qty * h.avgCost, 0);
    const totalValue     = totalEquity + cash;
    const totalGainAmt   = totalEquity - totalCost;
    const totalGainPct   = totalCost > 0 ? (totalGainAmt / totalCost) * 100 : 0;
    const dailyChange    = holdings.reduce(
      (s, h) => s + (h.change / 100) * h.currentPrice * h.qty, 0
    );
    const dailyChangePct = totalEquity > 0 ? (dailyChange / totalEquity) * 100 : 0;
    return { totalValue, totalEquity, cash, totalGainAmt, totalGainPct, dailyChange, dailyChangePct };
  }, [holdings, cash]);

  // ── 6. Add a ledger entry (pushes snapshot to undo stack) ──
  const addLedgerEntry = useCallback((entry) => {
    const newEntry = {
      ...entry,
      id:   `txn-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    // pushLedger saves the current ledger array, then sets state to new array
    pushLedger([newEntry, ...ledger]);
  }, [ledger, pushLedger]);

  // ── 7. Execute the next trade from the FIFO queue ─────────
  const executeNextTrade = useCallback(() => {
    // dequeue() is synchronous via the captured ref pattern in the hook
    const order = tradeQueue.dequeue();
    if (!order) return;

    // Resolve execution price: use limit price if set, else market price
    const ticker = GLOBAL_TICKERS.find(t => t.symbol === order.symbol);
    const price  = (order.price && order.price > 0) ? order.price : (ticker?.price ?? 100);
    const total  = price * order.qty;

    if (order.side === 'BUY') {
      // ── BUY path ──────────────────────────────────────────
      if (cash < total) {
        alert(`Insufficient cash: need $${total.toFixed(2)}, have $${cash.toFixed(2)}`);
        return;
      }
      setCash(c => c - total);
      setHoldings(prev => {
        const existing = prev.find(h => h.id === order.symbol);
        if (existing) {
          // Update average cost: (oldCost*oldQty + newCost) / newQty
          const newQty     = existing.qty + order.qty;
          const newAvgCost = ((existing.avgCost * existing.qty) + total) / newQty;
          return prev.map(h =>
            h.id === order.symbol ? { ...h, qty: newQty, avgCost: newAvgCost } : h
          );
        }
        // New position
        return [...prev, {
          id: order.symbol, name: order.symbol,
          sector: ticker ? 'Other' : 'Other',
          qty: order.qty, avgCost: price, currentPrice: price, change: 0,
        }];
      });
      addLedgerEntry({ type: 'BUY', symbol: order.symbol, qty: order.qty, price, amount: total, note: 'Queue execution' });

    } else {
      // ── SELL path ─────────────────────────────────────────
      setHoldings(prev => {
        const existing = prev.find(h => h.id === order.symbol);
        if (!existing || existing.qty < order.qty) {
          alert(`Cannot sell ${order.qty} shares of ${order.symbol} — insufficient holdings.`);
          return prev;
        }
        const proceeds = price * order.qty;
        setCash(c => c + proceeds);
        addLedgerEntry({ type: 'SELL', symbol: order.symbol, qty: order.qty, price, amount: proceeds, note: 'Queue execution' });
        // Remove position entirely if qty drops to zero
        if (existing.qty === order.qty) return prev.filter(h => h.id !== order.symbol);
        return prev.map(h => h.id === order.symbol ? { ...h, qty: h.qty - order.qty } : h);
      });
    }
  }, [tradeQueue, cash, addLedgerEntry]);

  const value = {
    // State
    holdings, setHoldings,
    cash,     setCash,
    // Ledger + undo/redo
    ledger, addLedgerEntry,
    undoLedger, redoLedger,
    canUndo, canRedo, undoDepth,
    // Trade queue
    tradeQueue, executeNextTrade,
    // Derived
    metrics,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

/** Convenience hook — throws if used outside provider */
export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used inside <PortfolioProvider>');
  return ctx;
}
