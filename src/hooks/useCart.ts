import { useEffect, useState } from 'react';
import { ICart } from '../models/cart.model';
import { deleteCartItem, fetchCart } from '../api/carts.api';

export const useCart = () => {
  const [carts, setCarts] = useState<ICart[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);

  const deleteCart = (id: number) => {
    deleteCartItem(id).then(() => {
      const updatedCarts = carts.filter((cart) => cart.cartId !== id);
      setCarts(updatedCarts);
    });
  };

  useEffect(() => {
    fetchCart().then((data) => {
      setCarts(data);
      setIsEmpty(data.length === 0);
    });
  }, []);

  return { carts, isEmpty, deleteCart };
};
