import { Search, Bell, UserCircle, LogOut, Settings as SettingsIcon, ShieldAlert } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface TopNavProps {
  currentUserRole: 'Admin' | 'Superadmin';
  setCurrentUserRole: (role: 'Admin' | 'Superadmin') => void;
  onNavigateSettings?: () => void;
  onLogout?: () => void;
}

export default function TopNav({ currentUserRole, setCurrentUserRole, onNavigateSettings, onLogout }: TopNavProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Close dropdowns on outside click (conceptual, simplified for React here)
  return (
    <header className="bg-white border-b border-slate-200 h-16 shrink-0 flex items-center justify-between px-6 z-30 w-full relative">
      
      {/* Search Bar matching the image */}
      <div className="flex-1 max-w-md hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 border border-slate-200 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all shadow-inner">
        <Search size={18} className="text-slate-400 mr-2" />
        <input 
          type="text" 
          placeholder="Search system..." 
          className="bg-transparent border-none focus:ring-0 text-sm text-slate-800 w-full outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="flex flex-1 md:hidden">
        {/* Mobile Spacer to push items right if search is hidden */}
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4 ml-auto">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg p-1.5 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase px-2 tracking-wide hidden sm:block">Role Simulator:</span>
          <select 
            value={currentUserRole}
            onChange={(e) => setCurrentUserRole(e.target.value as 'Admin' | 'Superadmin')}
            className="bg-white border border-slate-300 rounded-md text-xs font-bold focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 py-1 pl-2 pr-6 cursor-pointer shadow-sm outline-none"
          >
            <option value="Admin">Admin</option>
            <option value="Superadmin">Super Admin</option>
          </select>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            className={`transition-colors p-1.5 rounded-full relative ${showNotifications ? 'bg-emerald-100 text-emerald-800' : 'text-slate-400 hover:bg-slate-100 hover:text-emerald-800'}`}
          >
            <Bell size={22} className="stroke-[1.5]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <span className="font-bold text-slate-800 text-sm">Notifications</span>
                <span className="text-xs font-bold text-emerald-600 cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                <div className="p-4 border-b border-slate-50 hover:bg-slate-50/50 cursor-pointer transition-colors flex gap-3">
                  <div className="mt-0.5 shrink-0 text-rose-500 bg-rose-50 p-1.5 rounded-md"><ShieldAlert size={16} /></div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Suspicious Login Attempt</p>
                    <p className="text-xs text-slate-500 mt-0.5">Attempt blocked from unrecognized IP (192.168.1.88).</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">10 minutes ago</p>
                  </div>
                </div>
                <div className="p-4 border-b border-slate-50 hover:bg-slate-50/50 cursor-pointer transition-colors gap-3 flex">
                  <div className="mt-0.5 shrink-0 text-emerald-600 bg-emerald-50 p-1.5 rounded-md"><Bell size={16} /></div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">System Update Complete</p>
                    <p className="text-xs text-slate-500 mt-0.5">Version 2.44 deployed. Check release notes.</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">2 hours ago</p>
                  </div>
                </div>
              </div>
              <div className="p-3 text-center border-t border-slate-100 bg-slate-50">
                <button className="text-xs font-bold text-emerald-800 hover:underline">View All Notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ring-2 shadow-sm transition-all ${
              showProfile ? 'bg-emerald-800 text-white ring-emerald-200 scale-105' : 'bg-emerald-950 text-white ring-transparent hover:ring-emerald-100'
            }`}
          >
             {currentUserRole === 'Superadmin' ? 'SA' : 'AD'}
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
              <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
                  {currentUserRole === 'Superadmin' ? 'SA' : 'AD'}
                </div>
                <div className="truncate">
                  <p className="text-sm font-bold text-slate-900 truncate">Livestock Administrator</p>
                  <p className="text-xs text-slate-500 font-medium truncate">admin@livestockguard.com</p>
                </div>
              </div>
              <div className="p-2">
                <button 
                  onClick={() => { setShowProfile(false); if (onNavigateSettings) onNavigateSettings(); }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <SettingsIcon size={16} className="text-slate-400" /> Account Settings
                </button>
              </div>
              <div className="p-2 border-t border-slate-100">
                <button 
                  onClick={() => { setShowProfile(false); if (onLogout) onLogout(); }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-lg transition-colors"
                >
                  <LogOut size={16} /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
