import React from 'react';

export const renderSelectFilter = props => <SelectFilter {...props} />;

export const filterSelect = (filter, row) => {
  if (filter.value === '') {
    return true;
  }
  if (filter.value === 'true') {
    return row[filter.id] === 1;
  }

  return row[filter.id] === 0;
};

const SelectFilter = ({ filter, onChange }) => (
  <select
    id="bf_selectFilter"
    onChange={event => onChange(event.target.value)}
    style={{ width: '100%' }}
    value={filter ? filter.value : 'all'}
  >
    <option value="" defaultValue>Select...</option>
    <option value="true">Yes</option>
    <option value="false">No</option>
  </select>
);
