'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Bell, CheckCheck, AlertTriangle, TrendingUp, CreditCard, ShieldCheck, Info } from 'lucide-react';

const notifications = [
  { id: 1, type: 'alert', icon: AlertTriangle, color: 'text-negative bg-negative/10', title: 'Marketing budget at 93%', body: 'Marketing spend has reached 93% of the monthly allocation. Consider reviewing upcoming campaigns.', time: '2 hours ago', read: false },
  { id: 2, type: 'info', icon: TrendingUp, color: 'text-positive bg-positive/10', title: 'Revenue milestone reached', body: 'May 2026 revenue has surpassed $275,000 — a new monthly record for FY 2026.', time: '5 hours ago', read: false },
  { id: 3, type: 'transaction', icon: CreditCard, color: 'text-primary bg-primary/10', title: 'New transaction pending approval', body: 'R&D Lab Equipment purchase of $12,400 is awaiting your review and approval.', time: '1 day ago', read: false },
  { id: 4, type: 'compliance', icon: ShieldCheck, color: 'text-violet-400 bg-violet-400/10', title: 'Q1 audit report certified', body: 'The FY 2025 annual audit report has been certified and is available in Statements.', time: '2 days ago', read: true },
  { id: 5, type: 'info', icon: Info, color: 'text-amber-400 bg-amber-400/10', title: 'Payroll processed', body: 'May 2026 payroll of $38,200 has been successfully processed for the Engineering team.', time: '2 days ago', read: true },
  { id: 6, type: 'alert', icon: AlertTriangle, color: 'text-warning bg-warning/10', title: 'Personnel budget at 89%', body: 'Personnel costs are approaching the monthly budget ceiling. Review headcount expenses.', time: '3 days ago', read: true },
];

export default function NotificationsPage() {
  const [items, setItems] = useState(notifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAllRead = () => setItems(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id: number) => setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  const displayed = filter === 'unread' ? items.filter(n => !n.read) : items;
  const unreadCount = items.filter(n => !n.read).length;

  return (
    <AppLayout>
      <div className="min-h-full px-6 lg:px-8 xl:px-10 py-6 max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[22px] font-600 text-foreground tracking-tight flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-[10px] font-700 text-white px-1">{unreadCount}</span>
              )}
            </h1>
            <p className="text-[13px] text-muted-foreground mt-0.5">Alerts, updates, and activity</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5 border border-border">
              {(['all', 'unread'] as const).map((f) => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-md text-[12px] font-500 capitalize transition-all ${filter === f ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                  {f}
                </button>
              ))}
            </div>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card text-[12px] text-muted-foreground hover:text-foreground transition-all">
                <CheckCheck size={13} /><span>Mark all read</span>
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {displayed.length === 0 && (
            <div className="bg-card border border-border rounded-xl p-10 text-center">
              <Bell size={32} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-[14px] text-muted-foreground">No unread notifications</p>
            </div>
          )}
          {displayed.map((n) => {
            const NIcon = n.icon;
            return (
              <div key={n.id}
                onClick={() => markRead(n.id)}
                className={`bg-card border rounded-xl p-4 flex gap-4 cursor-pointer transition-all hover:border-primary/30 ${n.read ? 'border-border opacity-70' : 'border-primary/20'}`}>
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 ${n.color}`}>
                  <NIcon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-[13px] font-600 ${n.read ? 'text-muted-foreground' : 'text-foreground'}`}>{n.title}</p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[11px] text-muted-foreground whitespace-nowrap">{n.time}</span>
                      {!n.read && <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />}
                    </div>
                  </div>
                  <p className="text-[12px] text-muted-foreground mt-0.5 leading-relaxed">{n.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
