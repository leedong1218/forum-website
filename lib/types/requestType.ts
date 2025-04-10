export type Response<T> = {
  result: string;
  errorCode: string;
  message?: string;
  data?: T;
};