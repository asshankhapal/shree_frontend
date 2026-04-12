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
  User,
  Bell,
  MoreVertical
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
      
      Object.keys(formData).forEach(key => {
        if (key === 'specs') {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      });

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
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex text-sm selection:bg-blue-600/10">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen shrink-0 overflow-y-auto hidden lg:flex shadow-sm">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-10 group cursor-pointer">
            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20 transition-all">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-lg tracking-tight">Admin <span className="text-blue-600">Portal</span></div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-0.5">
                System Management
              </div>
            </div>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: "laptops", label: "Inventory", icon: Laptop },
              { id: "repairs", label: "Maintenance", icon: Wrench },
              { id: "orders", label: "Orders", icon: Package },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-semibold">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 mb-6 px-1">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center border border-slate-200 shadow-sm text-blue-600">
               <User className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-bold truncate text-slate-900">Administrator</div>
              <div className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider flex items-center gap-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                 Active Session
              </div>
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
               <Activity className="w-3 h-3 animate-pulse" />
               Global Operations: Normal
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Control <span className="text-blue-600">Center</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm mt-1">Monitor and manage retail and service workflows.</p>
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden lg:flex items-center gap-5 px-5 border-x border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                <div>Latency: <span className="text-emerald-600">8ms</span></div>
                <div>Status: <span className="text-emerald-600">Healthy</span></div>
             </div>
            {activeTab === "laptops" && (
              <button
                onClick={() => setShowLaptopModal(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-bold text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
              >
                <Plus className="w-4 h-4" />
                Add Laptop
              </button>
            )}
          </div>
        </header>

        {error && (
          <div className="mb-8 bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-medium">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 grayscale opacity-40">
            <div className="animate-spin h-8 w-8 border-3 border-blue-600 border-t-transparent rounded-full mb-3"></div>
            <p className="font-bold tracking-widest uppercase text-[10px]">Syncing Database...</p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            {activeTab === "laptops" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider border-b border-slate-200">
                      <th className="px-6 py-4">Product Details</th>
                      <th className="px-6 py-4">Stock Status</th>
                      <th className="px-6 py-4">Specs Preview</th>
                      <th className="px-6 py-4">Net Price</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {laptops.map((laptop) => (
                      <tr key={laptop._id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white border border-slate-200 rounded-lg flex items-center justify-center p-1 overflow-hidden shadow-sm">
                              {laptop.image ? (
                                <img src={laptop.image} alt={laptop.name} className="w-full h-full object-contain" />
                              ) : (
                                <Laptop className="h-5 w-5 text-slate-300" />
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-sm tracking-tight">{laptop.name}</div>
                              <div className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">{laptop.brand}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            laptop.inStock 
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                              : 'bg-red-50 text-red-600 border-red-100'
                          }`}>
                            {laptop.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-[11px] text-slate-500 font-medium space-y-0.5">
                            <div className="flex items-center gap-2"><Cpu className="h-3 w-3 text-slate-300" /> {laptop.specs?.processor}</div>
                            <div className="flex items-center gap-2"><MemoryStick className="h-3 w-3 text-slate-300" /> {laptop.specs?.ram}</div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-sm font-bold text-slate-900">{formatPrice(laptop.price)}</div>
                          <div className="text-[10px] text-slate-400 line-through font-medium">{formatPrice(laptop.originalPrice)}</div>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all">
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button onClick={() => deleteLaptop(laptop._id)} className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-600 hover:border-red-200 transition-all">
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
                    <tr className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider border-b border-slate-200">
                      <th className="px-6 py-4">Hardware & Client</th>
                      <th className="px-6 py-4">Diagnostic Notes</th>
                      <th className="px-6 py-4">Booking</th>
                      <th className="px-6 py-4">Lifecycle Status</th>
                      <th className="px-6 py-4 text-right">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {repairs.map((repair) => (
                      <tr key={repair._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-5">
                          <div className="font-bold text-slate-900 text-sm tracking-tight">{repair.deviceType} <span className="text-slate-300 mx-1">|</span> {repair.brand}</div>
                          <div className="text-xs text-slate-500 mt-1 font-medium">{repair.name} • {repair.phone}</div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-xs text-slate-500 max-w-xs line-clamp-2 font-medium leading-relaxed">{repair.issueDescription}</div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-xs font-bold text-slate-900">{new Date(repair.preferredDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{repair.preferredTime}</div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            repair.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            repair.status === 'Pending' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                            'bg-amber-50 text-amber-600 border-amber-100'
                          }`}>
                            {repair.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <select 
                            className="bg-white border border-slate-200 text-[11px] font-bold px-2 py-1.5 rounded-lg outline-none focus:border-blue-600 shadow-sm"
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
                    <tr className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider border-b border-slate-200">
                      <th className="px-6 py-4">SKU Details</th>
                      <th className="px-6 py-4">Full Customer Name</th>
                      <th className="px-6 py-4">Total Value</th>
                      <th className="px-6 py-4">Dispatch Date</th>
                      <th className="px-6 py-4 text-right">Fulfillment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-5">
                          <div className="font-bold text-slate-900 text-sm tracking-tight">{order.laptopId?.name || "Premium Item"}</div>
                          <div className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">{order.laptopId?.brand || "Authorized Retail"}</div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-xs font-bold text-slate-900">{order.name}</div>
                          <div className="text-[10px] text-slate-400 font-medium">{order.email}</div>
                        </td>
                        <td className="px-6 py-5 text-sm font-bold text-slate-900">
                          {formatPrice(order.laptopId?.price)}
                        </td>
                        <td className="px-6 py-5 text-xs text-slate-500 font-medium">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-6 py-5 text-right">
                          <span className="bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
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
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">New Inventory Sync</h3>
                <p className="text-slate-500 text-sm font-medium">Add a new hardware listing to the retail store.</p>
              </div>
              <button 
                onClick={() => setShowLaptopModal(false)} 
                className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
                aria-label="Close modal"
              >
                <Plus className="rotate-45 h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleAddLaptop} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Model Designation</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:border-blue-600 outline-none transition"
                    placeholder="e.g. Dell XPS 15"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Manufacturer</label>
                  <select
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:marker:text-blue-600 outline-none transition appearance-none cursor-pointer"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Sale Price (INR)</label>
                  <input
                    type="number"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:border-blue-600 outline-none transition"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">MSRP / Original Price</label>
                  <input
                    type="number"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:border-blue-600 outline-none transition"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Visual Asset</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center overflow-hidden shrink-0 shadow-inner p-1">
                    {imagePreview ? (
                      <img src={imagePreview} className="w-full h-full object-contain" alt="Preview" />
                    ) : (
                      <Laptop className="h-6 w-6 text-slate-200" />
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
                      className="inline-block cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg transition"
                    >
                      {imageFile ? "Modify Selection" : "Attach Product Image"}
                    </label>
                    <p className="text-[10px] text-slate-400 mt-1 italic">High-res WEBP or PNG preferred.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2"><Cpu className="h-3.5 w-3.5 text-blue-600" /> Processor Spec</label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:border-blue-600 outline-none transition"
                    placeholder="e.g. Core i7 13th Gen"
                    value={formData.specs.processor}
                    onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, processor: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2"><MemoryStick className="h-3.5 w-3.5 text-blue-600" /> RAM Capacity</label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:border-blue-600 outline-none transition"
                    placeholder="e.g. 16GB DDR5"
                    value={formData.specs.ram}
                    onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, ram: e.target.value } })}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition shadow-lg shadow-blue-600/20 uppercase tracking-widest text-xs"
                >
                  Publish Asset
                </button>
                <button
                  type="button"
                  onClick={() => setShowLaptopModal(false)}
                  className="flex-1 bg-white hover:bg-slate-50 text-slate-500 font-bold py-4 rounded-2xl transition border border-slate-200 uppercase tracking-widest text-xs"
                >
                  Cancel Sync
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
