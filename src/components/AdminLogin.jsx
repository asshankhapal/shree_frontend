import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Lock, Mail, ChevronRight, Wrench, AlertCircle, Shield, Activity, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function Input({ icon, type, value, onChange, placeholder, autoComplete }) {
  return (
    <div className="relative group">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 transition-colors group-focus-within:text-blue-500">
        {React.createElement(icon, { className: "h-4 w-4" })}
      </div>
      <input
        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-300 outline-none ring-0 transition-all focus:border-blue-600 focus:bg-white shadow-inner"
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
    <div className="min-h-screen bg-white text-slate-800 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-[500px] bg-blue-50/50 blur-[120px] rounded-full pointer-events-none -z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-[400px] bg-slate-50 blur-[100px] rounded-full pointer-events-none -z-0"></div>
      
      <div className="max-w-md w-full relative z-10">
        {/* Back Link */}
        <div className="mb-10">
           <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors text-xs font-bold uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4" />
              Return to Portal
           </Link>
        </div>

        <div className="text-center mb-10">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 shadow-xl mb-6">
            <Shield className="h-7 w-7 text-white" />
          </div>
          <div className="text-[10px] font-bold tracking-[0.3em] text-blue-600 uppercase mb-2">Internal Framework</div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Node <span className="text-blue-600">Admin</span></h1>
          <p className="text-slate-400 mt-2 font-medium text-sm">Enterprise Infrastructure Authentication</p>
        </div>

        <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden">
          {/* Subtle accent line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>

          {error && (
            <div className="mb-8 bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
               <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Management Identity</label>
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

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Administrative Credential</label>
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
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{loading ? "Decrypting Protocol..." : "Initialize Session"}</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>

        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span>Infrastructure Status: Optimal</span>
          </div>
          
          <div className="w-full border-t border-slate-100 pt-8 mt-4">
              <p className="text-slate-300 text-[9px] font-bold uppercase tracking-[0.3em] text-center leading-relaxed max-w-[280px] mx-auto">
                Confidential Node Access. All administrative interactions are logged and encrypted.
              </p>
          </div>
        </div>
      </div>
    </div>
  );
}

