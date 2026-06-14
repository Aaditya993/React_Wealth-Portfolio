// ============================================================
// src/pages/NetworkPage.jsx
// View: Clearing Workflow Map + Safe Transfer Pathfinder
// Features: (f) Clearing Network Map, (g) Safe Transfer Route
// ============================================================
import React from 'react';
import { ClearingMap }            from '../features/network/ClearingMap';
import { SafeTransferPathfinder } from '../features/network/SafeTransferPathfinder';

export function NetworkPage() {
  return (
    <div className="animate-fade-in space-y-5">
      {/* Step-by-step animated settlement workflow */}
      <ClearingMap />

      {/* Dijkstra bank-to-bank pathfinder */}
      <SafeTransferPathfinder />
    </div>
  );
}
