// import axios, { InternalAxiosRequestConfig } from 'axios';

// const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

// API.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
//   config.headers = config.headers || {};

//   if (!config.headers['Content-Type']) {
//     config.headers['Content-Type'] = 'application/json';
//   }
//   if (typeof window !== 'undefined' && localStorage.getItem('token')) {
//     config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
//   }

//   return config;
// });

// API.interceptors.response.use(
//   async (response) => {
//     if (!response.data.result) {
//       throw response.data;
//     } else {
//       if (response.headers['x-auth-token']) {
//         localStorage.setItem('token', response.headers['x-auth-token']);
//       }
//     }
//     return response.data;
//   },
//   (error) => Promise.reject(error.response?.data || error.message)
// );

// export default API;
