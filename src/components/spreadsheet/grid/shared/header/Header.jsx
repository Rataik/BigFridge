import React from 'react';
import styled from 'styled-components';

const ItemsContainer = styled.div`
  display: flex;
  height: ${props => props.height}px;
`;
const ItemsContent = styled.div`
  flex: 0 0 auto;
  font-size: 12px;
  font-weight: 400;  
  margin: 5px 0 2px 0;
  padding-right: 20px;
`;

const Header = ({ items, height }) => (
  <ItemsContainer height={height} id="bf_gridHeader">
    <ItemsContent>{`${items} ${items !== 1 ? 'items' : 'item'}`}</ItemsContent>
  </ItemsContainer>
);

export default Header;
