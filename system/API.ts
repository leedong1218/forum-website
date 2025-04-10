import axios from 'axios';

export const PERMISSION_DENIED = 'PermissionDenied';
export const USER_ACCESS_DENIED = 'User - AccessDenied';
export const USER_NOT_LOGIN = 'User - NotLogin';

const API = axios.create({ 'baseURL': `${process.env.NEXT_PUBLIC_API_URL}` });

API.interceptors.response.use(
  response => {
    const token = response.headers?.['x-auth-token'] || response.headers?.['X-Auth-Token'];
    if (token) {
      localStorage.setItem('access_token', token);
    }

    return response.data;
  },
  error => {
    if (error.response?.data?.errorCode === USER_NOT_LOGIN) {
      localStorage.removeItem('access_token');
    }
    return Promise.reject(error.response?.data || error);
  }
);


export default API;
