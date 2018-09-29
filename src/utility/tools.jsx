import React from 'react';

export const renderInputFilter = ({ column, filter, onChange }) => (
  <input
    onChange={event => onChange(event.target.value)}
    placeholder={`Filter by ${column.Header}...`}
    value={filter ? filter.value : ''}
  />);
