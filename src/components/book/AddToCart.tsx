import React, { useState } from 'react';
import styled from 'styled-components';
import { IBookDetail } from '../../models/book.model';
import InputText from '../common/InputText';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import { useBook } from '../../hooks/useBook';

interface Props {
  book: IBookDetail;
}
const AddToCart = ({ book }: Props) => {
  const [qty, setQty] = useState(1);
  const { addToCart, cartAdded } = useBook(book.id.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQty(Number(e.target.value));
  };

  const handleIncrease = () => {
    setQty(qty + 1);
  };

  const handleDecrease = () => {
    if (qty === 1) return;
    setQty(qty - 1);
  };

  return (
    <AddToCartStyle $added={cartAdded}>
      <div>
        <InputText inputType="number" value={qty} onChange={handleChange} />
        <Button size="medium" scheme="normal" onClick={handleIncrease}>
          +
        </Button>
        <Button size="medium" scheme="normal" onClick={handleDecrease}>
          -
        </Button>
      </div>
      <Button size="medium" scheme="primary" onClick={() => addToCart(qty)}>
        장바구니 담기
      </Button>

      <div className="added">
        <p>장바구니에 추가되었습니다.</p>
        <Link to="/cart">장바구니로 이동</Link>
      </div>
    </AddToCartStyle>
  );
};

interface AddToCartStyleProps {
  $added: boolean;
}

const AddToCartStyle = styled.div<AddToCartStyleProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .added {
    position: absolute;
    right: 0;
    bottom: -90px;
    background: ${({ theme }) => theme.color.background};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    transition: all 0.5s ease;
    opacity: ${({ $added }) => ($added ? '1' : '0')};
    padding: 8px 12px;
    p {
      padding: 0 0 8px 0;
      margin: 0;
    }
  }
`;

export default AddToCart;
