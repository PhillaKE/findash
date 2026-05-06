import React from 'react';
import AppLayout from '@/components/AppLayout';
import PortfolioHeader from './components/PortfolioHeader';
import PortfolioKPIGrid from './components/PortfolioKPIGrid';
import PortfolioPerformanceChart from './components/PortfolioPerformanceChart';
import SectorAllocationChart from './components/SectorAllocationChart';
import HoldingsTable from './components/HoldingsTable';
import TopMovers from './components/TopMovers';

export default function InvestmentPortfolioPage() {
  return (
    <AppLayout>
      <div className="min-h-full px-6 lg:px-8 xl:px-10 py-6 max-w-screen-2xl mx-auto">
        <PortfolioHeader />
        <PortfolioKPIGrid />
        <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2">
            <PortfolioPerformanceChart />
          </div>
          <div className="xl:col-span-1 flex flex-col gap-5">
            <SectorAllocationChart />
            <TopMovers />
          </div>
        </div>
        <div className="mt-5">
          <HoldingsTable />
        </div>
      </div>
    </AppLayout>
  );
}