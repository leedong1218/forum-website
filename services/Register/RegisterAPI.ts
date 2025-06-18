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

  getReport: (): Promise<Response<unknown>> =>
    API.get('/register/list'),

  review: (report_id: string): Promise<Response<unknown>> =>
    API.patch(`/register/${report_id}/list`, { params: { report_id: report_id } }),
};

export default RegisterAPI;
