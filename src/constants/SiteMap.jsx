import matchSorter from 'match-sorter';
import React from 'react';
// import ReactTableFilters from 'react-table-filters';
import { EndpointPlaceholder } from './constants';
import { filterDates, renderDateFilter } from '../components/spreadsheet/grid/shared/DateRangeFilter/DateRangeFilter';
import { renderNumberRangeSliderFilter, filterDataInRange } from '../components/spreadsheet/grid/shared/numberRangeSliderFilter/NumberRangeSliderFilter';

const renderInputFilter = ({ column, filter, onChange }) => (
  <input
    onChange={event => onChange(event.target.value)}
    placeholder={`Filter by ${column.Header}...`}
    value={filter ? filter.value : ''}
  />);

export const HomepageName = 'Home';
export const HomepageIndex = 'home';

const Pages = [{
  isHome: true,
  index: HomepageIndex,
  name: HomepageName,
  svg: {
    icon: 'HomeIcon',
  },
  tiles: [{
    left: '0',
    top: '0',
    height: '175',
    width: '400',
    title: 'Stay Healthy!',
    content: {
      text: 'This fridge is tooo big! Help the eater avoid foodborne illness by giving them a better idea of what\'s inside.',
      isLink: false,
      Link: '',
    },
    svg: {
      icon: 'StayHealthyIcon',
    },
  }, {
    left: '405',
    top: '0',
    height: '175',
    width: '175',
    title: 'Click Me',
    content: {
      isLink: true,
      Link: 'https://github.com/Rataik/BigFridge',
    },
  }, {
    left: '180',
    top: '180',
    height: '175',
    width: '400',
    title: '24 hours to organize the BigFridge',
    content: {
      text: '',
      isLink: false,
      Link: '',
    },
    svg: {
      icon: 'ClockIcon',
    },
  }],
},
{
  isHome: false,
  index: 'quantity',
  name: 'Quantity',
  svg: {
    icon: 'QuantityIcon',
  },
  table: {
    columns: [{
      id: 'name',
      Header: 'name',
      accessor: row => row.name,
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['name'] }),
      filterAll: true,
      Filter: renderInputFilter,
      isDateTime: false,
    }],
    defaultPageSize: 10,
    filterable: true,
    minRows: 10,
    showPagination: false,
  },
  sections: [
    {
      index: 'byMonthPurchasedBucketedByFood',
      name: 'By Month Purchased Bucketed By Food',
      fetch: {
        name: 'fetchByMonthPurchasedBucketedByFoodData',
        url: {
          base: `https://raw.githubusercontent.com/Rataik/BigFridge/master/data/${EndpointPlaceholder}.json`,
          endpoints: ['byMonthPurchasedBucketedByFoodName'],
        },
      },
      display: 'chart',
      reducerName: 'quantityByMonthPurchasedBucketedByFood',
      svg: {
        icon: 'SectionIcon',
      },
    },
    {
      index: 'byPurchasedAfterExpirationBucketedByFood',
      name: 'By Purchased After Expiration Bucketed By Food',
      fetch: {
        name: 'fetchByPurchasedAfterExpirationBucketedByFoodData',
        url: {
          base: `https://raw.githubusercontent.com/Rataik/BigFridge/master/data/${EndpointPlaceholder}.json`,
          endpoints: ['purchasedAfterExpirationBucketedByFood'],
        },
      },
      display: 'chart',
      reducerName: 'quantityByPurchasedAfterExpirationBucketedByFood',
      svg: {
        icon: 'SectionIcon',
      },
    },
  ],
},
{
  isHome: false,
  index: 'list',
  name: 'List',
  svg: {
    icon: 'ListIcon',
  },
  table: {
    columns: [{
      id: 'name',
      Header: 'name',
      accessor: row => row.name,
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['name'] }),
      filterAll: true,
      Filter: renderInputFilter,
      isDateTime: false,
    }],
    defaultPageSize: 10,
    filterable: true,
    minRows: 10,
    showPagination: false,
  },
  sections: [
    {
      index: 'associatedProperties',
      name: 'Associated Properties',
      fetch: {
        name: 'fetchAssociatedPropertiesData',
        url: {
          base: `https://raw.githubusercontent.com/Rataik/BigFridge/master/data/associatedProperties-${EndpointPlaceholder}.json`,
          endpoints: ['0'],
        },
      },
      reducerName: 'listAssociatedProperties',
      svg: {
        icon: 'SectionIcon',
      },
      table: {
        columns: [{
          id: 'name',
          Header: 'Name',
          accessor: row => row.Name,
          filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['name'] }),
          filterAll: true,
          Filter: renderInputFilter,
          isDateTime: false,
        }, {
          id: 'type',
          Header: 'Type',
          accessor: row => row.Type,
          filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['type'] }),
          filterAll: true,
          Filter: renderInputFilter,
          isDateTime: false,
        }, {
          id: 'store',
          Header: 'Store',
          accessor: row => row.Store,
          filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['store'] }),
          filterAll: true,
          Filter: renderInputFilter,
          isDateTime: false,
        }, {
          id: 'purchaseDate',
          Header: 'Purchase Date',
          accessor: row => row.PurchaseDate,
          filterMethod: filterDates,
          filterAll: false,
          Filter: renderDateFilter,
          isDateTime: true,
        }, {
          id: 'expirationDate',
          Header: 'Expiration Date',
          accessor: row => row.ExpirationDate,
          filterMethod: filterDates,
          filterAll: false,
          Filter: renderDateFilter,
          isDateTime: true,
        }, {
          id: 'quantity',
          Header: 'Quantity',
          accessor: row => row.Quantity,
          filterMethod: filterDataInRange,
          filterAll: false,
          Filter: renderNumberRangeSliderFilter,
          isDateTime: false,
        }],
        defaultFilterMethod: (filter, rows) => {
          const { id } = filter;
          return rows.filter(row => row[id].toLowerCase().startsWith(filter.value.toLowerCase()));
        },
        defaultPageSize: 50,
        filterable: true,
        maxWidth: '100px',
        minRows: 50,
        pageSizeOptions: [50, 100, 500],
        showPagination: true,
      },
    },
  ],
}];


export default Pages;
