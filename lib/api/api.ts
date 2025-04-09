// import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// const API = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
// });

// API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   config.headers = config.headers || {};
//   if (!config.headers['Content-Type']) {
//     config.headers['Content-Type'] = 'application/json';
//   }
//   const token = sessionStorage.getItem('token');
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
//   return config;
// });

// API.interceptors.response.use(
//   (response: AxiosResponse) => {
//     const token = response.headers['x-auth-token'];
//     if (token) {
//       sessionStorage.setItem('token', token);
//     }

//     if (response.data?.result === false) {
//       throw response.data;
//     }

//     return response.data;
//   },
//   error => {
//     return Promise.reject(error.response?.data || error);
//   }
// );

// export default API;
