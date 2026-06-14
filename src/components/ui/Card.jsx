// ============================================================
// src/components/ui/Card.jsx
// Rounded dark-glass panel with optional header and action slot.
// ============================================================
import React from 'react';

/**
 * @param {string}      title     Card heading text
 * @param {string}      subtitle  Muted sub-heading
 * @param {ReactNode}   action    JSX placed in header right slot
 * @param {string}      className Extra Tailwind overrides
 */
export function Card({ children, className = '', title, subtitle, action }) {
  return (
    <div className={`bg-slate-800/70 border border-slate-700/60 rounded-xl ${className}`}>
      {(title || action) && (
        <div className="flex items-start justify-between px-5 pt-5 pb-3 border-b border-slate-700/40">
          <div className="min-w-0 flex-1">
            {title    && <h3 className="text-sm font-bold text-slate-100 tracking-wide truncate">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-400 mt-0.5 truncate">{subtitle}</p>}
          </div>
          {action && <div className="ml-4 flex-shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
