// ============================================================
// src/pages/LedgerPage.jsx
// View: Transaction Log with Stack-based Undo / Redo
// Feature: (b) Money Change Log
// ============================================================
import React from 'react';
import { MoneyChangeLog } from '../features/ledger/MoneyChangeLog';

export function LedgerPage() {
  return (
    <div className="animate-fade-in">
      <MoneyChangeLog />
    </div>
  );
}
