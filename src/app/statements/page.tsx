'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { FileText, Download, Eye, Calendar } from 'lucide-react';

const statements = [
  { id: 'STMT-2026-05', name: 'May 2026 — Income Statement', type: 'Income Statement', period: 'May 1–31, 2026', generated: 'May 6, 2026', size: '248 KB', status: 'Final' },
  { id: 'STMT-2026-04', name: 'April 2026 — Income Statement', type: 'Income Statement', period: 'Apr 1–30, 2026', generated: 'May 1, 2026', size: '231 KB', status: 'Final' },
  { id: 'BAL-2026-Q1', name: 'Q1 2026 — Balance Sheet', type: 'Balance Sheet', period: 'Jan–Mar 2026', generated: 'Apr 5, 2026', size: '312 KB', status: 'Final' },
  { id: 'CF-2026-Q1', name: 'Q1 2026 — Cash Flow Statement', type: 'Cash Flow', period: 'Jan–Mar 2026', generated: 'Apr 5, 2026', size: '198 KB', status: 'Final' },
  { id: 'STMT-2026-03', name: 'March 2026 — Income Statement', type: 'Income Statement', period: 'Mar 1–31, 2026', generated: 'Apr 1, 2026', size: '224 KB', status: 'Final' },
  { id: 'STMT-2026-02', name: 'February 2026 — Income Statement', type: 'Income Statement', period: 'Feb 1–28, 2026', generated: 'Mar 1, 2026', size: '218 KB', status: 'Final' },
  { id: 'AUDIT-2025', name: 'FY 2025 — Audit Report', type: 'Audit Report', period: 'Jan–Dec 2025', generated: 'Feb 14, 2026', size: '1.2 MB', status: 'Certified' },
];

const typeColors: Record<string, string> = {
  'Income Statement': 'text-primary bg-primary/10',
  'Balance Sheet': 'text-violet-400 bg-violet-400/10',
  'Cash Flow': 'text-emerald-400 bg-emerald-400/10',
  'Audit Report': 'text-amber-400 bg-amber-400/10',
};

const statusColors: Record<string, string> = {
  Final: 'text-positive bg-positive/10',
  Certified: 'text-primary bg-primary/10',
  Draft: 'text-warning bg-warning/10',
};

export default function StatementsPage() {
  const [filter, setFilter] = useState('All');
  const types = ['All', 'Income Statement', 'Balance Sheet', 'Cash Flow', 'Audit Report'];

  const filtered = filter === 'All' ? statements : statements.filter(s => s.type === filter);

  return (
    <AppLayout>
      <div className="min-h-full px-6 lg:px-8 xl:px-10 py-6 max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[22px] font-600 text-foreground tracking-tight">Statements</h1>
            <p className="text-[13px] text-muted-foreground mt-0.5">Financial reports &amp; documents</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card text-[12px] text-muted-foreground hover:text-foreground transition-all">
              <Calendar size={13} /><span>Date Range</span>
            </button>
          </div>
        </div>

        {/* Type filter */}
        <div className="flex flex-wrap gap-2 mb-5">
          {types.map((t) => (
            <button key={t} onClick={() => setFilter(t)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-500 border transition-all ${filter === t ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/40 bg-card'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Statements list */}
        <div className="space-y-3">
          {filtered.map((s) => (
            <div key={s.id} className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-primary/30 transition-all">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FileText size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-[13px] font-600 text-foreground">{s.name}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className={`text-[10px] font-500 px-2 py-0.5 rounded-full ${typeColors[s.type] || 'text-muted-foreground bg-muted'}`}>{s.type}</span>
                    <span className="text-[11px] text-muted-foreground">{s.period}</span>
                    <span className="text-[11px] text-muted-foreground">·</span>
                    <span className="text-[11px] text-muted-foreground">Generated {s.generated}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:flex-shrink-0">
                <span className={`text-[10px] font-500 px-2 py-0.5 rounded-full ${statusColors[s.status] || ''}`}>{s.status}</span>
                <span className="text-[11px] text-muted-foreground">{s.size}</span>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-muted text-[12px] text-muted-foreground hover:text-foreground transition-all">
                  <Eye size={13} /><span>View</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-[12px] font-500 hover:bg-primary/90 transition-all">
                  <Download size={13} /><span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
