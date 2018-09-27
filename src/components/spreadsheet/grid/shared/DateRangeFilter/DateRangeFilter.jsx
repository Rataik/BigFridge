import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';
import './dateRangeFilter.css';

export const renderDateFilter = props => <DateRangeFilter {...props} />;

export const filterDates = (filter, row) => {
  const rowDate = row[filter.id];
  const onOrAfterFromDate = !filter.value.from || rowDate >= filter.value.from;

  const onOrBeforeToDate = !filter.value.to || rowDate.valueOf() <= filter.value.to.valueOf() + 24 * 60 * 60 * 1000;
  const withinRange = onOrAfterFromDate && onOrBeforeToDate;
  return !filter.value || (filter.value && withinRange);
};

class DateRangeFilter extends React.Component {
  constructor(props) {
    super(props);

    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);

    this.state = {
      from: undefined,
      to: undefined,
    };
  }

  handleFromChange(from) {
    const { onChange } = this.props;
    const { to } = this.state;
    this.setState({ from });
    onChange({ from, to });
  }

  handleToChange(to) {
    const { onChange } = this.props;
    const { from } = this.state;
    this.setState({ to });
    onChange({ from, to });
  }

  render() {
    const { to, from } = this.state;
    const modifiers = { start: from, end: to };

    return (
      <div className="DateRangeFilter" style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
        <DayPickerInput
          clickUnselectsDay
          formatDate={formatDate}
          onDayChange={this.handleFromChange}
          parseDate={parseDate}
          placeholder="Fr: mm/dd/yyyy"
          value={from}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { after: to },
            toMonth: to,
            modifiers,
            numberOfMonths: 1,
          }}
        />
        <DayPickerInput
          clickUnselectsDay
          formatDate={formatDate}
          parseDate={parseDate}
          onDayChange={this.handleToChange}
          placeholder="To: mm/dd/yyyy"
          value={to}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { before: from },
            modifiers,
            month: from,
            fromMonth: from,
            numberOfMonths: 1,
          }}
        />
      </div>
    );
  }
}
