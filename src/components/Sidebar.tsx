'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  TrendingUp,
  CreditCard,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  LogOut,
  ShieldCheck,
  PieChart,
  FileText,
  Wallet,
} from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';


const navGroups = [
  {
    label: 'Overview',
    items: [
      { href: '/', label: 'Financial Dashboard', icon: LayoutDashboard, badge: null },
      { href: '/investment-portfolio', label: 'Investment Portfolio', icon: TrendingUp, badge: '2' },
    ],
  },
  {
    label: 'Finance',
    items: [
      { href: '/expense-tracking', label: 'Expense Tracking', icon: Wallet, badge: null },
      { href: '/transactions', label: 'Transactions', icon: CreditCard, badge: '5' },
      { href: '/budgets', label: 'Budgets', icon: BarChart3, badge: null },
    ],
  },
  {
    label: 'Reports',
    items: [
      { href: '/analytics', label: 'Analytics', icon: PieChart, badge: null },
      { href: '/statements', label: 'Statements', icon: FileText, badge: null },
    ],
  },
];

const bottomItems = [
  { href: '/notifications', label: 'Notifications', icon: Bell, badge: '3' },
  { href: '/compliance', label: 'Compliance', icon: ShieldCheck, badge: null },
  { href: '/settings', label: 'Settings', icon: Settings, badge: null },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`relative flex flex-col h-full border-r border-border bg-card transition-all duration-300 ease-in-out flex-shrink-0 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 border-b border-border px-3 ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <AppLogo size={32} />
        {!collapsed && (
          <span className="font-semibold text-[15px] tracking-tight text-foreground">
            FinDash
          </span>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-[72px] z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-150"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
        {navGroups.map((group) => (
          <div key={`group-${group.label}`}>
            {!collapsed && (
              <p className="px-2 mb-1.5 text-[10px] font-600 uppercase tracking-widest text-muted-foreground">
                {group.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <li key={`nav-${item.href}-${item.label}`}>
                    <Link
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className={`group relative flex items-center gap-3 rounded-md px-2 py-2 text-[13px] font-medium transition-all duration-150 ${
                        active
                          ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:bg-muted hover:text-foreground'
                      } ${collapsed ? 'justify-center' : ''}`}
                    >
                      <Icon size={16} className="flex-shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.badge && (
                            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary/20 px-1 text-[10px] font-600 text-primary">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                      {collapsed && item.badge && (
                        <span className="absolute right-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[9px] font-700 text-white">
                          {item.badge}
                        </span>
                      )}
                      {collapsed && (
                        <span className="pointer-events-none absolute left-full ml-2 z-50 whitespace-nowrap rounded-md border border-border bg-secondary px-2 py-1 text-xs text-foreground opacity-0 shadow-elevated transition-opacity group-hover:opacity-100">
                          {item.label}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom items */}
      <div className="border-t border-border px-2 py-3 space-y-0.5">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={`bottom-${item.label}`}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`group relative flex items-center gap-3 rounded-md px-2 py-2 text-[13px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-150 ${
                collapsed ? 'justify-center' : ''
              }`}
            >
              <Icon size={16} className="flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-warning/20 px-1 text-[10px] font-600 text-warning">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {collapsed && (
                <span className="pointer-events-none absolute left-full ml-2 z-50 whitespace-nowrap rounded-md border border-border bg-secondary px-2 py-1 text-xs text-foreground opacity-0 shadow-elevated transition-opacity group-hover:opacity-100">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}

        {/* User profile */}
        <div className={`mt-2 pt-2 border-t border-border flex items-center gap-3 px-2 py-2 ${collapsed ? 'justify-center' : ''}`}>
          <Link
            href="/admin-profile"
            title={collapsed ? 'Admin Profile' : undefined}
            className="flex-shrink-0 h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center text-[11px] font-700 text-primary hover:bg-primary/30 transition-colors"
          >
            MA
          </Link>
          {!collapsed && (
            <Link href="/admin-profile" className="flex-1 min-w-0 hover:opacity-80 transition-opacity">
              <p className="text-[12px] font-500 text-foreground truncate">Hilary P</p>
              <p className="text-[10px] text-muted-foreground truncate">Admin</p>
            </Link>
          )}
          {!collapsed && (
            <button className="text-muted-foreground hover:text-negative transition-colors duration-150" aria-label="Sign out">
              <LogOut size={14} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}