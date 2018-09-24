import * as React from 'react';
import styled from 'styled-components';
import DashboardIcon from '../svgIcons/DashboardIcon';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
  height: 32px;
`;

const Divider = styled.div`
  border-bottom-color: rgb(96, 94, 92);
  border-bottom-style: solid;
  border-bottom-width: 1px;  
  flex-basis: 0px;
  flex-grow: 1;
  flex-shrink: 1;
  margin: ${props => (props.isRight ? '0 5px 0 0;' : '0 0 0 5px')};
`;

const DividerIconHolder = styled.div`
  width: 18px;
  height: 18px;
`;

const DividerText = styled.span`
  color: rgb(255, 255, 255);
  font-size: 10px;
  font-weight: 700; 
  margin-left: 10px;
  text-transform: uppercase;  
  word-break: keep-all;
`;

const DividerTitle = 'dashboard';

const SidebarDivider = ({ isCollapsed }) => (
  <Container id="bf_sidebarDivider">
    <Divider isRight />
    <DividerIconHolder>
      <DashboardIcon fillPath1="#3999C6" fillPath2="#ffffff" />
    </DividerIconHolder>
    {!isCollapsed && <DividerText>{DividerTitle}</DividerText>}
    <Divider />
  </Container>
);

export default SidebarDivider;
