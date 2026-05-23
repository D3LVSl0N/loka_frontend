import { useState } from 'react';
import { User, Bell, Shield, Key, Camera, Check, Copy, Plus, AlertTriangle, ShieldCheck } from 'lucide-react';

type Tab = 'profile' | 'notifications' | 'security' | 'apikeys';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  return (
    <div className="w-full space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-1">System Settings</h2>
        <p className="text-slate-500 text-sm">Manage system configurations, notifications, and security preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Settings Navigation */}
        <div className="col-span-1 md:col-span-3">
          <nav className="flex flex-col gap-1.5 sticky top-6">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left border ${activeTab === 'profile' ? 'bg-emerald-50 text-emerald-900 border-emerald-100 font-bold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-transparent font-medium'}`}
            >
              <User size={18} />
              Profile Details
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left border ${activeTab === 'notifications' ? 'bg-emerald-50 text-emerald-900 border-emerald-100 font-bold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-transparent font-medium'}`}
            >
              <Bell size={18} />
              Notifications
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left border ${activeTab === 'security' ? 'bg-emerald-50 text-emerald-900 border-emerald-100 font-bold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-transparent font-medium'}`}
            >
              <Shield size={18} />
              Security & Roles
            </button>
            <button 
               onClick={() => setActiveTab('apikeys')}
               className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left border ${activeTab === 'apikeys' ? 'bg-emerald-50 text-emerald-900 border-emerald-100 font-bold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-transparent font-medium'}`}
            >
              <Key size={18} />
              API Keys
            </button>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="col-span-1 md:col-span-9 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             
             {activeTab === 'profile' && (
               <>
                 <div className="p-6 border-b border-slate-200 bg-slate-50/50">
                   <h3 className="text-lg font-bold text-slate-800">Profile Details</h3>
                   <p className="text-sm text-slate-500 mt-0.5">Update your personal information and public profile.</p>
                 </div>
                 
                 <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex flex-wrap gap-6 items-center">
                       <div className="h-20 w-20 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center text-slate-400 relative group overflow-hidden">
                         <span className="text-2xl font-bold text-slate-400 group-hover:opacity-0 transition-opacity">AD</span>
                         <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <Camera size={20} className="text-white" />
                         </div>
                       </div>
                       <div className="space-y-2">
                         <div className="flex gap-2">
                           <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm">
                             Change Avatar
                           </button>
                           <button className="px-4 py-2 border border-transparent rounded-lg text-sm font-semibold text-rose-600 hover:bg-rose-50">
                             Remove
                           </button>
                         </div>
                         <p className="text-xs text-slate-500">JPG, GIF or PNG. 1MB max.</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">First Name</label>
                        <input type="text" defaultValue="Admin" className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm outline-none" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Last Name</label>
                        <input type="text" defaultValue="User" className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm outline-none" />
                      </div>
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Email Address</label>
                        <input type="email" defaultValue="admin@livestockguard.com" className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm outline-none" />
                      </div>
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Bio</label>
                        <textarea rows={3} defaultValue="Lead operations manager." className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm outline-none resize-none" />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                      <button className="px-5 py-2.5 bg-emerald-950 text-white font-semibold text-sm rounded-lg hover:bg-emerald-900 transition shadow-sm">
                        Save Changes
                      </button>
                    </div>
                 </div>
               </>
             )}

             {activeTab === 'notifications' && (
               <>
                 <div className="p-6 border-b border-slate-200 bg-slate-50/50">
                   <h3 className="text-lg font-bold text-slate-800">Notifications</h3>
                   <p className="text-sm text-slate-500 mt-0.5">Control how and when you receive alerts.</p>
                 </div>
                 <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-2">
                    <div className="space-y-4">
                      
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div>
                          <p className="text-sm font-bold text-slate-800">Critical Security Alerts</p>
                          <p className="text-xs text-slate-500 mt-1">Unauthorized access attempts, failed logins.</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5"><input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500" /> Email</label>
                          <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5"><input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500" /> SMS</label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div>
                          <p className="text-sm font-bold text-slate-800">System Updates</p>
                          <p className="text-xs text-slate-500 mt-1">Platform maintenance and feature releases.</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5"><input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500" /> Email</label>
                          <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5"><input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500" /> SMS</label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div>
                          <p className="text-sm font-bold text-slate-800">User Management</p>
                          <p className="text-xs text-slate-500 mt-1">New accounts created, deleted, or suspended.</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5"><input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500" /> Email</label>
                          <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5"><input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500" /> SMS</label>
                        </div>
                      </div>

                    </div>
                    <div className="pt-2 flex justify-end">
                      <button className="px-5 py-2.5 bg-emerald-950 text-white font-semibold text-sm rounded-lg hover:bg-emerald-900 transition shadow-sm">
                        Save Preferences
                      </button>
                    </div>
                 </div>
               </>
             )}

             {activeTab === 'security' && (
               <>
                 <div className="p-6 border-b border-slate-200 bg-slate-50/50">
                   <h3 className="text-lg font-bold text-slate-800">Security & Roles</h3>
                   <p className="text-sm text-slate-500 mt-0.5">Manage your credentials and view access level.</p>
                 </div>
                 <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-2">
                    
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 flex items-center justify-between">
                       <div>
                         <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1">Current Role Status</p>
                         <div className="flex items-center gap-2">
                            <ShieldCheck size={20} className="text-emerald-700" />
                            <span className="text-lg font-black text-emerald-950">Active Administrator</span>
                         </div>
                       </div>
                       <button className="px-4 py-2 bg-white text-emerald-800 border border-emerald-200 text-xs font-bold rounded-lg shadow-sm hover:bg-emerald-100 transition-colors">
                         View Role Permissions
                       </button>
                    </div>

                    <div className="space-y-4 pt-2">
                      <h4 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">Change Password</h4>
                      <div className="grid grid-cols-1 gap-4 max-w-lg">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Current Password</label>
                          <input type="password" placeholder="••••••••" className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm outline-none" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">New Password</label>
                          <input type="password" placeholder="••••••••" className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm outline-none" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Confirm New Password</label>
                          <input type="password" placeholder="••••••••" className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm outline-none" />
                        </div>
                        <div>
                          <button className="px-5 py-2.5 bg-emerald-950 text-white font-semibold text-sm rounded-lg hover:bg-emerald-900 transition shadow-sm mt-2">
                            Update Password
                          </button>
                        </div>
                      </div>
                    </div>
                 </div>
               </>
             )}

             {activeTab === 'apikeys' && (
               <>
                 <div className="p-6 border-b border-slate-200 bg-slate-50/50">
                   <h3 className="text-lg font-bold text-slate-800">API Keys</h3>
                   <p className="text-sm text-slate-500 mt-0.5">Manage keys used to authenticate external integrations.</p>
                 </div>
                 <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-2">
                    
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex gap-3 text-slate-700 text-sm">
                      <AlertTriangle size={20} className="text-amber-500 shrink-0" />
                      <p>
                        <strong>What are API Keys?</strong> They act as secure tokens to allow external third-party software (like custom farming sensors, external analytics tools, or automated scripting) to talk directly to your LivestockGuard data without requiring a password. <strong className="text-rose-600">Never share them publicly.</strong>
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h4 className="text-sm font-bold text-slate-800">Active Keys</h4>
                        <button className="flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-900 transition-colors">
                          <Plus size={16} /> Generate New Key
                        </button>
                      </div>

                      <div className="border border-slate-200 rounded-lg overflow-hidden">
                        <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Main Production Key</span>
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded uppercase">Active</span>
                        </div>
                        <div className="p-4 flex items-center justify-between gap-4">
                          <code className="text-sm text-slate-800 bg-slate-100 px-3 py-1.5 rounded-md flex-1 font-mono tracking-wider truncate">
                            lg_live_***************************
                          </code>
                          <button className="p-2 text-slate-400 hover:text-emerald-700 bg-white border border-slate-200 rounded-md shadow-sm hover:border-emerald-300 transition-all">
                            <Copy size={16} />
                          </button>
                          <button className="p-2 text-rose-500 font-bold text-xs uppercase hover:underline transition-all">
                            Revoke
                          </button>
                        </div>
                      </div>
                    </div>
                 </div>
               </>
             )}

          </div>
        </div>
      </div>
    </div>
  );
}

