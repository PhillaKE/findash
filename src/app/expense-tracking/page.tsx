'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Wallet, TrendingDown, ArrowUpRight, ArrowDownRight, Filter, Download, Plus } from 'lucide-react';

const expenseData = [
  { category: 'Personnel', amount: 142500, budget: 160000, color: 'bg-blue-500', pct: 89 },
  { category: 'Infrastructure', amount: 38200, budget: 45000, color: 'bg-violet-500', pct: 85 },
  { category: 'Marketing', amount: 27800, budget: 30000, color: 'bg-amber-500', pct: 93 },
  { category: 'R&D', amount: 54100, budget: 60000, color: 'bg-emerald-500', pct: 90 },
  { category: 'Operations', amount: 19400, budget: 25000, color: 'bg-rose-500', pct: 78 },
  { category: 'Legal', amount: 8900, budget: 12000, color: 'bg-cyan-500', pct: 74 },
];

const recentExpenses = [
  { id: 'EXP-001', description: 'AWS Cloud Services', category: 'Infrastructure', date: 'May 5, 2026', amount: 4820, status: 'Approved' },
  { id: 'EXP-002', description: 'Payroll — Engineering', category: 'Personnel', date: 'May 4, 2026', amount: 38200, status: 'Approved' },
  { id: 'EXP-003', description: 'Google Ads Campaign', category: 'Marketing', date: 'May 3, 2026', amount: 3100, status: 'Pending' },
  { id: 'EXP-004', description: 'Legal Retainer Fee', category: 'Legal', date: 'May 2, 2026', amount: 2500, status: 'Approved' },
  { id: 'EXP-005', description: 'Office Supplies', category: 'Operations', date: 'May 1, 2026', amount: 640, status: 'Approved' },
  { id: 'EXP-006', description: 'R&D Lab Equipment', category: 'R&D', date: 'Apr 30, 2026', amount: 12400, status: 'Under Review' },
];

const statusColors: Record<string, string> = {
  Approved: 'text-positive bg-positive/10',
  Pending: 'text-warning bg-warning/10',
  'Under Review': 'text-primary bg-primary/10',
};

export default function ExpenseTrackingPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'details'>('overview');

  const totalSpent = expenseData.reduce((s, e) => s + e.amount, 0);
  const totalBudget = expenseData.reduce((s, e) => s + e.budget, 0);

  return (
    <AppLayout>
      <div className="min-h-full px-6 lg:px-8 xl:px-10 py-6 max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[22px] font-600 text-foreground tracking-tight">Expense Tracking</h1>
            <p className="text-[13px] text-muted-foreground mt-0.5">Fiscal Year 2026 &nbsp;·&nbsp; May 2026</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card text-[12px] text-muted-foreground hover:text-foreground transition-all">
              <Filter size={13} /><span>Filter</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card text-[12px] text-muted-foreground hover:text-foreground transition-all">
              <Download size={13} /><span>Export</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-[12px] font-500 hover:bg-primary/90 transition-all">
              <Plus size={13} /><span>Add Expense</span>
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] text-muted-foreground font-500">Total Spent</span>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wallet size={15} className="text-primary" />
              </div>
            </div>
            <p className="text-[24px] font-700 text-foreground">${totalSpent.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight size={12} className="text-negative" />
              <span className="text-[11px] text-negative">+8.2% vs last month</span>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] text-muted-foreground font-500">Total Budget</span>
              <div className="h-8 w-8 rounded-lg bg-positive/10 flex items-center justify-center">
                <TrendingDown size={15} className="text-positive" />
              </div>
            </div>
            <p className="text-[24px] font-700 text-foreground">${totalBudget.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowDownRight size={12} className="text-positive" />
              <span className="text-[11px] text-positive">Within allocation</span>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] text-muted-foreground font-500">Budget Remaining</span>
              <div className="h-8 w-8 rounded-lg bg-warning/10 flex items-center justify-center">
                <TrendingDown size={15} className="text-warning" />
              </div>
            </div>
            <p className="text-[24px] font-700 text-foreground">${(totalBudget - totalSpent).toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[11px] text-muted-foreground">{Math.round((totalSpent / totalBudget) * 100)}% utilized</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted rounded-lg p-1 w-fit mb-5 border border-border">
          {(['overview', 'details'] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-[12px] font-500 capitalize transition-all ${activeTab === tab ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {/* Category breakdown */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h2 className="text-[14px] font-600 text-foreground mb-4">Spending by Category</h2>
              <div className="space-y-4">
                {expenseData.map((e) => (
                  <div key={e.category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] text-foreground font-500">{e.category}</span>
                      <span className="text-[12px] text-muted-foreground">${e.amount.toLocaleString()} / ${e.budget.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full ${e.color} rounded-full transition-all`} style={{ width: `${e.pct}%` }} />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{e.pct}% of budget used</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent expenses */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h2 className="text-[14px] font-600 text-foreground mb-4">Recent Expenses</h2>
              <div className="space-y-3">
                {recentExpenses.slice(0, 5).map((exp) => (
                  <div key={exp.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-[12px] font-500 text-foreground">{exp.description}</p>
                      <p className="text-[10px] text-muted-foreground">{exp.category} · {exp.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[13px] font-600 text-foreground">${exp.amount.toLocaleString()}</p>
                      <span className={`text-[10px] font-500 px-1.5 py-0.5 rounded-full ${statusColors[exp.status]}`}>{exp.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-4 py-3 text-muted-foreground font-500">ID</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-500">Description</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-500">Category</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-500">Date</th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-500">Amount</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentExpenses.map((exp) => (
                  <tr key={exp.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-muted-foreground font-mono">{exp.id}</td>
                    <td className="px-4 py-3 text-foreground font-500">{exp.description}</td>
                    <td className="px-4 py-3 text-muted-foreground">{exp.category}</td>
                    <td className="px-4 py-3 text-muted-foreground">{exp.date}</td>
                    <td className="px-4 py-3 text-right text-foreground font-600">${exp.amount.toLocaleString()}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-[10px] font-500 ${statusColors[exp.status]}`}>{exp.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
