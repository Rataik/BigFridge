import React from 'react';
import styled from 'styled-components';
import Grid from './grid/Grid';
import Chart from './chart/Chart';

const padding = 50;
const Container = styled.div`
  background-color: #ffffff;   
  box-sizing: border-box;
  height: ${props => props.height}px;   
  padding: ${padding / 2}px;      
  overflow: hidden;
`;

const Spreadsheet = ({
  height, page, section,
}) => {
  let SpreadsheetToUse = Grid;
  SpreadsheetToUse = section && section.chart ? Chart : Grid;

  return (
    <Container id="bf_spreadsheet" height={height}>
      <SpreadsheetToUse height={height - padding} page={page} section={section} />
    </Container>
  );
};

export default Spreadsheet;
