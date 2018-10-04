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
      endpoints: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'],
    },
    delay: 500,
    pauseName: 'pauseFetchAssociatedPropertiesData',
    progressBar: {
      maxItems: 50000,
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
