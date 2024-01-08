import { getToken } from './token';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
} from 'axios';

const BACKEND_URL = 'https://13.design.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;
type DetailMessageType = {
  type: string;
  message: string;
};

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });
  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      throw error;
    }
  );

  return api;
};
