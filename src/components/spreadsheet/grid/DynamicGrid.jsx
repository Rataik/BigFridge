import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import styled from 'styled-components';
import 'react-table/react-table.css';
import Header from './shared/header/Header';
import * as svgIcons from '../../svgIcons';
import { CellIconHolder } from './gridStyled';

const Cell = styled.div`  
  align-items: center;   
  color: #015cda;
  display: flex;
  font-size: 13px;
  font-weight: 600;  
`;

const CellText = styled.div`  
  display: inline-block;
  margin-left: 10px;  
`;

const renderCell = (cell) => {
  let text = null;
  if (cell.column.renderText) {
    text = <CellText>{cell.column.isDateTime ? new Date(cell.value).toLocaleString() : cell.value}</CellText>;
  }

  let icon = null;
  if (cell.column.svgIcon) {
    const SvgIcon = svgIcons[cell.column.svgIcon[cell.value]];
    icon = <CellIconHolder center={!text}><SvgIcon /></CellIconHolder>;
  }

  return (
    <Cell>
      {icon}
      {text}
    </Cell>
  );
};

class DynamicGrid extends Component {
  constructor(props) {
    super(props);

    this.onTableFilteredChange = this.onTableFilteredChange.bind(this);
    this.getFilteredItems = this.getFilteredItems.bind(this);

    this.isTableFiltered = false;
    this.reactTableRef = React.createRef();

    const { section } = this.props;
    this.section = section;

    this.state = {
      filtered: [],
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { filtered } = this.state;
    const { section, dynamicGridData } = this.props;
    return section.index !== nextProps.section.index
      || dynamicGridData.foodItems.length !== nextProps.dynamicGridData.foodItems.length
      || dynamicGridData.isLoading !== nextProps.dynamicGridData.isLoading
      || filtered !== nextState.filtered;
  }

  componentDidUpdate(prevProps) {
    const { section } = this.props;
    if (section !== prevProps.section) {
      this.isTableFiltered = false;
      this.section = section;

      // since this is a conditional check it is okay
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        filtered: [],
      });
    }
  }

  onTableFilteredChange(filtered) {
    this.isTableFiltered = true;
    this.setState({ filtered });
  }

  getFilteredItems() {
    if (this.isTableFiltered) {
      const { current } = this.reactTableRef;
      if (current) {
        return current.getResolvedState().sortedData.length;
      }
    }

    const { dynamicGridData } = this.props;
    return dynamicGridData.foodItems.length;
  }

  render() {
    const { filtered } = this.state;
    const {
      containerHeight, headerHeight, dynamicGridData, renderLoadingComponent, renderNoDataComponent, section, sendTableProps, sendTheadFilterThProps, sendTrProps,
    } = this.props;

    const { columns, ...tableProps } = section.table;
    const gridColumns = columns.map(column => ({ ...column, Cell: renderCell }));

    return (
      <React.Fragment>
        <Header height={headerHeight} items={this.getFilteredItems()} />
        <ReactTable
          columns={gridColumns}
          data={dynamicGridData.foodItems}
          filtered={filtered}
          loading={dynamicGridData.isLoading}
          ref={this.reactTableRef}
          LoadingComponent={() => dynamicGridData.isLoading && renderLoadingComponent()}
          NoDataComponent={() => !dynamicGridData.isLoading && renderNoDataComponent(this.section.svg.icon)}
          onFilteredChange={filter => this.onTableFilteredChange(filter)}
          getTableProps={() => sendTableProps(containerHeight)}
          getTheadFilterThProps={sendTheadFilterThProps}
          getTrProps={sendTrProps}
          {...tableProps}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ dynamicGridData: state.bigFridge[ownProps.section.reducerName] });

export default withRouter(connect(mapStateToProps, null)(DynamicGrid));
