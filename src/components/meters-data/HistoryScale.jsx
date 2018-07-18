import React from 'react';
import PropTypes from 'prop-types';

import Value from './Value';

function MonthValue({ value, unit }) {
  MonthValue.propTypes = {
    value: PropTypes.number,
    unit: PropTypes.string,
  };

  return (
    <div className="value">
      <Value value={value} unit={unit} />
    </div>
  );
}

function Month({ month }) {
  Month.propTypes = {
    month: PropTypes.object,
  };

  return (
    <div className="column">
      <div className="month">{month.label}</div>
      {month.values.map((val, i) => {
        const key = `${i}-${month.label}`;

        return (
          <MonthValue value={val} unit={month.unit} key={key} />
        );
      })}
    </div>
  );
}

export default function HistoryScale({ values }) {
  HistoryScale.defaultProps = {
    showLabel: true,
    values: [],
  };

  HistoryScale.propTypes = {
    values: PropTypes.array,
  };

  return (
    <div className="table_container">
      {values.map(month => <Month month={month} key={month.label} />)}
    </div>
  );
}
