import matchSorter from 'match-sorter';
import { EndpointPlaceholder } from '../../../../constants';
import { renderInputFilter } from '../../../../../utility/tools';
import {
  filterDates,
  renderDateFilter,
} from '../../../../../components/spreadsheet/grid/shared/DateRangeFilter/DateRangeFilter';
import {
  filterDataInRange,
  renderNumberRangeSliderFilter,
} from '../../../../../components/spreadsheet/grid/shared/numberRangeSliderFilter/NumberRangeSliderFilter';

export const Section = {
  order: 0,
  index: 'associatedProperties',
  name: 'Associated Properties',
  fetch: {
    name: 'fetchAssociatedPropertiesData',
    url: {
      base: `https://raw.githubusercontent.com/Rataik/BigFridge/master/data/associatedProperties-${EndpointPlaceholder}.json`,
      // eslint-disable-next-line max-len
      endpoints: ['0', '1'],
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
      id: 'PurchaseDate',
      Header: 'Purchase Date',
      accessor: row => row.PurchaseDate,
      filterMethod: filterDates,
      filterAll: false,
      Filter: renderDateFilter,
      isDateTime: true,
    }, {
      id: 'ExpirationDate',
      Header: 'Expiration Date',
      accessor: row => row.ExpirationDate,
      filterMethod: filterDates,
      filterAll: false,
      Filter: renderDateFilter,
      isDateTime: true,
    }, {
      id: 'expired',
      Header: 'Expired',
      accessor: row => row.Expired,
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['expired'] }),
      filterAll: true,
      Filter: renderInputFilter,
      isDateTime: false,
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
};
