import { useEffect, useState } from 'react';
import { IOrder } from '../models/order.model';
import { fetchOrders } from '../api/order.api';

export const useOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  useEffect(() => {
    fetchOrders().then((orders) => {
      setOrders(orders);
    });
  }, []);

  const selectOrderItem = (orderId: number) => {
    if (orders.filter((order) => order.orderId === orderId)) {
      setSelectedItemId(orderId);
    }
  };

  return { orders, selectedItemId, selectOrderItem };
};
