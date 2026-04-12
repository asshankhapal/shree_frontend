import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Cpu, Mail, Phone, MapPin, Send, ArrowLeft, MessageSquare, ShieldCheck, Clock } from "lucide-react";
import API from "../api/axios";

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await API.post("/contact", form);
      setLoading(false);
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
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
                Communication Layer
              </div>
            </div>
          </Link>

          <Link to="/" className="flex items-center gap-2 bg-slate-900 border border-slate-800 text-slate-400 px-4 py-2 rounded-xl font-bold hover:bg-slate-800 hover:text-white transition-all text-[11px] uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            Back to Portal
          </Link>
        </div>
      </header>

      <main className="relative py-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>

        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Info */}
          <div className="space-y-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-6">
                <MessageSquare className="w-3 h-3" /> Technical Inquiries Only
              </div>
              <h1 className="text-6xl font-black tracking-tighter text-white uppercase italic text-glow leading-none mb-6">
                Contact <br /> <span className="text-blue-600">Support</span> Node.
              </h1>
              <p className="max-w-md text-slate-400 font-medium text-lg leading-relaxed uppercase tracking-wide font-tech">
                Our specialized diagnostics team is ready to synchronize with your hardware requirements.
              </p>
            </div>

            <div className="space-y-8">
               {[
                 { icon: Mail, label: "Digital Interface", val: "support@shree-enterprises.com" },
                 { icon: Phone, label: "Voice Channel", val: "+91 98765 43210" },
                 { icon: MapPin, label: "Physical Node", val: "Central Business District, Tech Valley, Mumbai" }
               ].map((item, i) => (
                 <div key={i} className="flex items-start gap-6 group">
                   <div className="mt-1 h-12 w-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-500 group-hover:border-blue-600 group-hover:bg-blue-600/10 transition-all shadow-xl">
                      <item.icon className="h-5 w-5" />
                   </div>
                   <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{item.label}</div>
                      <div className="text-white font-bold text-lg tracking-tight group-hover:text-blue-400 transition-colors uppercase">{item.val}</div>
                   </div>
                 </div>
               ))}
            </div>

            <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-8 rounded-[2rem] flex items-center gap-8 shadow-2xl">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => <div key={i} className="w-12 h-12 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center"><Cpu className="w-5 h-5 text-blue-500" /></div>)}
                </div>
                <div>
                   <div className="flex items-center gap-2 mb-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span className="text-white font-black uppercase text-[11px] tracking-widest">Active Liaison Group</span>
                   </div>
                   <div className="text-[10px] text-slate-600 uppercase font-black tracking-widest">Current Response Speed: 1.2h / ISO Certified</div>
                </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="relative group">
               <div className="absolute inset-0 bg-blue-600/5 blur-[80px] rounded-full group-hover:bg-blue-600/10 transition-all"></div>
               <div className="relative bg-slate-900/60 backdrop-blur-2xl border border-slate-800 p-10 md:p-12 rounded-[3.5rem] shadow-2xl">
                  {submitted ? (
                    <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                        <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 mb-8 shadow-2xl shadow-emerald-500/10">
                            <ShieldCheck className="w-10 h-10" />
                        </div>
                        <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4">Message Synchronized</h3>
                        <p className="text-slate-500 font-medium text-sm leading-relaxed uppercase tracking-widest font-tech px-6">Your hardware inquiry has been broadcast to our diagnostic team. Expect response within the 2-hour SLA window.</p>
                        <button onClick={() => setSubmitted(false)} className="mt-12 text-[10px] font-black underline decoration-blue-600/40 hover:text-blue-500 transition-colors uppercase tracking-[0.3em]">Broadcast New Link</button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                       <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-1">Entity Name</label>
                             <input required type="text" name="name" value={form.name} onChange={handleChange} placeholder="Authorized Personnel" className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 text-sm outline-none focus:border-blue-600 transition-all text-white placeholder:text-slate-800" />
                          </div>
                          <div className="space-y-3">
                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-1">Communication Link</label>
                             <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="liaison@domain.com" className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 text-sm outline-none focus:border-blue-600 transition-all text-white placeholder:text-slate-800" />
                          </div>
                       </div>
                       
                       <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-1">Diagnostic Context (Subject)</label>
                          <input required type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="e.g. Logic Board Synchronization Fault" className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 text-sm outline-none focus:border-blue-600 transition-all text-white placeholder:text-slate-800" />
                       </div>

                       <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-1">Technical Inquiry Detail</label>
                          <textarea required rows={5} name="message" value={form.message} onChange={handleChange} placeholder="Describe the component-level failure protocol needed..." className="w-full bg-slate-950 border border-slate-800 rounded-3xl py-4 px-6 text-sm outline-none focus:border-blue-600 transition-all text-white placeholder:text-slate-800 resize-none"></textarea>
                       </div>

                       {error && (
                         <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest text-center">
                           {error}
                         </div>
                       )}

                       <div className="pt-4">
                          <button disabled={loading} type="submit" className="w-full h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl shadow-blue-500/20 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50">
                              {loading ? "Transmitting..." : "Broadcast Inquiry"}
                              {!loading && <Send className="w-4 h-4" />}
                          </button>
                       </div>

                       <div className="flex items-center justify-center gap-6 text-[9px] font-black uppercase tracking-widest text-slate-700">
                          <div className="flex items-center gap-2"><Clock className="w-3 h-3" /> Average PING: 42ms</div>
                          <div className="flex items-center gap-2"><ShieldCheck className="w-3 h-3" /> Secure Tunnel Active</div>
                       </div>
                    </form>
                  )}
               </div>
          </div>
        </div>
      </main>

      {/* Footer Partial */}
      <footer className="bg-slate-950 border-t border-slate-900 py-10 mt-20">
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-700">
              <span>Shree Enterprises © 2024</span>
              <div className="flex gap-10">
                  <a href="#" className="hover:text-blue-500 transition-colors">ISO 27001 Certified</a>
                  <a href="#" className="hover:text-blue-500 transition-colors">Legal Protocol</a>
              </div>
          </div>
      </footer>
    </div>
  );
}
