'use client';

import React from 'react';

import { AlertTriangle } from 'lucide-react';

// Backend integration point: replace with API call to /api/budgets/utilization
const budgets = [
  { name: 'Operating', used: 78, total: 100, color: 'var(--primary)', status: 'ok' },
  { name: 'Capital Exp.', used: 91, total: 100, color: 'var(--warning)', status: 'warning' },
  { name: 'Marketing', used: 110, total: 100, color: 'var(--negative)', status: 'over' },
  { name: 'R&D', used: 64, total: 100, color: 'var(--accent)', status: 'ok' },
];

export default function BudgetUtilizationInner() {
  return (
    <div className="card-elevated p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[14px] font-600 text-foreground">Budget Utilization</h2>
          <p className="text-[11px] text-muted-foreground mt-0.5">Q2 2026 — May 6</p>
        </div>
        <span className="flex items-center gap-1 text-[11px] text-warning">
          <AlertTriangle size={12} />
          1 overrun
        </span>
      </div>
      <div className="space-y-4 flex-1">
        {budgets?.map((b) => {
          const pct = Math.min(b?.used, 100);
          const isOver = b?.used > 100;
          return (
            <div key={`budget-${b?.name}`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[12px] font-500 text-foreground">{b?.name}</span>
                <div className="flex items-center gap-2">
                  {isOver && <AlertTriangle size={11} className="text-negative" />}
                  <span
                    className={`text-[12px] font-600 tabular-nums ${
                      isOver ? 'text-negative' : b?.used >= 85 ? 'text-warning' : 'text-foreground'
                    }`}
                  >
                    {b?.used}%
                  </span>
                </div>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: b?.color,
                    opacity: 0.85,
                  }}
                />
              </div>
              {isOver && (
                <p className="mt-1 text-[10px] text-negative">
                  {b?.used - 100}% over budget — escalation required
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-5 pt-4 border-t border-border grid grid-cols-2 gap-3">
        <div className="bg-muted/40 rounded-lg p-3">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Total Budget</p>
          <p className="text-[16px] font-700 tabular-nums text-foreground">$3.4M</p>
        </div>
        <div className="bg-warning-muted border border-warning/20 rounded-lg p-3">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Overspend</p>
          <p className="text-[16px] font-700 tabular-nums text-warning">$218K</p>
        </div>
      </div>
    </div>
  );
}