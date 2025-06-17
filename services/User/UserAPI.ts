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

export interface UploadAvatarPayload {
  avatar?: File[];
}

type UpdateProfilePayload = {
  displayName?: string;
  info?: string;
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

  'avatar': (data: UploadAvatarPayload): Promise<Response<unknown>> => {
    const fd = new FormData();
    data.avatar?.forEach(f => fd.append('avatar', f));

    return API.post(`${BASE_URL}/avatar/`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  'profile': (data: UpdateProfilePayload): Promise<Response<unknown>> =>
    API.put(`${BASE_URL}/profile/`, data),

};

export default UserAPI;
