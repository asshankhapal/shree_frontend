import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import {
  Wrench, LogOut, User, ShoppingCart, Star, Cpu, HardDrive,
  Monitor, MemoryStick, ChevronRight, X, CheckCircle2, Package,
  ArrowLeft, Laptop, LayoutDashboard, ShoppingBag, Sparkles, Bell, Search
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
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex selection:bg-blue-600/10">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen shrink-0 overflow-y-auto hidden lg:flex shadow-sm">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-10">
            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20 transition-all">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-lg tracking-tight">Shree <span className="text-blue-600">Enterprises</span></div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-0.5">
                Hardware Marketplace
              </div>
            </div>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: "dashboard", label: "Overview", icon: LayoutDashboard, path: "/dashboard" },
              { id: "store", label: "Shop Laptops", icon: ShoppingBag, path: "/laptops", active: true },
              { id: "booking", label: "Repair Service", icon: Wrench, path: "/repair-booking" },
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
                <span className="font-semibold text-sm">{item.label}</span>
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
              <div className="text-sm font-bold truncate text-slate-900">{user?.username || 'Client User'}</div>
              <div className="text-[10px] text-slate-500 font-semibold tracking-wide">Premium Account</div>
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
               <Sparkles className="w-3.5 h-3.5" />
               Latest Hardware Verified
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Premium <span className="text-blue-600">Marketplace</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm mt-1">Authorized dealer for high-performance workstations.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search models..." 
                className="bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-600 transition shadow-sm"
              />
            </div>
            <button className="h-10 w-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-600 transition shadow-sm relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-center gap-3 mb-8 text-sm font-medium">
            <X className="h-5 w-5" />
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm animate-pulse">
                <div className="w-full h-40 bg-slate-100 rounded-xl mb-4"></div>
                <div className="h-5 bg-slate-100 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-slate-100 rounded w-1/2 mb-6"></div>
                <div className="h-10 bg-slate-100 rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {laptops.map((laptop) => (
              <div
                key={laptop._id}
                className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-300 transition-all group flex flex-col relative shadow-sm hover:shadow-md"
              >
                {/* Image area */}
                <div className="w-full h-44 bg-slate-50 rounded-xl mb-5 flex items-center justify-center overflow-hidden border border-slate-100 p-4">
                  {laptop.image ? (
                    <img src={laptop.image} alt={laptop.name} className="w-full h-full object-contain group-hover:scale-105 transition duration-500" />
                  ) : (
                    <Laptop className="w-12 h-12 text-slate-200" />
                  )}
                </div>

                {/* Brand & Price */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {laptop.brand}
                  </span>
                  <div className="flex items-center gap-1 group/rating">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-slate-400 group-hover/rating:text-slate-600 transition-colors">{laptop.rating}</span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-4 tracking-tight leading-tight line-clamp-2 min-h-[2.5rem]">{laptop.name}</h3>

                {/* Specs */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-semibold bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <Cpu className="w-3.5 h-3.5 text-blue-400" />
                    <span className="truncate">{laptop.specs?.processor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-semibold bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <MemoryStick className="w-3.5 h-3.5 text-blue-400" />
                    <span className="truncate">{laptop.specs?.ram}</span>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-slate-900">{formatPrice(laptop.price)}</span>
                    {laptop.originalPrice && laptop.originalPrice > laptop.price && (
                      <span className="text-[10px] text-slate-400 line-through font-medium">{formatPrice(laptop.originalPrice)}</span>
                    )}
                  </div>

                  <button
                    onClick={() => openBooking(laptop)}
                    disabled={!laptop.inStock}
                    className={`h-10 px-4 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all ${
                      laptop.inStock
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:translate-y-[-1px]'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {laptop.inStock ? 'Checkout' : 'Sold Out'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Booking Modal */}
      {showModal && selectedLaptop && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setShowModal(false)}>
          <div
            className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {bookingSuccess ? (
              <div className="p-10 text-center">
                <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Order Confirmed</h3>
                <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">Your request for <span className="text-blue-600 font-bold">{selectedLaptop.name}</span> has been received. Our team will contact you shortly.</p>
                
                <div className="bg-slate-50 rounded-2xl p-5 mb-8 text-left border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Price</span>
                    <span className="text-slate-900 text-lg font-bold">{formatPrice(selectedLaptop.price)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500">Service Status</span>
                    <span className="text-emerald-600">Authorized</span>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
                >
                  Back to Store
                </button>
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-2">
                        {selectedLaptop.image ? (
                          <img src={selectedLaptop.image} className="w-full h-full object-contain" />
                        ) : (
                          <Laptop className="w-6 h-6 text-slate-200" />
                        )}
                     </div>
                     <div>
                        <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-0.5">Hardware Order</div>
                        <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-none line-clamp-1">{selectedLaptop.name}</h3>
                     </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center hover:bg-slate-100 transition text-slate-400 hover:text-slate-900"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleBook} className="p-8 space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-xs font-bold">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-1">Full Name</label>
                       <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:border-blue-600 outline-none transition placeholder:text-slate-300"
                        placeholder="Authorized Name"
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-1">Email ID</label>
                       <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:border-blue-600 outline-none transition placeholder:text-slate-300"
                        placeholder="client@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-1">Contact Number</label>
                     <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:border-blue-600 outline-none transition placeholder:text-slate-300"
                      placeholder="+91 XXXX XXXX"
                    />
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-6">
                     <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Calculation</div>
                        <div className="text-2xl font-bold text-slate-900">{formatPrice(selectedLaptop.price)}</div>
                     </div>
                     <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition disabled:opacity-50"
                      >
                        {submitting ? 'Processing...' : 'Place Order'}
                      </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

