import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import {
  Wrench, LogOut, User, Calendar, Clock, ChevronRight, X,
  CheckCircle2, ArrowLeft, Monitor, Smartphone, Tablet,
  Laptop, AlertCircle, LayoutDashboard, ShoppingBag, Sparkles, ShieldCheck,
  Cpu
} from 'lucide-react';

const deviceTypes = [
  { value: 'Laptop', label: 'Laptop', icon: Laptop },
  { value: 'Desktop', label: 'Desktop', icon: Monitor },
  { value: 'Phone', label: 'Phone', icon: Smartphone },
  { value: 'Tablet', label: 'Tablet', icon: Tablet },
];

const brands = ['Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'Samsung', 'Other'];

const timeSlots = [
  { value: '9:00 AM - 11:00 AM', label: '9:00 - 11:00 AM', period: 'Morning' },
  { value: '11:00 AM - 1:00 PM', label: '11:00 - 1:00 PM', period: 'Midday' },
  { value: '2:00 PM - 4:00 PM', label: '2:00 - 4:00 PM', period: 'Afternoon' },
  { value: '4:00 PM - 6:00 PM', label: '4:00 - 6:00 PM', period: 'Evening' },
];

const repairPricing = {
  Laptop: {
    
    services: [
      { name: 'Diagnostics'},
      { name: 'Screen Repair' },
      { name: 'Battery Replacement' },
      { name: 'Keyboard Repair' },
      { name: 'Motherboard Repair'},
    ],
  },
  Desktop: {
    
    services: [
      { name: 'Diagnostics'},
      { name: 'HDD/SSD Replacement', },
      { name: 'RAM Upgrade',  },
      { name: 'PSU Replacement', },
      { name: 'Motherboard Repair', },
    ],
  },
  Phone: {
    
    services: [
      { name: 'Diagnostics'},
      { name: 'Screen Repair'},
      { name: 'Battery Replacement'},
      { name: 'Charging Port Fix'},
      { name: 'Water Damage Repair'},
    ],
  },
  Tablet: {
    
    services: [
      { name: 'Diagnostics', },
      { name: 'Screen Repair',  },
      { name: 'Battery Replacement', },
      { name: 'Charging Port Fix', },
      { name: 'Software Restore', },
    ],
  },
};




export default function RepairBooking() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: user?.username || '',
    email: user?.email || '',
    phone: '',
    deviceType: '',
    brand: '',
    model: '',
    issueDescription: '',
    preferredDate: '',
    preferredTime: '',
  });

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateStep = () => {
    if (step === 1) {
      if (!form.deviceType) return 'Please select a device type';
      if (!form.brand) return 'Please select a brand';
      return null;
    }
    if (step === 2) {
      if (!form.issueDescription.trim()) return 'Please describe the issue';
      if (!form.name.trim()) return 'Please enter your name';
      if (!form.email.trim()) return 'Please enter your email';
      if (!form.phone.trim()) return 'Please enter your phone number';
      return null;
    }
    if (step === 3) {
      if (!form.preferredDate) return 'Please select a preferred date';
      if (!form.preferredTime) return 'Please select a time slot';
      return null;
    }
    return null;
  };

  const nextStep = () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setStep(s => s + 1);
  };

  // Estimated price calculation
  
  const handleSubmit = async () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await API.post(`/repairs/book`, form);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex text-sm selection:bg-blue-500/30">
      {/* Sidebar - Enhanced with Circuit Pattern */}
      <aside className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 flex flex-col sticky top-0 h-screen shrink-0 overflow-y-auto hidden lg:flex bg-circuit">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-10">
            <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all group-hover:scale-110">
              <Cpu className="h-5 w-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="font-extrabold text-white tracking-widest uppercase italic">Shree <span className="text-blue-500">Suite</span></div>
              <div className="text-[9px] text-slate-500 font-black uppercase tracking-[0.3em] leading-none mt-1">
                Repair Shop
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
              { id: "store", label: "Laptop Store", icon: ShoppingBag, path: "/laptops" },
              { id: "booking", label: "Fix My Device", icon: Wrench, path: "/repair-booking", active: true },
            ].map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  item.active
                    ? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-semibold">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
              <User className="w-5 h-5 text-blue-400" />
            </div>
            <div className="overflow-hidden">
              <div className="font-bold truncate text-white">{user?.username || 'Client'}</div>
              <div className="text-[10px] text-slate-500 font-medium tracking-tight">User Account</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-500/10 hover:text-red-400 border border-slate-700 py-2.5 rounded-xl transition-all font-bold text-slate-400"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 animate-tech-pulse"></div>
        
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
               <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></div>
               System Status: Online
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
              Book a <span className="text-blue-600">Repair</span>
            </h1>
            <p className="text-slate-500 font-medium text-xs mt-2 tracking-wide uppercase font-tech">Expert Tech Support</p>
          </div>
          
          <Link
            to="/dashboard"
            className="flex items-center gap-2 bg-slate-900 border border-slate-800 text-slate-400 px-4 py-2.5 rounded-xl font-bold hover:bg-slate-800 hover:text-white transition-all shadow-xl self-start"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
        </header>

        {success ? (
          <div className="max-w-xl mx-auto py-10">
            <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/10">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              
              <h2 className="text-3xl font-black text-white mb-3 uppercase tracking-tight">Done!</h2>
              <p className="text-slate-400 font-medium mb-10 leading-relaxed px-4">Your repair is booked. We'll see you soon!</p>

              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 text-left space-y-4 mb-10">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-2 border-b border-white/5 pb-1 inline-block">Booking Summary</div>
                <div className="flex justify-between font-bold">
                  <span className="text-slate-500 text-xs">Device Type</span>
                  <span className="text-white">{form.deviceType} <span className="text-slate-700">/</span> {form.brand}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-slate-500 text-xs">Date & Time</span>
                  <span className="text-white">{new Date(form.preferredDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} <span className="text-slate-700">@</span> {form.preferredTime.split('-')[0]}</span>
                </div>

              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/dashboard"
                  className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-700 transition shadow-xl"
                >
                  View My Repairs
                </Link>
                <button
                  onClick={() => {
                    setSuccess(false);
                    setStep(1);
                    setForm({
                      name: user?.username || '',
                      email: user?.email || '',
                      phone: '',
                      deviceType: '',
                      brand: '',
                      model: '',
                      issueDescription: '',
                      preferredDate: '',
                      preferredTime: '',
                    });
                  }}
                  className="flex-1 bg-slate-800 text-slate-400 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-slate-700 hover:bg-slate-700 hover:text-white transition"
                >
                  Book Another Repair
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto pb-20">
            {/* Professional Stepper */}
            <div className="flex items-center justify-between mb-12 max-w-2xl mx-auto bg-slate-900/50 p-4 rounded-3xl border border-slate-800">
              {[
                { num: 1, label: 'Device Info' },
                { num: 2, label: 'Problem Details' },
                { num: 3, label: 'When' },
              ].map((s, i) => (
                <React.Fragment key={s.num}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs transition-all ${
                      step >= s.num
                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/10'
                        : 'bg-slate-950 border border-slate-800 text-slate-600'
                    }`}>
                      {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest hidden sm:block ${step >= s.num ? 'text-white' : 'text-slate-600'}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className={`flex-1 h-px mx-4 ${step > s.num ? 'bg-blue-600' : 'bg-slate-800'}`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-[3rem] shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
              
              {error && (
                <div className="mx-8 mt-8 bg-red-600/10 border border-red-600/20 text-red-500 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <div className="flex-1 p-8 md:p-12">
                {/* Step 1: Device Identification */}
                {step === 1 && (
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-2xl font-black text-white tracking-tight uppercase mb-2">Select Your Device</h3>
                      <p className="text-slate-500 font-medium">Tell us what needs fixing.</p>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">What are we fixing?</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {deviceTypes.map(dt => {
                          const Icon = dt.icon;
                          const isActive = form.deviceType === dt.value;
                          return (
                            <button
                              key={dt.value}
                              type="button"
                              onClick={() => updateForm('deviceType', dt.value)}
                              className={`flex flex-col items-center gap-3 py-6 rounded-3xl font-black transition-all group relative overflow-hidden ${
                                isActive
                                  ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/20'
                                  : 'bg-slate-950 border border-slate-800 text-slate-500 hover:border-slate-700 hover:bg-slate-900 hover:text-slate-300'
                              }`}
                            >
                              <Icon className={`w-7 h-7 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                              <span className="text-[10px] uppercase tracking-widest">{dt.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Brand</label>
                      <div className="flex flex-wrap gap-3">
                        {brands.map(b => {
                          const isActive = form.brand === b;
                          return (
                            <button
                              key={b}
                              type="button"
                              onClick={() => updateForm('brand', b)}
                              className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                isActive
                                  ? 'bg-white text-slate-950 shadow-xl'
                                  : 'bg-slate-950 border border-slate-800 text-slate-500 hover:bg-slate-900 hover:text-slate-300'
                              }`}
                            >
                              {b}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Model Name</label>
                      <input
                        type="text"
                        value={form.model}
                        onChange={(e) => updateForm('model', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm font-bold text-white focus:border-blue-600 outline-none transition placeholder:text-slate-800"
                        placeholder="e.g. TH-500 enterprise series"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Problem Details */}
                {step === 2 && (
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-2xl font-black text-white tracking-tight uppercase mb-2">Problem Details</h3>
                      <p className="text-slate-500 font-medium">Tell us about the issue and how to reach you.</p>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">What's wrong?</label>
                      <textarea
                        value={form.issueDescription}
                        onChange={(e) => updateForm('issueDescription', e.target.value)}
                        rows={5}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-3xl p-5 font-bold text-white focus:border-blue-600 outline-none transition resize-none placeholder:text-slate-800"
                        placeholder="Explain the problem..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 text-left">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Your Name</label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => updateForm('name', e.target.value)}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 font-bold text-white focus:border-blue-600 outline-none transition placeholder:text-slate-800"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="space-y-2 text-left">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Email Address</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => updateForm('email', e.target.value)}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 font-bold text-white focus:border-blue-600 outline-none transition placeholder:text-slate-800"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Phone Number</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateForm('phone', e.target.value)}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 font-bold text-white focus:border-blue-600 outline-none transition placeholder:text-slate-800"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Pick a Time */}
                {step === 3 && (
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-2xl font-black text-white tracking-tight uppercase mb-2">Pick a Time</h3>
                      <p className="text-slate-500 font-medium">Select a date and time for your repair.</p>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Repair Date</label>
                      <div className="relative">
                         <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
                         <input
                          type="date"
                          value={form.preferredDate}
                          onChange={(e) => updateForm('preferredDate', e.target.value)}
                          min={getMinDate()}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 pl-12 font-black text-white focus:border-blue-600 outline-none transition [color-scheme:dark]"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Available Times</label>
                         <div className="flex items-center gap-2 text-[10px] font-bold text-blue-500 italic">
                            <Clock className="w-3.5 h-3.5" /> All windows are in IST
                         </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {timeSlots.map(ts => {
                          const isActive = form.preferredTime === ts.value;
                          return (
                            <button
                              key={ts.value}
                              type="button"
                              onClick={() => updateForm('preferredTime', ts.value)}
                              className={`p-6 rounded-[2rem] text-left transition-all relative overflow-hidden group ${
                                isActive
                                  ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/20'
                                  : 'bg-slate-950 border border-slate-800 text-slate-600 hover:bg-slate-900 group'
                              }`}
                            >
                              <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${
                                isActive ? 'text-blue-200' : 'text-slate-600'
                              }`}>{ts.period}</div>
                              <div className="font-black text-lg tracking-tight">{ts.label}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    

                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="p-8 border-t border-slate-800 flex items-center justify-between gap-6 bg-slate-950/30">
                {step > 1 ? (
                  <button
                    onClick={() => { setStep(s => s - 1); setError(''); }}
                    className="h-14 px-8 bg-slate-800 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-700 hover:text-white transition-all shadow-xl"
                  >
                    Back
                  </button>
                ) : (
                  <div></div>
                )}

                {step < 3 ? (
                  <button
                    onClick={nextStep}
                    className="h-14 px-10 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-2xl shadow-blue-500/20 hover:bg-blue-700 transition"
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="h-14 px-10 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-2xl hover:bg-slate-200 transition disabled:opacity-50"
                  >
                    {submitting ? 'Sending...' : (
                      <>
                        <span>Confirm Booking</span>
                        <CheckCircle2 className="w-5 h-5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar { width: 0; background: transparent; }
        ::-webkit-scrollbar-thumb { display: none; }
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 0.5;
          cursor: pointer;
        }
      `}} />
    </div>
  );
}
