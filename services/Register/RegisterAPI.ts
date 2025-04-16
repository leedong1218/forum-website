// services/Register/registerAPI.ts
import API from '@/system/API';
import { Response } from '@/system/Request.type';

export interface RegisterType {
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  captcha_key: string;
  captcha_value: string;
}

const RegisterAPI = {
  register: (data: RegisterType): Promise<Response<unknown>> =>
    API.post('/register', data),
};

export default RegisterAPI;
