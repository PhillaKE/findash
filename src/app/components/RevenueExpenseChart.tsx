'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const RevenueExpenseChartInner = dynamic(
  () => import('./RevenueExpenseChartInner'),
  { ssr: false, loading: () => <div className="animate-pulse bg-muted rounded-md h-72 w-full" /> }
);

export default function RevenueExpenseChart() {
  return <RevenueExpenseChartInner />;
}