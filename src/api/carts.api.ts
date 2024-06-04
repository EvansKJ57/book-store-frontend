import { ICart } from '../models/cart.model';
import { httpClient } from './http';

interface AddCartParams {
  bookId: number;
  qty: number;
}

export const addCart = async (params: AddCartParams) => {
  const res = await httpClient.post('/cart', params);
  return res.data;
};

export const fetchCart = async () => {
  const res = await httpClient.get<ICart[]>('/cart');
  return res.data;
};

export const deleteCartItem = async (cartId: number) => {
  const res = await httpClient.delete(`/cart/${cartId}`);
  return res.data;
};
