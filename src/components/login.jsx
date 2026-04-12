import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Apple, ChevronRight, Eye, EyeOff, Mail, ShieldCheck, Wrench, Sparkles, Globe, Lock, Cpu, Zap, Microchip, Layers } from "lucide-react";

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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-blue-500/30">
      <header className="bg-slate-950/50 backdrop-blur-xl border-b border-slate-900 sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-transform group-hover:scale-110">
              <Cpu className="h-5 w-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="text-xl font-black text-white tracking-tight uppercase">Shree <span className="text-blue-600">Enterprises</span></div>
              <div className="-mt-1 text-[10px] text-slate-500 font-black tracking-widest uppercase opacity-70">
                Expert Tech Services
              </div>
            </div>
          </div>

          <nav className="hidden items-center space-x-8 text-[11px] font-black uppercase tracking-widest text-slate-500 md:flex">
            <Link className="hover:text-white transition-colors" to="/about">About Us</Link>
            <Link className="hover:text-white transition-colors" to="/contact">Contact Us</Link>
            <Link to="/register" className="ml-4 rounded-xl bg-white px-6 py-2.5 text-slate-950 transition hover:bg-slate-200 shadow-xl font-black hover:scale-105 active:scale-95">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 mx-auto grid max-w-7xl items-center gap-16 px-6 py-12 md:grid-cols-2 lg:py-20">
        <section className="relative group lg:pr-10">
          
          <div className="relative z-10 space-y-10">       
            <h1 className="text-6xl font-black leading-[1] tracking-tighter text-white lg:text-8xl">
              Expert <br />
              <span className="text-blue-600 italic">Tech</span> <br />
              Repairs.
            </h1>
            
            <p className="max-w-md text-lg text-slate-400 font-medium leading-relaxed border-l-2 border-blue-600/30 pl-6">
              Your one-stop shop for expert electronics repair. We specialize in fixing motherboards and complex logic boards.
            </p>

            <div className="space-y-6 pt-4">
              {heroBullets.map((b) => (
                <div key={b.title} className="flex items-center gap-5 group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-blue-500 shadow-2xl transition-all group-hover:border-blue-600 group-hover:bg-blue-600/10 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">{b.title}</div>
                </div>
              ))}
            </div>

          </div>
        </section>

        <section className="flex items-center justify-center relative">
          <div className="absolute inset-0 bg-blue-600/5 blur-3xl pointer-events-none"></div>
          
          <div className="w-full max-w-md relative z-10 perspective-1000">
            <div className="rounded-[3rem] border border-slate-800 bg-slate-900/60 backdrop-blur-2xl p-8 shadow-2xl md:p-12 border-t-blue-500/10">
              <div className="absolute top-0 right-0 p-8 flex gap-1 items-center">
                 <div className="w-1 h-1 rounded-full bg-blue-600 animate-ping"></div>
                 <div className="text-[9px] font-bold text-blue-600 uppercase tracking-tighter">Live</div>
              </div>

              <div className="text-[10px] font-black tracking-[0.3em] text-blue-500 uppercase mb-3">Welcome Back</div>
              <h2 className="text-4xl font-black tracking-tighter text-white mb-2 uppercase italic">Sign In</h2>
              

              {error && (
                <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-[10px] font-black uppercase tracking-widest text-red-500 flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-300 shadow-[0_0_20px_rgba(239,68,68,0.05)]">
                  <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                  {error}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">
                    Email ID
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

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                      Password
                    </label>
                    <Link className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors" to="/forgot-password">
                      Forgot Password?
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
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-600 hover:text-slate-400 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex cursor-pointer items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-400 transition-colors group">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="peer h-5 w-5 opacity-0 absolute cursor-pointer"
                      />
                      <div className="h-5 w-5 rounded-lg border border-slate-800 bg-slate-950 flex items-center justify-center transition-all peer-checked:bg-blue-600 peer-checked:border-blue-600 group-hover:border-slate-700">
                         <div className="h-2 w-2 rounded-full bg-white opacity-0 transition-opacity peer-checked:opacity-100"></div>
                      </div>
                    </div>
                    Remember Me
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 flex w-full h-14 items-center justify-center gap-3 rounded-2xl bg-blue-600 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-2xl shadow-blue-600/30 transition-all hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] focus:ring-4 focus:ring-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed text-glow"
                >
                  <span>{loading ? "Logging in..." : "Login"}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>


                <div className="pt-10 text-center text-[10px] font-black uppercase tracking-widest text-slate-600">
                  New here?{" "}
                  <Link to="/register" className="text-blue-500 hover:text-blue-400 transition-all underline decoration-blue-500/30 underline-offset-4">
                    Join Now
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Technical Insights Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 border-t border-slate-900 bg-circuit">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-4">
               <Zap className="w-3 h-3" /> Our Expertise
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic mb-4 text-glow">Quality <span className="text-blue-600">Service</span></h2>
          <p className="text-slate-500 font-medium text-sm leading-relaxed uppercase tracking-widest font-tech">Professional care for all your favorite devices.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: "Micro-Soldering", 
              desc: "Utilizing advanced IPC-A-610 standards for high-density interconnect repairs and logic board restoration.",
              icon: Microchip,
              tag: "Protocols"
            },
            { 
              title: "Data Recovery", 
              desc: "Bit-for-bit physical and logical recovery protocols for failing SSD and NVMe storage architectures.",
              icon: Layers,
              tag: "Security"
            },
            { 
              title: "Voltage Mgmt", 
              desc: "Extending lithium-ion lifecycle through precision voltage management and health cycle synchronization.",
              icon: Zap,
              tag: "Energy"
            }
          ].map((card, idx) => (
            <div key={idx} className="group bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-10 rounded-[2.5rem] hover:border-blue-600/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-600/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <card.icon className="w-16 h-16" />
              </div>
              <div className="mb-6 h-14 w-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform shadow-inner">
                <card.icon className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 mb-2">{card.tag}</div>
              <h3 className="text-xl font-black text-white tracking-tight uppercase italic mb-4">{card.title}</h3>
              <p className="text-slate-500 font-medium text-xs leading-relaxed uppercase tracking-wide font-tech">{card.desc}</p>
              
              <div className="mt-8 flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
                See How We Work <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fullscreen Hero Image Section */}
      <section className="relative h-[600px] w-full overflow-hidden border-y border-slate-900 group">
         <img 
            src="/hero-electronics.png" 
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-70 transition-all duration-1000 scale-105 group-hover:scale-100"
            alt="Electronics Repair Suite"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950"></div>
         <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950"></div>
         
         <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
            <div className="h-20 w-px bg-gradient-to-b from-blue-600/0 to-blue-600 mb-6 group-hover:h-32 transition-all"></div>
            <h3 className="text-4xl font-black text-white italic uppercase tracking-[0.5em] text-glow mb-4">Expert Repairs</h3>
            <p className="text-[11px] font-black text-blue-500 uppercase tracking-[0.8em] animate-pulse">System Status: Online</p>
         </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
        
        <div className="mx-auto max-w-7xl px-6 py-20 pb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2 space-y-8">
               <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 shadow-[0_0_25px_rgba(37,99,235,0.4)]">
                  <Cpu className="h-6 w-6 text-white animate-pulse" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white tracking-widest uppercase italic">Shree <span className="text-blue-600 underline decoration-blue-600/30 underline-offset-8">Enterprises</span></div>
                  <div className="text-[10px] text-slate-500 font-black tracking-[0.4em] uppercase opacity-70 mt-1">
                    Your Trusted Tech Experts
                  </div>
                </div>
              </div>
              <p className="max-w-sm text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 leading-relaxed">
                Providing expert electronics repair and quality service since 2004.
              </p>
              <div className="flex gap-4">
                 {[1,2,3,4].map(i => <div key={i} className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-blue-600 transition-colors cursor-pointer"><Globe className="w-3.5 h-3.5 text-slate-500" /></div>)}
              </div>
            </div>

            <div className="space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white underline decoration-blue-600/50 underline-offset-8">Our Services</h4>
               <ul className="space-y-4">
                  {["Logic Board Repair", "Data Recovery", "Thermal Management", "Network Help"].map(item => (
                    <li key={item}><a href="#" className="text-[9px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-500 transition-colors">{item}</a></li>
                  ))}
               </ul>
            </div>

            <div className="space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white underline decoration-blue-600/50 underline-offset-8">Admin Area</h4>
               <ul className="space-y-4">
                  <li>
                    <Link to="/admin" className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-[10px] font-black uppercase tracking-widest text-blue-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all group scale-100 hover:scale-105 active:scale-95 shadow-2xl shadow-blue-600/10 hover:shadow-blue-600/30">
                       <ShieldCheck className="w-4 h-4 group-hover:rotate-12 transition-transform" /> Admin Portal
                    </Link>
                  </li>
                 
                  <li>
                    <a href="#" className="text-[9px] font-black uppercase tracking-widest text-slate-600 hover:text-white transition-colors">Report an Issue</a>
                  </li>
               </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-10 border-t border-slate-900">
             <div className="flex items-center gap-4">
                <div className="h-4 w-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                   <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></div>
                </div>
                <div className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-700">
                   System Status: Online
                </div>
             </div>
             <div className="flex items-center gap-10 text-[9px] font-black uppercase tracking-widest text-slate-700">
                <a href="#" className="hover:text-blue-500 transition-colors">ISO 27001 Certified</a>
                <a href="#" className="hover:text-blue-500 transition-colors">Legal Info</a>
                <a href="#" className="hover:text-blue-500 transition-colors">Service Terms</a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
