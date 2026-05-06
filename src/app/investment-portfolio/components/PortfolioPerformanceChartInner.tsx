'use client';

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

// Backend integration point: replace with API call to /api/portfolio/performance?benchmark=sp500
const data = [
  { month: 'Jun', portfolio: 100.0, benchmark: 100.0 },
  { month: 'Jul', portfolio: 103.2, benchmark: 102.1 },
  { month: 'Aug', portfolio: 106.8, benchmark: 104.4 },
  { month: 'Sep', portfolio: 104.1, benchmark: 105.8 },
  { month: 'Oct', portfolio: 98.4, benchmark: 102.3 },
  { month: 'Nov', portfolio: 95.7, benchmark: 100.1 },
  { month: 'Dec', portfolio: 101.3, benchmark: 103.7 },
  { month: 'Jan', portfolio: 99.2, benchmark: 101.4 },
  { month: 'Feb', portfolio: 103.8, benchmark: 104.2 },
  { month: 'Mar', portfolio: 107.6, benchmark: 106.1 },
  { month: 'Apr', portfolio: 110.4, benchmark: 108.3 },
  { month: 'May', portfolio: 111.8, benchmark: 109.7 },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2.5 shadow-elevated text-[12px]">
      <p className="font-600 text-foreground mb-2">{label} 2026</p>
      {payload.map((entry) => (
        <div key={`pf-tt-${entry.name}`} className="flex items-center justify-between gap-5">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.name}</span>
          </span>
          <span className="font-600 tabular-nums text-foreground">
            {entry.value > 0 ? '+' : ''}{(entry.value - 100).toFixed(1)}%
          </span>
        </div>
      ))}
      {payload.length === 2 && (
        <div className="mt-1.5 pt-1.5 border-t border-border flex items-center justify-between gap-5">
          <span className="text-muted-foreground">Alpha</span>
          <span className={`font-600 tabular-nums ${payload[0].value >= payload[1].value ? 'text-positive' : 'text-negative'}`}>
            {payload[0].value >= payload[1].value ? '+' : ''}{(payload[0].value - payload[1].value).toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
}

export default function PortfolioPerformanceChartInner() {
  return (
    <div className="card-elevated p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[14px] font-600 text-foreground">Portfolio vs S&P 500</h2>
          <p className="text-[11px] text-muted-foreground mt-0.5">Indexed to 100 — Jun 2025 to May 2026</p>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="inline-block w-3 h-0.5 bg-primary rounded-full" />
            FinDash Portfolio
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="inline-block w-3 h-0.5 bg-muted-foreground rounded-full" style={{ borderTop: '2px dashed var(--muted-foreground)' }} />
            S&P 500
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
            dy={8}
          />
          <YAxis
            domain={[90, 120]}
            tickFormatter={(v) => `${v}`}
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <ReferenceLine y={100} stroke="var(--border)" strokeDasharray="4 4" />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="portfolio"
            name="Portfolio"
            stroke="var(--primary)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0, fill: 'var(--primary)' }}
          />
          <Line
            type="monotone"
            dataKey="benchmark"
            name="S&P 500"
            stroke="var(--muted-foreground)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            dot={false}
            activeDot={{ r: 3, strokeWidth: 0, fill: 'var(--muted-foreground)' }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-3 flex items-center gap-4 pt-3 border-t border-border text-[11px] text-muted-foreground">
        <span>Portfolio YTD: <span className="text-positive font-600">+11.8%</span></span>
        <span>S&P 500 YTD: <span className="text-foreground font-600">+9.7%</span></span>
        <span className="ml-auto">Max drawdown period: <span className="text-negative font-600">Aug–Nov 2025</span></span>
      </div>
    </div>
  );
}