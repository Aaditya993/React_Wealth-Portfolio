// ============================================================
// src/features/trading/OrderBookList.jsx
// Renders the FIFO trade queue with an "Execute Next" button.
// Feature (c): Trade Submission Queue — display/execute side
// ============================================================
import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Card }   from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge }  from '../../components/ui/Badge';

export function OrderBookList() {
  const { tradeQueue, executeNextTrade } = usePortfolio();
  const { queue, isEmpty, cancel } = tradeQueue;

  return (
    <Card
      title="Order Queue"
      subtitle={`${queue.length} pending order${queue.length !== 1 ? 's' : ''} — FIFO execution order`}
    >
      {/* FIFO explainer */}
      <div className="mx-5 mt-4 bg-cyan-500/8 border border-cyan-500/20 rounded-xl px-4 py-3 flex items-start gap-3">
        <span className="text-cyan-400 text-lg flex-shrink-0 mt-0.5">⚡</span>
        <div>
          <p className="text-xs font-bold text-cyan-300 mb-0.5">FIFO Queue Structure</p>
          <p className="text-xs text-cyan-300/70 leading-relaxed">
            Orders are processed <strong className="text-cyan-300">front-to-back</strong>. 
            "Execute Next" processes the oldest pending order, 
            immediately updating your holdings, cash balance, and ledger.
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-3 space-y-2">
        {/* Empty state */}
        {isEmpty && (
          <div className="py-10 text-center text-slate-500 text-sm">
            Queue is empty — submit an order above.
          </div>
        )}

        {/* Order rows */}
        {queue.map((order, idx) => {
          const isNext = idx === 0;
          const sideUp = order.side === 'BUY';
          const timeStr = new Date(order.queuedAt).toLocaleTimeString('en-US', {
            hour: '2-digit', minute: '2-digit', second: '2-digit',
          });
          return (
            <div
              key={order.id}
              className={[
                'flex items-center justify-between px-4 py-3 rounded-xl border transition-all',
                isNext
                  ? 'bg-cyan-500/8 border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                  : 'bg-slate-800/40 border-slate-700/40',
              ].join(' ')}
            >
              {/* Position badge + order info */}
              <div className="flex items-center gap-3">
                <span className={[
                  'text-xs font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0',
                  isNext ? 'bg-cyan-500 text-slate-900' : 'bg-slate-700 text-slate-400',
                ].join(' ')}>
                  {idx + 1}
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-100">
                    {sideUp ? '🟢' : '🔴'} {order.side}{' '}
                    <span className="font-mono">{order.qty}</span>×{' '}
                    <span className="text-cyan-400">{order.symbol}</span>
                  </p>
                  <p className="text-xs text-slate-500">
                    {order.price ? `Limit $${order.price.toFixed(2)}` : 'Market price'} · {timeStr}
                  </p>
                </div>
              </div>

              {/* Status + cancel */}
              <div className="flex items-center gap-2">
                {isNext && <Badge variant="info" size="xs">NEXT</Badge>}
                <button
                  onClick={() => cancel(order.id)}
                  className="text-slate-600 hover:text-rose-400 transition-colors text-sm px-1 py-0.5 rounded hover:bg-rose-500/10"
                  title="Cancel order"
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })}

        {/* Execute button */}
        {!isEmpty && (
          <div className="pt-2">
            <Button variant="success" className="w-full" onClick={executeNextTrade}>
              ▶ Execute Next Order
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
