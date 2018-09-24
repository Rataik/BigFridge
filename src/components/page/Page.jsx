import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import styled from 'styled-components';
import 'react-table/react-table.css';
import { SectionIcon } from '../svgIcons/SectionIcon';
import * as svgIcons from '../svgIcons';
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

const renderCell = row => (
  <Cell>
    <CellIconHolder>
      <SectionIcon />
    </CellIconHolder>
    <CellText>{row.value}</CellText>
  </Cell>
);

const renderRow = (state, rowInfo) => (rowInfo && rowInfo.row && rowInfo.row.name ? { className: 'pageTableRow' } : {});

class Page extends Component {
  constructor(props) {
    super(props);

    this.onTableFilteredChange = this.onTableFilteredChange.bind(this);
    this.renderNoData = this.renderNoData.bind(this);
    this.reactTable = React.createRef();

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
      // since this is conditional check it is okay
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        items: page.sections.length,
        filtered: [],
      });
    }
  }

  onTableFilteredChange(filtered) {
    this.setState({ filtered });

    const { current } = this.reactTable;
    if (current) {
      const allData = current.getResolvedState().sortedData;
      const { items } = this.state;
      if (items !== allData.length) {
        this.setState({ items: allData.length });
      }
    }
  }

  renderNoData() {
    const SvgIcon = svgIcons[this.svgIcon];
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
  }

  render() {
    const { items, filtered } = this.state;
    const { height, page, section } = this.props;
    const data = page.sections;
    const columns = page.table.columns.map(pageTableColumn => ({ ...pageTableColumn, Cell: (row => renderCell(row)) }));

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
          NoDataComponent={this.renderNoData}
          onFilteredChange={filter => this.onTableFilteredChange(filter)}
          showPagination={false}
          getTrProps={(state, rowInfo, column) => renderRow(state, rowInfo, column)}
        />
      </Container>
    );
  }
}

export default withRouter(connect(null, null)(Page));
