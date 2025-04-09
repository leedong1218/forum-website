import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';

export const PERMISSION_DENIED = 'PermissionDenied';
export const USER_NOT_LOGIN = 'User - NotLogin';

const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`
});

// === 請求攔截 ===
API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (!config.headers) {
    config.headers = new AxiosHeaders();
  }
  config.headers['Content-Type'] = 'application/json';

  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

// === 響應攔截 ===
API.interceptors.response.use(
  async (response) => {
    return response.data;
  },

  async (error) => {
    const originalRequest = error.config;

    // 👉 token 過期處理
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem('refresh_token');
      if (!refresh) {
        // 沒有 refresh token，強制登出
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/token/refresh/`, {
          refresh: refresh
        });

        const newAccessToken = res.data.access;
        localStorage.setItem('access_token', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return API(originalRequest); // ⬅️ 重新送出原始請求
      } catch (refreshErr) {
        // refresh token 也失效
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshErr);
      }
    }

    // 其他錯誤回傳處理
    return Promise.reject(error.response?.data || error);
  }
);

export default API;
