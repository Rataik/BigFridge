import React from 'react';
import styled from 'styled-components';

const ItemsContainer = styled.div`
  display: flex;
`;
const ItemsContent = styled.div`
  flex: 0 0 auto;
  font-size: 12px;
  font-weight: 400;
  margin-top: 5px;
  padding-right: 20px;
`;

const Header = ({ children }) => {
  return (
    <ItemsContainer>
      <ItemsContent>{children}</ItemsContent>
    </ItemsContainer>
  );
};

export default Header;
