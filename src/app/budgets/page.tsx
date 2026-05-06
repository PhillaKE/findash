'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { BarChart3, Plus, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const budgets = [
  { id: 1, name: 'Personnel', allocated: 160000, spent: 142500, period: 'May 2026', color: 'bg-blue-500' },
  { id: 2, name: 'Infrastructure', allocated: 45000, spent: 38200, period: 'May 2026', color: 'bg-violet-500' },
  { id: 3, name: 'Marketing', allocated: 30000, spent: 27800, period: 'May 2026', color: 'bg-amber-500' },
  { id: 4, name: 'R&D', allocated: 60000, spent: 54100, period: 'May 2026', color: 'bg-emerald-500' },
  { id: 5, name: 'Operations', allocated: 25000, spent: 19400, period: 'May 2026', color: 'bg-rose-500' },
  { id: 6, name: 'Legal', allocated: 12000, spent: 8900, period: 'May 2026', color: 'bg-cyan-500' },
];

function getStatus(pct: number) {
  if (pct >= 90) return { label: 'At Risk', color: 'text-negative bg-negative/10', icon: AlertTriangle };
  if (pct >= 75) return { label: 'On Track', color: 'text-warning bg-warning/10', icon: TrendingUp };
  return { label: 'Healthy', color: 'text-positive bg-positive/10', icon: CheckCircle };
}

export default function BudgetsPage() {
  const [view, setView] = useState<'cards' | 'table'>('cards');

  const totalAllocated = budgets.reduce((s, b) => s + b.allocated, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);

  return (
    <AppLayout>
      <div className="min-h-full px-6 lg:px-8 xl:px-10 py-6 max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[22px] font-600 text-foreground tracking-tight">Budgets</h1>
            <p className="text-[13px] text-muted-foreground mt-0.5">Budget allocation &amp; utilization &nbsp;·&nbsp; May 2026</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5 border border-border">
              {(['cards', 'table'] as const).map((v) => (
                <button key={v} onClick={() => setView(v)}
                  className={`px-3 py-1.5 rounded-md text-[12px] font-500 capitalize transition-all ${view === v ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                  {v}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-[12px] font-500 hover:bg-primary/90 transition-all">
              <Plus size={13} /><span>New Budget</span>
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] text-muted-foreground font-500">Total Allocated</span>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <BarChart3 size={15} className="text-primary" />
              </div>
            </div>
            <p className="text-[24px] font-700 text-foreground">${totalAllocated.toLocaleString()}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] text-muted-foreground font-500">Total Spent</span>
              <div className="h-8 w-8 rounded-lg bg-negative/10 flex items-center justify-center">
                <TrendingUp size={15} className="text-negative" />
              </div>
            </div>
            <p className="text-[24px] font-700 text-foreground">${totalSpent.toLocaleString()}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] text-muted-foreground font-500">Remaining</span>
              <div className="h-8 w-8 rounded-lg bg-positive/10 flex items-center justify-center">
                <CheckCircle size={15} className="text-positive" />
              </div>
            </div>
            <p className="text-[24px] font-700 text-positive">${(totalAllocated - totalSpent).toLocaleString()}</p>
          </div>
        </div>

        {view === 'cards' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {budgets.map((b) => {
              const pct = Math.round((b.spent / b.allocated) * 100);
              const status = getStatus(pct);
              const StatusIcon = status.icon;
              return (
                <div key={b.id} className="bg-card border border-border rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${b.color}`} />
                      <span className="text-[14px] font-600 text-foreground">{b.name}</span>
                    </div>
                    <span className={`flex items-center gap-1 text-[10px] font-500 px-2 py-0.5 rounded-full ${status.color}`}>
                      <StatusIcon size={10} />{status.label}
                    </span>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-[12px] mb-1">
                      <span className="text-muted-foreground">Spent</span>
                      <span className="text-foreground font-600">${b.spent.toLocaleString()} <span className="text-muted-foreground font-400">/ ${b.allocated.toLocaleString()}</span></span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full ${b.color} rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>{pct}% utilized</span>
                    <span>${(b.allocated - b.spent).toLocaleString()} remaining</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-4 py-3 text-muted-foreground font-500">Category</th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-500">Allocated</th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-500">Spent</th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-500">Remaining</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-500">Utilization</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {budgets.map((b) => {
                  const pct = Math.round((b.spent / b.allocated) * 100);
                  const status = getStatus(pct);
                  const StatusIcon = status.icon;
                  return (
                    <tr key={b.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className={`h-2.5 w-2.5 rounded-full ${b.color}`} />
                          <span className="text-foreground font-500">{b.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-foreground">${b.allocated.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-foreground">${b.spent.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-positive">${(b.allocated - b.spent).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className={`h-full ${b.color} rounded-full`} style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-muted-foreground w-8 text-right">{pct}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`flex items-center gap-1 w-fit text-[10px] font-500 px-2 py-0.5 rounded-full ${status.color}`}>
                          <StatusIcon size={10} />{status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
