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
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex selection:bg-blue-600/10">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen shrink-0 overflow-y-auto hidden lg:flex shadow-sm">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-10">
            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20 transition-all">
              <Cpu className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-lg tracking-tight">Shree <span className="text-blue-600">Enterprises</span></div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-0.5">
                Customer Dashboard
              </div>
            </div>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: "dashboard", label: "Overview", icon: LayoutDashboard, path: "/dashboard" },
              { id: "store", label: "Shop Laptops", icon: ShoppingBag, path: "/laptops" },
              { id: "booking", label: "Repair Service", icon: Wrench, path: "/repair-booking" },
            ].map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all ${
                  item.id === "dashboard"
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
               <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></div>
               Service Center Online
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Account <span className="text-blue-600">Dashboard</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm mt-1">Manage your hardware repairs and device orders.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Track repair status..." 
                className="bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-600 transition shadow-sm"
              />
            </div>
            <button className="h-10 w-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-600 transition shadow-sm relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Status Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Active Repairs', val: activeRepairsCount, icon: Wrench, color: 'blue', desc: 'In progress' },
            { label: 'Total Orders', val: orders.length, icon: Package, color: 'indigo', desc: 'Successful' },
            { label: 'Total Investment', val: formatPrice(totalSpent), icon: CreditCard, color: 'emerald', desc: 'Account total' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{stat.label}</div>
                  <div className="text-2xl font-bold text-slate-900">{stat.val}</div>
                  <div className="text-xs font-medium text-slate-500 mt-1">{stat.desc}</div>
                </div>
                <div className="h-12 w-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-center gap-3 mb-8 text-sm font-medium">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Repairs Section */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-blue-600" />
                Your Repairs
              </h3>
              <Link to="/repair-booking" className="text-xs font-bold text-blue-600 hover:underline">New Booking</Link>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2].map(i => <div key={i} className="h-24 bg-slate-100 animate-pulse rounded-xl"></div>)}
              </div>
            ) : repairs.length === 0 ? (
              <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-10 text-center">
                <p className="text-slate-500 text-sm font-medium">No active repair tickets.</p>
                <Link to="/repair-booking" className="mt-3 inline-block text-blue-600 font-bold text-sm">Schedule Now</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {repairs.map(repair => (
                  <div key={repair._id} className="border border-slate-100 bg-slate-50/30 rounded-xl p-4 hover:border-blue-200 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{repair.deviceType} <span className="text-slate-300 font-normal">|</span> {repair.brand}</div>
                        <div className="text-xs text-slate-500 font-medium mt-0.5">{repair.model}</div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        repair.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                        repair.status === 'Pending' ? 'bg-blue-50 text-blue-600' :
                        'bg-amber-50 text-amber-600'
                      }`}>
                        {repair.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-5 text-[11px] text-slate-500 font-semibold border-t border-slate-100 pt-3">
                      <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-blue-600/50" /> {new Date(repair.preferredDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                      <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-blue-600/50" /> {repair.preferredTime}</div>
                      <button
                        onClick={() => handleDeleteRepair(repair._id)}
                        className="ml-auto text-slate-400 hover:text-red-500 transition px-2 py-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Orders Section */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-blue-600" />
                Device Orders
              </h3>
              <Link to="/laptops" className="text-xs font-bold text-blue-600 hover:underline">Marketplace</Link>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2].map(i => <div key={i} className="h-24 bg-slate-100 animate-pulse rounded-xl"></div>)}
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-10 text-center">
                <p className="text-slate-500 text-sm font-medium">No hardware orders yet.</p>
                <Link to="/laptops" className="mt-3 inline-block text-blue-600 font-bold text-sm">Shop Store</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order._id} className="border border-slate-100 bg-slate-50/30 rounded-xl p-4 hover:border-blue-200 transition-colors">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center p-1">
                          {order.laptopId?.image ? 
                            <img src={order.laptopId.image} className="w-full h-full object-contain" /> :
                            <Laptop className="w-5 h-5 text-slate-300" />
                          }
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm tracking-tight">{order.laptopId?.name || "Premium Device"}</div>
                          <div className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">{order.laptopId?.brand}</div>
                        </div>
                      </div>
                      <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-semibold border-t border-slate-100 pt-3">
                      <div className="text-slate-400 flex items-center gap-1.5 font-medium">
                        <Calendar className="h-3.5 w-3.5" /> {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-slate-900 font-bold">{formatPrice(order.laptopId?.price)}</div>
                        <button
                          onClick={() => handleDeleteOrder(order._id)}
                          className="text-slate-300 hover:text-red-500 transition"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
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
    </div>
  );
}