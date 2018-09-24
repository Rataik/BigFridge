import * as React from 'react';
import styled from 'styled-components';
import DoubleChevronIcon from '../svgIcons/DoubleChevronIcon';
import { SidebarButton } from './sidebarStyled';

const Container = styled.div`
  display: block;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
`;

const ExpandCollapseButton = styled(SidebarButton)`  
  justify-content: flex-end;
`;

const SvgChevronIconHolder = styled.div`  
  width: 8px;  
  height: 15px;
  transform: ${props => (props.isCollapsed ? 'rotate(90deg)' : 'rotate(-90deg)')};
`;

const SidebarTop = ({ isCollapsed, onExpandCollapse }) => (
  <Container id="bf_sidebarTop">
    <ExpandCollapseButton onClick={onExpandCollapse}>
      <SvgChevronIconHolder isCollapsed={isCollapsed}>
        <DoubleChevronIcon fill="#ffffff" />
      </SvgChevronIconHolder>
    </ExpandCollapseButton>
  </Container>
);

export default SidebarTop;
