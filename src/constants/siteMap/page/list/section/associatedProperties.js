import matchSorter from 'match-sorter';
import { EndpointPlaceholder } from '../../../../constants';
import { renderInputFilter } from '../../../../../utility/tools';
import {
  filterDates,
  renderDateFilter,
} from '../../../../../components/spreadsheet/grid/shared/dateRangeFilter/DateRangeFilter';
import {
  filterDataInRange,
  renderNumberRangeSliderFilter,
} from '../../../../../components/spreadsheet/grid/shared/numberRangeSliderFilter/NumberRangeSliderFilter';
import { renderSelectFilter, filterSelect } from '../../../../../components/spreadsheet/grid/shared/selectFilter/SelectFilter';

export const Section = {
  order: 0,
  index: 'associatedProperties',
  name: 'Associated Properties',
  fetch: {
    name: 'fetchAssociatedPropertiesData',
    url: {
      base: `https://raw.githubusercontent.com/Rataik/BigFridge/master/data/associatedProperties-${EndpointPlaceholder}.json`,
      // eslint-disable-next-line max-len
      endpoints: ['0', '1', '2', '3', '4', '5'],
    },
    progressBar: {
      maxItems: 3000,
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
      renderText: true,
    }, {
      id: 'type',
      Header: 'Type',
      accessor: row => row.Type,
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['type'] }),
      filterAll: true,
      Filter: renderInputFilter,
      isDateTime: false,
      renderText: true,
    }, {
      id: 'store',
      Header: 'Store',
      accessor: row => row.Store,
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['store'] }),
      filterAll: true,
      Filter: renderInputFilter,
      isDateTime: false,
      renderText: true,
    }, {
      id: 'PurchaseDate',
      Header: 'Purchase Date',
      accessor: row => row.PurchaseDate,
      filterMethod: filterDates,
      filterAll: false,
      Filter: renderDateFilter,
      isDateTime: true,
      renderText: true,
    }, {
      id: 'ExpirationDate',
      Header: 'Expiration Date',
      accessor: row => row.ExpirationDate,
      filterMethod: filterDates,
      filterAll: false,
      Filter: renderDateFilter,
      isDateTime: true,
      renderText: true,
    }, {
      id: 'expired',
      Header: 'Expired',
      accessor: row => row.Expired,
      filterMethod: filterSelect,
      filterAll: false,
      Filter: renderSelectFilter,
      isDateTime: false,
      renderText: false,
      svgIcon: {
        1: 'IsBadIcon',
        0: 'IsGoodIcon',
      },
    }, {
      id: 'quantity',
      Header: 'Quantity',
      accessor: row => row.Quantity,
      filterMethod: filterDataInRange,
      filterAll: false,
      Filter: renderNumberRangeSliderFilter,
      isDateTime: false,
      renderText: true,
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
