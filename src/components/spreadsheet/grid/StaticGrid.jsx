import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import styled from 'styled-components';
import 'react-table/react-table.css';
import { SectionIcon } from '../../svgIcons/SectionIcon';
import Header from './shared/Header';

const Cell = styled.div`  
  align-items: center;   
  color: #015cda;
  display: flex;
  font-size: 13px;
  font-weight: 600;  
`;

const CellIconHolder = styled.div`  
  display: inline-block;  
  height: 21px;     
  width: 21px;
`;

const CellText = styled.div`  
  display: inline-block;
  margin-left: 10px;  
`;

const renderCell = row => (
  <Cell>
    <CellIconHolder>
      <SectionIcon />
    </CellIconHolder>
    <CellText>{row.value}</CellText>
  </Cell>
);

class StaticGrid extends Component {
  constructor(props) {
    super(props);

    this.onTableFilteredChange = this.onTableFilteredChange.bind(this);
    this.reactTableRef = React.createRef();

    const { page } = this.props;
    this.svgIcon = page.svg.icon;
    this.state = {
      items: page.sections.length,
      filtered: [],
    };
  }

  componentDidUpdate(prevProps) {
    const { page } = this.props;

    if (page.index !== prevProps.page.index) {
      this.svgIcon = page.svg.icon;
      // since this is a conditional check it is okay
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        items: page.sections.length,
        filtered: [],
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
    const { page, sendTrProps, renderNoDataComponent } = this.props;
    const data = page.sections;
    const { columns, ...tableProps } = page.table;
    const gridColumns = columns.map(pageTableColumn => ({ ...pageTableColumn, Cell: (row => renderCell(row)) }));

    return (
      <React.Fragment>
        <Header items={items} />
        <ReactTable
          columns={gridColumns}
          data={data}
          filtered={filtered}
          ref={this.reactTableRef}
          NoDataComponent={() => renderNoDataComponent(this.svgIcon)}
          onFilteredChange={filter => this.onTableFilteredChange(filter)}
          getTrProps={sendTrProps}
          {...tableProps}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(connect(null, null)(StaticGrid));
