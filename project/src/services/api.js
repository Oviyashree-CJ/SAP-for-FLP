// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000", // update if different
  withCredentials: true, // crucial for Flask session cookies
});

export const signupUser = (data) => API.post("/auth/signup", data, { withCredentials: true });
export const loginUser = (data) => API.post("/auth/login", data, { withCredentials: true });
export const logoutUser = () => API.post("/auth/logout");
export const getCurrentUser = async () => {try {
    const res = await API.get("/auth/me", { withCredentials: true });
    return res.data; // direct JSON
  } catch (err) {
    if (err.response && err.response.status === 401) {
      return null;  // not logged in
    }
    throw err;
  }
};
export const updateUserProfile = (data) => API.put("/profile", data);

// add other endpoints below (progress, rewards, summaries, etc.)
export default API;
