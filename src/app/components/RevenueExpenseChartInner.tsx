'use client';

import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Backend integration point: replace with API call to /api/financials/revenue-expense?period=monthly
const monthlyData = [
  { period: 'Jun', revenue: 3840000, expenses: 2560000 },
  { period: 'Jul', revenue: 4120000, expenses: 2780000 },
  { period: 'Aug', revenue: 3950000, expenses: 2890000 },
  { period: 'Sep', revenue: 4310000, expenses: 2640000 },
  { period: 'Oct', revenue: 4580000, expenses: 2920000 },
  { period: 'Nov', revenue: 4210000, expenses: 3080000 },
  { period: 'Dec', revenue: 4890000, expenses: 3150000 },
  { period: 'Jan', revenue: 3620000, expenses: 2980000 },
  { period: 'Feb', revenue: 3810000, expenses: 2820000 },
  { period: 'Mar', revenue: 4140000, expenses: 2760000 },
  { period: 'Apr', revenue: 4650000, expenses: 2940000 },
  { period: 'May', revenue: 4821340, expenses: 3008516 },
];

const quarterlyData = [
  { period: 'Q2 2025', revenue: 12210000, expenses: 8230000 },
  { period: 'Q3 2025', revenue: 12840000, expenses: 8450000 },
  { period: 'Q4 2025', revenue: 13090000, expenses: 9230000 },
  { period: 'Q1 2026', revenue: 11570000, expenses: 8560000 },
  { period: 'Q2 2026', revenue: 13472340, expenses: 8702516 },
];

const formatValue = (v: number) =>
  v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : `$${(v / 1000).toFixed(0)}K`;

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2.5 shadow-elevated text-[12px]">
      <p className="font-600 text-foreground mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={`tt-${entry.name}`} className="flex items-center justify-between gap-6">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.name}</span>
          </span>
          <span className="font-600 tabular-nums text-foreground">{formatValue(entry.value)}</span>
        </div>
      ))}
      {payload.length === 2 && (
        <div className="mt-1.5 pt-1.5 border-t border-border flex items-center justify-between gap-6">
          <span className="text-muted-foreground">Net</span>
          <span className={`font-600 tabular-nums ${payload[0].value - payload[1].value >= 0 ? 'text-positive' : 'text-negative'}`}>
            {formatValue(payload[0].value - payload[1].value)}
          </span>
        </div>
      )}
    </div>
  );
}

export default function RevenueExpenseChartInner() {
  const [view, setView] = useState<'monthly' | 'quarterly'>('monthly');
  const data = view === 'monthly' ? monthlyData : quarterlyData;

  return (
    <div className="card-elevated p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[14px] font-600 text-foreground">Revenue vs Expenses</h2>
          <p className="text-[11px] text-muted-foreground mt-0.5">12-month rolling trend</p>
        </div>
        <div className="flex items-center bg-muted rounded-md p-0.5 border border-border">
          {(['monthly', 'quarterly'] as const).map((v) => (
            <button
              key={`rv-${v}`}
              onClick={() => setView(v)}
              className={`px-3 py-1 rounded text-[11px] font-500 transition-all duration-150 capitalize ${
                view === v ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="gradExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--negative)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--negative)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="period"
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
            dy={8}
          />
          <YAxis
            tickFormatter={formatValue}
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
            width={56}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            name="Revenue"
            stroke="var(--primary)"
            strokeWidth={2}
            fill="url(#gradRevenue)"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0, fill: 'var(--primary)' }}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            name="Expenses"
            stroke="var(--negative)"
            strokeWidth={2}
            fill="url(#gradExpenses)"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0, fill: 'var(--negative)' }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-3 flex items-center gap-5">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-0.5 rounded-full bg-primary" />
          <span className="text-[11px] text-muted-foreground">Revenue</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-0.5 rounded-full bg-negative" />
          <span className="text-[11px] text-muted-foreground">Expenses</span>
        </div>
        <div className="ml-auto text-[11px] text-muted-foreground">
          Avg margin: <span className="text-positive font-500">37.6%</span>
        </div>
      </div>
    </div>
  );
}