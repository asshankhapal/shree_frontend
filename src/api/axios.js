import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// Add an interceptor to inject the token from localStorage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add an interceptor to handle 401 Unauthorized errors globally
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Clear local storage if token is invalid
      localStorage.removeItem("token");
      // Use window.location only if needed or let components handle redirect
      // For now, removing the token will cause ProtectedRoute/AuthContext to react
    }
    return Promise.reject(error);
  }
);

export default API;
