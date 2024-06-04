import React, { useMemo } from 'react';
import { ICart } from '../../models/cart.model';
import styled from 'styled-components';
import Button from '../common/Button';
import Title from '../common/Title';
import { formatNumber } from '../../utils/format';
import CheckIconBtn from './CheckIconBtn';
import { useAlert } from '../../hooks/useAlert';

interface Props {
  cart: ICart;
  checkedItems: number[];
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
}

const CartItem = ({ cart, checkedItems, onCheck, onDelete }: Props) => {
  const isChecked = useMemo(() => {
    return checkedItems.includes(cart.cartId);
  }, [cart.cartId, checkedItems]);

  const { showConfirm } = useAlert();

  const handleCheck = () => {
    onCheck(cart.cartId);
  };
  const handleDelete = () => {
    showConfirm('정말 삭제하겠습니까?', () => onDelete(cart.cartId));
  };

  return (
    <CartItemStyle>
      <div className="info">
        <div className="check">
          <CheckIconBtn isChecked={isChecked} onCheck={handleCheck} />
        </div>
        <div>
          <Title size="medium" color="text">
            {cart.title}
          </Title>
          <p className="summary">{cart.summary}</p>
          <p className="price">{formatNumber(cart.price)}원</p>
          <p className="qty">{cart.qty}</p>
        </div>
      </div>
      <Button size="medium" scheme="normal" onClick={handleDelete}>
        장바구니 삭제
      </Button>
    </CartItemStyle>
  );
};

const CartItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: 12px;

  .info {
    display: flex;
    align-items: start;

    .check {
      width: 40px;
      flex-shrink: 0;
    }

    p {
      padding: 0 0 8px 0;
      margin: 0;
    }
  }
`;

export default CartItem;
