import { httpClient } from './http';

interface AddCartParams {
  bookId: number;
  qty: number;
}

export const addCart = async (params: AddCartParams) => {
  const res = await httpClient.post('/cart', params);
  return res.data;
};
