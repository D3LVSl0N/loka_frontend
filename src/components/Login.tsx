import { useState } from 'react';
import { ShieldAlert, Eye, Lock, User, LogIn } from 'lucide-react';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (identifier && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex text-slate-800 bg-white selection:bg-emerald-100">
      {/* Left Column: Image Area */}
      <div className="hidden lg:flex lg:w-7/12 relative bg-slate-900 overflow-hidden items-center justify-center">
        <img
          alt="Livestock in field"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-75"
          src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=2070"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/90 via-emerald-900/40 to-transparent z-10 mix-blend-multiply"></div>
        <div className="absolute inset-0 z-20 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        
        <div className="absolute bottom-12 left-12 z-30 max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-white shadow-2xl">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert size={20} className="text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Earth-First Security</span>
          </div>
          <p className="text-3xl font-bold leading-tight mb-3 text-white">Protecting your livelihood, 24/7.</p>
          <p className="text-slate-200 opacity-90 text-sm leading-relaxed">Advanced real-time tracking, anti-theft alerts, and comprehensive herd health monitoring.</p>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="w-full lg:w-5/12 flex items-center justify-center p-6 md:p-12 bg-slate-50 relative">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-emerald-950 text-emerald-400 mb-2 shadow-sm">
              <ShieldAlert size={32} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">LivestockGuard</h1>
            <p className="text-slate-500 text-sm">Secure livestock monitoring and anti-theft management.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 pt-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700" htmlFor="identifier">Username or Phone Number</label>
              <div className="flex items-center bg-white border border-slate-300 rounded-lg overflow-hidden focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-600 transition-all shadow-sm">
                <div className="pl-3 pr-2 text-slate-400">
                  <User size={18} />
                </div>
                <input
                  id="identifier"
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="flex-1 py-2.5 px-2 bg-transparent border-none focus:ring-0 text-sm text-slate-900 w-full outline-none"
                  placeholder="Enter username or phone"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700" htmlFor="password">Password</label>
              <div className="flex items-center bg-white border border-slate-300 rounded-lg overflow-hidden focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-600 transition-all shadow-sm">
                <div className="pl-3 pr-2 text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 py-2.5 px-2 bg-transparent border-none focus:ring-0 text-sm text-slate-900 w-full outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="pr-3 pl-2 text-slate-400 hover:text-emerald-700 transition-colors"
                >
                  <Eye size={18} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-emerald-800 focus:ring-emerald-700 cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm font-medium text-slate-600 cursor-pointer">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition-colors">
                Forgot password?
              </a>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow text-sm font-semibold text-white bg-emerald-950 hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-900 transition-colors"
              >
                Login
                <LogIn size={16} />
              </button>
            </div>
          </form>

          <div className="text-center pt-6">
            <p className="text-sm text-slate-500">
              Need help accessing your account? <br />
              <a href="#" className="text-emerald-800 font-bold hover:underline mt-1 inline-block">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
