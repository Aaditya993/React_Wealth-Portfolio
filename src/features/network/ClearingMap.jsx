// ============================================================
// src/features/network/ClearingMap.jsx
// Animated step-by-step trade settlement workflow.
// Feature (f): Clearing Network Map
// ============================================================
import React, { useState, useRef } from 'react';
import { CLEARING_STEPS } from '../../data/mockData';
import { Card }   from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  ClipboardText, Bank, Lightning, ArrowsClockwise, 
  ShieldChevron, Money, CheckCircle 
} from "@phosphor-icons/react";

const NETWORK_ICONS = {
  1: <ClipboardText size={26} weight="duotone" />,
  2: <Bank size={26} weight="duotone" />,
  3: <Lightning size={26} weight="duotone" />,
  4: <ArrowsClockwise size={26} weight="bold" />,
  5: <ShieldChevron size={26} weight="duotone" />,
  6: <Money size={26} weight="duotone" />,
  7: <CheckCircle size={26} weight="fill" />,
};

export function ClearingMap() {

  const NETWORK_ICONS = {
  1: <ClipboardText size={26} weight="duotone" />,
  2: <Bank size={26} weight="duotone" />,
  3: <Lightning size={26} weight="duotone" />,
  4: <ArrowsClockwise size={26} weight="bold" />,
  5: <ShieldChevron size={26} weight="duotone" />,
  6: <Money size={26} weight="duotone" />,
  7: <CheckCircle size={26} weight="fill" />,
};
  const [progress,    setProgress]    = useState(0);          // # of steps completed
  const [animating,   setAnimating]   = useState(false);
  const [activeStep,  setActiveStep]  = useState(null);       // detail panel
  const timerRef = useRef(null);

  const total = CLEARING_STEPS.length;

  const runSimulation = () => {
    if (animating) return;
    setAnimating(true);
    setProgress(0);
    setActiveStep(null);
    let step = 0;
    const tick = () => {
      step += 1;
      setProgress(step);
      if (step < total) {
        timerRef.current = setTimeout(tick, 650);
      } else {
        setAnimating(false);
      }
    };
    timerRef.current = setTimeout(tick, 300);
  };

  const reset = () => {
    clearTimeout(timerRef.current);
    setAnimating(false);
    setProgress(0);
    setActiveStep(null);
  };

  const isComplete = !animating && progress === total;

  return (
    <Card title="Trade Settlement Workflow" subtitle="DTCC / CCP clearing pipeline — click any node for detail">
      <div className="px-5 pb-6 pt-4 space-y-5">

        {/* Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="primary" size="sm" onClick={runSimulation} disabled={animating}>
            {animating ? '⏳ Settling…' : '▶ Run Simulation'}
          </Button>
          <Button variant="ghost" size="sm" onClick={reset} disabled={animating && progress === 0}>
            Reset
          </Button>
          {isComplete && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              ✓ Settlement Complete (T+2)
            </span>
          )}
        </div>

        {/* Step nodes (horizontal scroll on narrow screens) */}
        <div className="overflow-x-auto pb-3">
          <div className="flex items-start gap-0 min-w-max">
            {CLEARING_STEPS.map((step, idx) => {
              const done    = progress > idx;
              const current = (progress === idx) && animating;
              const active  = activeStep?.id === step.id;

              return (
                <div key={step.id} className="flex items-center">
                  {/* Node button */}
                  <button
                    onClick={() => setActiveStep(active ? null : step)}
                    className="flex flex-col items-center gap-1.5 w-[88px] group focus:outline-none"
                  >
                    {/* Circle */}
                    <div className={[
                      'w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2',
                      'transition-all duration-500 ease-out',
                      done
                        ? 'bg-emerald-500/20 border-emerald-500 shadow-lg shadow-emerald-500/20'
                        : current
                          ? 'bg-cyan-500/20 border-cyan-400 animate-pulse shadow-lg shadow-cyan-400/30'
                          : active
                            ? 'bg-slate-700 border-cyan-400/60'
                            : 'bg-slate-800/80 border-slate-600/60 group-hover:border-slate-400',
                    ].join(' ')}>
                      {NETWORK_ICONS[step.id]}
                    </div>

                    {/* Step number */}
                    <div className={[
                      'w-5 h-5 rounded-full flex items-center justify-center text-xs font-black',
                      '-mt-1 transition-colors duration-300',
                      done ? 'bg-emerald-500 text-slate-900' : 'bg-slate-700 text-slate-400',
                    ].join(' ')}>
                      {done ? '✓' : idx + 1}
                    </div>

                    {/* Label */}
                    <p className={[
                      'text-[10px] font-semibold text-center leading-tight w-20 transition-colors',
                      done ? 'text-emerald-400' : current ? 'text-cyan-400' : 'text-slate-400',
                    ].join(' ')}>
                      {step.label}
                    </p>
                  </button>

                  {/* Connector line */}
                  {idx < total - 1 && (
                    <div className={[
                      'w-5 h-0.5 mb-12 flex-shrink-0 rounded-full transition-all duration-500',
                      progress > idx ? 'bg-emerald-500' : 'bg-slate-700',
                    ].join(' ')} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        {activeStep && (
          <div className="bg-slate-700/30 border border-slate-600/40 rounded-xl px-5 py-4 flex items-start gap-4 animate-fade-in">
            <span className="text-3xl flex-shrink-0">{NETWORK_ICONS[activeStep.id]}</span>
            <div>
              <p className="text-sm font-bold text-slate-100 mb-1">
                Step {activeStep.id}: {activeStep.label}
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">{activeStep.desc}</p>
            </div>
          </div>
        )}

        {/* Progress bar */}
        {progress > 0 && (
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-400">Settlement Progress</span>
              <span className={isComplete ? 'text-emerald-400 font-semibold' : 'text-cyan-400'}>
                {Math.round((progress / total) * 100)}%
              </span>
            </div>
            <div className="h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${(progress / total) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
