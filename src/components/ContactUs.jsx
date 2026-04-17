import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Cpu, Mail, Phone, MapPin, Send, ArrowLeft, MessageSquare, ShieldCheck, Clock, Headphones, CheckCircle2 } from "lucide-react";
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
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-blue-600/10">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-slate-200 shadow-md overflow-hidden transition-transform group-hover:scale-105">
              <img src="/favicon.png" alt="Super Logo" className="h-8 w-8 object-contain" />
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900 tracking-tight">Super <span className="text-blue-600">Support</span></div>
              <div className="-mt-0.5 text-[10px] text-slate-400 font-bold tracking-widest uppercase">
                Customer Relations
              </div>
            </div>
          </Link>

          <Link to="/" className="flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-500 px-4 py-2 rounded-xl font-bold hover:bg-white hover:text-slate-900 transition-all text-xs">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="relative py-20 px-6">
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-[600px] bg-blue-50/50 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-20 items-start">
          {/* Left Column: Info */}
          <div className="space-y-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider mb-6">
                <MessageSquare className="w-3.5 h-3.5" /> Premium Support Channel
              </div>
              <h1 className="text-5xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
                Connect with our <br /> <span className="text-blue-600 font-extrabold italic">Product Experts</span>
              </h1>
              <p className="max-w-md text-slate-500 font-medium text-base leading-relaxed">
                Whether you have technical questions or business inquiries, our team provides streamlined communication protocols for all clients.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
               {[
                 { icon: Mail, label: "Email Support", val: "support@super-computers.com", color: "text-blue-600" },
                 { icon: Phone, label: "Direct Line", val: "+91 98765 43210", color: "text-blue-600" },
                 { icon: MapPin, label: "Corporate Office", val: "Corporate Park, Sector 18, Mumbai 400705", color: "text-blue-600" }
               ].map((item, i) => (
                 <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-all shadow-sm">
                   <div className={`h-11 w-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center ${item.color} shadow-sm transition-transform group-hover:scale-105`}>
                      <item.icon className="h-5 w-5" />
                   </div>
                   <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{item.label}</div>
                      <div className="text-slate-900 font-bold text-sm tracking-tight">{item.val}</div>
                   </div>
                 </div>
               ))}
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-3xl flex items-center gap-6 shadow-sm border-l-4 border-l-blue-600">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                    <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                   <div className="text-sm font-bold text-slate-900">Enterprise SLA Active</div>
                   <div className="text-xs text-slate-500 font-medium">Verified response window: <strong>Under 2 hours</strong></div>
                </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-xl relative mt-8 lg:mt-0">
                  {submitted ? (
                    <div className="text-center py-16 animate-in fade-in zoom-in-95 duration-500">
                        <div className="h-20 w-20 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">Submission Received</h3>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed px-6">Your inquiry has been logged in our system. A project manager will contact you through your specified email channel.</p>
                        <button onClick={() => setSubmitted(false)} className="mt-10 font-bold text-blue-600 text-xs uppercase tracking-widest hover:underline">Send Another Message</button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                       <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Full Name</label>
                             <input required type="text" name="name" value={form.name} onChange={handleChange} placeholder="Authorized Personnel" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-5 text-sm outline-none focus:border-blue-600 transition-all text-slate-800 placeholder:text-slate-300 shadow-inner" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Email Address</label>
                             <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="corporate@domain.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-5 text-sm outline-none focus:border-blue-600 transition-all text-slate-800 placeholder:text-slate-300 shadow-inner" />
                          </div>
                       </div>
                       
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Inquiry Subject</label>
                          <input required type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Department or Hardware Model" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-5 text-sm outline-none focus:border-blue-600 transition-all text-slate-800 placeholder:text-slate-300 shadow-inner" />
                       </div>

                       <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Detailed Message</label>
                          <textarea required rows={5} name="message" value={form.message} onChange={handleChange} placeholder="Please provide technical context or requirements..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-sm outline-none focus:border-blue-600 transition-all text-slate-800 placeholder:text-slate-300 shadow-inner resize-none"></textarea>
                       </div>

                       {error && (
                         <div className="bg-red-50 border border-red-100 text-red-600 px-5 py-3 rounded-xl text-xs font-bold uppercase text-center">
                           {error}
                         </div>
                       )}

                       <div className="pt-4">
                          <button disabled={loading} type="submit" className="w-full h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-xs shadow-xl hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-50">
                              {loading ? "Transmitting..." : "Send Secure Message"}
                              {!loading && <Send className="w-4 h-4" />}
                          </button>
                       </div>

                       <div className="flex items-center justify-center gap-6 pt-2">
                          <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                             <Clock className="w-3 h-3 text-blue-400" /> Mon - Sat: 9 AM - 6 PM
                          </div>
                          <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                             <ShieldCheck className="w-3 h-3 text-emerald-400" /> Verified Channel
                          </div>
                       </div>
                    </form>
                  )}
          </div>
        </div>
      </main>

      {/* Footer Partial */}
      <footer className="bg-slate-50 border-t border-slate-100 py-12">
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center md:text-left">
                Super Computers <span className="text-slate-300 px-2 font-normal">|</span> Authorized Support Node © 2024
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

