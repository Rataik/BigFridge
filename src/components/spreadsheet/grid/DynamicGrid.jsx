import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import styled from 'styled-components';
import 'react-table/react-table.css';
import Header from './shared/Header/Header';
import './grid.css';

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

const renderDateTimeCell = cell => (
  <Cell>
    <CellText>{new Date(cell.value).toLocaleString()}</CellText>
  </Cell>
);

const renderCell = cell => (
  <Cell>
    <CellText>{cell.value}</CellText>
  </Cell>
);

const getData = (dateTimeColumns, items) => {
  const dateTimeKeys = dateTimeColumns.join('|').toLowerCase().split('|');
  return items.map((item) => {
    const newItem = {};

    Object.entries(item).forEach(([key, value]) => {
      if (dateTimeKeys.includes(key.toLowerCase())) {
        newItem[key] = new Date(value);
      } else {
        newItem[key] = value;
      }
    });

    return newItem;
  });
};

class DynamicGrid extends Component {
  constructor(props) {
    super(props);

    this.onTableFilteredChange = this.onTableFilteredChange.bind(this);

    this.reactTableRef = React.createRef();

    const { listAssociatedProperties, section } = this.props;
    this.section = section;
    const { columns } = section.table;
    this.dateTimeColumns = columns.filter(column => column.isDateTime).map(column => column.id);

    this.state = {
      filtered: [],
      items: listAssociatedProperties.foodItems.length,
    };
  }

  componentDidUpdate(prevProps) {
    const { section, listAssociatedProperties } = this.props;
    if (listAssociatedProperties.foodItems.length !== prevProps.listAssociatedProperties.foodItems.length) {
      this.section = section;
      const { columns } = section.table;
      this.dateTimeColumns = columns.filter(column => column.isDateTime).map(column => column.id);

      // since this is a conditional check it is okay
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        filtered: [],
        items: listAssociatedProperties.foodItems.length,
      });
    }
  }

  onTableFilteredChange(filtered) {
    this.setState({ filtered });

    const { current } = this.reactTableRef;
    if (current) {
      const allData = current.getResolvedState().sortedData;
      const { items } = this.state;
      if (items !== allData.length) {
        this.setState({ items: allData.length });
      }
    }
  }

  render() {
    const { filtered, items } = this.state;
    const {
      containerHeight, headerHeight, listAssociatedProperties, renderLoadingComponent, renderNoDataComponent, section, sendTableProps, sendTheadFilterThProps, sendTrProps,
    } = this.props;

    const data = getData(this.dateTimeColumns, listAssociatedProperties.foodItems);

    const { columns, ...tableProps } = section.table;
    const gridColumns = columns.map(column => ({ ...column, Cell: (cell => (this.dateTimeColumns.includes(cell.column.id) ? renderDateTimeCell(cell) : renderCell(cell))) }));

    return (
      <React.Fragment>
        <Header height={headerHeight} items={items} />
        <ReactTable
          columns={gridColumns}
          data={data}
          filtered={filtered}
          loading={listAssociatedProperties.isLoading}
          ref={this.reactTableRef}
          LoadingComponent={() => listAssociatedProperties.isLoading && renderLoadingComponent()}
          NoDataComponent={() => !listAssociatedProperties.isLoading && renderNoDataComponent(this.section.svg.icon)}
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

const mapStateToProps = state => ({ listAssociatedProperties: { ...state.bigFridge.listAssociatedProperties } });

export default withRouter(connect(mapStateToProps, null)(DynamicGrid));
