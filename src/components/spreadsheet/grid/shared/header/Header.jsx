import React from 'react';
import { Circle } from 'rc-progress';
import styled from 'styled-components';
import 'rc-progress/assets/index.css';
import { PauseIcon } from '../../../../svgIcons/PauseIcon';
import { StartIcon } from '../../../../svgIcons/StartIcon';

const Container = styled.div`  
  align-items: center;   
  display: flex;
  height: ${props => props.height}px;  
`;

export const ProgressButton = styled.button` 
  align-items: center; 
  background-color: initial;
  border: 0;
  border-radius: 50%;  
  color: inherit;  
  cursor: pointer;
  
  flex: 0 0 auto;    
  height: ${props => props.height}px;  
  margin-right: 10px;
  padding: 0;
  position: relative;  
  width: ${props => props.height}px;  
  
  &:hover {
    background-color: rgba(166, 255, 71, 0.2);
  }
  
  &:disabled {
    background-color: rgba(93, 179, 0, 0.4);
    cursor: default;
    opacity: 0.3;
  }
`;

const Icon = styled.div`  
  display: inline-block;     
  height: 7px;        
  left: ${props => (props.headerHeight - 7) / 2}px
  position: absolute;
  top: ${props => (props.headerHeight - 7) / 2}px  
  width: 7px;    
`;

const Items = styled.div`
  flex: 0 0 auto;
  font-size: 12px;
  font-weight: 400;    
  margin-right: 10px;
`;

const Header = ({
  items, height, onClick, progressBar, pause,
}) => {
  let progress = null;

  if (progressBar) {
    const progressPercent = 100 * (progressBar.now / progressBar.maxItems);
    const color = progressPercent === 100 ? 'rgba(93, 179, 0, 0.9)' : '#5db300';
    progress = (
      <ProgressButton height={height} onClick={onClick} disabled={progressPercent === 100}>
        <Circle
          percent={progressPercent}
          strokeWidth="10"
          strokeColor={color}
          strokeLinecap="butt"
          trailWidth="0"
        />
        <Icon headerHeight={height} progressPercent={progressPercent}>
          {pause ? <StartIcon fill={color} />
            : <PauseIcon fill={color} />}
        </Icon>
      </ProgressButton>
    );
  }

  return (
    <Container height={height} id="bf_gridHeader">
      {progress}
      <Items lineHeight={height}>{`${items} ${items !== 1 ? 'items' : 'item'}`}</Items>
    </Container>
  );
};

export default Header;
