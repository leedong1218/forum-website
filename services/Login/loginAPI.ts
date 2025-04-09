// loginAPI.ts
import API from '../../system/API';
import { Response } from '@/system/Request.type';

const loginAPI = {
  login: (email: string, password: string, captcha_key: string, captcha_value: string): 
  Promise<Response<unknown>> =>
    API.post('/login', {
      email,
      password,
      captcha_key,
      captcha_value
    }),

  logout: (): Promise<Response<unknown>> => API.get('/logout'),
};

export default loginAPI;