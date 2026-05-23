import { useState } from 'react';
import { Save, Info, Eye, EyeOff } from 'lucide-react';

interface AddUserProps {
  currentUserRole: 'Admin' | 'Superadmin';
  onUserAdded: () => void;
  onCancel: () => void;
}

export default function AddUser({ currentUserRole, onUserAdded, onCancel }: AddUserProps) {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('User');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Frontend validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-mock-role': currentUserRole
        },
        body: JSON.stringify({
          name: username,
          email: email || phone,
          role: role,
          status: 'Active'
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create user');
      }

      onUserAdded();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Add New User</h2>
        <p className="text-slate-500 text-sm mt-1">Provision a new account with specific access credentials.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="p-6 md:p-8 flex flex-col gap-8">
            
            {/* Identity Details */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2">Identity Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700">Username / Full Name *</label>
                  <input required type="text" value={username} onChange={e=>setUsername(e.target.value)} placeholder="e.g. John Doe" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700">System Role *</label>
                  <select required value={role} onChange={e=>setRole(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none cursor-pointer bg-white">
                    <option value="User">Field Operator (User)</option>
                    <option value="Admin">Administrator</option>
                    <option value="Superadmin">Super Admin</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700">Phone Number *</label>
                  <input required type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 (555) 000-0000" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700 flex items-center justify-between">
                    <span>Email Address <span className="text-slate-400 font-normal">(Optional)</span></span>
                  </label>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="user@domain.com" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
                </div>
              </div>
            </div>

            {/* Security Credentials */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2">Security Credentials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5 relative">
                  <label className="text-sm font-semibold text-slate-700">Temporary Password *</label>
                  <div className="relative">
                    <input required type={showPassword ? "text" : "password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" className="w-full border border-slate-300 rounded-lg pl-3 pr-10 py-2.5 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-700">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {/* Password Strength Indicator */}
                  <div className="flex gap-1 mt-1">
                    <div className={`h-1 flex-1 rounded-full ${password.length > 0 ? 'bg-amber-400' : 'bg-slate-200'}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${password.length > 5 ? 'bg-amber-400' : 'bg-slate-200'}`}></div>
                    <div className={`h-1 flex-1 rounded-full ${password.length > 8 ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700">Confirm Password *</label>
                  <input required type={showPassword ? "text" : "password"} value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
                </div>
              </div>
            </div>

            {/* Error Message Module */}
            {error && (
              <div className="bg-rose-50 text-rose-800 px-4 py-3 rounded-lg text-sm border border-rose-200 font-medium animate-in fade-in slide-in-from-top-2">
                {error}
              </div>
            )}
          </div>

          <div className="bg-slate-50 px-6 md:px-8 py-5 border-t border-slate-200 flex justify-end gap-3">
            <button type="button" onClick={onCancel} className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg text-sm hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button disabled={isSubmitting} type="submit" className="px-5 py-2.5 bg-emerald-950 text-white font-medium rounded-lg text-sm hover:bg-emerald-900 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50">
              <Save size={18} />
              {isSubmitting ? 'Saving...' : 'Save User'}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 flex gap-3 items-start p-4 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 shadow-sm">
        <Info size={20} className="shrink-0 mt-0.5 text-emerald-600" />
        <p className="text-sm font-medium">
          Newly created users will be required to change their temporary password upon first login to the field app.
        </p>
      </div>
    </div>
  );
}
