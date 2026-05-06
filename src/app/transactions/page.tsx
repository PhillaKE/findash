'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { CreditCard, ArrowUpRight, ArrowDownRight, Search, Filter, Download } from 'lucide-react';

const transactions = [
  { id: 'TXN-2026-0501', description: 'AWS Cloud Services', category: 'Infrastructure', type: 'Debit', date: 'May 5, 2026', amount: -4820, balance: 284320 },
  { id: 'TXN-2026-0500', description: 'Client Payment — Acme Corp', category: 'Revenue', type: 'Credit', date: 'May 4, 2026', amount: 52000, balance: 289140 },
  { id: 'TXN-2026-0499', description: 'Payroll — Engineering', category: 'Personnel', type: 'Debit', date: 'May 4, 2026', amount: -38200, balance: 237140 },
  { id: 'TXN-2026-0498', description: 'Google Ads Campaign', category: 'Marketing', type: 'Debit', date: 'May 3, 2026', amount: -3100, balance: 275340 },
  { id: 'TXN-2026-0497', description: 'Client Payment — Globex', category: 'Revenue', type: 'Credit', date: 'May 2, 2026', amount: 18500, balance: 278440 },
  { id: 'TXN-2026-0496', description: 'Legal Retainer Fee', category: 'Legal', type: 'Debit', date: 'May 2, 2026', amount: -2500, balance: 259940 },
  { id: 'TXN-2026-0495', description: 'Office Supplies', category: 'Operations', type: 'Debit', date: 'May 1, 2026', amount: -640, balance: 262440 },
  { id: 'TXN-2026-0494', description: 'R&D Lab Equipment', category: 'R&D', type: 'Debit', date: 'Apr 30, 2026', amount: -12400, balance: 263080 },
  { id: 'TXN-2026-0493', description: 'SaaS Subscription Revenue', category: 'Revenue', type: 'Credit', date: 'Apr 29, 2026', amount: 8900, balance: 275480 },
  { id: 'TXN-2026-0492', description: 'Insurance Premium', category: 'Operations', type: 'Debit', date: 'Apr 28, 2026', amount: -3200, balance: 266580 },
];

export default function TransactionsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'All' | 'Credit' | 'Debit'>('All');

  const filtered = transactions.filter((t) => {
    const matchSearch = t.description.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || t.type === filter;
    return matchSearch && matchFilter;
  });

  const totalCredits = transactions.filter(t => t.type === 'Credit').reduce((s, t) => s + t.amount, 0);
  const totalDebits = transactions.filter(t => t.type === 'Debit').reduce((s, t) => s + Math.abs(t.amount), 0);

  return (
    <AppLayout>
      <div className="min-h-full px-6 lg:px-8 xl:px-10 py-6 max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[22px] font-600 text-foreground tracking-tight">Transactions</h1>
            <p className="text-[13px] text-muted-foreground mt-0.5">All account activity &nbsp;·&nbsp; May 2026</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card text-[12px] text-muted-foreground hover:text-foreground transition-all">
              <Download size={13} /><span>Export</span>
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] text-muted-foreground font-500">Total Transactions</span>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <CreditCard size={15} className="text-primary" />
              </div>
            </div>
            <p className="text-[24px] font-700 text-foreground">{transactions.length}</p>
            <span className="text-[11px] text-muted-foreground">This month</span>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] text-muted-foreground font-500">Total Credits</span>
              <div className="h-8 w-8 rounded-lg bg-positive/10 flex items-center justify-center">
                <ArrowDownRight size={15} className="text-positive" />
              </div>
            </div>
            <p className="text-[24px] font-700 text-positive">+${totalCredits.toLocaleString()}</p>
            <span className="text-[11px] text-muted-foreground">Inflows</span>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] text-muted-foreground font-500">Total Debits</span>
              <div className="h-8 w-8 rounded-lg bg-negative/10 flex items-center justify-center">
                <ArrowUpRight size={15} className="text-negative" />
              </div>
            </div>
            <p className="text-[24px] font-700 text-negative">-${totalDebits.toLocaleString()}</p>
            <span className="text-[11px] text-muted-foreground">Outflows</span>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1 max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-md border border-border bg-card text-[12px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
            />
          </div>
          <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5 border border-border">
            {(['All', 'Credit', 'Debit'] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md text-[12px] font-500 transition-all ${filter === f ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 text-muted-foreground font-500">Transaction ID</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-500">Description</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-500">Category</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-500">Date</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-500">Amount</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-500">Balance</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-muted-foreground font-mono text-[11px]">{t.id}</td>
                  <td className="px-4 py-3 text-foreground font-500">{t.description}</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.category}</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.date}</td>
                  <td className={`px-4 py-3 text-right font-600 ${t.amount > 0 ? 'text-positive' : 'text-negative'}`}>
                    {t.amount > 0 ? '+' : ''}${Math.abs(t.amount).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right text-foreground">${t.balance.toLocaleString()}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No transactions found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
