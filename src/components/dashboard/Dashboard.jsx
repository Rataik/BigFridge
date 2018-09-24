import React from 'react';
import styled from 'styled-components';
import Sidebar from '../sidebar/Sidebar';
import Panorama from '../panorama/Panorama';

const Container = styled.div`
  align-items: stretch;
  display: flex;
  flex-basis: auto;
  flex-direction: row;
  flex-grow: 1;
  flex-shrink: 1;
  flex-wrap: nowrap; 
  height: ${props => props.height}px;
  min-height: 0px;
`;

const Shadow = styled.div`   
  background-color: rgba(0, 0, 0, 0);
  background-image: linear-gradient(270deg, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 1) 100%);  
  bottom: 0px;  
  height: ${props => props.height}px;  
  pointer-events: none;  
  width:8px;
`;

const Dashboard = ({
  height, menuItems, page, section,
}) => {
  const dashboardHeight = height - 40;

  return (
    <Container id="bf_dashboard" height={dashboardHeight}>
      <Sidebar height={dashboardHeight} menuItems={menuItems} />
      <Shadow height={dashboardHeight} />
      <Panorama height={dashboardHeight} page={page} section={section} />
    </Container>
  );
};

export default Dashboard;
