import API from '@/system/API';
import { Response } from '@/lib/types/requestType';

export interface CaptchaResponse {
  key: string;
  image_url: string;
}

const BASE_URL = '/captcha/refresh/';

const CaptchaAPI = {
  getCaptcha: (): Promise<Response<CaptchaResponse>> =>
    API.get(BASE_URL, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    }),
};

export default CaptchaAPI;
