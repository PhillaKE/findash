'use client';

import React, { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, Edit2, Trash2, ExternalLink, Search } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import EmptyState from '@/components/ui/EmptyState';
import { TrendingUp } from 'lucide-react';

// Backend integration point: replace with API call to /api/portfolio/holdings
const holdings = [
  { id: 'hold-001', ticker: 'NVDA', name: 'NVIDIA Corporation', sector: 'Technology', weight: 12.4, costBasis: 180.40, currentValue: 876.20, shares: 120, gainLossPct: 18.4, annualizedReturn: 22.1, status: 'active' as const },
  { id: 'hold-002', ticker: 'MSFT', name: 'Microsoft Corporation', sector: 'Technology', weight: 10.8, costBasis: 310.00, currentValue: 420.15, shares: 215, gainLossPct: 8.7, annualizedReturn: 14.3, status: 'active' as const },
  { id: 'hold-003', ticker: 'META', name: 'Meta Platforms Inc.', sector: 'Technology', weight: 9.2, costBasis: 290.50, currentValue: 510.80, shares: 143, gainLossPct: 12.1, annualizedReturn: 18.6, status: 'active' as const },
  { id: 'hold-004', ticker: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare', weight: 8.1, costBasis: 162.00, currentValue: 155.40, shares: 390, gainLossPct: -4.1, annualizedReturn: -2.8, status: 'review' as const },
  { id: 'hold-005', ticker: 'JPM', name: 'JPMorgan Chase & Co.', sector: 'Financials', weight: 7.9, costBasis: 148.20, currentValue: 198.60, shares: 295, gainLossPct: 7.3, annualizedReturn: 11.2, status: 'active' as const },
  { id: 'hold-006', ticker: 'INTC', name: 'Intel Corporation', sector: 'Technology', weight: 5.4, costBasis: 44.80, currentValue: 22.10, shares: 1840, gainLossPct: -14.2, annualizedReturn: -18.4, status: 'review' as const },
  { id: 'hold-007', ticker: 'CVX', name: 'Chevron Corporation', sector: 'Energy', weight: 6.2, costBasis: 158.30, currentValue: 152.40, shares: 320, gainLossPct: -5.3, annualizedReturn: -3.1, status: 'active' as const },
  { id: 'hold-008', ticker: 'PFE', name: 'Pfizer Inc.', sector: 'Healthcare', weight: 4.8, costBasis: 52.10, currentValue: 26.80, shares: 1420, gainLossPct: -9.8, annualizedReturn: -12.6, status: 'review' as const },
  { id: 'hold-009', ticker: 'AMZN', name: 'Amazon.com Inc.', sector: 'Consumer', weight: 8.6, costBasis: 142.00, currentValue: 185.30, shares: 390, gainLossPct: 9.4, annualizedReturn: 15.8, status: 'active' as const },
  { id: 'hold-010', ticker: 'GS', name: 'Goldman Sachs Group', sector: 'Financials', weight: 5.8, costBasis: 340.00, currentValue: 478.20, shares: 102, gainLossPct: 6.8, annualizedReturn: 10.4, status: 'active' as const },
  { id: 'hold-011', ticker: 'CAT', name: 'Caterpillar Inc.', sector: 'Industrials', weight: 4.6, costBasis: 240.00, currentValue: 322.10, shares: 113, gainLossPct: 5.2, annualizedReturn: 8.9, status: 'active' as const },
  { id: 'hold-012', ticker: 'XOM', name: 'Exxon Mobil Corp.', sector: 'Energy', weight: 5.1, costBasis: 98.40, currentValue: 112.80, shares: 358, gainLossPct: 2.8, annualizedReturn: 4.1, status: 'active' as const },
];

type SortKey = 'ticker' | 'weight' | 'gainLossPct' | 'annualizedReturn' | 'currentValue';
type SortDir = 'asc' | 'desc' | null;

export default function HoldingsTable() {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : sortDir === 'desc' ? null : 'asc');
      if (sortDir === 'desc') setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const filtered = holdings.filter(
    (h) =>
      h.ticker.toLowerCase().includes(search.toLowerCase()) ||
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.sector.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey || !sortDir) return 0;
    const va = a[sortKey];
    const vb = b[sortKey];
    if (typeof va === 'string' && typeof vb === 'string')
      return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    if (typeof va === 'number' && typeof vb === 'number')
      return sortDir === 'asc' ? va - vb : vb - va;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / perPage);
  const paginated = sorted.slice((page - 1) * perPage, page * perPage);

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronsUpDown size={12} className="text-muted-foreground/50" />;
    return sortDir === 'asc' ? (
      <ChevronUp size={12} className="text-primary" />
    ) : (
      <ChevronDown size={12} className="text-primary" />
    );
  };

  const cols: Array<{ key: SortKey | null; label: string; align?: string }> = [
    { key: 'ticker', label: 'Ticker' },
    { key: null, label: 'Company' },
    { key: null, label: 'Sector' },
    { key: 'weight', label: 'Weight', align: 'right' },
    { key: null, label: 'Cost Basis', align: 'right' },
    { key: 'currentValue', label: 'Price', align: 'right' },
    { key: null, label: 'Shares', align: 'right' },
    { key: 'gainLossPct', label: 'Gain/Loss', align: 'right' },
    { key: 'annualizedReturn', label: 'Ann. Return', align: 'right' },
    { key: null, label: 'Status', align: 'center' },
  ];

  return (
    <div className="card-elevated">
      {/* Table header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div>
          <h2 className="text-[14px] font-600 text-foreground">Holdings</h2>
          <p className="text-[11px] text-muted-foreground mt-0.5">{filtered.length} positions</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search ticker, company..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="pl-7 pr-3 py-1.5 rounded-md border border-border bg-input text-[12px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring focus:border-primary w-52 transition-all duration-150"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-border">
              {cols.map((col) => (
                <th
                  key={`th-${col.label}`}
                  className={`px-4 py-3 text-[11px] font-500 uppercase tracking-widest text-muted-foreground whitespace-nowrap ${
                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                  } ${col.key ? 'cursor-pointer hover:text-foreground transition-colors select-none' : ''}`}
                  onClick={col.key ? () => handleSort(col.key as SortKey) : undefined}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {col.key && <SortIcon col={col.key as SortKey} />}
                  </span>
                </th>
              ))}
              <th className="px-4 py-3 text-right text-[11px] font-500 uppercase tracking-widest text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={11}>
                  <EmptyState
                    title="No holdings found"
                    description="No positions match your current search or filter criteria."
                    icon={<TrendingUp size={22} />}
                  />
                </td>
              </tr>
            ) : (
              paginated.map((h, idx) => {
                const isNeg = h.gainLossPct < 0;
                const isAnnNeg = h.annualizedReturn < 0;
                return (
                  <tr
                    key={h.id}
                    className={`border-b border-border transition-colors duration-100 hover:bg-muted/30 ${
                      idx % 2 === 0 ? '' : 'bg-muted/10'
                    }`}
                  >
                    {/* Ticker */}
                    <td className="px-4 py-3">
                      <span className="font-700 text-foreground font-mono tracking-wide">{h.ticker}</span>
                    </td>
                    {/* Company */}
                    <td className="px-4 py-3">
                      <span className="text-foreground truncate max-w-[160px] block">{h.name}</span>
                    </td>
                    {/* Sector */}
                    <td className="px-4 py-3">
                      <span className="text-muted-foreground">{h.sector}</span>
                    </td>
                    {/* Weight */}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary/60 rounded-full"
                            style={{ width: `${(h.weight / 15) * 100}%` }}
                          />
                        </div>
                        <span className="tabular-nums text-foreground">{h.weight}%</span>
                      </div>
                    </td>
                    {/* Cost Basis */}
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                      ${h.costBasis.toFixed(2)}
                    </td>
                    {/* Current Value */}
                    <td className="px-4 py-3 text-right tabular-nums font-500 text-foreground">
                      ${h.currentValue.toFixed(2)}
                    </td>
                    {/* Shares */}
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                      {h.shares.toLocaleString()}
                    </td>
                    {/* Gain/Loss */}
                    <td className="px-4 py-3 text-right">
                      <span className={`tabular-nums font-600 ${isNeg ? 'text-negative' : 'text-positive'}`}>
                        {isNeg ? '' : '+'}{h.gainLossPct.toFixed(1)}%
                      </span>
                    </td>
                    {/* Annualized Return */}
                    <td className="px-4 py-3 text-right">
                      <span className={`tabular-nums font-500 ${isAnnNeg ? 'text-negative' : 'text-foreground'}`}>
                        {isAnnNeg ? '' : '+'}{h.annualizedReturn.toFixed(1)}%
                      </span>
                    </td>
                    {/* Status */}
                    <td className="px-4 py-3 text-center">
                      <StatusBadge
                        variant={h.status === 'active' ? 'active' : 'review'}
                        label={h.status === 'active' ? 'Active' : 'Review'}
                      />
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="group/btn relative p-1.5 rounded hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-150"
                          aria-label={`View ${h.ticker} details`}
                        >
                          <ExternalLink size={13} />
                          <span className="pointer-events-none absolute bottom-full right-0 mb-1 whitespace-nowrap rounded bg-secondary border border-border px-2 py-1 text-[10px] text-foreground opacity-0 group-hover/btn:opacity-100 transition-opacity z-10">
                            View details
                          </span>
                        </button>
                        <button
                          className="group/btn relative p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-150"
                          aria-label={`Edit ${h.ticker}`}
                        >
                          <Edit2 size={13} />
                          <span className="pointer-events-none absolute bottom-full right-0 mb-1 whitespace-nowrap rounded bg-secondary border border-border px-2 py-1 text-[10px] text-foreground opacity-0 group-hover/btn:opacity-100 transition-opacity z-10">
                            Edit position
                          </span>
                        </button>
                        <button
                          className="group/btn relative p-1.5 rounded hover:bg-negative/10 text-muted-foreground hover:text-negative transition-all duration-150"
                          aria-label={`Remove ${h.ticker}`}
                        >
                          <Trash2 size={13} />
                          <span className="pointer-events-none absolute bottom-full right-0 mb-1 whitespace-nowrap rounded bg-secondary border border-border px-2 py-1 text-[10px] text-foreground opacity-0 group-hover/btn:opacity-100 transition-opacity z-10">
                            Remove holding
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {sorted.length > 0 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-border">
          <p className="text-[11px] text-muted-foreground">
            Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, sorted.length)} of {sorted.length} holdings
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-2.5 py-1 rounded border border-border text-[11px] text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
            >
              ← Prev
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={`page-${i + 1}`}
                onClick={() => setPage(i + 1)}
                className={`px-2.5 py-1 rounded border text-[11px] transition-all duration-150 ${
                  page === i + 1
                    ? 'border-primary bg-primary/10text-primary' :'border-border text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-2.5 py-1 rounded border border-border text-[11px] text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}