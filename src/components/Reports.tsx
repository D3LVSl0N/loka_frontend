import { Activity, Radio, ShieldAlert, UserPlus, UserMinus, UserCheck, Clock, ShieldCheck, BellRing } from 'lucide-react';

interface ReportsProps {
  currentUserRole: 'Admin' | 'Superadmin';
}

export default function Reports({ currentUserRole }: ReportsProps) {
  // Mock Data for Superadmin
  const onlineAdmins = [
    { id: 1, name: 'Alice Walker', email: 'alice.w@example.com', session: '2h 15m', ip: '192.168.1.45' },
    { id: 3, name: 'Charlie Davis', email: 'charlie.d@example.com', session: '42m', ip: '10.0.0.12' },
  ];

  const superAdminNotifications = [
    { id: 101, title: 'Role Escalation Prevented', time: '10 mins ago', type: 'critical', desc: 'Unauthorized attempt to access Superadmin privileges from IP 192.168.1.88.' },
    { id: 102, title: 'Database Backup Completed', time: '2 hours ago', type: 'info', desc: 'Automated routine backup finished successfully.' },
    { id: 103, title: 'Multiple Failed Logins', time: '5 hours ago', type: 'warning', desc: '5 consecutive failed login attempts detected for user account ID 8492.' },
  ];

  // Mock Data for Admin
  const activeFieldUsers = [
    { id: 10, name: 'John Doe', location: 'North Pasture', lastPing: '2 mins ago' },
    { id: 11, name: 'Maria Rodriguez', location: 'West Silo', lastPing: 'Just now' },
    { id: 12, name: 'Elias Carter', location: 'Main Gate', lastPing: '5 mins ago' },
  ];

  const adminAuditLog = [
    { id: 201, action: 'User Created', target: 'Evan Wright', by: 'Alice Walker', time: '1 hour ago', icon: <UserPlus size={16} className="text-emerald-600" /> },
    { id: 202, action: 'Status Updated', target: 'Diana Prince (Suspended)', by: 'System', time: '3 hours ago', icon: <Activity size={16} className="text-slate-600" /> },
    { id: 203, action: 'User Removed', target: 'Old Operator Auth', by: 'Charlie Davis', time: '1 day ago', icon: <UserMinus size={16} className="text-rose-600" /> },
  ];

  return (
    <div className="w-full space-y-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {currentUserRole === 'Superadmin' ? 'Security & System Overview' : 'Operational Activity Report'}
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {currentUserRole === 'Superadmin' 
              ? 'Real-time infrastructure monitoring, admin sessions, and critical security alerts.' 
              : 'Monitor active field users and audit user management logs.'}
          </p>
        </div>
        <div className="bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          Live Feed Active
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-slate-200 justify-between items-center bg-slate-50/50 flex">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                {currentUserRole === 'Superadmin' ? (
                  <><ShieldCheck size={18} className="text-emerald-700" /> Online Administrators</>
                ) : (
                  <><Radio size={18} className="text-blue-600" /> Active Field Users</>
                )}
              </h3>
            </div>
            
            <div className="p-0 flex-1 overflow-y-auto">
              {currentUserRole === 'Superadmin' ? (
                /* SUPERADMIN: Online Admins */
                <ul className="divide-y divide-slate-100">
                  {onlineAdmins.map(admin => (
                    <li key={admin.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="relative">
                           <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-sm">
                             {admin.name.split(' ').map(n => n[0]).join('')}
                           </div>
                           <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                         </div>
                         <div>
                           <p className="text-sm font-semibold text-slate-900">{admin.name}</p>
                           <p className="text-xs text-slate-500">{admin.email} &bull; {admin.ip}</p>
                         </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-slate-500 flex items-center gap-1"><Clock size={14} /> Session Time</p>
                        <p className="text-sm font-semibold text-slate-700">{admin.session}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                /* ADMIN: Active Field Users */
                <ul className="divide-y divide-slate-100">
                  {activeFieldUsers.map(user => (
                    <li key={user.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="relative">
                           <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                             <UserCheck size={18} />
                           </div>
                           <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                         </div>
                         <div>
                           <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                           <p className="text-xs text-slate-500">Node: {user.location}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                        <Activity size={12} /> {user.lastPing}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-slate-200 justify-between items-center bg-slate-50/50 flex">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                {currentUserRole === 'Superadmin' ? (
                  <><BellRing size={18} className="text-amber-600" /> Global Notifications</>
                ) : (
                  <><Activity size={18} className="text-indigo-600" /> Recent User Activity Log</>
                )}
              </h3>
            </div>
            
            <div className="p-5 flex-1 overflow-y-auto">
              <div className="relative border-l-2 border-slate-100 ml-3 space-y-6">
                
                {currentUserRole === 'Superadmin' ? (
                  /* SUPERADMIN: Notifications Log */
                  superAdminNotifications.map((notif, idx) => (
                    <div key={notif.id} className="relative pl-6">
                      <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white ${
                        notif.type === 'critical' ? 'bg-rose-500' :
                        notif.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                      }`}></div>
                      <p className="text-xs font-semibold text-slate-400 mb-1">{notif.time}</p>
                      <div className={`p-3 rounded-lg border ${
                        notif.type === 'critical' ? 'bg-rose-50 border-rose-100 text-rose-900' :
                        notif.type === 'warning' ? 'bg-amber-50 border-amber-100 text-amber-900' : 
                        'bg-slate-50 border-slate-200 text-slate-800'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          {notif.type === 'critical' && <ShieldAlert size={14} />}
                          <p className="text-sm font-bold">{notif.title}</p>
                        </div>
                        <p className={`text-xs ${notif.type === 'critical' ? 'text-rose-700' : 'text-slate-600'}`}>
                          {notif.desc}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  /* ADMIN: Audit Log */
                  adminAuditLog.map(log => (
                    <div key={log.id} className="relative pl-6">
                      <div className="absolute -left-[18px] top-0.5 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                        {log.icon}
                      </div>
                      <p className="text-xs font-semibold text-slate-400 mb-0.5">{log.time}</p>
                      <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                        <p className="text-sm text-slate-800">
                          <span className="font-semibold text-slate-900">{log.by}</span> performed <span className="font-medium text-slate-600">{log.action}</span> on <span className="font-semibold text-slate-900 uppercase text-xs">{log.target}</span>.
                        </p>
                      </div>
                    </div>
                  ))
                )}

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
