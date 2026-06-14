// ============================================================
// src/pages/DashboardPage.jsx
// View: Investment Overview + Holdings Sorter
// Features: (a) Investment Overview, (e) Portfolio Sorter
// ============================================================
import React from 'react';
import { InvestmentOverview } from '../features/dashboard/InvestmentOverview';
import { PortfolioSorter }    from '../features/dashboard/PortfolioSorter';

export function DashboardPage() {
  return (
    <div className="space-y-5 animate-fade-in">
      {/* KPI tiles row */}
      <InvestmentOverview />

      {/* Sortable holdings table */}
      <PortfolioSorter />
    </div>
  );
}
