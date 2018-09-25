import React from 'react';
import styled from 'styled-components';
import StaticGrid from './StaticGrid';
import DynamicGrid from './DynamicGrid';
import './shared/grid.css';
import * as svgIcons from '../../svgIcons';

const NoDataContainer = styled.div`
  background: rgba(255,255,255,0.8);
  color: rgba(0,0,0,0.5);
  display: flex;     
  flex-direction: column; 
  left: 50%;
  padding: 20px; 
  position: absolute;
  top: 50%;    
  transform: translate(-50%,-50%);   
  transition: all .3s ease;
  z-index: 1; 
`;

const NoDataIconHolder = styled.div` 
  filter: grayscale(100%);
  height: 160px;
  opacity: 0.5;   
  margin: auto;
  padding: 20px 0; 
  width: 100px;
`;

const NoDataTitle = styled.div`
  font-size: 15px;
  margin-bottom: 12.5px;
  text-align: center;
`;

const NoDataInfo = styled.div`      
  font-size: 12px;
  padding-bottom: 15px;
  text-align: center;
`;

const NoDataInfoLink = styled.a`
  color: #015cda;
`;

const sendTrProps = (state, rowInfo) => (rowInfo && rowInfo.row && rowInfo.row.name ? { className: 'pageTableRow' } : {});

const renderNoDataComponent = (svgIconName) => {
  const SvgIcon = svgIcons[svgIconName];
  const title = 'No data to display';
  const info = 'Try changing your filters if you don\'t see what you\'re looking for.';
  const link = 'https://www.npmjs.com/package/match-sorter';
  const linkText = 'Learn more.';

  return ([
    <NoDataContainer key="bf_noData">
      <NoDataIconHolder>
        <SvgIcon />
      </NoDataIconHolder>
      <NoDataTitle>{title}</NoDataTitle>
      <NoDataInfo>
        <span>
          {info}
          <NoDataInfoLink href={link}>{linkText}</NoDataInfoLink>
        </span>
      </NoDataInfo>
    </NoDataContainer>,
  ]);
};

const Grid = ({
  page, section,
}) => {
  const GridToUse = section ? DynamicGrid : StaticGrid;

  return (
    <React.Fragment>
      <GridToUse page={page} sendTrProps={sendTrProps} renderNoDataComponent={renderNoDataComponent} />
    </React.Fragment>
  );
};

export default Grid;
