import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import {
  Wrench, LogOut, User, ShoppingCart, Star, Cpu, HardDrive,
  Monitor, MemoryStick, ChevronRight, X, CheckCircle2, Package,
  ArrowLeft, Laptop, LayoutDashboard, ShoppingBag, Sparkles
} from 'lucide-react';

export default function LaptopStore() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLaptop, setSelectedLaptop] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLaptops();
  }, []);

  const fetchLaptops = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/laptops`);
      setLaptops(res.data);
    } catch (err) {
      setError('Failed to fetch laptops');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setForm(f => ({
        ...f,
        name: user.username || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const openBooking = (laptop) => {
    setSelectedLaptop(laptop);
    setShowModal(true);
    setBookingSuccess(false);
    setError('');
  };

  const handleBook = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await API.post(`/laptops/book`, {
        laptopId: selectedLaptop._id,
        ...form
      });
      setBookingSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatPrice = (price) => {
    return '₹' + (price || 0).toLocaleString('en-IN');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex text-sm selection:bg-blue-500/30">
      {/* Sidebar - Consistent with Dashboard */}
      <aside className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 flex flex-col sticky top-0 h-screen shrink-0 overflow-y-auto hidden lg:flex bg-circuit">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-10">
            <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-white tracking-tight">Shree Store</div>
              <div className="text-[10px] text-blue-500 font-black uppercase tracking-widest leading-none">
                Laptop Shop
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
              { id: "store", label: "Store", icon: ShoppingBag, path: "/laptops", active: true },
              { id: "booking", label: "Book Repair", icon: Wrench, path: "/repair-booking" },
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
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
              <Cpu className="w-3.5 h-3.5 animate-pulse" />
              Verified Hardware Inventory
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
              Electronic <span className="text-blue-600">Workstations</span>
            </h1>
            <p className="text-slate-500 font-medium text-xs mt-2 tracking-wide uppercase font-tech">Precision Procurement Layer Active</p>
          </div>
          
          <div className="flex items-center gap-3">
             <Link
                to="/dashboard"
                className="flex items-center gap-2 bg-slate-900 border border-slate-800 text-slate-400 px-4 py-2.5 rounded-xl font-bold hover:bg-slate-800 hover:text-white transition-all shadow-xl"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
          </div>
        </header>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl flex items-center gap-3 mb-8 font-bold">
            <X className="h-5 w-5" />
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 animate-pulse">
                <div className="w-full h-40 bg-slate-950 rounded-2xl mb-4"></div>
                <div className="h-5 bg-slate-950 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-slate-950 rounded w-1/2 mb-6"></div>
                <div className="h-10 bg-slate-950 rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {laptops.map((laptop) => (
              <div
                key={laptop._id}
                className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 hover:border-blue-600/50 transition-all duration-700 group flex flex-col relative overflow-hidden shadow-2xl hover:shadow-blue-600/5"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Image area */}
                <div className="w-full h-44 bg-slate-950 rounded-2xl mb-5 flex items-center justify-center overflow-hidden border border-slate-800 relative group-hover:shadow-2xl transition-shadow">
                  {laptop.image ? (
                    <img src={laptop.image} alt={laptop.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  ) : (
                    <Laptop className="w-16 h-16 text-slate-800 group-hover:text-blue-600 transition-colors" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>
                </div>

                {/* Brand & Price */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    {laptop.brand}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-slate-400">{laptop.rating}</span>
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-black text-white text-lg mb-4 tracking-tight leading-none h-12 line-clamp-2">{laptop.name}</h3>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-bold bg-slate-950/50 p-2 rounded-xl border border-slate-800/50">
                    <Cpu className="w-3.5 h-3.5 text-blue-600" />
                    <span className="truncate">{laptop.specs?.processor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-bold bg-slate-950/50 p-2 rounded-xl border border-slate-800/50">
                    <MemoryStick className="w-3.5 h-3.5 text-blue-600" />
                    <span className="truncate">{laptop.specs?.ram}</span>
                  </div>
                </div>

                {/* Footer section with price and button */}
                <div className="mt-auto pt-4 border-t border-slate-800">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-black text-white tracking-widest">{formatPrice(laptop.price)}</span>
                    {laptop.originalPrice && laptop.originalPrice > laptop.price && (
                      <span className="text-xs text-slate-600 line-through font-bold">{formatPrice(laptop.originalPrice)}</span>
                    )}
                  </div>

                  <button
                    onClick={() => openBooking(laptop)}
                    disabled={!laptop.inStock}
                    className={`w-full py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all shadow-xl ${
                      laptop.inStock
                        ? 'bg-blue-600 text-white shadow-blue-500/10 hover:bg-blue-700 hover:shadow-blue-500/20'
                        : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    {laptop.inStock ? (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Buy Now
                      </>
                    ) : (
                      'Out of Stock'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Booking Modal */}
      {showModal && selectedLaptop && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-6" onClick={() => setShowModal(false)}>
          <div
            className="bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {bookingSuccess ? (
              <div className="p-10 text-center">
                <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/10">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-3xl font-black text-white tracking-tight mb-3 uppercase">Order Initiated</h3>
                <p className="text-slate-400 font-medium mb-10 leading-relaxed px-4">Your request for <span className="text-blue-500 font-bold">{selectedLaptop.name}</span> has been broadcast to our logistics team.</p>
                
                <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 mb-10 text-left">
                   <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-4 inline-block border-b border-slate-800 pb-1">Receipt Details</div>
                  <div className="flex items-center justify-between font-bold mb-3">
                    <span className="text-slate-500 text-xs">Total Amount</span>
                    <span className="text-white text-lg tracking-tighter">{formatPrice(selectedLaptop.price)}</span>
                  </div>
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-500 text-xs">Fulfillment</span>
                    <span className="text-emerald-500 flex items-center gap-1 text-[10px] uppercase tracking-widest">
                      <Package className="w-3.5 h-3.5" /> Synchronized
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition"
                >
                  Return to Store
                </button>
              </div>
            ) : (
              <>
                <div className="p-8 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex items-center justify-center">
                        {selectedLaptop.image ? (
                          <img src={selectedLaptop.image} className="w-full h-full object-cover" />
                        ) : (
                          <Laptop className="w-6 h-6 text-slate-700" />
                        )}
                     </div>
                     <div>
                        <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-0.5">Asset Procurement</div>
                        <h3 className="text-xl font-black text-white tracking-tight leading-none">{selectedLaptop.name}</h3>
                     </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="h-10 w-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-slate-700 transition text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleBook} className="p-8 space-y-6">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-xs font-bold">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Procurement Officer</label>
                       <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:border-blue-600 outline-none transition text-white placeholder:text-slate-700"
                        placeholder="Authorized Name"
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Synchronized Email</label>
                       <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:border-blue-600 outline-none transition text-white placeholder:text-slate-700"
                        placeholder="corporate@domain.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Network Contact</label>
                     <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:border-blue-600 outline-none transition text-white placeholder:text-slate-700"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-6">
                     <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-600">Total Synchronized Cost</div>
                        <div className="text-2xl font-black text-white tracking-widest">{formatPrice(selectedLaptop.price)}</div>
                     </div>
                     <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-blue-500/20 hover:bg-blue-700 transition disabled:opacity-50"
                      >
                        {submitting ? 'Authenticating...' : 'Confirm Order'}
                      </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Global CSS for hidden scrollbar */}
      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar { width: 0; background: transparent; }
        ::-webkit-scrollbar-thumb { display: none; }
      `}} />
    </div>
  );
}
