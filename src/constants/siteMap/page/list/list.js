import matchSorter from 'match-sorter';
import { renderInputFilter } from '../../../../utility/tools';
import { Section as associatedProperties } from './section/associatedProperties';

const pageSection = [associatedProperties];
const pageSections = pageSection.sort((ps1, ps2) => ps1.order - ps2.order);

export const Page = {
  order: 20,
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
  sections: pageSections,
};
