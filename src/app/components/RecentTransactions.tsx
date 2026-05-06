import React from 'react';
import StatusBadge from '@/components/ui/StatusBadge';
import { ArrowUpRight, ArrowDownLeft, CreditCard } from 'lucide-react';

// Backend integration point: replace with API call to /api/transactions/recent?limit=8
const transactions = [
  { id: 'txn-001', description: 'AWS Infrastructure — May billing', amount: -48200, type: 'expense', category: 'Infrastructure', status: 'settled' as const, date: 'May 5' },
  { id: 'txn-002', description: 'Acme Corp — Q2 license payment', amount: 320000, type: 'revenue', category: 'License', status: 'settled' as const, date: 'May 5' },
  { id: 'txn-003', description: 'Payroll processing — May cycle', amount: -412000, type: 'expense', category: 'Personnel', status: 'processing' as const, date: 'May 4' },
  { id: 'txn-004', description: 'Meridian Ventures — Series B tranche', amount: 1500000, type: 'revenue', category: 'Investment', status: 'pending' as const, date: 'May 4' },
  { id: 'txn-005', description: 'Google Ads — April reconciliation', amount: -87400, type: 'expense', category: 'Marketing', status: 'settled' as const, date: 'May 3' },
  { id: 'txn-006', description: 'DataStream API — usage overage', amount: -12800, type: 'expense', category: 'Infrastructure', status: 'failed' as const, date: 'May 3' },
  { id: 'txn-007', description: 'Northfield LLC — consulting invoice', amount: 95000, type: 'revenue', category: 'Services', status: 'settled' as const, date: 'May 2' },
  { id: 'txn-008', description: 'Legal retainer — Brecker & Voss', amount: -28000, type: 'expense', category: 'Legal', status: 'settled' as const, date: 'May 1' },
];

const formatAmount = (v: number) => {
  const abs = Math.abs(v);
  const str = abs >= 1000000
    ? `$${(abs / 1000000).toFixed(2)}M`
    : abs >= 1000
    ? `$${(abs / 1000).toFixed(1)}K`
    : `$${abs}`;
  return { str, positive: v > 0 };
};

export default function RecentTransactions() {
  return (
    <div className="card-elevated p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[14px] font-600 text-foreground">Recent Transactions</h2>
          <p className="text-[11px] text-muted-foreground mt-0.5">Last 8 — May 2026</p>
        </div>
        <button className="text-[11px] text-primary hover:text-primary/80 transition-colors font-500">
          View all →
        </button>
      </div>

      <div className="space-y-1 flex-1">
        {transactions.map((txn) => {
          const { str, positive } = formatAmount(txn.amount);
          return (
            <div
              key={txn.id}
              className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-muted/50 transition-colors duration-100 group"
            >
              <div className={`flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full ${
                positive ? 'bg-positive/10 text-positive' : 'bg-muted text-muted-foreground'
              }`}>
                {positive ? <ArrowDownLeft size={13} /> : <ArrowUpRight size={13} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-500 text-foreground truncate">{txn.description}</p>
                <p className="text-[10px] text-muted-foreground">{txn.category} · {txn.date}</p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className={`text-[12px] font-600 tabular-nums ${positive ? 'text-positive' : 'text-foreground'}`}>
                  {positive ? '+' : '-'}{str}
                </span>
                <StatusBadge
                  variant={
                    txn.status === 'settled' ? 'settled' :
                    txn.status === 'processing' ? 'processing' :
                    txn.status === 'pending' ? 'pending' : 'failed'
                  }
                  label={txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                  size="sm"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <CreditCard size={11} />
          8 transactions shown
        </span>
        <span>
          Net flow: <span className="text-positive font-500">+$1.33M</span>
        </span>
      </div>
    </div>
  );
}