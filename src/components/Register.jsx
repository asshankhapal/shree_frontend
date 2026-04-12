import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ChevronRight, Eye, EyeOff, Mail, User, Lock, ShieldCheck, Wrench, Sparkles, Globe, Cpu } from "lucide-react";

function Input({ icon, type, value, onChange, placeholder, autoComplete }) {
  return (
    <div className="relative group">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 transition-colors group-focus-within:text-blue-600">
        {React.createElement(icon, { className: "h-4 w-4" })}
      </div>
      <input
        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none ring-0 transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5"
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-blue-600/10">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 shadow-lg shadow-blue-600/20 transition-transform group-hover:scale-105">
              <Cpu className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900 tracking-tight">Shree <span className="text-blue-600">Enterprises</span></div>
              <div className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                Customer Portal
              </div>
            </div>
          </div>

          <nav className="hidden items-center space-x-8 text-sm font-medium text-slate-600 md:flex">
             <Link to="/" className="hover:text-blue-600 transition-colors">
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 mx-auto flex max-w-7xl items-center justify-center px-6 py-12 md:py-20 relative overflow-hidden">
        <div className="w-full max-w-lg relative z-10">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl shadow-slate-200/50 md:p-12">
            <div className="mb-8 text-center">
              <div className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2">New Account</div>
              <h2 className="text-3xl font-bold text-slate-900">Get Started</h2>
              <p className="text-slate-500 font-medium text-sm mt-2">
                Join Shree Enterprises for premium tech repair tracking.
              </p>
            </div>

            {error && (
              <div className="mb-8 rounded-xl bg-red-50 border border-red-100 p-4 text-sm font-medium text-red-600 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
                    Full Name
                  </label>
                  <Input
                    icon={User}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="John Doe"
                    autoComplete="username"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
                    Email Address
                  </label>
                  <Input
                    icon={Mail}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    autoComplete="email"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
                      Password
                    </label>
                    <Input
                      icon={Lock}
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="new-password"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
                      Confirm
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
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-4 flex w-full h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:translate-y-[-1px] active:scale-[0.98] disabled:opacity-50"
              >
                <span>{loading ? "Creating Account..." : "Create Account"}</span>
                <ChevronRight className="h-4 w-4" />
              </button>

              <div className="pt-8 text-center text-sm font-medium text-slate-500">
                Already have an account?{" "}
                <Link to="/" className="text-blue-600 font-bold hover:underline underline-offset-4">
                  Sign In
                </Link>
              </div>
            </form>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
              All Systems Operational
          </div>
        </div>
      </main>
    </div>
  );
}

