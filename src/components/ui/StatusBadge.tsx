import React from 'react';

type BadgeVariant = 'settled' | 'pending' | 'failed' | 'processing' | 'active' | 'review' | 'divested' | 'positive' | 'negative' | 'neutral' | 'warning';

interface StatusBadgeProps {
  variant: BadgeVariant;
  label: string;
  size?: 'sm' | 'md';
}

const variantStyles: Record<BadgeVariant, string> = {
  settled:    'bg-positive/10 text-positive border border-positive/20',
  active:     'bg-positive/10 text-positive border border-positive/20',
  positive:   'bg-positive/10 text-positive border border-positive/20',
  pending:    'bg-warning/10 text-warning border border-warning/20',
  review:     'bg-warning/10 text-warning border border-warning/20',
  warning:    'bg-warning/10 text-warning border border-warning/20',
  failed:     'bg-negative/10 text-negative border border-negative/20',
  negative:   'bg-negative/10 text-negative border border-negative/20',
  divested:   'bg-muted-foreground/10 text-muted-foreground border border-muted-foreground/20',
  neutral:    'bg-muted-foreground/10 text-muted-foreground border border-muted-foreground/20',
  processing: 'bg-primary/10 text-primary border border-primary/20',
};

export default function StatusBadge({ variant, label, size = 'sm' }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium tabular-nums ${
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
      } ${variantStyles[variant]}`}
    >
      {label}
    </span>
  );
}