import React from 'react';
import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa';
import styled from 'styled-components';

interface Props {
  isChecked: boolean;
  onCheck: () => void;
}

const CheckIconBtn = ({ isChecked, onCheck }: Props) => {
  return (
    <CheckIconStyle onClick={onCheck}>
      {isChecked ? <FaRegCheckCircle /> : <FaRegCircle />}
    </CheckIconStyle>
  );
};

const CheckIconStyle = styled.button`
  background: none;
  border: 0;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export default CheckIconBtn;
