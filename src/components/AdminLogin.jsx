import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Lock, Mail, ChevronRight, Wrench, AlertCircle, Shield, Activity } from "lucide-react";

function Input({ icon, type, value, onChange, placeholder, autoComplete }) {
  return (
    <div className="relative group">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 transition-colors group-focus-within:text-blue-500">
        {React.createElement(icon, { className: "h-4 w-4" })}
      </div>
      <input
        className="w-full rounded-2xl border border-slate-800 bg-slate-950 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-600 outline-none ring-0 transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </div>
  );
}

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { adminLogin, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user && user.role === 'admin') {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await adminLogin(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Administrative authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-2xl shadow-blue-600/20 mb-6 transition-transform hover:scale-110">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div className="text-[10px] font-black tracking-[0.3em] text-blue-500 uppercase mb-2">Secure Gateway</div>
          <h1 className="text-4xl font-black text-white tracking-tight uppercase">Admin Login</h1>
          <p className="text-slate-500 mt-3 font-medium text-sm">Managed by Shree Enterprises Infrastructure</p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-black/40">
          {error && (
            <div className="mb-10 bg-red-500/10 border border-red-500/20 text-red-400 p-5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
               <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Administrative Identity</label>
              <Input
                icon={Mail}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@shree.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Access Token</label>
              <Input
                icon={Lock}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{loading ? "Decrypting..." : "Initialize Session"}</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>

        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Security Status: Hyper-Active</span>
          </div>
          
          <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.4em] text-center border-t border-slate-900 pt-6 px-10 leading-relaxed">
            Restricted Administrative Layer. Unauthorized intervention is strictly prohibited by security protocol.
          </p>
        </div>
      </div>
    </div>
  );
}
