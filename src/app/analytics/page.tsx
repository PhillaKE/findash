'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { TrendingUp, TrendingDown, Download } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const monthlyData = [
  { month: 'Nov', revenue: 198000, expenses: 142000, profit: 56000 },
  { month: 'Dec', revenue: 215000, expenses: 158000, profit: 57000 },
  { month: 'Jan', revenue: 224000, expenses: 161000, profit: 63000 },
  { month: 'Feb', revenue: 231000, expenses: 168000, profit: 63000 },
  { month: 'Mar', revenue: 248000, expenses: 172000, profit: 76000 },
  { month: 'Apr', revenue: 262000, expenses: 179000, profit: 83000 },
  { month: 'May', revenue: 278000, expenses: 191000, profit: 87000 },
];

const categoryData = [
  { category: 'Personnel', amount: 142500 },
  { category: 'Infrastructure', amount: 38200 },
  { category: 'Marketing', amount: 27800 },
  { category: 'R&D', amount: 54100 },
  { category: 'Operations', amount: 19400 },
  { category: 'Legal', amount: 8900 },
];

const kpis = [
  { label: 'Total Revenue', value: '$278,000', change: '+6.1%', up: true },
  { label: 'Total Expenses', value: '$191,000', change: '+6.7%', up: false },
  { label: 'Net Profit', value: '$87,000', change: '+4.8%', up: true },
  { label: 'Profit Margin', value: '31.3%', change: '+0.2pp', up: true },
];

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<'revenue' | 'expenses'>('revenue');

  return (
    <AppLayout>
      <div className="min-h-full px-6 lg:px-8 xl:px-10 py-6 max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[22px] font-600 text-foreground tracking-tight">Analytics</h1>
            <p className="text-[13px] text-muted-foreground mt-0.5">Financial performance insights &nbsp;·&nbsp; Last 7 months</p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card text-[12px] text-muted-foreground hover:text-foreground transition-all w-fit">
            <Download size={13} /><span>Export Report</span>
          </button>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {kpis.map((k) => (
            <div key={k.label} className="bg-card border border-border rounded-xl p-4">
              <p className="text-[12px] text-muted-foreground font-500 mb-2">{k.label}</p>
              <p className="text-[22px] font-700 text-foreground">{k.value}</p>
              <div className="flex items-center gap-1 mt-1">
                {k.up ? <TrendingUp size={12} className="text-positive" /> : <TrendingDown size={12} className="text-negative" />}
                <span className={`text-[11px] ${k.up ? 'text-positive' : 'text-negative'}`}>{k.change} vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2 bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[14px] font-600 text-foreground">Revenue vs Expenses</h2>
              <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5 border border-border">
                {(['revenue', 'expenses'] as const).map((t) => (
                  <button key={t} onClick={() => setActiveTab(t)}
                    className={`px-3 py-1 rounded-md text-[11px] font-500 capitalize transition-all ${activeTab === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={monthlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, '']} contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                {activeTab === 'revenue' && <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" fill="url(#revGrad)" strokeWidth={2} dot={false} />}
                {activeTab === 'expenses' && <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#f43f5e" fill="url(#expGrad)" strokeWidth={2} dot={false} />}
                <Area type="monotone" dataKey="profit" name="Profit" stroke="#22c55e" fill="none" strokeWidth={2} strokeDasharray="4 2" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-xl p-5">
            <h2 className="text-[14px] font-600 text-foreground mb-4">Expense Breakdown</h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="category" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={80} />
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Amount']} contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="amount" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
