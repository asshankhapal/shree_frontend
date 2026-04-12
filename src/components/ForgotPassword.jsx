import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Cpu, Mail, ChevronRight, ArrowLeft, ShieldCheck, ShieldAlert } from "lucide-react";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/api/auth/forgot-password", { email });
      setMessage(res.data.message || "A reset link has been sent to your email!");
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Could not connect to the server. Please try again.");
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
                Reset Password
              </div>
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="w-full max-w-md relative z-10">
          <div className="rounded-[3rem] border border-slate-800 bg-slate-900/60 backdrop-blur-2xl p-8 shadow-2xl md:p-12 border-t-blue-500/10 transition-all duration-500">
            
            <div className="text-[10px] font-black tracking-[0.3em] text-blue-500 uppercase mb-3 text-center">
              {sent ? "Check Your Email" : "Forgot Password?"}
            </div>
            <h2 className="text-4xl font-black tracking-tighter text-white mb-2 uppercase italic text-center">
              {sent ? "Email Sent" : "Reset Password"}
            </h2>
            <p className="text-slate-500 font-medium text-sm mb-10 leading-relaxed text-center px-4 font-tech uppercase tracking-widest">
              {sent 
                ? "We've sent a reset link to your email. Click it to create a new password." 
                : "Enter your email and we'll send you a link to reset your password."}
            </p>

            {message && (
              <div className="mb-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                {message}
              </div>
            )}

            {error && (
              <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-[10px] font-black uppercase tracking-widest text-red-500 flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}

            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1 ml-1">Email Address</label>
                  <div className="relative group">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 text-slate-500 transition-colors group-focus-within:text-blue-500">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950 py-4 pl-12 pr-4 text-sm text-white placeholder:text-slate-800 outline-none ring-0 transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 font-tech"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-15 bg-blue-600 text-white rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                  {!loading && <ChevronRight className="w-4 h-4" />}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    Back to Login
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/10">
                    <Mail className="w-10 h-10 text-emerald-500" />
                  </div>
                  <p className="text-slate-400 text-sm mb-8">
                    Didn't receive the email? Check your spam folder or try again.
                  </p>
                </div>

                <button
                  onClick={() => { setSent(false); setMessage(""); setError(""); }}
                  className="w-full h-15 bg-slate-800 text-slate-300 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-[0.2em] text-[11px] border border-slate-700 hover:bg-slate-700 hover:text-white transition-all"
                >
                  Try Again
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
