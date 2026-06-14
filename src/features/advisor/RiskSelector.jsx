// ============================================================
// src/features/advisor/RiskSelector.jsx
// Two-option profile card selector: Conservative / Aggressive.
// ============================================================
import React from 'react';
import { Badge } from '../../components/ui/Badge';

const PROFILES = [
  {
    key:      'Conservative',
    icon:     '🛡️',
    headline: 'Capital Preservation',
    desc:     'Prioritises stability and downside protection. Heavy allocation to healthcare, financials, and consumer staples. Accepts lower upside in exchange for reduced drawdown risk.',
    accent:   'blue',
  },
  {
    key:      'Aggressive',
    icon:     '🚀',
    headline: 'Growth Maximiser',
    desc:     'Maximises long-term returns via concentrated technology exposure. Accepts higher volatility and drawdowns. Suitable for long time-horizons with high risk tolerance.',
    accent:   'orange',
  },
];

export function RiskSelector({ value, onChange }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {PROFILES.map(p => {
        const active = value === p.key;
        const isBlue = p.accent === 'blue';

        return (
          <button
            key={p.key}
            type="button"
            onClick={() => onChange(p.key)}
            className={[
              'text-left rounded-xl border-2 px-5 py-4 transition-all duration-200 focus:outline-none',
              active
                ? isBlue
                  ? 'bg-blue-500/10 border-blue-500/60 shadow-lg shadow-blue-500/10'
                  : 'bg-orange-500/10 border-orange-500/60 shadow-lg shadow-orange-500/10'
                : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-500',
            ].join(' ')}
          >
            {/* Profile header */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{p.icon}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold ${active ? (isBlue ? 'text-blue-400' : 'text-orange-400') : 'text-slate-200'}`}>
                  {p.key}
                </p>
                <p className="text-xs text-slate-400">{p.headline}</p>
              </div>
              {active && <Badge variant="info" size="xs">Selected</Badge>}
            </div>

            {/* Description */}
            <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
          </button>
        );
      })}
    </div>
  );
}
