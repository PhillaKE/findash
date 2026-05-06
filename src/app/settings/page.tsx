'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Settings, User, Bell, Shield, Palette, Database, Save } from 'lucide-react';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'data', label: 'Data & Export', icon: Database },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-muted border border-border'}`}>
      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-4' : 'translate-x-1'}`} />
    </button>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifSettings, setNotifSettings] = useState({ email: true, push: true, budget: true, transactions: false, reports: true });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppLayout>
      <div className="min-h-full px-6 lg:px-8 xl:px-10 py-6 max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[22px] font-600 text-foreground tracking-tight flex items-center gap-2">
              <Settings size={20} className="text-muted-foreground" /> Settings
            </h1>
            <p className="text-[13px] text-muted-foreground mt-0.5">Manage your account preferences</p>
          </div>
          <button onClick={handleSave} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-[12px] font-500 transition-all ${saved ? 'bg-positive text-white' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}>
            <Save size={13} /><span>{saved ? 'Saved!' : 'Save Changes'}</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-5">
          {/* Sidebar tabs */}
          <div className="sm:w-48 flex-shrink-0">
            <nav className="space-y-0.5">
              {tabs.map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] font-500 transition-all text-left ${activeTab === tab.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                    <TabIcon size={15} className="flex-shrink-0" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 bg-card border border-border rounded-xl p-6">
            {activeTab === 'profile' && (
              <div className="space-y-5">
                <h2 className="text-[15px] font-600 text-foreground">Profile Information</h2>
                <div className="flex items-center gap-4 pb-5 border-b border-border">
                  <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-[20px] font-700 text-primary">HP</div>
                  <div>
                    <p className="text-[13px] font-600 text-foreground">Hilary P</p>
                    <p className="text-[12px] text-muted-foreground">Administrator</p>
                    <button className="mt-1 text-[11px] text-primary hover:underline">Change avatar</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[['Full Name', 'Hilary P'], ['Email', 'hilary.p@findash.io'], ['Role', 'Administrator'], ['Department', 'Finance']].map(([label, val]) => (
                    <div key={label}>
                      <label className="block text-[11px] text-muted-foreground font-500 mb-1">{label}</label>
                      <input defaultValue={val} className="w-full px-3 py-2 rounded-md border border-border bg-muted text-[13px] text-foreground focus:outline-none focus:border-primary/50" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-5">
                <h2 className="text-[15px] font-600 text-foreground">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { key: 'email', label: 'Email Notifications', desc: 'Receive alerts via email' },
                    { key: 'push', label: 'Push Notifications', desc: 'Browser push notifications' },
                    { key: 'budget', label: 'Budget Alerts', desc: 'Notify when budget thresholds are reached' },
                    { key: 'transactions', label: 'Transaction Updates', desc: 'Notify on every new transaction' },
                    { key: 'reports', label: 'Report Generation', desc: 'Notify when new reports are available' },
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div>
                        <p className="text-[13px] font-500 text-foreground">{label}</p>
                        <p className="text-[11px] text-muted-foreground">{desc}</p>
                      </div>
                      <Toggle checked={notifSettings[key as keyof typeof notifSettings]} onChange={() => setNotifSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof notifSettings] }))} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-5">
                <h2 className="text-[15px] font-600 text-foreground">Security Settings</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-positive/5 border border-positive/20 rounded-lg">
                    <p className="text-[13px] font-600 text-positive">Account Secure</p>
                    <p className="text-[12px] text-muted-foreground mt-0.5">Two-factor authentication is enabled. Last login: May 6, 2026 09:36 UTC</p>
                  </div>
                  <div>
                    <label className="block text-[11px] text-muted-foreground font-500 mb-1">Current Password</label>
                    <input type="password" placeholder="••••••••••" className="w-full px-3 py-2 rounded-md border border-border bg-muted text-[13px] text-foreground focus:outline-none focus:border-primary/50 max-w-sm" />
                  </div>
                  <div>
                    <label className="block text-[11px] text-muted-foreground font-500 mb-1">New Password</label>
                    <input type="password" placeholder="••••••••••" className="w-full px-3 py-2 rounded-md border border-border bg-muted text-[13px] text-foreground focus:outline-none focus:border-primary/50 max-w-sm" />
                  </div>
                  <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-[12px] font-500 hover:bg-primary/90 transition-all">Update Password</button>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-5">
                <h2 className="text-[15px] font-600 text-foreground">Appearance</h2>
                <div>
                  <p className="text-[12px] text-muted-foreground mb-3">Theme</p>
                  <div className="flex gap-3">
                    {['Dark', 'Light', 'System'].map((theme) => (
                      <button key={theme} className={`px-4 py-2 rounded-md border text-[12px] font-500 transition-all ${theme === 'Dark' ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:text-foreground'}`}>
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[12px] text-muted-foreground mb-3">Accent Color</p>
                  <div className="flex gap-2">
                    {['bg-indigo-500', 'bg-violet-500', 'bg-blue-500', 'bg-emerald-500', 'bg-rose-500', 'bg-amber-500'].map((c) => (
                      <button key={c} className={`h-7 w-7 rounded-full ${c} ${c === 'bg-indigo-500' ? 'ring-2 ring-offset-2 ring-offset-card ring-indigo-500' : ''} transition-all hover:scale-110`} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="space-y-5">
                <h2 className="text-[15px] font-600 text-foreground">Data &amp; Export</h2>
                <div className="space-y-3">
                  {[
                    { label: 'Export All Transactions', desc: 'Download a CSV of all transactions', btn: 'Export CSV' },
                    { label: 'Export Financial Reports', desc: 'Download all statements as PDF', btn: 'Export PDF' },
                    { label: 'Export Portfolio Data', desc: 'Download investment holdings data', btn: 'Export XLSX' },
                  ].map(({ label, desc, btn }) => (
                    <div key={label} className="flex items-center justify-between p-4 bg-muted/40 rounded-lg border border-border">
                      <div>
                        <p className="text-[13px] font-500 text-foreground">{label}</p>
                        <p className="text-[11px] text-muted-foreground">{desc}</p>
                      </div>
                      <button className="px-3 py-1.5 rounded-md border border-border bg-card text-[12px] text-muted-foreground hover:text-foreground transition-all flex-shrink-0">{btn}</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
