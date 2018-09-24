import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import styled from 'styled-components';
import 'react-table/react-table.css';
import { SectionIcon } from '../svgIcons/SectionIcon';
import './table.css';

const Container = styled.div`
  background-color: #ffffff;   
  box-sizing: border-box;
  height: ${props => props.height}px;
  overflow: hidden;      
  padding: 25px;     
  ${props => (props.isStacked
    ? `box-shadow: 0 0 8px 0 rgba(0,0,0,.14);
      width: 400px;`
    : '')}        
  
  .ReactTable {
    border: none;
  }
  
  .ReactTable .rt-thead.-header {
    box-shadow: none;
    border-bottom: solid 1px rgb(204, 204, 204);
    text-transform: uppercase;
  }
  
  .ReactTable .rt-thead.-filters {
    border: none;
  }  
  
  .ReactTable .rt-thead.-filters input {
    background-color: #ffffff;
    border-color: rgba(127,127,127,.7);  
    border-radius: unset;  
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
    color: #000;
    font-size: 12px;
    height: 23px;
    outline: 0;
    padding: 2px 8px 2px;
    width: 100%;
    
    &::placeholder {            
      font-style: italic;
      opacity:0.8;
    }
  }  
  
  .ReactTable .rt-thead.-header .rt-resizable-header-content {
    color: #000000;
    font-size: 10px;
    font-weight: 700;
    text-align: left;
  }
  
  .ReactTable .rt-tbody .rt-tr-group {
    border: none;
  }
`;

const ItemsContainer = styled.div`
  display: flex;
`;
const ItemsContent = styled.div`
  flex: 0 0 auto;
  font-size: 12px;
  font-weight: 400;
  margin-top: 5px;
  padding-right: 20px;
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

const renderCell = ({ row, column }) => (
  <Cell>
    <CellIconHolder>
      <SectionIcon />
    </CellIconHolder>
    <CellText>{row[column.id]}</CellText>
  </Cell>
);

const renderRow = (state, rowInfo, column ) => {
  return rowInfo && rowInfo.row.name ? {className: 'pageTableRow'} : {};
};

class Page extends Component  {
  constructor(props) {
    super(props);

    this.onTableFilteredChange  = this.onTableFilteredChange.bind(this);
    this.reactTable = React.createRef();

    this.state = {
      items: this.props.page.sections.length,
      filtered: [],
    }
  }

  onTableFilteredChange(filtered) {
    this.setState({ filtered: filtered });

    const { current } = this.reactTable;
    if (current)
    {
      const allData = current.getResolvedState().sortedData;
      const { items } = this.state;
      if (items !== allData.length) {
        this.setState({ items: allData.length });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.page.index !== prevProps.page.index) {
      this.setState({
        items: this.props.page.sections.length,
        filtered: [],
      });
    }
  }

  render () {
    const { items, filtered } = this.state;
    const { height, page, section } = this.props;
    const data = page.sections;
    const columns = page.table.columns.map(pageTableColumn => ({...pageTableColumn, Cell: ((row, column) => renderCell(row, column)) }));

    return (
      <Container height={height} id={`bf_${page.index}Page`} isStacked={section}>
        <ItemsContainer><ItemsContent>{`${items} ${items !== 1 ? 'items' : 'item'}`}</ItemsContent></ItemsContainer>
        <ReactTable
          columns={columns}
          data={data}
          defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
          defaultPageSize={10}
          filterable
          filtered={filtered}
          ref={this.reactTable}
          minRows={10}
          onFilteredChange={(filtered) => this.onTableFilteredChange(filtered)}
          showPagination={false}
          getTrProps={(state, rowInfo, column) => renderRow(state, rowInfo, column)}
        />
      </Container>
    );
  }
}

export default withRouter(connect(null, null)(Page));
