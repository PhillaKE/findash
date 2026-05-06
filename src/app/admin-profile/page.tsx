'use client';

import React from 'react';
import AppLayout from '@/components/AppLayout';
import { User, Mail, Shield, Calendar, Activity, TrendingUp, CreditCard, BarChart3, Edit, LogOut } from 'lucide-react';
import Link from 'next/link';

const recentActivity = [
  { action: 'Exported Q1 2026 Balance Sheet', time: '2 hours ago', icon: BarChart3 },
  { action: 'Approved R&D Lab Equipment expense', time: '1 day ago', icon: CreditCard },
  { action: 'Updated Marketing budget allocation', time: '2 days ago', icon: TrendingUp },
  { action: 'Reviewed May 2026 Income Statement', time: '3 days ago', icon: Activity },
  { action: 'Added new vendor — CloudOps Inc.', time: '5 days ago', icon: User },
];

const permissions = [
  { label: 'Financial Dashboard', access: 'Full Access' },
  { label: 'Investment Portfolio', access: 'Full Access' },
  { label: 'Expense Tracking', access: 'Full Access' },
  { label: 'Transactions', access: 'Full Access' },
  { label: 'Budgets', access: 'Full Access' },
  { label: 'Analytics', access: 'Full Access' },
  { label: 'Statements', access: 'Full Access' },
  { label: 'Compliance', access: 'Full Access' },
  { label: 'Settings', access: 'Full Access' },
];

export default function AdminProfilePage() {
  return (
    <AppLayout>
      <div className="min-h-full px-6 lg:px-8 xl:px-10 py-6 max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[22px] font-600 text-foreground tracking-tight">Admin Profile</h1>
            <p className="text-[13px] text-muted-foreground mt-0.5">Account details &amp; permissions</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/settings" className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card text-[12px] text-muted-foreground hover:text-foreground transition-all">
              <Edit size={13} /><span>Edit Profile</span>
            </Link>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-negative/30 bg-negative/5 text-[12px] text-negative hover:bg-negative/10 transition-all">
              <LogOut size={13} /><span>Sign Out</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* Profile card */}
          <div className="xl:col-span-1 space-y-4">
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center text-[28px] font-700 text-primary mx-auto mb-4">HP</div>
              <h2 className="text-[16px] font-700 text-foreground">Hilary P</h2>
              <p className="text-[12px] text-muted-foreground mt-0.5">Administrator</p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-600">
                <Shield size={11} /> Admin Role
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 space-y-3">
              <h3 className="text-[13px] font-600 text-foreground">Contact Details</h3>
              <div className="flex items-center gap-3 text-[12px]">
                <Mail size={14} className="text-muted-foreground flex-shrink-0" />
                <span className="text-foreground">hilary.p@findash.io</span>
              </div>
              <div className="flex items-center gap-3 text-[12px]">
                <User size={14} className="text-muted-foreground flex-shrink-0" />
                <span className="text-foreground">Finance Department</span>
              </div>
              <div className="flex items-center gap-3 text-[12px]">
                <Calendar size={14} className="text-muted-foreground flex-shrink-0" />
                <span className="text-foreground">Member since Jan 2024</span>
              </div>
              <div className="flex items-center gap-3 text-[12px]">
                <Activity size={14} className="text-muted-foreground flex-shrink-0" />
                <span className="text-foreground">Last login: May 6, 2026 09:36 UTC</span>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="xl:col-span-2 space-y-5">
            {/* Permissions */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="text-[14px] font-600 text-foreground mb-4">Access Permissions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {permissions?.map((p) => (
                  <div key={p?.label} className="flex items-center justify-between px-3 py-2 bg-muted/40 rounded-lg">
                    <span className="text-[12px] text-foreground">{p?.label}</span>
                    <span className="text-[10px] font-500 text-positive bg-positive/10 px-2 py-0.5 rounded-full">{p?.access}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="text-[14px] font-600 text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity?.map((a, i) => {
                  const AIcon = a?.icon;
                  return (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <AIcon size={14} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-500 text-foreground truncate">{a?.action}</p>
                        <p className="text-[10px] text-muted-foreground">{a?.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
