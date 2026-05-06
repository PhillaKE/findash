'use client';

import React from 'react';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

// Backend integration point: replace with API call to /api/portfolio/sector-allocation
const sectors = [
  { name: 'Technology', value: 34, fill: 'var(--primary)' },
  { name: 'Healthcare', value: 18, fill: 'var(--accent)' },
  { name: 'Financials', value: 16, fill: '#a78bfa' },
  { name: 'Energy', value: 12, fill: 'var(--warning)' },
  { name: 'Consumer', value: 11, fill: '#f472b6' },
  { name: 'Industrials', value: 9, fill: 'var(--muted-foreground)' },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { fill: string } }>;
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-elevated text-[12px]">
      <div className="flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: payload[0].payload.fill }} />
        <span className="text-foreground font-600">{payload[0].name}</span>
        <span className="text-muted-foreground">{payload[0].value}%</span>
      </div>
    </div>
  );
}

export default function SectorAllocationChartInner() {
  return (
    <div className="card-elevated p-5">
      <h2 className="text-[14px] font-600 text-foreground mb-1">Sector Allocation</h2>
      <p className="text-[11px] text-muted-foreground mb-4">Portfolio weight by sector</p>

      <ResponsiveContainer width="100%" height={160}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="30%"
          outerRadius="90%"
          data={sectors}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar dataKey="value" background={{ fill: 'var(--muted)' }} cornerRadius={3} />
          <Tooltip content={<CustomTooltip />} />
        </RadialBarChart>
      </ResponsiveContainer>

      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
        {sectors.map((s) => (
          <div key={`sector-leg-${s.name}`} className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="inline-block w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.fill }} />
              {s.name}
            </span>
            <span className="text-[11px] font-600 tabular-nums text-foreground">{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}