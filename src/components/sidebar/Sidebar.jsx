import React, { Component } from 'react';
import styled from 'styled-components';
import SidebarTop from './SidebarTop';
import SidebarDivider from './SidebarDivider';
import SidebarMenu from './SidebarMenu';

const Container = styled.div`
  background-color: rgb(50, 49, 48);
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  font-size: 13px;
  font-weight: 400;
  height: ${props => props.height}px;  
  overflow: hidden;  
  transition: all 500ms ease-in-out;
  width: 200px;
  z-index: 3;  
`;

class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      isCollapsed: false,
    };

    this.onExpandCollapse = this.onExpandCollapse.bind(this);
    this.sidebarMenuRef = React.createRef();
  }

  onExpandCollapse() {
    if (this.sidebarMenuRef.current) {
      const { isCollapsed } = this.state;

      if (isCollapsed) {
        // apply styles to expand the sidebar container
        this.sidebarMenuRef.current.style.width = '200px';
      } else {
        // apply styles to collapse the sidebar container
        this.sidebarMenuRef.current.style.width = '50px';
      }

      this.setState({ isCollapsed: !isCollapsed });
    }
  }

  render() {
    const { isCollapsed } = this.state;
    const { height, menuItems } = this.props;

    return (
      <Container id="bf_sidebar" innerRef={this.sidebarMenuRef} height={height}>
        <SidebarTop isCollapsed={isCollapsed} onExpandCollapse={this.onExpandCollapse} />
        <SidebarDivider isCollapsed={isCollapsed} />
        <SidebarMenu isCollapsed={isCollapsed} menuItems={menuItems} />
      </Container>
    );
  }
}

export default Sidebar;
