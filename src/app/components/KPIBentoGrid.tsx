import React from 'react';
import MetricCard from '@/components/ui/MetricCard';
import { DollarSign, Percent, Landmark, AlertTriangle, TrendingUp } from 'lucide-react';

// Bento grid plan: 6 cards → grid-cols-3 → row 1: hero (col-span-2) + 1 regular, row 2: 3 regular
// Hero = Net Revenue (most important North Star metric)

export default function KPIBentoGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
      {/* Hero card — Net Revenue — spans 2 cols */}
      <div className="sm:col-span-2 lg:col-span-2">
        <MetricCard
          label="Net Revenue"
          value="$4,821,340"
          subValue="vs $4,210,500 last period"
          delta={14.5}
          deltaLabel="vs same period last year — above forecast"
          variant="primary"
          hero
          icon={<DollarSign size={14} />}
          className="h-full"
        />
      </div>

      {/* Expense Ratio */}
      <MetricCard
        label="Expense Ratio"
        value="62.4%"
        subValue="$3,008,516 total expenses"
        delta={-2.1}
        deltaLabel="Improved from 64.5% last month"
        variant="positive"
        icon={<Percent size={14} />}
      />

      {/* Cash Position */}
      <MetricCard
        label="Cash Position"
        value="$2,104,820"
        subValue="Liquid assets available"
        delta={5.3}
        deltaLabel="30-day rolling average"
        variant="default"
        icon={<Landmark size={14} />}
      />

      {/* Budget Variance — WARNING state */}
      <MetricCard
        label="Budget Variance"
        value="+$218,400"
        subValue="Over Q2 operating budget"
        delta={-8.7}
        deltaLabel="Marketing & Ops overspent — review required"
        variant="warning"
        icon={<AlertTriangle size={14} />}
      />

      {/* Portfolio ROI */}
      <MetricCard
        label="Portfolio ROI"
        value="11.8%"
        subValue="YTD across 14 holdings"
        delta={3.2}
        deltaLabel="Outperforming S&P 500 by 2.1%"
        variant="positive"
        icon={<TrendingUp size={14} />}
      />

      {/* Transaction Volume — shown as 7th but we have 6, so this replaces a gap */}
    </div>
  );
}