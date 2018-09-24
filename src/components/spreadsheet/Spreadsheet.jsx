import React from 'react';
import styled from 'styled-components';
import Grid from './grid/Grid';
import Chart from './chart/Chart';

const Container = styled.div`
  background-color: #ffffff;   
  box-sizing: border-box;
  height: ${props => props.height}px;
  overflow: hidden;      
  padding: 25px;       
`;

const Spreadsheet = ({ height, page, spreadsheetType }) => {
  const SpreadsheetToUse = spreadsheetType === 'grid' ? Grid : Chart;

  return (
    <Container id="bf_spreadsheet" height={height}>
      <SpreadsheetToUse page={page} gridType="static" />
    </Container>
  );
};

export default Spreadsheet;
