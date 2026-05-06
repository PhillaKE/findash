import React from 'react';
import AppLayout from '@/components/AppLayout';
import DashboardHeader from './components/DashboardHeader';
import KPIBentoGrid from './components/KPIBentoGrid';
import RevenueExpenseChart from './components/RevenueExpenseChart';
import ExpenseCategoryChart from './components/ExpenseCategoryChart';
import RecentTransactions from './components/RecentTransactions';
import BudgetUtilization from './components/BudgetUtilization';

export default function FinancialDashboardPage() {
  return (
    <AppLayout>
      <div className="min-h-full px-6 lg:px-8 xl:px-10 py-6 max-w-screen-2xl mx-auto">
        <DashboardHeader />
        <KPIBentoGrid />
        <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2">
            <RevenueExpenseChart />
          </div>
          <div className="xl:col-span-1">
            <BudgetUtilization />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2">
            <ExpenseCategoryChart />
          </div>
          <div className="xl:col-span-1">
            <RecentTransactions />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}