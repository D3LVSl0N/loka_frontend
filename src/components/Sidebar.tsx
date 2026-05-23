import { LayoutDashboard, Users, UserPlus, BarChart2, Settings, LogOut, ShieldCheck } from 'lucide-react';

export type ViewType = 'dashboard' | 'users' | 'settings' | 'add-user' | 'reports';

interface SidebarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  onLogout: () => void;
}

export default function Sidebar({ currentView, onNavigate, onLogout }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users Management', icon: Users },
    { id: 'add-user', label: 'Add User', icon: UserPlus },
    { id: 'reports', label: 'Reports', icon: BarChart2 }, // Visual only
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col h-full shrink-0 z-20">
      {/* Brand Header */}
      <div className="p-6 border-b border-transparent flex items-center gap-3">
        <div className="h-9 w-9 bg-emerald-950 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
          <ShieldCheck className="h-5 w-5 text-emerald-400" />
        </div>
        <div>
          <span className="text-[19px] font-black text-emerald-950 tracking-tight leading-none block font-sans">LivestockGuard</span>
          <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider mt-0.5">Enterprise Admin</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1.5">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          const isImplemented = ['dashboard', 'users', 'settings', 'add-user', 'reports'].includes(item.id);
          
          return (
            <button
              key={item.id}
              onClick={() => isImplemented && onNavigate(item.id as ViewType)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all w-full text-left
                ${isActive 
                  ? 'bg-emerald-200/50 text-emerald-950 font-bold shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-emerald-950 font-medium'
                }
                ${!isImplemented ? 'opacity-40 cursor-not-allowed' : ''}
              `}
            >
              <Icon size={20} className={isActive ? "text-emerald-800" : "text-slate-400"} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200 mt-auto">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-red-700 hover:bg-red-50 transition-colors font-medium text-left"
        >
          <LogOut size={20} className="text-slate-400" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
