import React from 'react';
import ReactTable from "react-table";
import styled from 'styled-components';
import 'react-table/react-table.css';
import SectionIcon from '../svgIcons/SectionIcon';

const Container = styled.div`
  background-color: #ffffff;  
  flex: 1 1 auto;          
  overflow: hidden;      
  padding: 0 25px;    
`;

const Section = ({ }) => {
  return (
    <Container>
      <h1>{'section'}</h1>
    </Container>
  );
};

export default Section;