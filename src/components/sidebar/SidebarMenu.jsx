import * as React from 'react';
import styled from 'styled-components';
import SidebarMenuItem from './SidebarMenuItem';

const Container = styled.div`  
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;  
`;

const MenuList = styled.ul`    
  list-style: none;
  margin: 0;
  padding: 0 0 20px 0;
`;

export const SideBarMenu = ({ isCollapsed, menuItems }) => (
  <Container id="bf_sidebarMenu">
    <MenuList>
      {menuItems.map(menuItem => (
        <SidebarMenuItem
          isCollapsed={isCollapsed}
          key={menuItem.index}
          name={menuItem.name}
          pageIndex={menuItem.index}
          svg={menuItem.svg}
        />))}
    </MenuList>
  </Container>
);

export default SideBarMenu;
