import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import Title from '../components/common/Title';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../hooks/useCart';
import Empty from '../components/common/Empty';
import { FaShoppingCart } from 'react-icons/fa';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';
import { useAlert } from '../hooks/useAlert';
import { IOrderSheet } from '../models/order.model';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { carts, deleteCart, isEmpty } = useCart();
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const { showAlert, showConfirm } = useAlert();

  const handleCheckItem = (id: number) => {
    if (checkedItems.includes(id)) {
      const filteredCartId = checkedItems.filter((CartId) => CartId !== id);
      setCheckedItems(filteredCartId);
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  const handleCartDelete = (id: number) => {
    deleteCart(id);
  };

  const totalQty = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.cartId)) {
        return acc + cart.qty;
      }
      return acc;
    }, 0);
  }, [carts, checkedItems]);

  const totalPrice = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.cartId)) {
        return acc + cart.price * cart.qty;
      }
      return acc;
    }, 0);
  }, [carts, checkedItems]);

  const handleOrder = () => {
    if (checkedItems.length === 0) {
      showAlert('주문할 상품을 선택해 주세요.');
      return;
    } else {
      const orderData: Omit<IOrderSheet, 'delivery'> = {
        items: checkedItems,
        totalPrice,
        totalQty,
        firstBookTitle: carts[0].title,
      };
      showConfirm('주문하시겠습니까?', () =>
        navigate('/order', { state: orderData })
      );
    }
  };

  return (
    <>
      <Title size="large">장바구니</Title>
      <CartStyle>
        {!isEmpty && (
          <>
            <div className="content">
              {carts?.map((cart) => (
                <CartItem
                  cart={cart}
                  onCheck={handleCheckItem}
                  onDelete={handleCartDelete}
                  key={cart.cartId}
                  checkedItems={checkedItems}
                />
              ))}
            </div>
            <div className="summary">
              <CartSummary totalPrice={totalPrice} totalQty={totalQty} />
              <Button size="large" scheme="primary" onClick={handleOrder}>
                주문하기
              </Button>
            </div>
          </>
        )}
        {isEmpty && (
          <Empty
            title="장바구니가 비었습니다."
            icon={<FaShoppingCart />}
            description={<p>장바구니를 채워보세요.</p>}
          />
        )}
      </CartStyle>
    </>
  );
};

const CartStyle = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding: 24px 0 0 0;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

export default Cart;
