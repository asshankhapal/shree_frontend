import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ChevronRight, Eye, EyeOff, Mail, ShieldCheck, Wrench, Sparkles, Globe, Lock, Cpu, Zap, Microchip, Layers, Target, Award, Rocket, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-blue-600/10">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-slate-200 shadow-md overflow-hidden transition-transform group-hover:scale-105">
                  <img src="/favicon.png" alt="Super Logo" className="h-8 w-8 object-contain" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900 tracking-tight">Super <span className="text-blue-600">Computers</span></div>
              <div className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                Expert Tech Services
              </div>
            </div>
          </motion.div>

          <nav className="hidden items-center space-x-8 text-sm font-medium text-slate-600 md:flex">
            <Link className="hover:text-blue-600 transition-colors" to="/about">About Us</Link>
            <Link className="hover:text-blue-600 transition-colors" to="/contact">Contact Us</Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/register" className="ml-4 rounded-lg bg-slate-900 px-5 py-2 text-white transition hover:bg-slate-800 shadow-md font-semibold">
                Get Started
              </Link>
            </motion.div>
          </nav>
        </div>
      </header>

      <main className="flex-1 mx-auto grid max-w-7xl items-center gap-12 px-6 py-12 md:grid-cols-2 lg:py-24">
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:pr-12"
        >
          <div className="space-y-8">       
            <motion.h1 
              variants={itemVariants}
              className="text-5xl font-extrabold leading-tight tracking-tight text-slate-900 lg:text-7xl"
            >
              Professional <br />
              <span className="text-blue-600">Electronics</span> <br />
              Repair Suite.
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="max-w-md text-lg text-slate-600 font-medium leading-relaxed"
            >
              Precision engineering and expert care for your sophisticated devices. We specialize in logic board restorations and hardware solutions.
            </motion.p>

            <motion.div 
              variants={containerVariants}
              className="space-y-5 pt-4"
            >
              {heroBullets.map((b) => (
                <motion.div 
                  key={b.title} 
                  variants={itemVariants}
                  className="flex items-center gap-4 group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-slate-200 text-blue-600 shadow-sm transition-all group-hover:border-blue-600 group-hover:shadow-md">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-semibold text-slate-700">{b.title}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center"
        >
          <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 p-8 shadow-xl shadow-slate-200/50 md:p-10">
            <div className="mb-8">
              <div className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2">Secure Access</div>
              <h2 className="text-3xl font-bold text-slate-900">Sign In</h2>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-6 rounded-xl bg-red-50 border border-red-100 p-4 text-sm font-medium text-red-600 flex items-center gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                {error}
              </motion.div>
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

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="mt-4 flex w-full h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 disabled:opacity-50"
              >
                <span>{loading ? "Verifying..." : "Login"}</span>
                <ChevronRight className="h-4 w-4" />
              </motion.button>

              <div className="pt-8 text-center text-sm font-medium text-slate-500">
                New to Super?{" "}
                <Link to="/register" className="text-blue-600 font-bold hover:underline underline-offset-4">
                  Register Account
                </Link>
              </div>
            </form>
          </div>
        </motion.section>
      </main>

      {/* Mission & Values (Moved from About Us) */}
      <section className="bg-white py-24 border-y border-slate-100 overflow-hidden">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-8"
        >
          {[
            { 
              title: "Precision Objective", 
              desc: "Our primary mission is to minimize operational downtime by providing rapid-response technical recovery for consumer and enterprise hardware.",
              icon: Target,
              color: "text-blue-600",
              bg: "bg-blue-50"
            },
            { 
              title: "Quality Assurance", 
              desc: "We adhere to ISO-standard quality management protocols, ensuring every repaired unit meets or exceeds original manufacturer specifications.",
              icon: Award,
              color: "text-emerald-600",
              bg: "bg-emerald-50"
            },
            { 
              title: "Scale & Growth", 
              desc: "Continuously investing in state-of-the-art diagnostic BGA workstations and microscopic soldering technology to handle the latest silicon architecture.",
              icon: Rocket,
              color: "text-indigo-600",
              bg: "bg-indigo-50"
            }
          ].map((box, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="bg-slate-50 border border-slate-200 p-8 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-slate-200 hover:border-blue-200"
            >
              <div className={`mb-6 h-14 w-14 rounded-2xl ${box.bg} ${box.color} flex items-center justify-center shadow-sm`}>
                <box.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-4">{box.title}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">{box.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Details Section (Moved from About Us) */}
      <section className="mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-2 gap-20 items-center overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
              <div className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">Legacy Profile</div>
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight leading-tight">Decades of Expertise, <br /> <span className="text-blue-600">Enterprise Standard.</span></h2>
              <p className="text-slate-500 font-medium text-base leading-relaxed">
                  Trusted by thousands of individual clients and hundreds of corporate partners, Super Computers represents the pinnacle of electronics service. We provide a full-cycle ecosystem for hardware management — from procurement of new assets to complex logic board recovery.
              </p>
              <div className="pt-4 space-y-4">
                  {[
                    "Qualified IPC-7711/7721 Bench Technicians",
                    "ESD-Safe Laboratory Environment",
                    "Authorized Genuine Part Sourcing Linkage"
                  ].map((text, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                      className="flex items-center gap-3 text-xs font-bold text-slate-600"
                    >
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                        {text}
                    </motion.div>
                  ))}
              </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
              <div className="absolute inset-0 bg-blue-100/50 blur-[80px] rounded-full opacity-50"></div>
              <div className="relative aspect-video rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-2xl p-2">
                  <div className="w-full h-full rounded-2xl bg-slate-900 overflow-hidden relative">
                        <motion.img 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 1.5 }}
                        src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop" 
                        className="w-full h-full object-cover opacity-80" 
                        alt="Technical Infrastructure"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
                      <div className="absolute bottom-6 left-6">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400 mb-1">Infrastructure View</div>
                          <div className="text-lg font-bold text-white tracking-tight">Main Diagnostic Lab</div>
                      </div>
                  </div>
              </div>
          </motion.div>
      </section>

      <section className="bg-white border-t border-slate-200 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider mb-4 border border-blue-100">
               <Zap className="w-3 h-3" /> Industry Leading Service
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">World-Class Repair Technology</h2>
            <p className="text-slate-500 font-medium">Providing precision-focused hardware repair services since 2004.</p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
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
              <motion.div 
                key={idx} 
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  backgroundColor: "#ffffff",
                  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                }}
                className="group bg-slate-50 border border-slate-200 p-8 rounded-2xl transition-all duration-300"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="mb-6 h-12 w-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm"
                >
                  <card.icon className="w-5 h-5" />
                </motion.div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">{card.tag}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{card.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-300">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-6 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-slate-100 shadow-lg overflow-hidden">
                  <img src="/favicon.png" alt="Super Logo" className="h-8 w-8 object-contain" />
                </div>
                <div className="text-xl font-bold text-white tracking-tight">Super <span className="text-blue-500">Computers</span></div>
              </div>
              <p className="max-w-xs text-sm text-slate-400 font-medium leading-relaxed mx-auto md:mx-0">
                Specializing in expert electronics repair and quality corporate services for over 20 years.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-6">
               <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Access Node</div>
               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                 <Link to="/admin" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-sm font-bold text-blue-500 hover:bg-white hover:text-slate-900 transition-all shadow-xl">
                    <ShieldCheck className="w-4 h-4" /> Admin Portal
                 </Link>
               </motion.div>
               <div className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                 © 2024 Super Computers Systems
               </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

