import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import {
  Wrench,
  LogOut,
  Laptop,
  Plus,
  Trash2,
  Edit2,
  Search,
  ChevronDown,
  LayoutDashboard,
  HardDrive,
  Cpu,
  Monitor,
  MemoryStick,
  Settings,
  CheckCircle2,
  Clock,
  Package,
  AlertCircle,
  Shield,
  Activity,
} from "lucide-react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("laptops");
  const [laptops, setLaptops] = useState([]);
  const [repairs, setRepairs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showLaptopModal, setShowLaptopModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    originalPrice: "",
    rating: 4.5,
    inStock: true,
    specs: { processor: "", ram: "", storage: "", display: "" },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      brand: "",
      price: "",
      originalPrice: "",
      rating: 4.5,
      inStock: true,
      specs: { processor: "", ram: "", storage: "", display: "" },
    });
    setImageFile(null);
    setImagePreview(null);
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (activeTab === "laptops") {
        const res = await API.get(`/laptops`);
        setLaptops(res.data);
      } else if (activeTab === "repairs") {
        const res = await API.get(`/repairs`);
        setRepairs(res.data);
      } else if (activeTab === "orders") {
        const res = await API.get(`/laptops/orders`);
        setOrders(res.data);
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin");
  };

  const handleAddLaptop = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      
      // Append basic fields
      Object.keys(formData).forEach(key => {
        if (key === 'specs') {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      });

      // Append image file
      if (imageFile) {
        data.append('image', imageFile);
      }

      await API.post(`/laptops`, data, {
        headers: { 
          'Content-Type': 'multipart/form-data'
        }
      });

      setShowLaptopModal(false);
      fetchData();
      resetForm();
    } catch (err) {
      setError("Failed to add laptop. " + (err.response?.data?.message || ""));
    }
  };

  const deleteLaptop = async (id) => {
    if (window.confirm("Are you sure you want to delete this laptop?")) {
      try {
        await API.delete(`/laptops/${id}`);
        fetchData();
      } catch (err) {
        setError("Failed to delete laptop.");
      }
    }
  };

  const updateRepairStatus = async (id, status) => {
    try {
      await API.put(`/repairs/${id}/status`, { status });
      fetchData();
    } catch (err) {
      setError("Failed to update status.");
    }
  };

  const formatPrice = (val) => "₹" + (val || 0).toLocaleString("en-IN");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex text-sm selection:bg-blue-500/30">
      {/* Sidebar - Enhanced with Circuit Pattern */}
      <aside className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 flex flex-col sticky top-0 h-screen shrink-0 overflow-y-auto hidden lg:flex bg-circuit">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-10 group cursor-pointer">
            <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all group-hover:rotate-90">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-white tracking-widest uppercase italic font-tech">Admin <span className="text-blue-500">Hub</span></div>
              <div className="text-[9px] text-slate-500 font-black uppercase tracking-[0.3em] leading-none mt-1">
                Infrastructure Core
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { id: "laptops", label: "Inventory", icon: Laptop },
              { id: "repairs", label: "Maintenance", icon: Wrench },
              { id: "orders", label: "Procurement", icon: Package },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all border ${
                  activeTab === tab.id
                    ? "bg-blue-600/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                    : "text-slate-500 border-transparent hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-black uppercase tracking-widest text-[10px]">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800/50">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 shadow-inner">
               <Shield className="w-5 h-5 text-blue-500" />
            </div>
            <div className="overflow-hidden">
              <div className="text-[11px] font-black uppercase tracking-widest truncate text-white">Root Admin</div>
              <div className="text-[9px] text-emerald-500 font-black uppercase tracking-widest flex items-center gap-1">
                 <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                 Top Priority
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-red-500/10 hover:text-red-500 border border-slate-800 py-3 rounded-xl transition-all font-black uppercase tracking-widest text-[9px] text-slate-500"
          >
            <LogOut className="h-4 w-4" />
            <span>Terminate Link</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 animate-tech-pulse"></div>

        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
               <Activity className="w-3 h-3 animate-pulse" />
               Global Hardware Node: Active
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
              Control <span className="text-blue-600">Console</span>
            </h1>
            <p className="text-slate-500 font-bold text-[10px] mt-2 tracking-widest uppercase">Infrastructure Management Protocol v4.0</p>
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden lg:flex items-center gap-6 px-6 py-2 border-x border-slate-900 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <div>Ping: <span className="text-emerald-500">12ms</span></div>
                <div>Status: <span className="text-emerald-500">Optimal</span></div>
             </div>
            {activeTab === "laptops" && (
              <button
                onClick={() => setShowLaptopModal(true)}
                className="flex items-center gap-3 bg-blue-600 text-white px-6 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/30 hover:scale-105 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                Initialize Listing
              </button>
            )}
          </div>
        </header>

        {error && (
          <div className="mb-8 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl flex items-center gap-3 font-medium">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 grayscale opacity-50">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
            <p className="font-bold tracking-widest uppercase text-xs">Loading sync records...</p>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {activeTab === "laptops" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-800/50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-800">
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4">Inventory</th>
                      <th className="px-6 py-4">Specifications</th>
                      <th className="px-6 py-4">Pricing</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {laptops.map((laptop) => (
                      <tr key={laptop._id} className="hover:bg-slate-800/30 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 group-hover:border-blue-500/50 transition-colors">
                              {laptop.image ? (
                                <img src={laptop.image} alt={laptop.name} className="w-full h-full object-cover rounded-xl" />
                              ) : (
                                <Laptop className="h-6 w-6 text-slate-600" />
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-white text-sm">{laptop.name}</div>
                              <div className="text-xs text-blue-500 font-bold uppercase tracking-wide">{laptop.brand}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                            laptop.inStock 
                              ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                              : 'bg-red-500/10 text-red-500 border-red-500/20'
                          }`}>
                            {laptop.inStock ? 'Available' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-[11px] text-slate-400 space-y-1">
                            <div className="flex items-center gap-2"><Cpu className="h-3 w-3" /> {laptop.specs?.processor}</div>
                            <div className="flex items-center gap-2"><MemoryStick className="h-3 w-3" /> {laptop.specs?.ram}</div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-sm font-black text-white">{formatPrice(laptop.price)}</div>
                          <div className="text-[10px] text-slate-500 line-through">{formatPrice(laptop.originalPrice)}</div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="h-8 w-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button onClick={() => deleteLaptop(laptop._id)} className="h-8 w-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all">
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "repairs" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-800/50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-800">
                      <th className="px-6 py-4">Device & Client</th>
                      <th className="px-6 py-4">Issue Details</th>
                      <th className="px-6 py-4">Schedule</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {repairs.map((repair) => (
                      <tr key={repair._id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-5">
                          <div className="font-bold text-white text-sm">{repair.deviceType} — {repair.brand}</div>
                          <div className="text-xs text-slate-400 mt-1 capitalize font-medium">{repair.name} • {repair.phone}</div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-xs text-slate-300 max-w-xs">{repair.issueDescription}</div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-xs font-bold text-white">{new Date(repair.preferredDate).toLocaleDateString()}</div>
                          <div className="text-[10px] text-slate-500 font-medium">{repair.preferredTime}</div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter border ${
                            repair.status === 'Completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                            repair.status === 'Pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                            'bg-blue-500/10 text-blue-500 border-blue-500/20'
                          }`}>
                            {repair.status}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <select 
                            className="bg-slate-800 border border-slate-700 text-xs font-bold p-1 rounded outline-none"
                            value={repair.status}
                            onChange={(e) => updateRepairStatus(repair._id, e.target.value)}
                          >
                            <option>Pending</option>
                            <option>Confirmed</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                            <option>Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-800/50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-800">
                      <th className="px-6 py-4">Order Details</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Order Date</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-5">
                          <div className="font-bold text-white text-sm">{order.laptopId?.name || "Deleted Product"}</div>
                          <div className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">{order.laptopId?.brand || "Unknown"}</div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-xs font-bold text-slate-200">{order.name}</div>
                          <div className="text-[10px] text-slate-500 font-medium">{order.email}</div>
                        </td>
                        <td className="px-6 py-5 text-sm font-black text-white">
                          {formatPrice(order.laptopId?.price)}
                        </td>
                        <td className="px-6 py-5 text-xs text-slate-400 font-medium">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-5">
                          <span className="bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Add Laptop Modal */}
      {showLaptopModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">Add New Listing</h3>
                <p className="text-slate-500 text-sm font-medium">Increase the product inventory for your store</p>
              </div>
              <button onClick={() => setShowLaptopModal(false)} className="h-10 w-10 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <Plus className="rotate-45 h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleAddLaptop} className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Device Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:border-blue-600 outline-none transition"
                    placeholder="e.g. MacBook Pro M3"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Brand</label>
                  <select
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:border-blue-600 outline-none transition"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  >
                    <option value="">Select Brand</option>
                    <option value="Apple">Apple</option>
                    <option value="Dell">Dell</option>
                    <option value="HP">HP</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="Asus">Asus</option>
                    <option value="Acer">Acer</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:border-blue-600 outline-none transition"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Original Price (₹)</label>
                  <input
                    type="number"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:border-blue-600 outline-none transition"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Product Image</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                    {imagePreview ? (
                      <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <Laptop className="h-6 w-6 text-slate-700" />
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="laptop-image-upload"
                    />
                    <label
                      htmlFor="laptop-image-upload"
                      className="inline-block cursor-pointer bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg transition"
                    >
                      {imageFile ? "Change Image" : "Upload File"}
                    </label>
                    <p className="text-[10px] text-slate-600 mt-1 italic">JPG, PNG or WEBP. Max 2MB recommended.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-2"><Cpu className="h-3 w-3" /> Processor</label>
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:border-blue-600 outline-none transition"
                    value={formData.specs.processor}
                    onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, processor: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-2"><MemoryStick className="h-3 w-3" /> RAM</label>
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:border-blue-600 outline-none transition"
                    value={formData.specs.ram}
                    onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, ram: e.target.value } })}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition shadow-xl shadow-blue-600/20 uppercase tracking-widest text-xs"
                >
                  Create Listing
                </button>
                <button
                  type="button"
                  onClick={() => setShowLaptopModal(false)}
                  className="flex-1 bg-slate-800 text-slate-400 font-black py-4 rounded-2xl transition border border-slate-700 uppercase tracking-widest text-xs"
                >
                  Discard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
