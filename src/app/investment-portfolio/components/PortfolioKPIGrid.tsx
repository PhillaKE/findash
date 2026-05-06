import React from 'react';
import MetricCard from '@/components/ui/MetricCard';
import { DollarSign, TrendingUp, BarChart2, ArrowDownRight } from 'lucide-react';

// Bento plan: 5 cards → grid-cols-5 → single row all equal, hero spans 2 cols (Portfolio Value)
// row 1: hero(2) + 3 regular = 5 total ✓

export default function PortfolioKPIGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
      {/* Hero — Portfolio Value */}
      <div className="lg:col-span-2">
        <MetricCard
          label="Total Portfolio Value"
          value="$8,412,640"
          subValue="Across 14 active holdings"
          delta={11.8}
          deltaLabel="YTD return vs Jan 1 basis"
          variant="primary"
          hero
          icon={<DollarSign size={14} />}
          className="h-full"
        />
      </div>

      <MetricCard
        label="YTD Return"
        value="+11.8%"
        subValue="+$884,200 absolute gain"
        delta={2.1}
        deltaLabel="Outperforming S&P 500 (9.7%)"
        variant="positive"
        icon={<TrendingUp size={14} />}
      />

      <MetricCard
        label="Sharpe Ratio"
        value="1.42"
        subValue="Risk-adjusted return"
        deltaLabel="Above 1.0 threshold — good quality"
        variant="default"
        icon={<BarChart2 size={14} />}
      />

      <MetricCard
        label="Max Drawdown"
        value="-6.3%"
        subValue="Aug–Oct 2025 correction"
        delta={-6.3}
        deltaLabel="Recovered — portfolio at new high"
        variant="negative"
        icon={<ArrowDownRight size={14} />}
      />
    </div>
  );
}