import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("accessToken");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get("refreshToken");

      try {
        const { data } = await axios.post(
          `${BASE_URL}/api/auth/refresh`,
          { refreshToken }
        );

        const newAccessToken: string = data?.data?.accessToken;
        const newRefreshToken: string = data?.data?.refreshToken;

        if (newAccessToken) {
          Cookies.set("accessToken", newAccessToken, { expires: 1 / 96 }); // 15 min
          Cookies.set("refreshToken", newRefreshToken, { expires: 7 });
          originalRequest.headers = originalRequest.headers ?? {};
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        if (typeof window !== "undefined") {
          window.location.href = "/auth";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
