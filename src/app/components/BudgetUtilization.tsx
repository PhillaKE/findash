'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const BudgetUtilizationInner = dynamic(
  () => import('./BudgetUtilizationInner'),
  { ssr: false, loading: () => <div className="animate-pulse bg-muted rounded-md h-72 w-full" /> }
);

export default function BudgetUtilization() {
  return <BudgetUtilizationInner />;
}