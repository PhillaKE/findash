'use client';

import React, { useState } from 'react';
import { RefreshCw, Download, ChevronDown, Filter, TrendingUp } from 'lucide-react';

const sectors = ['All Sectors', 'Technology', 'Healthcare', 'Financials', 'Energy', 'Consumer', 'Industrials'];
const statusOptions = ['All Status', 'Active', 'Under Review', 'Divested'];

export default function PortfolioHeader() {
  const [sector, setSector] = useState('All Sectors');
  const [status, setStatus] = useState('All Status');
  const [sectorOpen, setSectorOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
          <TrendingUp size={18} className="text-primary" />
        </div>
        <div>
          <h1 className="text-[22px] font-600 text-foreground tracking-tight">Investment Portfolio</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">
            14 active holdings &nbsp;·&nbsp; Benchmark: S&P 500 &nbsp;·&nbsp;
            <span className="text-positive">●</span>
            <span className="ml-1">Live — May 6, 2026</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {/* Sector filter */}
        <div className="relative">
          <button
            onClick={() => { setSectorOpen(!sectorOpen); setStatusOpen(false); }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-card text-[12px] text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-150"
          >
            <Filter size={13} />
            <span>{sector}</span>
            <ChevronDown size={12} />
          </button>
          {sectorOpen && (
            <div className="absolute right-0 top-full mt-1 z-20 w-44 bg-card border border-border rounded-lg shadow-elevated py-1">
              {sectors?.map((s) => (
                <button
                  key={`sector-opt-${s}`}
                  onClick={() => { setSector(s); setSectorOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-[12px] transition-colors duration-100 ${
                    sector === s ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status filter */}
        <div className="relative">
          <button
            onClick={() => { setStatusOpen(!statusOpen); setSectorOpen(false); }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-card text-[12px] text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-150"
          >
            <span>{status}</span>
            <ChevronDown size={12} />
          </button>
          {statusOpen && (
            <div className="absolute right-0 top-full mt-1 z-20 w-40 bg-card border border-border rounded-lg shadow-elevated py-1">
              {statusOptions?.map((s) => (
                <button
                  key={`status-opt-${s}`}
                  onClick={() => { setStatus(s); setStatusOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-[12px] transition-colors duration-100 ${
                    status === s ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleRefresh}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card text-[12px] text-muted-foreground hover:text-foreground transition-all duration-150"
        >
          <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card text-[12px] text-muted-foreground hover:text-foreground transition-all duration-150">
          <Download size={13} />
          <span>Export Holdings</span>
        </button>
      </div>
    </div>
  );
}