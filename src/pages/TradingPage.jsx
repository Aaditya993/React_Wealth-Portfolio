// ============================================================
// src/pages/TradingPage.jsx
// View: Ticker Search + FIFO Trade Queue
// Features: (c) Trade Submission Queue, (d) Ticker Search
// ============================================================
import React, { useState } from 'react';
import { TickerSearch }   from '../features/trading/TickerSearch';
import { TradeQueueForm } from '../features/trading/TradeQueueForm';
import { OrderBookList }  from '../features/trading/OrderBookList';

export function TradingPage() {
  // Symbol selected from TickerSearch is passed down to pre-fill the order form
  const [selectedSymbol, setSelectedSymbol] = useState('');

  const handleTickerSelect = (ticker) => {
    setSelectedSymbol(ticker.symbol);
  };

  return (
    <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Left column: Ticker search */}
      <div className="space-y-5">
        <TickerSearch onSelect={handleTickerSelect} />
      </div>

      {/* Right column: Order form + queue */}
      <div className="space-y-5">
        <TradeQueueForm prefillSymbol={selectedSymbol} />
        <OrderBookList />
      </div>
    </div>
  );
}
