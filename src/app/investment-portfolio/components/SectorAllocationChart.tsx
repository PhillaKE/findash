'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const SectorAllocationChartInner = dynamic(
  () => import('./SectorAllocationChartInner'),
  { ssr: false, loading: () => <div className="animate-pulse bg-muted rounded-md h-48 w-full" /> }
);

export default function SectorAllocationChart() {
  return <SectorAllocationChartInner />;
}