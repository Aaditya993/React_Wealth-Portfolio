// ============================================================
// src/components/layout/MainLayout.jsx
// Root shell: Sidebar + TopNav + scrollable main content area.
// ============================================================
import React from 'react';
import { Sidebar } from './Sidebar';
import { TopNav }  from './TopNav';

export function MainLayout({ children, view, onNavigate }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Left navigation rail */}
      <Sidebar activeView={view} onNavigate={onNavigate} />

      {/* Right column: header + main */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav view={view} />
        <main className="flex-1 p-4 lg:p-6 overflow-auto animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
