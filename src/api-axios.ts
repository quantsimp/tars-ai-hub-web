import { QueryKey } from '@tanstack/react-query';
import axios from 'axios';

const API_BASEURL = process.env.NEXT_PUBLIC_API_BASEURL;

export class ApiError extends Error {
  public code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

export const apiAxios = axios.create({ baseURL: API_BASEURL });
apiAxios.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('dynamic_authentication_token');
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
    } catch (e) {}

    return config;
  },
  (error) => Promise.reject(error)
);
apiAxios.interceptors.response.use(
  (response) => {
    if (response.data.code === 0) {
      return response.data.data;
    } else {
      throw new ApiError(response.data.msg, response.data.code);
    }
  },
  (error) => {
    console.log(error);
    if (error.response?.status === 401) {
      localStorage.setItem('token', '');
    }
    return Promise.reject(error);
  }
);

export const apiFetcher = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [url, params] = queryKey;
  return apiAxios.request({ url: url as string, params, method: 'GET' });
};
