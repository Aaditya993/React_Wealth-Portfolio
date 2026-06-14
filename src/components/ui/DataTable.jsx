// ============================================================
// src/components/ui/DataTable.jsx
// Generic sortable table with column render functions.
// ============================================================
import React from 'react';

/**
 * @param {Array<{key, label, render?, className?}>} columns
 * @param {Array<object>}                           rows
 * @param {string}                                  emptyText
 */
export function DataTable({ columns, rows, emptyText = 'No data available.', className = '' }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-700/60">
            {columns.map(col => (
              <th
                key={col.key}
                className={`px-4 py-2.5 text-left text-xs font-bold text-slate-400 tracking-widest uppercase ${col.className ?? ''}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-slate-500 text-sm">
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={row.id ?? i}
                className="border-b border-slate-700/25 hover:bg-slate-700/20 transition-colors"
              >
                {columns.map(col => (
                  <td key={col.key} className={`px-4 py-3 text-slate-200 ${col.className ?? ''}`}>
                    {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
