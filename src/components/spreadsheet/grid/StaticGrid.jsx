import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import styled from 'styled-components';
import 'react-table/react-table.css';
import { SectionIcon } from '../../svgIcons/SectionIcon';
import Header from './shared/Header/Header';

const CellLink = styled(Link)`  
  display: flex;  
`;

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

class StaticGrid extends Component {
  constructor(props) {
    super(props);

    this.onTableFilteredChange = this.onTableFilteredChange.bind(this);
    this.renderCell = this.renderCell.bind(this);
    this.reactTableRef = React.createRef();

    const { page } = this.props;
    this.page = page;
    this.state = {
      items: this.page.sections.length,
      filtered: [],
    };
  }

  componentDidUpdate(prevProps) {
    const { page } = this.props;
    if (page.index !== prevProps.page.index) {
      this.page = page;

      // since this is a conditional check it is okay
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        items: this.page.sections.length,
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

  renderCell(cell) {
    return (
      <CellLink to={`?page=${this.page.index}&section=${cell.original.index}`}>
        <Cell>
          <CellIconHolder>
            <SectionIcon />
          </CellIconHolder>
          <CellText>{cell.value}</CellText>
        </Cell>
      </CellLink>
    );
  }

  render() {
    const { filtered, items } = this.state;
    const {
      headerHeight, page, sendTrProps, renderNoDataComponent,
    } = this.props;
    const data = page.sections;
    const { columns, ...tableProps } = page.table;
    const gridColumns = columns.map(column => ({ ...column, Cell: (cell => this.renderCell(cell)) }));

    return (
      <React.Fragment>
        <Header height={headerHeight} items={items} />
        <ReactTable
          columns={gridColumns}
          data={data}
          filtered={filtered}
          ref={this.reactTableRef}
          NoDataComponent={() => renderNoDataComponent(this.page.svg.icon)}
          onFilteredChange={filter => this.onTableFilteredChange(filter)}
          getTrProps={sendTrProps}
          {...tableProps}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(connect(null, null)(StaticGrid));
