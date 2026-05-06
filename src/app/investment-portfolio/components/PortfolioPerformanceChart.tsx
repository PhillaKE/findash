'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const PortfolioPerformanceChartInner = dynamic(
  () => import('./PortfolioPerformanceChartInner'),
  { ssr: false, loading: () => <div className="animate-pulse bg-muted rounded-md h-80 w-full" /> }
);

export default function PortfolioPerformanceChart() {
  return <PortfolioPerformanceChartInner />;
}