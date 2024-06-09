import { IOrder, IOrderSheet } from '../models/order.model';
import { requestHandler } from './http';

export const order = async (orderData: IOrderSheet) => {
  return await requestHandler('post', '/orders', orderData);
};

export const fetchOrders = async (): Promise<IOrder[]> => {
  return await requestHandler('get', '/orders');
};
