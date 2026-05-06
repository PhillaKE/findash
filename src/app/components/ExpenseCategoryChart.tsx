'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ExpenseCategoryChartInner = dynamic(
  () => import('./ExpenseCategoryChartInner'),
  { ssr: false, loading: () => <div className="animate-pulse bg-muted rounded-md h-72 w-full" /> }
);

export default function ExpenseCategoryChart() {
  return <ExpenseCategoryChartInner />;
}