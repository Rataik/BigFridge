import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as svgIcons from '../svgIcons';
import { SidebarButton } from './sidebarStyled';

const Container = styled.li`    
`;

const MenuItemLink = styled(Link)`  
  display: flex;  
`;

const MenuItemIconHolder = styled.div`  
  height: 18px;     
  width: 18px;
`;

const MenuItemText = styled.div`  
  margin: 0 0 0 6px;
`;

const SidebarMenuItem = ({
  isCollapsed, isSelected, name, pageIndex, svg,
}) => {
  const SvgIcon = svgIcons[svg.icon];

  return (
    <Container>
      <MenuItemLink to={`?page=${pageIndex}`}>
        <SidebarButton>
          <MenuItemIconHolder><SvgIcon /></MenuItemIconHolder>
          {!isCollapsed && <MenuItemText isSelected={isSelected}>{name}</MenuItemText>}
        </SidebarButton>
      </MenuItemLink>
    </Container>
  );
};

export default SidebarMenuItem;
