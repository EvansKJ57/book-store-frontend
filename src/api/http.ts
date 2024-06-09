import axios, { AxiosRequestConfig } from 'axios';
import { getToken, removeToken } from '../store/authStore';

const BASE_URL = 'https://localhost:8443';
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken() ? `Bearer ${getToken()}` : '',
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      if (error.response.status === 401 || error.response.status === 400) {
        removeToken();
        window.location.href = '/login';
        return;
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export const httpClient = createClient();

//공통 요청 부분

type RequestMethod = 'get' | 'post' | 'put' | 'delete';
export const requestHandler = async <T>(
  mehtod: RequestMethod,
  url: string,
  payload?: T
) => {
  let res;
  switch (mehtod) {
    case 'post':
      res = await httpClient.post(url, payload);
      break;

    case 'get':
      res = await httpClient.get(url);
      break;

    case 'put':
      res = await httpClient.put(url, payload);
      break;

    case 'delete':
      res = await httpClient.delete(url);
      break;
  }
  return res.data;
};
