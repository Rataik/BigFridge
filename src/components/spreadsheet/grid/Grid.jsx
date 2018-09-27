import React from 'react';
import StaticGrid from './StaticGrid';
import DynamicGrid from './DynamicGrid';
import './grid.css';
import NoData from './shared/NoData/NoData';
import Loading from './shared/Loading/Loading';

const HeaderHeight = 24;
const FooterHeight = 0;

const sendTableProps = height => ({ style: { height: `${height}px` } });

const sendTheadFilterThProps = () => ({ style: { overflow: 'inherit', position: 'inherit', zIndex: '5' } });

const sendTrProps = (state, rowInfo) => (rowInfo && rowInfo.row && rowInfo.row.name ? { className: 'pageTableRow' } : {});

const renderNoDataComponent = svgIconName => <NoData svgIconName={svgIconName} />;

const renderLoadingComponent = () => <Loading />;

const Grid = ({
  height, page, section,
}) => {
  const GridToUse = section ? DynamicGrid : StaticGrid;

  return (
    <React.Fragment>
      <GridToUse
        containerHeight={height - HeaderHeight - FooterHeight}
        headerHeight={HeaderHeight}
        page={page}
        renderLoadingComponent={renderLoadingComponent}
        renderNoDataComponent={renderNoDataComponent}
        section={section}
        sendTableProps={sendTableProps}
        sendTheadFilterThProps={sendTheadFilterThProps}
        sendTrProps={sendTrProps}
      />
    </React.Fragment>
  );
};

export default Grid;
