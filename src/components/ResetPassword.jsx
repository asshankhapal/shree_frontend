import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Cpu, Lock, ChevronRight, ArrowLeft, ShieldCheck, ShieldAlert, Eye, EyeOff, CheckCircle2 } from "lucide-react";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`http://localhost:3000/api/auth/reset-password/${token}`, {
        password: newPassword,
      });
      setMessage(res.data.message || "Password updated successfully!");
      setSuccess(true);
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "This reset link is invalid or has expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-blue-500/30">
      <header className="bg-slate-950/50 backdrop-blur-xl border-b border-slate-900 sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-transform group-hover:scale-110">
              <Cpu className="h-5 w-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="text-xl font-black text-white tracking-tight uppercase italic">Shree <span className="text-blue-600">Enterprises</span></div>
              <div className="-mt-1 text-[10px] text-slate-500 font-black tracking-widest uppercase opacity-70 font-tech">
                New Password
              </div>
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="w-full max-w-md relative z-10">
          <div className="rounded-[3rem] border border-slate-800 bg-slate-900/60 backdrop-blur-2xl p-8 shadow-2xl md:p-12 border-t-blue-500/10 transition-all duration-500">
            
            {!success ? (
              <>
                <div className="text-[10px] font-black tracking-[0.3em] text-blue-500 uppercase mb-3 text-center">
                  Create New Password
                </div>
                <h2 className="text-4xl font-black tracking-tighter text-white mb-2 uppercase italic text-center">
                  New Password
                </h2>
                <p className="text-slate-500 font-medium text-sm mb-10 leading-relaxed text-center px-4 font-tech uppercase tracking-widest">
                  Enter a new password for your account.
                </p>

                {error && (
                  <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-[10px] font-black uppercase tracking-widest text-red-500 flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-6">
                    <div className="space-y-2.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1 ml-1">New Password</label>
                      <div className="relative group">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 text-slate-500 transition-colors group-focus-within:text-blue-500">
                          <Lock className="h-4 w-4" />
                        </div>
                        <input
                          className="w-full rounded-2xl border border-slate-800 bg-slate-950 py-4 pl-12 pr-12 text-sm text-white placeholder:text-slate-800 outline-none ring-0 transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 font-tech"
                          type={showPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          minLength={6}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors">
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1 ml-1">Confirm Password</label>
                      <div className="relative group">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 text-slate-500 transition-colors group-focus-within:text-blue-500">
                          <ShieldCheck className="h-4 w-4" />
                        </div>
                        <input
                          className="w-full rounded-2xl border border-slate-800 bg-slate-950 py-4 pl-12 pr-4 text-sm text-white placeholder:text-slate-800 outline-none ring-0 transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 font-tech"
                          type={showPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          minLength={6}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-15 bg-blue-600 text-white rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  >
                    {loading ? "Updating..." : "Reset Password"}
                    {!loading && <ChevronRight className="w-4 h-4" />}
                  </button>

                  <div className="text-center">
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      Back to Login
                    </Link>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/10">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>

                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Done!</h2>

                {message && (
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-4 justify-center">
                    <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                    {message}
                  </div>
                )}

                <p className="text-slate-400 text-sm">
                  Your password has been updated. Redirecting to login...
                </p>

                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all"
                >
                  Go to Login
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-3 text-[9px] font-black uppercase tracking-[0.4em] text-slate-800">
              <span>Secure Connection</span>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600/10"></div>
              <span>Version 1.0.0</span>
          </div>
        </div>
      </main>
    </div>
  );
}
