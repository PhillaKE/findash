import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

// Backend integration point: replace with API call to /api/portfolio/top-movers
const topMovers = {
  gainers: [
    { ticker: 'NVDA', name: 'NVIDIA Corp.', change: 18.4 },
    { ticker: 'META', name: 'Meta Platforms', change: 12.1 },
    { ticker: 'MSFT', name: 'Microsoft Corp.', change: 8.7 },
  ],
  losers: [
    { ticker: 'INTC', name: 'Intel Corp.', change: -14.2 },
    { ticker: 'PFE', name: 'Pfizer Inc.', change: -9.8 },
    { ticker: 'CVX', name: 'Chevron Corp.', change: -5.3 },
  ],
};

export default function TopMovers() {
  return (
    <div className="card-elevated p-5">
      <h2 className="text-[14px] font-600 text-foreground mb-3">Top Movers</h2>
      <div className="space-y-3">
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <TrendingUp size={12} className="text-positive" />
            <span className="text-[11px] font-500 text-positive uppercase tracking-wider">Gainers</span>
          </div>
          <div className="space-y-1.5">
            {topMovers?.gainers?.map((g) => (
              <div key={`gainer-${g?.ticker}`} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-700 text-foreground font-mono w-10">{g?.ticker}</span>
                  <span className="text-[11px] text-muted-foreground truncate">{g?.name}</span>
                </div>
                <span className="text-[12px] font-600 tabular-nums text-positive">+{g?.change}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-border pt-3">
          <div className="flex items-center gap-1.5 mb-2">
            <TrendingDown size={12} className="text-negative" />
            <span className="text-[11px] font-500 text-negative uppercase tracking-wider">Underperformers</span>
          </div>
          <div className="space-y-1.5">
            {topMovers?.losers?.map((l) => (
              <div key={`loser-${l?.ticker}`} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-700 text-foreground font-mono w-10">{l?.ticker}</span>
                  <span className="text-[11px] text-muted-foreground truncate">{l?.name}</span>
                </div>
                <span className="text-[12px] font-600 tabular-nums text-negative">{l?.change}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}