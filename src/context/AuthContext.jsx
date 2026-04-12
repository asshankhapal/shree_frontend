import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/auth/profile")
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data);
    return res.data;
  };

  const adminLogin = async (email, password) => {
    const res = await API.post("/auth/admin-login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data);
    return res.data;
  };

  const register = async (username, email, password) => {
    const res = await API.post("/auth/register", { username, email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data);
    return res.data;
  };

  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    }
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, adminLogin, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
