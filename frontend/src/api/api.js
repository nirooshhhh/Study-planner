import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// AUTH ✅
export const registerUser = (data) =>
  API.post("/api/auth/register", data);

export const loginUser = (data) =>
  API.post("/api/auth/login", data);

// AI ✅ FIXED
export const generateAIPlan = (topic, weeks) =>
  API.post("/api/ai/plan", { topic, weeks });

// CHAT ✅ FIXED
export const sendChatMessage = (message) =>
  API.post("/api/chat", { message });

export default API;
