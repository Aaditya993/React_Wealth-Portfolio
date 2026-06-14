// ============================================================
// src/components/ui/Button.jsx
// Generic button with variant, size, and disabled support.
// ============================================================
import React from 'react';

/**
 * @param {string}   variant  primary | secondary | danger | ghost | success
 * @param {string}   size     sm | md | lg
 * @param {boolean}  disabled
 * @param {string}   className  extra Tailwind classes
 */
export function Button({ children, onClick, variant = 'primary', size = 'md', disabled = false, className = '' }) {
  const base = [
    'inline-flex items-center justify-center font-semibold rounded-lg',
    'transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-slate-900',
    'disabled:opacity-40 disabled:cursor-not-allowed select-none whitespace-nowrap',
  ].join(' ');

  const variants = {
    primary:   'bg-cyan-500 hover:bg-cyan-400 text-slate-900 focus:ring-cyan-400',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-slate-100 focus:ring-slate-500',
    danger:    'bg-rose-600 hover:bg-rose-500 text-white focus:ring-rose-400',
    ghost:     'bg-transparent hover:bg-slate-700 text-slate-300 hover:text-white focus:ring-slate-500',
    success:   'bg-emerald-600 hover:bg-emerald-500 text-white focus:ring-emerald-400',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${className}`}
    >
      {children}
    </button>
  );
}
