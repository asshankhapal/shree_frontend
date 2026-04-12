import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ChevronRight, Eye, EyeOff, Mail, ShieldCheck, Wrench, Sparkles, Globe, Lock, Cpu, Zap, Microchip, Layers } from "lucide-react";

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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const heroBullets = useMemo(
    () => [
      { title: "Expert Micro-Soldering", icon: Zap },
      { title: "Premium Laptop Sales & Service", icon: Cpu },
      { title: "Quality Hardware Repairs", icon: Microchip },
    ],
    [],
  );

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
                Expert Tech Services
              </div>
            </div>
          </div>

          <nav className="hidden items-center space-x-8 text-sm font-medium text-slate-600 md:flex">
            <Link className="hover:text-blue-600 transition-colors" to="/about">About Us</Link>
            <Link className="hover:text-blue-600 transition-colors" to="/contact">Contact Us</Link>
            <Link to="/register" className="ml-4 rounded-lg bg-slate-900 px-5 py-2 text-white transition hover:bg-slate-800 shadow-md font-semibold">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 mx-auto grid max-w-7xl items-center gap-12 px-6 py-12 md:grid-cols-2 lg:py-24">
        <section className="lg:pr-12">
          <div className="space-y-8">       
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-slate-900 lg:text-7xl">
              Professional <br />
              <span className="text-blue-600">Electronics</span> <br />
              Repair Suite.
            </h1>
            
            <p className="max-w-md text-lg text-slate-600 font-medium leading-relaxed">
              Precision engineering and expert care for your sophisticated devices. We specialize in logic board restorations and hardware solutions.
            </p>

            <div className="space-y-5 pt-4">
              {heroBullets.map((b) => (
                <div key={b.title} className="flex items-center gap-4 group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-slate-200 text-blue-600 shadow-sm transition-all group-hover:border-blue-600 group-hover:shadow-md">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-semibold text-slate-700">{b.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 p-8 shadow-xl shadow-slate-200/50 md:p-10">
            <div className="mb-8">
              <div className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2">Secure Access</div>
              <h2 className="text-3xl font-bold text-slate-900">Sign In</h2>
            </div>

            {error && (
              <div className="mb-6 rounded-xl bg-red-50 border border-red-100 p-4 text-sm font-medium text-red-600 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
                  Email Address
                </label>
                <Input
                  icon={Mail}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Password
                  </label>
                  <Link className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors" to="/forgot-password">
                    Forgot?
                  </Link>
                </div>

                <div className="relative">
                  <Input
                    icon={Lock}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex cursor-pointer items-center gap-3 text-xs font-bold text-slate-500 hover:text-slate-700 group">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                  />
                  Stay signed in
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-4 flex w-full h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:translate-y-[-1px] active:scale-[0.98] disabled:opacity-50"
              >
                <span>{loading ? "Verifying..." : "Login"}</span>
                <ChevronRight className="h-4 w-4" />
              </button>

              <div className="pt-8 text-center text-sm font-medium text-slate-500">
                New to Shree?{" "}
                <Link to="/register" className="text-blue-600 font-bold hover:underline underline-offset-4">
                  Register Account
                </Link>
              </div>
            </form>
          </div>
        </section>
      </main>

      <section className="bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider mb-4 border border-blue-100">
               <Zap className="w-3 h-3" /> Industry Leading Service
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">World-Class Repair Technology</h2>
            <p className="text-slate-500 font-medium">Providing precision-focused hardware repair services since 2004.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Micro-Soldering", 
                desc: "Expert logic board repair using high-precision thermal profiles and microsurgical tools.",
                icon: Microchip,
                tag: "Hardware"
              },
              { 
                title: "Data Recovery", 
                desc: "Secure retrieval of critical information from physically damaged storage systems.",
                icon: Layers,
                tag: "Forensics"
              },
              { 
                title: "Advanced Diagnostics", 
                desc: "Deep-level system analysis to identify complex hardware bottlenecks and failures.",
                icon: Cpu,
                tag: "Precision"
              }
            ].map((card, idx) => (
              <div key={idx} className="group bg-slate-50 border border-slate-200 p-8 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                <div className="mb-6 h-12 w-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                  <card.icon className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">{card.tag}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{card.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-300">
        <div className="mx-auto max-w-7xl px-6 py-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2 space-y-6">
               <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 shadow-lg">
                  <Cpu className="h-5 w-5 text-white" />
                </div>
                <div className="text-xl font-bold text-white tracking-tight">Shree <span className="text-blue-500">Enterprises</span></div>
              </div>
              <p className="max-w-xs text-sm text-slate-400 font-medium leading-relaxed">
                Specializing in expert electronics repair and quality corporate services for over 20 years.
              </p>
              <div className="flex gap-4">
                 {[1,2,3,4].map(i => <div key={i} className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer"><Globe className="w-4 h-4 text-slate-400" /></div>)}
              </div>
            </div>

            <div className="space-y-4">
               <h4 className="text-xs font-bold uppercase tracking-wider text-white">Services</h4>
               <ul className="space-y-2 text-sm font-medium">
                  {["Logic Board Repair", "Data Recovery", "Thermal Mgmt", "Corporate Support"].map(item => (
                    <li key={item}><a href="#" className="hover:text-blue-500 transition-colors">{item}</a></li>
                  ))}
               </ul>
            </div>

            <div className="space-y-4">
               <h4 className="text-xs font-bold uppercase tracking-wider text-white">Portal</h4>
               <ul className="space-y-4">
                  <li>
                    <Link to="/admin" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-xs font-bold text-blue-500 hover:bg-white hover:text-slate-900 transition-all shadow-sm">
                       <ShieldCheck className="w-3.5 h-3.5" /> Admin Portal
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="text-xs font-bold text-slate-500 hover:text-white transition-colors">Support Center</a>
                  </li>
               </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
             <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                Systems Operational
             </div>
             <div className="flex gap-8">
                <a href="#" className="hover:text-white transition-colors">ISO 27001</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

