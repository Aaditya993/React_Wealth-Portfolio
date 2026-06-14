// ============================================================
// src/pages/AdvisorPage.jsx
// View: Risk Profile Selector + Diversification Calculator
// Feature: (h) Diversification Helper
// ============================================================
import React from 'react';
import { DiversificationCalculator } from '../features/advisor/DiversificationCalculator';

export function AdvisorPage() {
  return (
    <div className="animate-fade-in">
      <DiversificationCalculator />
    </div>
  );
}
