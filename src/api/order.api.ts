import { IOrder, IOrderSheet } from '../models/order.model';
import { httpClient } from './http';

export const order = async (orderData: IOrderSheet) => {
  const res = await httpClient.post('/orders', orderData);
  return res.data;
};

export const fetchOrders = async () => {
  const res = await httpClient.get<IOrder[]>('/orders');
  return res.data;
};
