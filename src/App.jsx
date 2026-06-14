// ============================================================
// src/App.jsx
// Root component — wires context provider, router state,
// layout shell, and all five page views together.
//
// Navigation is handled with a simple useState "view" key
// (no external router needed for a single-page SPA).
// ============================================================
import React, { useState } from 'react';

// Global state provider
import { PortfolioProvider } from './context/PortfolioContext';

// Layout shell
import { MainLayout } from './components/layout/MainLayout';

// Page views (one per sidebar section)
import { DashboardPage } from './pages/DashboardPage';
import { LedgerPage }    from './pages/LedgerPage';
import { TradingPage }   from './pages/TradingPage';
import { NetworkPage }   from './pages/NetworkPage';
import { AdvisorPage }   from './pages/AdvisorPage';

// ─── View registry ────────────────────────────────────────────
// Maps sidebar nav id → page component
const VIEWS = {
  dashboard: DashboardPage,
  ledger:    LedgerPage,
  trading:   TradingPage,
  network:   NetworkPage,
  advisor:   AdvisorPage,
};

// ─── App root ─────────────────────────────────────────────────
export default function App() {
  // Active view key — drives both sidebar highlight and rendered page
  const [view, setView] = useState('dashboard');

  // Resolve the active page component (default to Dashboard if unknown)
  const PageComponent = VIEWS[view] ?? DashboardPage;

  return (
    /**
     * PortfolioProvider wraps the entire tree so every feature
     * (Dashboard, Ledger, Trading, Advisor) reads from and writes
     * to the same global state — holdings, cash, ledger, queue.
     */
    <PortfolioProvider>
      <MainLayout view={view} onNavigate={setView}>
        {/*
          Key prop forces a fresh mount + fade-in animation
          each time the user navigates to a different view.
        */}
        <PageComponent key={view} />
      </MainLayout>
    </PortfolioProvider>
  );
}
