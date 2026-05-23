/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Sidebar, { ViewType } from './components/Sidebar';
import UserTable from './components/UserTable';
import Login from './components/Login';
import Settings from './components/Settings';
import TopNav from './components/TopNav';
import AddUser from './components/AddUser';
import Reports from './components/Reports';
import { Users, User as UserIcon, Shield, ShieldCheck } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [currentUserRole, setCurrentUserRole] = useState<'Admin' | 'Superadmin'>('Admin');

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'settings':
        return <Settings />;
      case 'add-user':
        return <AddUser currentUserRole={currentUserRole} onUserAdded={() => setCurrentView('users')} onCancel={() => setCurrentView('users')} />;
      case 'reports':
        return <Reports currentUserRole={currentUserRole} />;
      case 'users':
      case 'dashboard':
      default:
        return (
          <>
            <div className="mb-6 flex justify-between items-end gap-4 flex-wrap">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-1">
                  {currentUserRole === 'Superadmin' ? 'Super Admin Control' : 'Admin Dashboard'}
                </h2>
                <p className="text-slate-500 text-sm">
                  {currentUserRole === 'Superadmin' ? 'Manage elevated access and review critical security events.' : 'System overview and user management.'}
                </p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setCurrentView('add-user')} className="bg-emerald-950 hover:bg-emerald-900 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2">
                  <UserIcon size={16} /> Create User
                </button>
              </div>
            </div>

            {/* Dashboard Stats Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center gap-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100 opacity-50 rounded-bl-full transition-transform group-hover:scale-110"></div>
                <div className="h-12 w-12 rounded-lg bg-slate-100 text-emerald-800 flex items-center justify-center shrink-0 z-10 shadow-sm border border-slate-200">
                  <Users size={24} />
                </div>
                <div className="z-10">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Users</p>
                  <p className="text-3xl font-black text-emerald-950 mt-0.5">1,248</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center gap-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100 opacity-50 rounded-bl-full transition-transform group-hover:scale-110"></div>
                <div className="h-12 w-12 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 z-10 shadow-sm border border-emerald-200">
                  <UserIcon size={24} />
                </div>
                <div className="z-10">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Users</p>
                  <p className="text-3xl font-black text-emerald-950 mt-0.5">1,102</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center gap-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-100 opacity-80 rounded-bl-full transition-transform group-hover:scale-110"></div>
                <div className="h-12 w-12 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 z-10 shadow-sm border border-slate-200">
                  <Shield size={24} />
                </div>
                <div className="z-10">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Admin Count</p>
                  <p className="text-3xl font-black text-slate-800 mt-0.5">45</p>
                </div>
              </div>
              <div className="bg-emerald-950 rounded-xl p-5 border border-emerald-900 shadow-lg flex items-center gap-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-900 opacity-80 rounded-bl-full transition-transform group-hover:scale-110"></div>
                <div className="h-12 w-12 rounded-lg bg-emerald-900 border border-emerald-800 text-emerald-400 flex items-center justify-center shrink-0 z-10 shadow-inner">
                  <ShieldCheck size={24} />
                </div>
                <div className="z-10">
                  <p className="text-[11px] font-bold text-emerald-400/80 uppercase tracking-wider">Super Admin</p>
                  <p className="text-3xl font-black text-white mt-0.5" title="Maximum Capacity Enforced">1 <span className="text-sm font-normal text-emerald-500/80 ml-0.5">/ 1 Max</span></p>
                </div>
              </div>
            </div>

            {/* Main Interactive Table */}
            <UserTable currentUserRole={currentUserRole} />
          </>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans antialiased overflow-hidden selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* Isolated Sidebar Navigation */}
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        onLogout={() => setIsAuthenticated(false)} 
      />
      
      {/* Main Orchestration Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <TopNav 
          currentUserRole={currentUserRole} 
          setCurrentUserRole={setCurrentUserRole} 
          onNavigateSettings={() => setCurrentView('settings')}
          onLogout={() => setIsAuthenticated(false)}
        />
        
        <div className="p-6 md:p-8 flex-1 overflow-y-auto w-full max-w-[1400px] mx-auto">
           {renderContent()}
        </div>
      </main>
    </div>
  );
}

