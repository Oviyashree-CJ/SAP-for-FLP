import axios from "axios";

export const API = axios.create({
  baseURL: "http://127.0.0.1:5000", // Flask backend
});

API.defaults.withCredentials = true;

// Add token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");  
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers["Authorization"] = `Bearer ${token.trim()}`;
    console.log("Attached token:", token);
  }
  return config;
});

// --- Auth services ---
export const getUserProfile = () => API.get("/auth/profile");
export const updateUserProfile = (data) => API.put("/auth/profile", data);
export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  localStorage.setItem("token", res.data.token); 
  return res;
};

export const signupUser = (data) => API.post("/auth/register", data);

export const logoutUser = () =>
  API.post("/auth/logout");

