import React from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  box-sizing: border-box;
  background: rgba(255,255,255,0.8);
  bottom: 0;
  display: block;
  left: 0;  
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  transition: all .3s ease;    
`;

const Dots = styled.div`
  color: rgba(0,0,0,0.6);    
  display: block;
  font-size: 15px;
  left: 0;
  position: absolute;
  text-align: center;
  top: 50%;
  transform: translateY(-52%);   
  transition: all .3s cubic-bezier(.25,.46,.45,.94);
  width: 100%;  
`;

const Fade = keyframes`
  17% {
    opacity:1;
  }
  25% {
    opacity:0;
  }
  92% {
    opacity:0;
  }
`;

const ProgressDots = styled.div` 
  animation: ${Fade} 1.8s infinite;  
  background-color: #3471ff;
  border-radius: 5px;
  display: inline-block;
  height: 10px;
  line-height: 0;
  margin: 0 5px;  
  position: relative;
  text-align: center;
  width: 10px;    
  
  &:after {    
    animation: fxs-progress-animatedEllipsesShadow 1.8s infinite;
    border-radius: 5px;
    box-shadow: 0 3px 3px 0 #0078d4;
    content: '';
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;    
    width: 100%;
  }
  
  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 0.25s;
  }
  &:nth-child(3) {
    animation-delay: 0.5s;
  }
`;

const Loading = () => (
  <Container id="bf_gridLoading">
    <Dots>
      <ProgressDots />
      <ProgressDots />
      <ProgressDots />
    </Dots>
  </Container>
);

export default Loading;