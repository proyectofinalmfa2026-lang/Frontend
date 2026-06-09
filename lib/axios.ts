import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
});
// Interceptor de REQUEST — manda el token en cada llamada
api.interceptors.request.use((config) => {
  const token = Cookies.get("ct_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de RESPONSE — detecta sesión expirada
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("ct_token");
      localStorage.removeItem("ct_auth");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
