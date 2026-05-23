import { useState, useEffect } from 'react';
import { Trash2, Edit, MoreVertical, ShieldAlert, TableProperties, Eye } from 'lucide-react';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
};

export default function UserTable({ currentUserRole }: { currentUserRole: 'Admin' | 'Superadmin' }) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/users', {
        headers: {
          'x-mock-role': currentUserRole, // Simulating a secure auth session header
        }
      });
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Could not establish database connection.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentUserRole]);

  const handleDelete = async (id: number) => {
    // UI Constraint check
    if (currentUserRole !== 'Superadmin') {
       alert("Forbidden: Your role does not allow deletions.");
       return;
    }

    try {
      // Backend Request
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {
           'x-mock-role': currentUserRole, // Security layer validation
        }
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete');
      }

      // Optimistic update
      setUsers(users.filter(u => u.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col w-full">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <TableProperties size={18} className="text-slate-500" />
          Admin Directory
        </h2>
        <div className="flex gap-2">
          <select className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-600 focus:ring-emerald-500 outline-none shadow-sm cursor-pointer">
            <option>All Roles</option>
            <option>Superadmin</option>
            <option>Admin</option>
          </select>
          <select className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-600 focus:ring-emerald-500 outline-none shadow-sm cursor-pointer">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-widest">User</th>
              <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Role</th>
              <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Status</th>
              <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                  <div className="animate-pulse flex flex-col items-center">
                     <div className="h-6 w-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                     <span className="mt-3 text-sm font-medium">Fetching secure data from Prisma...</span>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-rose-500 flex flex-col items-center">
                  <ShieldAlert className="h-10 w-10 mb-2 opacity-50" />
                  <span className="font-medium">{error}</span>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">
                        {user.name.split(' ').map(n => n.charAt(0)).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{user.name}</div>
                        <div className="text-slate-500 text-xs mt-0.5">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                      user.role === 'Superadmin' 
                        ? 'bg-amber-100 text-amber-900 border border-amber-200/60' 
                        : 'bg-slate-100 text-slate-600 border border-slate-200/60'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      user.status === 'Active' 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200/60'
                        : 'bg-rose-100 text-rose-800 border border-rose-200/60'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                     <div className="flex justify-end gap-1.5 items-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-1.5 text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 border border-transparent hover:border-slate-200 rounded transition-all shadow-sm" title="View">
                         <Eye className="h-4 w-4" />
                       </button>
                       <button className="p-1.5 text-slate-400 hover:text-emerald-700 bg-white hover:bg-slate-100 border border-transparent hover:border-slate-200 rounded transition-all shadow-sm" title="Edit">
                         <Edit className="h-4 w-4" />
                       </button>
                       {/* ROLE LOGIC IN UI: Only display the Delete button if the user is a Superadmin */}
                       {currentUserRole === 'Superadmin' && (
                         <button 
                            onClick={() => handleDelete(user.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 bg-white rounded transition-all shadow-sm" 
                            title="Delete User"
                         >
                           <Trash2 className="h-4 w-4" />
                         </button>
                       )}
                     </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-sm">
        <span className="text-slate-500">Showing <span className="font-semibold text-slate-900">{users.length}</span> results</span>
        <div className="flex gap-1">
          <button className="px-3 py-1 rounded border border-slate-200 text-slate-500 hover:bg-slate-100 bg-white shadow-sm font-medium disabled:opacity-50" disabled>Prev</button>
          <button className="px-3 py-1 rounded bg-emerald-800 text-white font-medium shadow-sm">1</button>
          <button className="px-3 py-1 rounded border border-slate-200 text-slate-700 hover:bg-slate-100 bg-white shadow-sm font-medium">Next</button>
        </div>
      </div>
    </div>
  );
}
