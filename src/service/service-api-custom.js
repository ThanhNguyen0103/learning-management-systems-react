import axios from "axios";
import { callRefreshToken } from "./service-api";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function onRejected(error) {
    // error.reponse.status
    const originalRequest = error.config;
    if (error?.response?.status === 403) {
      alert("403");
    }

    if (
      error?.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("accessToken")
    ) {
      originalRequest._retry = true; // đánh dấu đã retry 1 lần
      try {
        // Gọi API refresh

        const res = await callRefreshToken();
        // accessToken
        const newToken = res.data.data.accessToken;

        localStorage.setItem("accessToken", newToken);
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        return instance(originalRequest);
      } catch (refreshError) {
        // Refresh thất bại → logout
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error?.response?.data);
  }
);
export default instance;
