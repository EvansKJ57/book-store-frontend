import { SignupProps } from '../pages/Signup';
import { httpClient } from './http';

export const signup = async (userData: SignupProps) => {
  const res = await httpClient.post('/users/join', userData);
  return res.data;
};

export const resetRequest = async (data: Pick<SignupProps, 'email'>) => {
  const res = await httpClient.post('/users/reset', data);
  return res.data;
};

export const resetPassword = async (data: SignupProps) => {
  const res = await httpClient.put('/users/reset', data);
  return res.data;
};

interface LoginResponse {
  acToken: string;
}

export const login = async (data: Omit<SignupProps, 'name'>) => {
  const res = await httpClient.post<LoginResponse>('/auth/local/login', data);
  return res.data;
};
