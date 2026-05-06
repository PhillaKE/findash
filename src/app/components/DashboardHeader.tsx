'use client';

import React, { useState } from 'react';
import { Calendar, ChevronDown, RefreshCw, Download, Filter } from 'lucide-react';

const timeRanges = ['Monthly', 'Quarterly'];
const categories = ['All Categories', 'Personnel', 'Infrastructure', 'Marketing', 'R&D', 'Operations', 'Legal'];

export default function DashboardHeader() {
  const [activeRange, setActiveRange] = useState('Monthly');
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-[22px] font-600 text-foreground tracking-tight">Financial Dashboard</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">
          Fiscal Year 2026 &nbsp;·&nbsp;
          <span className="text-positive">●</span>
          <span className="ml-1">Live — updated May 6, 2026 09:36 UTC</span>
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap justify-start sm:justify-end">
        {/* Time range toggle */}
        <div className="flex items-center bg-muted rounded-md p-0.5 border border-border shrink-0">
          {timeRanges?.map((range) => (
            <button
              key={`range-${range}`}
              onClick={() => setActiveRange(range)}
              className={`px-3 py-1.5 rounded text-[12px] font-500 transition-all duration-150 whitespace-nowrap ${
                activeRange === range
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Date picker */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-card text-[12px] text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-150 whitespace-nowrap shrink-0">
          <Calendar size={13} />
          <span>May 2026</span>
          <ChevronDown size={12} />
        </button>

        {/* Category filter */}
        <div className="relative shrink-0">
          <button
            onClick={() => setCategoryOpen(!categoryOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-card text-[12px] text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-150 whitespace-nowrap"
          >
            <Filter size={13} />
            <span>{activeCategory}</span>
            <ChevronDown size={12} />
          </button>
          {categoryOpen && (
            <div className="absolute right-0 top-full mt-1 z-20 w-44 bg-card border border-border rounded-lg shadow-elevated py-1">
              {categories?.map((cat) => (
                <button
                  key={`cat-${cat}`}
                  onClick={() => { setActiveCategory(cat); setCategoryOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-[12px] transition-colors duration-100 ${
                    activeCategory === cat
                      ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <button
          onClick={handleRefresh}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card text-[12px] text-muted-foreground hover:text-foreground transition-all duration-150 shrink-0"
          aria-label="Refresh data"
        >
          <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card text-[12px] text-muted-foreground hover:text-foreground transition-all duration-150 whitespace-nowrap shrink-0">
          <Download size={13} />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
}