import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-blue-600/10 overflow-hidden">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-slate-200 shadow-md overflow-hidden transition-transform group-hover:scale-105">
              <img src="/favicon.png" alt="Super Logo" className="h-8 w-8 object-contain" />
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900 tracking-tight">Super <span className="text-blue-600">Computers</span></div>
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
        <section className="mx-auto max-w-7xl px-6 py-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-wider mb-6">
            <ShieldCheck className="w-3.5 h-3.5" /> High-Performance Service Center
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Engineering the future <br /> of <span className="text-blue-600 italic">Hardware Reliability.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-500 font-medium text-lg leading-relaxed">
            Since 2004, Super Computers has been the premier destination for expert hardware diagnostics, component-level repair, and enterprise maintenance services.
          </p>
        </section>
      </main>

      {/* Footer Partial */}
      <footer className="bg-slate-50 border-t border-slate-100 py-12">
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center md:text-left">
                Super Computers <span className="text-slate-300 px-2 font-normal">|</span> Since 2004 © 2024
              </div>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Restricted Access</div>
                <Link to="/admin" className="flex items-center gap-2 bg-white border border-slate-200 text-slate-900 px-5 py-2 rounded-xl font-bold hover:bg-slate-50 transition-all text-xs shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Admin Portal
                </Link>
              </div>
          </div>
      </footer>
    </div>
  );
}

