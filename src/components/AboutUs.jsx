import React from "react";
import { Link } from "react-router-dom";
import { Cpu, ShieldCheck, Globe, Zap, ArrowLeft, Target, Award, Rocket, Briefcase } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-blue-600/10 overflow-hidden">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 shadow-lg shadow-blue-600/20 transition-transform group-hover:scale-105">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900 tracking-tight">Shree <span className="text-blue-600">Enterprises</span></div>
              <div className="-mt-0.5 text-[10px] text-slate-400 font-bold tracking-widest uppercase">
                Corporate Profile
              </div>
            </div>
          </Link>

          <Link to="/" className="flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-500 px-4 py-2 rounded-xl font-bold hover:bg-white hover:text-slate-900 transition-all text-xs">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="relative">
        {/* Decorative background accents */}
        <div className="absolute top-0 right-0 w-1/3 h-[500px] bg-blue-50/50 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-[400px] bg-slate-50 blur-[100px] rounded-full pointer-events-none -z-10"></div>

        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-wider mb-6">
            <ShieldCheck className="w-3.5 h-3.5" /> High-Performance Service Center
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Engineering the future <br /> of <span className="text-blue-600 italic">Hardware Reliability.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-500 font-medium text-lg leading-relaxed">
            Since 2004, Shree Enterprises has been the premier destination for expert hardware diagnostics, component-level repair, and enterprise maintenance services.
          </p>
        </section>

        {/* Mission & Values */}
        <section className="bg-slate-50 py-24 border-y border-slate-100">
          <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-8">
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
              <div key={idx} className="bg-white border border-slate-200 p-8 rounded-3xl hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className={`mb-6 h-14 w-14 rounded-2xl ${box.bg} ${box.color} flex items-center justify-center shadow-sm`}>
                  <box.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-4">{box.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{box.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Details Section */}
        <section className="mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
                <div className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">Legacy Profile</div>
                <h2 className="text-4xl font-bold text-slate-900 tracking-tight leading-tight">Decades of Expertise, <br /> <span className="text-blue-600">Enterprise Standard.</span></h2>
                <p className="text-slate-500 font-medium text-base leading-relaxed">
                    Trusted by thousands of individual clients and hundreds of corporate partners, Shree Enterprises represents the pinnacle of electronics service. We provide a full-cycle ecosystem for hardware management — from procurement of new assets to complex logic board recovery.
                </p>
                <div className="pt-4 space-y-4">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                        Qualified IPC-7711/7721 Bench Technicians
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                        ESD-Safe Laboratory Environment
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                        Authorized Genuine Part Sourcing Linkage
                    </div>
                </div>
            </div>
            <div className="relative group">
                <div className="absolute inset-0 bg-blue-100/50 blur-[80px] rounded-full opacity-50"></div>
                <div className="relative aspect-video rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-2xl p-2">
                    <div className="w-full h-full rounded-2xl bg-slate-900 overflow-hidden relative">
                         <img 
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
            </div>
        </section>
      </main>

      {/* Footer Partial */}
      <footer className="bg-slate-50 border-t border-slate-100 py-12">
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Shree Enterprises <span className="text-slate-300 px-2 font-normal">|</span> Since 2004 © 2024
              </div>
              <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <a href="#" className="hover:text-blue-600 transition-colors">Digital Privacy</a>
                  <a href="#" className="hover:text-blue-600 transition-colors">Legal Protocol</a>
                  <a href="#" className="hover:text-blue-600 transition-colors">Quality Standard</a>
              </div>
          </div>
      </footer>
    </div>
  );
}

