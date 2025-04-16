import { triggerAuthError, triggerAuthWarning } from '@/lib/utils/authErrorHandler';
import axios from 'axios';
import router from 'next/router';

export const PERMISSION_DENIED = 'permission_denied';
export const USER_NOT_LOGIN = 'User - NotLogin';
export const USER_INVALID_TOKEN = 'User - InvalidToken';
export const USER_EMAIL_NOTVERIFIED = 'User - EmailNotVerified';

const API = axios.create({ 'baseURL': `${process.env.NEXT_PUBLIC_API_URL}` });

API.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



API.interceptors.response.use(
  response => {
    const token = response.headers?.['x-auth-token'] || response.headers?.['X-Auth-Token'];
    if (token) {
      localStorage.setItem('access_token', token);
    }
    return response.data;
  },
  error => {
    const code = error.response?.data?.errorCode;
    const msg = error.response?.data?.message || '發生錯誤';

    if (code === USER_NOT_LOGIN || code === USER_INVALID_TOKEN) {
      localStorage.removeItem('access_token');
      triggerAuthError(msg);
    } else if (code === PERMISSION_DENIED) {
      triggerAuthWarning(msg);
    } else if (code === USER_EMAIL_NOTVERIFIED){
      router.push("/verify-email");
    }

    return Promise.reject(error.response?.data || error);
  }
);
export default API;
