import React from "react";
import { Link } from "react-router-dom";
import { Cpu, ShieldCheck, Globe, Zap, ArrowLeft, Target, Award, Rocket } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30 overflow-hidden">
      {/* Header */}
      <header className="bg-slate-950/50 backdrop-blur-xl border-b border-slate-900 sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-transform group-hover:scale-110">
              <Cpu className="h-5 w-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="text-xl font-black text-white tracking-tight uppercase italic">Shree <span className="text-blue-600">Enterprises</span></div>
              <div className="-mt-1 text-[10px] text-slate-500 font-black tracking-widest uppercase opacity-70 font-tech">
                Our Services
              </div>
            </div>
          </Link>

          <Link to="/" className="flex items-center gap-2 bg-slate-900 border border-slate-800 text-slate-400 px-4 py-2 rounded-xl font-bold hover:bg-slate-800 hover:text-white transition-all text-[11px] uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Link>
        </div>
      </header>

      <main className="relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <ShieldCheck className="w-3 h-3" /> Certified Repair Shop
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic text-glow mb-8 leading-none">
            We Fix <br /> <span className="text-blue-600">Your</span> Tech.
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 font-medium text-lg leading-relaxed uppercase tracking-wide font-tech">
            Shree Enterprises is the top choice for expert electronics repair and device maintenance.
          </p>
        </section>

        {/* Mission & Values */}
        <section className="bg-circuit py-24 border-y border-slate-900">
          <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-12">
            {[
              { 
                title: "Our Mission", 
                desc: "Our goal is to provide the best repair services for all your important devices.",
                icon: Target,
                color: "blue"
              },
              { 
                title: "Quality Guaranteed", 
                desc: "We follow the highest quality standards for all our expert repair work.",
                icon: Award,
                color: "emerald"
              },
              { 
                title: "Always Improving", 
                desc: "We're always updating our tools and skills to fix the latest devices.",
                icon: Rocket,
                color: "indigo"
              }
            ].map((box, idx) => (
              <div key={idx} className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-10 rounded-[2.5rem] hover:border-blue-600/30 transition-all duration-500">
                <div className={`mb-6 h-14 w-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-${box.color}-500 shadow-inner`}>
                  <box.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white tracking-tight uppercase italic mb-4">{box.title}</h3>
                <p className="text-slate-500 font-medium text-xs leading-relaxed uppercase tracking-wide font-tech">{box.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Details Section */}
        <section className="mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
                <div className="text-[10px] font-black tracking-[0.4em] text-blue-500 uppercase">About Us</div>
                <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">Big Service, <br /> <span className="text-blue-600">Expert Care.</span></h2>
                <p className="text-slate-400 font-medium text-sm leading-relaxed uppercase tracking-widest font-tech">
                    Founded in 2004, Shree Enterprises has grown from a local shop to a trusted tech partner. We take care of everything related to your high-end laptops.
                </p>
                <div className="pt-6 space-y-4">
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <div className="h-2 w-2 rounded-full bg-blue-600 animate-ping"></div>
                        ISO 9001:2015 Quality Management
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <div className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse"></div>
                        Certified IPC-A-610 Specialists
                    </div>
                </div>
            </div>
            <div className="relative group">
                <div className="absolute inset-0 bg-blue-600/10 blur-[100px] rounded-full group-hover:bg-blue-600/20 transition-all"></div>
                <div className="relative aspect-video rounded-[3rem] border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl">
                    <img 
                      src="/hero-electronics.png" 
                      className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000" 
                      alt="Technical Infrastructure"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                    <div className="absolute bottom-8 left-8">
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-1">Our View</div>
                        <div className="text-lg font-black text-white uppercase italic">Main Repair Center</div>
                    </div>
                </div>
            </div>
        </section>
      </main>

      {/* Footer Partial (consistent with Landing) */}
      <footer className="bg-slate-950 border-t border-slate-900 py-10">
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-700">
              <span>Shree Enterprises © 2024</span>
              <div className="flex gap-10">
                  <a href="#" className="hover:text-blue-500 transition-colors">ISO 27001 Certified</a>
                  <a href="#" className="hover:text-blue-500 transition-colors">Legal Info</a>
              </div>
          </div>
      </footer>
    </div>
  );
}
