import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Cpu, Mail, ChevronRight, ArrowLeft, ShieldCheck, ShieldAlert, CheckCircle2 } from "lucide-react";

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
      const res = await axios.post("https://www.shreeenterprise.app/api/auth/forgot-password", { email });
      setMessage(res.data.message || "A reset link has been sent to your email!");
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Could not connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans flex flex-col selection:bg-blue-600/10">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 shadow-lg shadow-blue-600/20 transition-transform group-hover:scale-105">
              <Cpu className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900 tracking-tight">Shree <span className="text-blue-600">Enterprises</span></div>
              <div className="-mt-0.5 text-[10px] text-slate-400 font-bold tracking-widest uppercase">
                Security Module
              </div>
            </div>
          </Link>

          <Link to="/" className="flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-500 px-4 py-2 rounded-xl font-bold hover:bg-white hover:text-slate-900 transition-all text-xs">
            <ArrowLeft className="w-4 h-4" />
            Back to Portal
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50/50 blur-[120px] rounded-full pointer-events-none -z-0"></div>
        
        <div className="w-full max-w-md relative z-10">
          <div className="bg-white border border-slate-100 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden transition-all duration-500">
            {/* Subtle accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
            
            <div className="text-[10px] font-bold tracking-[0.3em] text-blue-600 uppercase mb-3 text-center">
              {sent ? "Protocol Initialized" : "Account Recovery"}
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2 text-center">
              {sent ? "Email Transmitted" : "Reset Password"}
            </h2>
            <p className="text-slate-400 font-medium text-sm mb-10 leading-relaxed text-center px-4">
              {sent 
                ? "We've sent a cryptographically secure reset link to your primary email address." 
                : "Provide your registered email address to receive a secure password recovery link."}
            </p>

            {message && !sent && (
              <div className="mb-8 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                {message}
              </div>
            )}

            {error && (
              <div className="mb-8 rounded-xl border border-red-100 bg-red-50 p-4 text-xs font-bold uppercase tracking-wider text-red-600 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1 ml-1">Email Connection</label>
                  <div className="relative group">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-300 transition-colors group-focus-within:text-blue-500">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-300 outline-none ring-0 transition-all focus:border-blue-600 focus:bg-white shadow-inner"
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
                  className="w-full h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-xs shadow-xl hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? "Transmitting..." : "Receive Reset Link"}
                  {!loading && <ChevronRight className="w-4 h-4" />}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    Return to Login
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <p className="text-slate-500 text-sm font-medium">
                    If an account exists with this email, the reset link will arrive shortly. Please check your spam folder if it doesn't appear within 2 minutes.
                  </p>
                </div>

                <button
                  onClick={() => { setSent(false); setMessage(""); setError(""); }}
                  className="w-full h-14 bg-white text-slate-600 rounded-xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-xs border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
                >
                  Attempt Retry
                </button>

                <div className="text-center pt-2">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    Back to Platform
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-6 text-[9px] font-bold uppercase tracking-[0.3em] text-slate-300">
              <span className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                 TLS Link Encrypted
              </span>
              <span>Global Support Nodes Active</span>
          </div>
        </div>
      </main>
    </div>
  );
}

