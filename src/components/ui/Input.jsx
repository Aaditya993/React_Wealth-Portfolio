// ============================================================
// src/components/ui/Input.jsx
// Labelled text / number input + Select variant.
// ============================================================
import React from 'react';

const inputBase = [
  'w-full bg-slate-900/80 border border-slate-600 text-slate-100 text-sm rounded-lg py-2',
  'focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30',
  'placeholder:text-slate-500 transition-colors',
].join(' ');

/**
 * Input — single-line text or number field with optional prefix/suffix icons.
 */
export function Input({ label, id, placeholder, value, onChange, type = 'text', className = '', prefix, suffix }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-slate-400 text-sm pointer-events-none select-none">{prefix}</span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${inputBase} ${prefix ? 'pl-8' : 'pl-3'} ${suffix ? 'pr-8' : 'pr-3'}`}
        />
        {suffix && (
          <span className="absolute right-3 text-slate-400 text-sm pointer-events-none select-none">{suffix}</span>
        )}
      </div>
    </div>
  );
}

/**
 * Select — labelled dropdown with dark styling.
 */
export function Select({ label, id, value, onChange, options = [], className = '' }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`${inputBase} px-3`}
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
