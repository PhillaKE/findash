'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

// Backend integration point: replace with API call to /api/financials/expenses/by-category
const data = [
  { category: 'Personnel', amount: 1240000, budget: 1200000, overBudget: true },
  { category: 'Infrastructure', amount: 580000, budget: 620000, overBudget: false },
  { category: 'Marketing', amount: 420000, budget: 380000, overBudget: true },
  { category: 'R&D', amount: 390000, budget: 450000, overBudget: false },
  { category: 'Operations', amount: 278000, budget: 250000, overBudget: true },
  { category: 'Legal', amount: 100516, budget: 120000, overBudget: false },
];

const formatK = (v: number) => `$${(v / 1000).toFixed(0)}K`;

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const row = data.find((d) => d.category === label);
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2.5 shadow-elevated text-[12px]">
      <p className="font-600 text-foreground mb-2">{label}</p>
      <div className="flex justify-between gap-5">
        <span className="text-muted-foreground">Actual</span>
        <span className="font-600 tabular-nums text-foreground">{formatK(payload[0]?.value ?? 0)}</span>
      </div>
      {row && (
        <div className="flex justify-between gap-5">
          <span className="text-muted-foreground">Budget</span>
          <span className="font-600 tabular-nums text-muted-foreground">{formatK(row.budget)}</span>
        </div>
      )}
      {row?.overBudget && (
        <p className="mt-1.5 text-[11px] text-warning font-500">⚠ Over budget</p>
      )}
    </div>
  );
}

export default function ExpenseCategoryChartInner() {
  return (
    <div className="card-elevated p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[14px] font-600 text-foreground">Expense Breakdown</h2>
          <p className="text-[11px] text-muted-foreground mt-0.5">By category — May 2026</p>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-primary/70" />
            Actual
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-warning/40" />
            Over budget
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barSize={28}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
            dy={8}
          />
          <YAxis
            tickFormatter={formatK}
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
            width={50}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell
                key={`cell-${entry.category}`}
                fill={entry.overBudget ? 'var(--warning)' : 'var(--primary)'}
                fillOpacity={entry.overBudget ? 0.8 : 0.7}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {data.map((row) => (
          <div key={`exp-row-${row.category}`} className="flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground truncate">{row.category}</span>
            <span className={`font-500 tabular-nums ml-1 ${row.overBudget ? 'text-warning' : 'text-foreground'}`}>
              {formatK(row.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}