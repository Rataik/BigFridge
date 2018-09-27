import React from 'react';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

export const renderNumberRangeSliderFilter = props => <NumberRangeSliderFilter {...props} />;

export const filterDataInRange = (filter, row) => row[filter.id] > filter.value[0] && row[filter.id] < filter.value[1];

const NumberRangeSliderFilter = (props) => {
  const { filter, onChange } = props;
  const min = 0;
  const max = 20;
  const value = (filter && filter.value) || [min, max];
  const marks = {
    [min]: value[0],
    [max]: value[1],
  };

  return (
    <div style={{ padding: '0 5px' }}>
      <Slider.Range
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        trackStyle={[{ backgroundColor: '#a7a69d' }]}
        handleStyle={[{ borderColor: '#a7a69d' }, { borderColor: '#a7a69d' }]}
        marks={marks}
      />
    </div>
  );
};

export default NumberRangeSliderFilter;
