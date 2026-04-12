import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { 
  Clock, Wrench, ShieldCheck, Monitor, Cpu, Users, 
  MapPin, Phone, CheckCircle2, ChevronRight, LogOut, 
  User, Package, AlertCircle, Laptop, Calendar, CreditCard,
  LayoutDashboard, ShoppingBag, Settings, Bell, Search, Star, Trash2
} from 'lucide-react';

const API_BASE = 'http://localhost:3000/api';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [repairs, setRepairs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchUserActivity();
    }
  }, [user]);

  const fetchUserActivity = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const [repairsRes, ordersRes] = await Promise.all([
        axios.get(`${API_BASE}/repairs/my`, config),
        axios.get(`${API_BASE}/laptops/my-orders`, config)
      ]);
      
      setRepairs(repairsRes.data);
      setOrders(ordersRes.data);
    } catch (err) {
      setError('Failed to fetch your activity records.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleDeleteRepair = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this repair booking?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE}/repairs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRepairs(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete repair booking.');
    }
  };

  const handleDeleteOrder = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this laptop order?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE}/laptops/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(prev => prev.filter(o => o._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete laptop order.');
    }
  };

  const formatPrice = (val) => "₹" + (val || 0).toLocaleString("en-IN");

  const activeRepairsCount = repairs.filter(r => r.status !== 'Completed').length;
  const totalSpent = orders.reduce((sum, o) => sum + (o.laptopId?.price || 0), 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex selection:bg-blue-500/30">
      {/* Sidebar Navigation - Circuit Enhanced */}
      <aside className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 flex flex-col sticky top-0 h-screen shrink-0 overflow-y-auto hidden lg:flex bg-circuit">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-10">
            <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all group-hover:scale-110">
              <Cpu className="h-5 w-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="font-extrabold text-white tracking-widest uppercase italic">Shree <span className="text-blue-500">Suite</span></div>
              <div className="text-[9px] text-slate-500 font-black uppercase tracking-[0.3em] leading-none mt-1">
                My Dashboard
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { id: "dashboard", label: "Home", icon: LayoutDashboard, path: "/dashboard" },
              { id: "store", label: "Shop Laptops", icon: ShoppingBag, path: "/laptops" },
              { id: "booking", label: "Repair Device", icon: Wrench, path: "/repair-booking" },
            ].map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all border ${
                  item.id === "dashboard"
                    ? "bg-blue-600/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                    : "text-slate-500 border-transparent hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-black uppercase tracking-widest text-[10px]">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800/50">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 shadow-inner">
               <User className="w-5 h-5 text-blue-500" />
            </div>
            <div className="overflow-hidden">
              <div className="text-[11px] font-black uppercase tracking-widest truncate text-white">{user?.username || 'Client'}</div>
              <div className="text-[10px] text-slate-500 font-medium tracking-tight">User Account</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-red-500/10 hover:text-red-500 border border-slate-800 py-3 rounded-xl transition-all font-black uppercase tracking-widest text-[9px] text-slate-500"
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
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></div>
               System Status: Online
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
              My <span className="text-blue-600">Account</span>
            </h1>
            <p className="text-slate-500 font-medium text-xs mt-2 tracking-wide uppercase font-tech font-bold uppercase tracking-widest leading-none">Connected & Ready</p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search ticket number..." 
                className="bg-slate-900 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-600 transition"
              />
            </div>
            <button className="h-10 w-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-500 hover:text-blue-400 transition relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-slate-950"></span>
            </button>
          </div>
        </header>

        {/* Quick Summary Stats - Electronics Suite Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
          {[
            { label: 'Current Repairs', val: activeRepairsCount, icon: Wrench, color: 'blue', detail: 'Being Fixed' },
            { label: 'Laptop Orders', val: orders.length, icon: Package, color: 'indigo', detail: 'My Purchases' },
            { label: 'Total Spent', val: formatPrice(totalSpent), icon: CreditCard, color: 'emerald', detail: 'All Time' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] relative overflow-hidden group shadow-2xl hover:border-blue-600/30 transition-all duration-500">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 font-tech">{stat.label}</div>
                  <div className="text-3xl font-black text-white tracking-tighter uppercase italic text-glow">{stat.val}</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-slate-600 mt-2 font-tech">{stat.detail}</div>
                </div>
                <div className={`h-14 w-14 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center text-${stat.color}-500 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl flex items-center gap-3 mb-8 font-medium">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Repair Tickets Module */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-white flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-blue-600" />
                Current Repairs
              </h3>
              <Link to="/repair-booking" className="text-xs font-black uppercase tracking-widest text-blue-500 hover:text-blue-400 transition">Book a Repair</Link>
            </div>

            {loading ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2].map(i => <div key={i} className="h-28 bg-slate-900 rounded-3xl border border-slate-800"></div>)}
              </div>
            ) : repairs.length === 0 ? (
              <div className="bg-slate-900 border-2 border-dashed border-slate-800 rounded-3xl p-12 text-center">
                <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-8 h-8 text-slate-700" />
                </div>
                <p className="text-slate-500 font-bold tracking-tight">You don't have any repairs right now.</p>
                <Link to="/repair-booking" className="mt-4 inline-block text-blue-500 font-bold text-sm">Book a repair →</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {repairs.map(repair => (
                  <div key={repair._id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-blue-600/30 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-black text-white tracking-tight">{repair.deviceType} <span className="text-blue-600 text-xs mx-1">/</span> {repair.brand}</div>
                        <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-0.5">{repair.model}</div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-xl ${
                        repair.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/20' :
                        repair.status === 'Pending' ? 'bg-blue-600/10 text-blue-500 border-blue-500/20' :
                        'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      }`}>
                        {repair.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-[11px] text-slate-400 font-bold border-t border-slate-800 pt-4">
                      <div className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5 text-blue-600" /> {new Date(repair.preferredDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                      <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-blue-600" /> {repair.preferredTime}</div>
                      <button
                        onClick={() => handleDeleteRepair(repair._id)}
                        className="flex items-center gap-1.5 ml-auto text-slate-600 hover:text-red-500 transition cursor-pointer px-3 py-1 rounded-lg hover:bg-red-500/10"
                        title="Cancel this repair"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Laptop Inventory Module */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-white flex items-center gap-3">
                <ShoppingBag className="h-6 w-6 text-indigo-600" />
                My Laptop Orders
              </h3>
              <Link to="/laptops" className="text-xs font-black uppercase tracking-widest text-indigo-500 hover:text-indigo-400 transition">Go to Store</Link>
            </div>

            {loading ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2].map(i => <div key={i} className="h-28 bg-slate-900 rounded-3xl border border-slate-800"></div>)}
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-slate-900 border-2 border-dashed border-slate-800 rounded-3xl p-12 text-center">
                <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Laptop className="w-8 h-8 text-slate-700" />
                </div>
                <p className="text-slate-500 font-bold tracking-tight">You haven't ordered any laptops yet.</p>
                <Link to="/laptops" className="mt-4 inline-block text-indigo-500 font-bold text-sm">Shop now →</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order._id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-indigo-600/30 transition-all group overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex items-center justify-center relative shadow-xl">
                          {order.laptopId?.image ? 
                            <img src={order.laptopId.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" /> :
                            <Laptop className="w-6 h-6 text-slate-700" />
                          }
                          <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div>
                          <div className="font-black text-white text-sm tracking-tight">{order.laptopId?.name || "Archived Device"}</div>
                          <div className="text-[10px] text-indigo-500 font-black uppercase tracking-widest">{order.laptopId?.brand || "Premium Hardware"}</div>
                        </div>
                      </div>
                      <span className="bg-indigo-600/10 text-indigo-500 border border-indigo-600/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold border-t border-slate-800 pt-4">
                      <div className="text-slate-500 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-indigo-600" /> {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-white flex items-center gap-2 px-3 py-1 bg-slate-950 border border-slate-800 rounded-xl shadow-lg">
                          <CreditCard className="h-3.5 w-3.5 text-indigo-500" /> {formatPrice(order.laptopId?.price)}
                        </div>
                        <button
                          onClick={() => handleDeleteOrder(order._id)}
                          className="flex items-center gap-1.5 text-slate-600 hover:text-red-500 transition cursor-pointer px-3 py-1 rounded-lg hover:bg-red-500/10 text-[10px] font-black uppercase tracking-widest"
                          title="Cancel this order"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Global CSS for hidden scrollbar */}
      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar { width: 0; background: transparent; }
        ::-webkit-scrollbar-thumb { display: none; }
      `}} />
    </div>
  );
}