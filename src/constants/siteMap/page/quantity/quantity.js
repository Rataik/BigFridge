import matchSorter from 'match-sorter';
import { renderInputFilter } from '../../../../utility/tools';
import { Section as byPurchasedAfterExpirationBucketedByFood } from './section/byPurchasedAfterExpirationBucketedByFood';
import { Section as byMonthPurchasedBucketedByFood } from './section/byMonthPurchasedBucketedByFood';

const pageSection = [byPurchasedAfterExpirationBucketedByFood, byMonthPurchasedBucketedByFood];
const pageSections = pageSection.sort((ps1, ps2) => ps1.order - ps2.order);

export const Page = {
  order: 10,
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
  sections: pageSections,
};
