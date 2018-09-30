import React from 'react';
import { Circle } from 'rc-progress';
import styled from 'styled-components';
import 'rc-progress/assets/index.css';

const ItemsContainer = styled.div`
  display: flex;
  height: ${props => props.height}px;
`;
const ItemsContent = styled.div`
  flex: 0 0 auto;
  font-size: 12px;
  font-weight: 400;
  line-height: ${props => props.lineHeight}px;
  margin-left: 10px;  
`;

const ProgressbarContainer = styled.div`   
  display: inline-block;    
  position: relative;
  width: ${props => props.width}px;
`;

const Header = ({ items, height, progressBar }) => (
  <ItemsContainer height={height} id="bf_gridHeader">
    {progressBar
    && (
    <ProgressbarContainer width={height}>
      <Circle percent={100 * (progressBar.now / progressBar.maxItems)} strokeWidth="15" strokeColor="#015cda" strokeLinecap="square" />
    </ProgressbarContainer>)}
    <ItemsContent lineHeight={height}>{`${items} ${items !== 1 ? 'items' : 'item'}`}</ItemsContent>
  </ItemsContainer>
);

export default Header;
