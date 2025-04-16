import API from '@/system/API';
import { Response } from '@/lib/types/requestType';

export type UserSelfInfo = {
  id: number;
  username: string;
  displayName: string;
  email: string;
  group: string;
  groupColor: string;
  avatar: string;
  postCount: number;
  likeCount: number;
  joinedDate: string;
};

export interface VerifyEmailPayload {
  email: string;
  captcha_key: string;
  captcha_value: string;
}

const BASE_URL = '/user';

const UserAPI = {
  'self': (): Promise<Response<UserSelfInfo>> =>
    API.get(`${BASE_URL}/self`),
  'selfEmail': (): Promise<Response<UserSelfInfo>> =>
    API.get(`${BASE_URL}/self/email`),
  'verifyEmail': (data: VerifyEmailPayload): Promise<Response<unknown>> =>
    API.post(`${BASE_URL}/self/email/verify`, data),
  'verifyToken': (token: string): Promise<Response<null>> =>
    API.get(`/verify-email`, { params: { token } }),
};

export default UserAPI;
