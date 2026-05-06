import React from 'react';
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  subValue?: string;
  delta?: number;
  deltaLabel?: string;
  variant?: 'default' | 'positive' | 'negative' | 'warning' | 'primary';
  hero?: boolean;
  icon?: React.ReactNode;
  footnote?: string;
  className?: string;
}

export default function MetricCard({
  label,
  value,
  subValue,
  delta,
  deltaLabel,
  variant = 'default',
  hero = false,
  icon,
  footnote,
  className = '',
}: MetricCardProps) {
  const cardBg: Record<string, string> = {
    default: 'bg-card border-border',
    positive: 'bg-positive-muted border-positive',
    negative: 'bg-negative-muted border-negative',
    warning: 'bg-warning-muted border-warning',
    primary: 'bg-primary/5 border-primary/30',
  };

  const deltaColor = delta === undefined
    ? ''
    : delta > 0 ? 'text-positive' : delta < 0 ? 'text-negative' : 'text-muted-foreground';

  const DeltaIcon = delta === undefined
    ? null
    : delta > 0 ? TrendingUp : delta < 0 ? TrendingDown : Minus;

  return (
    <div
      className={`card-elevated ${cardBg[variant]} p-4 flex flex-col gap-2 transition-all duration-200 hover:shadow-glow ${
        hero ? 'row-span-1' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between">
        <p className="text-[11px] font-500 uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <div className="flex items-center gap-1.5">
          {variant === 'warning' && <AlertTriangle size={13} className="text-warning" />}
          {icon && <span className="text-muted-foreground">{icon}</span>}
        </div>
      </div>

      <div className="flex items-end justify-between gap-2">
        <div>
          <p
            className={`tabular-nums font-700 leading-none ${
              hero ? 'text-3xl' : 'text-2xl'
            } ${
              variant === 'positive' ? 'text-positive' :
              variant === 'negative' ? 'text-negative' :
              variant === 'warning' ? 'text-warning' :
              variant === 'primary'? 'text-primary' : 'text-foreground'
            }`}
          >
            {value}
          </p>
          {subValue && (
            <p className="mt-1 text-[12px] text-muted-foreground tabular-nums">{subValue}</p>
          )}
        </div>

        {DeltaIcon && delta !== undefined && (
          <div className={`flex items-center gap-1 ${deltaColor}`}>
            <DeltaIcon size={13} />
            <span className="text-[12px] font-600 tabular-nums">
              {delta > 0 ? '+' : ''}{delta.toFixed(1)}%
            </span>
          </div>
        )}
      </div>

      {(deltaLabel || footnote) && (
        <p className="text-[11px] text-muted-foreground mt-auto">
          {deltaLabel || footnote}
        </p>
      )}
    </div>
  );
}