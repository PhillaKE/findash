import React from 'react';
import LoginForm from './components/LoginForm';

export default function SignUpLoginPage() {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] flex-col justify-between p-10 bg-card border-r border-border relative overflow-hidden">
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="h-9 w-9 rounded-lg bg-primary/20 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect x="2" y="12" width="4" height="6" rx="1" fill="var(--primary)" opacity="0.7" />
                <rect x="8" y="8" width="4" height="10" rx="1" fill="var(--primary)" opacity="0.85" />
                <rect x="14" y="4" width="4" height="14" rx="1" fill="var(--primary)" />
                <path d="M16 4 L18 2" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-[18px] font-700 text-foreground tracking-tight">FinDash</span>
          </div>

          <div className="space-y-6">
            <h2 className="text-[32px] font-700 text-foreground leading-tight tracking-tight">
              Financial intelligence<br />
              <span className="text-primary">at analyst speed.</span>
            </h2>
            <p className="text-[14px] text-muted-foreground leading-relaxed max-w-sm">
              Monitor revenue trends, track investment portfolio performance, and audit payment transactions — all from a single command center built for financial data teams.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4">
            {[
              { label: 'Data Points Tracked', value: '2.4M+' },
              { label: 'Avg. Query Time', value: '< 200ms' },
              { label: 'Portfolio Holdings', value: '14 Active' },
              { label: 'Reconciliation Rate', value: '99.8%' },
            ]?.map((stat) => (
              <div key={`stat-${stat?.label}`} className="bg-muted/40 rounded-lg p-3 border border-border">
                <p className="text-[11px] text-muted-foreground mb-1">{stat?.label}</p>
                <p className="text-[18px] font-700 tabular-nums text-foreground">{stat?.value}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-[11px] text-muted-foreground">
          © 2026 FinDash Analytics Inc. · Enterprise Financial Platform
        </p>
      </div>
      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <LoginForm />
      </div>
    </div>
  );
}