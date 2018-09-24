import React from 'react';
import styled from 'styled-components';

const Container = styled.div`   
  background-color: #ffffff;
  border-bottom-style: solid;
  border-color: rgba(204,204,204,.8);
  border-bottom-width: 1px;  
  box-sizing: border-box;
  color: #000000;
  display: flex;   
  height: ${props => props.height}px;
  overflow: hidden;    
  padding: 0 25px;
`;

const Content = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  width: 100%;
`;

const Title = styled.div`
  display: inline-block;
  font-weight: 600;
  font-size: 18px;
  line-height: 30px;      
`;

const SubTitle = styled.div`
  font-size: 10px;
  line-height: 14px;  
  margin-top: -8px;    
`;

const Header1 = ({ height, subTitle, title }) => {
  return (
    <Container id={`bf_${title}_${subTitle}_header`} height={height}>
      <Content>
        <Title>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
      </Content>
    </Container>
  );
};

export default Header1;