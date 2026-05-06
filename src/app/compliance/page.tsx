'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { ShieldCheck, CheckCircle, AlertTriangle, FileText, Lock, Eye, RefreshCw } from 'lucide-react';

const complianceItems = [
  { id: 1, title: 'SOX Compliance — FY 2025', category: 'Regulatory', status: 'Compliant', lastReview: 'Feb 14, 2026', nextReview: 'Feb 14, 2027', risk: 'Low' },
  { id: 2, title: 'GDPR Data Processing Agreement', category: 'Data Privacy', status: 'Compliant', lastReview: 'Jan 10, 2026', nextReview: 'Jan 10, 2027', risk: 'Low' },
  { id: 3, title: 'PCI DSS — Payment Security', category: 'Security', status: 'Review Required', lastReview: 'Mar 1, 2026', nextReview: 'Jun 1, 2026', risk: 'Medium' },
  { id: 4, title: 'AML Policy — Anti-Money Laundering', category: 'Financial', status: 'Compliant', lastReview: 'Apr 15, 2026', nextReview: 'Apr 15, 2027', risk: 'Low' },
  { id: 5, title: 'Internal Audit — Q1 2026', category: 'Audit', status: 'Compliant', lastReview: 'Apr 5, 2026', nextReview: 'Jul 5, 2026', risk: 'Low' },
  { id: 6, title: 'Vendor Risk Assessment', category: 'Third Party', status: 'Pending', lastReview: 'Dec 1, 2025', nextReview: 'Jun 1, 2026', risk: 'High' },
];

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle }> = {
  Compliant: { color: 'text-positive bg-positive/10', icon: CheckCircle },
  'Review Required': { color: 'text-warning bg-warning/10', icon: AlertTriangle },
  Pending: { color: 'text-negative bg-negative/10', icon: AlertTriangle },
};

const riskColors: Record<string, string> = {
  Low: 'text-positive bg-positive/10',
  Medium: 'text-warning bg-warning/10',
  High: 'text-negative bg-negative/10',
};

export default function CompliancePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Regulatory', 'Data Privacy', 'Security', 'Financial', 'Audit', 'Third Party'];

  const filtered = activeCategory === 'All' ? complianceItems : complianceItems.filter(c => c.category === activeCategory);
  const compliantCount = complianceItems.filter(c => c.status === 'Compliant').length;

  return (
    <AppLayout>
      <div className="min-h-full px-6 lg:px-8 xl:px-10 py-6 max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[22px] font-600 text-foreground tracking-tight">Compliance</h1>
            <p className="text-[13px] text-muted-foreground mt-0.5">Regulatory &amp; policy compliance status</p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card text-[12px] text-muted-foreground hover:text-foreground transition-all w-fit">
            <RefreshCw size={13} /><span>Refresh Status</span>
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] text-muted-foreground font-500">Overall Status</span>
              <div className="h-8 w-8 rounded-lg bg-positive/10 flex items-center justify-center">
                <ShieldCheck size={15} className="text-positive" />
              </div>
            </div>
            <p className="text-[24px] font-700 text-positive">Compliant</p>
            <span className="text-[11px] text-muted-foreground">{compliantCount}/{complianceItems.length} items passing</span>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] text-muted-foreground font-500">Pending Reviews</span>
              <div className="h-8 w-8 rounded-lg bg-warning/10 flex items-center justify-center">
                <Eye size={15} className="text-warning" />
              </div>
            </div>
            <p className="text-[24px] font-700 text-foreground">{complianceItems.filter(c => c.status !== 'Compliant').length}</p>
            <span className="text-[11px] text-muted-foreground">Require attention</span>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] text-muted-foreground font-500">High Risk Items</span>
              <div className="h-8 w-8 rounded-lg bg-negative/10 flex items-center justify-center">
                <Lock size={15} className="text-negative" />
              </div>
            </div>
            <p className="text-[24px] font-700 text-foreground">{complianceItems.filter(c => c.risk === 'High').length}</p>
            <span className="text-[11px] text-muted-foreground">Immediate action needed</span>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-5">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-500 border transition-all ${activeCategory === cat ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/40 bg-card'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Compliance list */}
        <div className="space-y-3">
          {filtered.map((item) => {
            const cfg = statusConfig[item.status];
            const StatusIcon = cfg.icon;
            return (
              <div key={item.id} className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-primary/30 transition-all">
                <div className="flex items-start gap-3">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.color}`}>
                    <StatusIcon size={16} />
                  </div>
                  <div>
                    <p className="text-[13px] font-600 text-foreground">{item.title}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{item.category}</span>
                      <span className="text-[11px] text-muted-foreground">Last reviewed: {item.lastReview}</span>
                      <span className="text-[11px] text-muted-foreground">·</span>
                      <span className="text-[11px] text-muted-foreground">Next: {item.nextReview}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`text-[10px] font-500 px-2 py-0.5 rounded-full ${riskColors[item.risk]}`}>{item.risk} Risk</span>
                  <span className={`text-[10px] font-500 px-2 py-0.5 rounded-full ${cfg.color}`}>{item.status}</span>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-muted text-[12px] text-muted-foreground hover:text-foreground transition-all">
                    <FileText size={13} /><span>View</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
