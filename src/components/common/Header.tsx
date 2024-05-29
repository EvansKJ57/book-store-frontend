import React from 'react';
import styled from 'styled-components';

const HeaderStyle = styled.header`
  background-color: ${({ theme }) => theme.color};
  h1 {
    color: ${({ theme }) => theme.color.primary};
  }
`;

const Header = () => {
  return (
    <HeaderStyle>
      <h1>book store</h1>
    </HeaderStyle>
  );
};

export default Header;
