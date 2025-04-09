import axios from 'axios';

export interface CaptchaResponse {
  key: string;
  image_url: string;
}

export const getCaptcha = async (): Promise<CaptchaResponse> => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/captcha/refresh/`, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    }
  });

  return {
    key: res.data.key,
    image_url: res.data.image_url,
  };
};
