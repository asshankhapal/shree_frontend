import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import {
  Wrench, LogOut, User, Calendar, Clock, ChevronRight, X,
  CheckCircle2, ArrowLeft, Monitor, Smartphone, Tablet,
  Laptop, AlertCircle, LayoutDashboard, ShoppingBag, Sparkles, ShieldCheck,
  Cpu, Activity, Users, Phone
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
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex text-sm selection:bg-blue-600/10">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen shrink-0 overflow-y-auto hidden lg:flex shadow-sm">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-10 group cursor-pointer">
            <div className="h-10 w-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center shadow-md overflow-hidden transition-all group-hover:scale-105">
              <img src="/favicon.png" alt="Super Logo" className="h-8 w-8 object-contain" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-lg tracking-tight">Support <span className="text-blue-600">Hub</span></div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-0.5">
                Authorized Repair
              </div>
            </div>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
              { id: "store", label: "Laptop Store", icon: ShoppingBag, path: "/laptops" },
              { id: "booking", label: "Repair Booking", icon: Wrench, path: "/repair-booking", active: true },
              { id: "about", label: "About Us", icon: Users, path: "/about" },
              { id: "contact", label: "Contact Us", icon: Phone, path: "/contact" },
            ].map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all ${
                  item.active
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-semibold">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 mb-6 px-1">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center border border-slate-200 shadow-sm text-blue-600">
               <User className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-bold truncate text-slate-900">{user?.username || 'Client'}</div>
              <div className="text-[10px] text-slate-500 font-semibold tracking-wide">Premium Client</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-red-50 hover:text-red-500 border border-slate-200 py-2.5 rounded-xl transition-all font-bold text-xs text-slate-600 shadow-sm"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto relative">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider mb-3">
               <Activity className="w-3.5 h-3.5" />
               Scheduling Hub: Online
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Service <span className="text-blue-600">Scheduler</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm mt-1">Book premium diagnostics and hardware repair.</p>
          </div>
          
          <Link
            to="/dashboard"
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-500 px-5 py-2.5 rounded-xl font-bold text-xs hover:border-slate-300 hover:text-slate-900 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
        </header>

        {success ? (
          <div className="max-w-xl mx-auto py-10 animate-in fade-in zoom-in-95 duration-300">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 text-center shadow-lg relative overflow-hidden">
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Booking Success</h2>
              <p className="text-slate-500 text-sm font-medium mb-10 leading-relaxed px-4">Your repair ticket has been generated. Our hardware engineers will review your request shortly.</p>

              <div className="bg-slate-50 rounded-2xl p-6 text-left space-y-4 mb-10 border border-slate-100">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 border-b border-slate-200 pb-1.5">Booking Intelligence</div>
                <div className="flex justify-between items-center font-bold">
                  <span className="text-slate-500 text-xs">Assigned Unit</span>
                  <span className="text-slate-900 text-sm">{form.deviceType} <span className="text-slate-300 px-1">/</span> {form.brand}</span>
                </div>
                <div className="flex justify-between items-center font-bold">
                  <span className="text-slate-500 text-xs">Preferred Slot</span>
                  <span className="text-slate-900 text-sm">
                    {new Date(form.preferredDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    <span className="text-slate-400 font-normal mx-2">@</span> 
                    {form.preferredTime.split('-')[0]}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/dashboard"
                  className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
                >
                  Manage Tickets
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
                  className="flex-1 bg-white hover:bg-slate-50 text-slate-500 py-4 rounded-xl font-bold uppercase tracking-widest text-xs border border-slate-200 transition"
                >
                  New Request
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto pb-20">
            {/* Professional Stepper */}
            <div className="flex items-center justify-between mb-12 max-w-2xl mx-auto px-6">
              {[
                { num: 1, label: 'Categorize' },
                { num: 2, label: 'Diagnostics' },
                { num: 3, label: 'Schedule' },
              ].map((s, i) => (
                <React.Fragment key={s.num}>
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
                      step >= s.num
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                        : 'bg-white border border-slate-200 text-slate-300 shadow-sm'
                    }`}>
                      {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${step >= s.num ? 'text-slate-900' : 'text-slate-400'}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className={`flex-1 h-0.5 mx-4 -mt-6 transition-all duration-500 ${step > s.num ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm relative overflow-hidden min-h-[500px] flex flex-col">
              {error && (
                <div className="mx-8 mt-8 bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <div className="flex-1 p-8 md:p-12">
                {/* Step 1: Device Identification */}
                {step === 1 && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 tracking-tight uppercase mb-1">Asset Classification</h3>
                      <p className="text-slate-500 text-sm font-medium">Select the hardware requiring professional support.</p>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Hardware Category</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {deviceTypes.map(dt => {
                          const Icon = dt.icon;
                          const isActive = form.deviceType === dt.value;
                          return (
                            <button
                              key={dt.value}
                              type="button"
                              onClick={() => updateForm('deviceType', dt.value)}
                              className={`flex flex-col items-center gap-3 py-6 rounded-2xl font-bold transition-all group relative overflow-hidden border ${
                                isActive
                                  ? 'bg-blue-50 border-blue-600 text-blue-600 shadow-sm'
                                  : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-600 shadow-sm'
                              }`}
                            >
                              <Icon className={`w-7 h-7 transition-all duration-300 ${isActive ? 'scale-110 text-blue-600' : 'text-slate-300 group-hover:text-slate-500 group-hover:scale-105'}`} />
                              <span className="text-[10px] uppercase tracking-widest leading-none">{dt.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Manufacturer Authorization</label>
                      <div className="flex flex-wrap gap-2.5">
                        {brands.map(b => {
                          const isActive = form.brand === b;
                          return (
                            <button
                              key={b}
                              type="button"
                              onClick={() => updateForm('brand', b)}
                              className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${
                                isActive
                                  ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                                  : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600 shadow-sm'
                              }`}
                            >
                              {b}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Hardware Model / Serial</label>
                      <input
                        type="text"
                        value={form.model}
                        onChange={(e) => updateForm('model', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-bold text-slate-800 placeholder:text-slate-300 focus:border-blue-600 outline-none transition"
                        placeholder="e.g. Precision 5570 / SN: XXXX"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Problem Details */}
                {step === 2 && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 tracking-tight uppercase mb-1">Incident Report</h3>
                      <p className="text-slate-500 text-sm font-medium">Please detail the failure symptoms for our bench techs.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Fault Description</label>
                      <textarea
                        value={form.issueDescription}
                        onChange={(e) => updateForm('issueDescription', e.target.value)}
                        rows={5}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 font-medium text-slate-800 placeholder:text-slate-300 focus:border-blue-600 outline-none transition resize-none leading-relaxed"
                        placeholder="Describe the performance issues or physical damage..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Officer Name</label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => updateForm('name', e.target.value)}
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-bold text-slate-800 placeholder:text-slate-300 focus:border-blue-600 outline-none transition"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="space-y-2 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Corporate Email</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => updateForm('email', e.target.value)}
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-bold text-slate-800 placeholder:text-slate-300 focus:border-blue-600 outline-none transition"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Secure Contact</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateForm('phone', e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-bold text-slate-800 placeholder:text-slate-300 focus:border-blue-600 outline-none transition"
                        placeholder="+91 XXXX XXXX"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Pick a Time */}
                {step === 3 && (
                  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 tracking-tight uppercase mb-1">Dispatch Window</h3>
                      <p className="text-slate-500 text-sm font-medium">Select a slot for on-site visit or hardware drop-off.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Appointment Date</label>
                      <div className="relative">
                         <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
                         <input
                          type="date"
                          value={form.preferredDate}
                          onChange={(e) => updateForm('preferredDate', e.target.value)}
                          min={getMinDate()}
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 pl-12 text-sm font-bold text-slate-800 focus:border-blue-600 outline-none transition"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Available Intervals</label>
                         <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 opacity-60">
                            <Clock className="w-3.5 h-3.5" /> All slots are IST window
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
                              className={`p-6 rounded-2xl text-left transition-all border ${
                                isActive
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20'
                                  : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300 hover:bg-slate-50 shadow-sm'
                              }`}
                            >
                              <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${
                                isActive ? 'text-blue-100' : 'text-slate-400'
                              }`}>{ts.period}</div>
                              <div className="font-bold text-lg tracking-tight">{ts.label}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="p-8 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                {step > 1 ? (
                  <button
                    onClick={() => { setStep(s => s - 1); setError(''); }}
                    className="h-12 px-6 bg-white text-slate-500 rounded-xl font-bold uppercase tracking-widest text-[10px] border border-slate-200 hover:bg-slate-100 transition-all shadow-sm"
                  >
                    Previous Step
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    onClick={nextStep}
                    className="h-12 px-8 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2.5 shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition"
                  >
                    <span>Proceed Information</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="h-12 px-8 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2.5 shadow-xl hover:bg-slate-800 transition disabled:opacity-50"
                  >
                    {submitting ? 'Authenticating Request...' : (
                      <>
                        <span>Finalize Booking</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

