import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AppName } from '../../constants/constants';

const Container = styled.div`        
  background-color: #1c1c1c;   
  box-shadow: 0 16px 2px -2px rgba(0,0,0,.16);  
  color: #ffffff;   
  height: 40px; 
  width: 100%;  
`;

const TitleLink = styled(Link)`  
  display: flex;
  text-decoration: none;  
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
  line-height: 40px;
  padding-left: 15px;  
`;

const Banner = () => (
  <Container id="bf_banner">
    <TitleLink to="/">
      <Title>{AppName}</Title>
    </TitleLink>
  </Container>
);

export default Banner;
