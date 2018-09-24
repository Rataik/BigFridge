import React from 'react';
import Header from './shared/Header';
import StaticGrid from './StaticGrid';
import DynamicGrid from './DynamicGrid';
import './shared/grid.css';

const renderRow = (state, rowInfo) => (rowInfo && rowInfo.row && rowInfo.row.name ? { className: 'pageTableRow' } : {});

const Grid = ({ gridType, page }) => {
  const GridToUse = gridType === 'static' ? StaticGrid : DynamicGrid;

  return (
    <React.Fragment>
      <Header />
      <GridToUse page={page} renderRow={renderRow} />
    </React.Fragment>
  );
};

export default Grid;
