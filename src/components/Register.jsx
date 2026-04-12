import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ChevronRight, Eye, EyeOff, Mail, User, Lock, ShieldCheck, Wrench, Sparkles, Globe } from "lucide-react";

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

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await register(username, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <header className="bg-slate-950/50 backdrop-blur-xl border-b border-slate-900 sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-110">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-xl font-black text-white tracking-tight uppercase">Shree <span className="text-blue-600">Enterprises</span></div>
              <div className="-mt-1 text-[10px] text-slate-500 font-black tracking-widest uppercase opacity-70">
                Customer Portal
              </div>
            </div>
          </div>

          <nav className="hidden items-center space-x-8 text-[11px] font-black uppercase tracking-widest text-slate-500 md:flex">
             <Link to="/" className="hover:text-white transition-colors">
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center justify-center px-6 py-12 pb-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="w-full max-w-lg relative z-10">
          <div className="rounded-[2.5rem] border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-8 shadow-2xl md:p-12">
            <div className="text-[10px] font-black tracking-[0.3em] text-blue-500 uppercase mb-3 text-center">Join Us</div>
            <h2 className="text-4xl font-black tracking-tight text-white mb-2 uppercase text-center">Create Account</h2>
            <p className="text-slate-500 font-medium text-sm mb-10 leading-relaxed text-center px-4">
              Create an account to manage your repairs and orders.
            </p>

            {error && (
              <div className="mb-10 rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-[10px] font-black uppercase tracking-widest text-red-500 flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">
                    Username
                  </label>
                  <Input
                    icon={User}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Your Name"
                    autoComplete="username"
                  />
                </div>

                <div className="space-y-2.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">
                    Email
                  </label>
                  <Input
                    icon={Mail}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        icon={Lock}
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        autoComplete="new-password"
                      />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Input
                        icon={ShieldCheck}
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-600 hover:text-slate-400 transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full h-14 items-center justify-center gap-3 rounded-2xl bg-blue-600 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-2xl shadow-blue-600/20 transition-all hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] focus:ring-4 focus:ring-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{loading ? "Creating Account..." : "Register"}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="pt-10 text-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                Already have an account?{" "}
                <Link to="/" className="text-blue-500 hover:text-blue-400 transition-all underline decoration-blue-500/30 underline-offset-4">
                  Sign In
                </Link>
              </div>
            </form>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All Systems Online</span>
          </div>
        </div>
      </main>
    </div>
  );
}
