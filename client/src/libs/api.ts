import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status == 401 || !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const resposne = await axios.get(
          "http://localhost:8000/api/user/refresh"
        );
        const token = resposne.data?.accessToken;
        localStorage.setItem("accessToken", token);

        originalRequest.headers.Authorization = `Bearer ${token}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error(refreshError);
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
