import React from 'react';
import PropTypes from 'prop-types';

import { MONTH_LABELS } from '../../utils/constants';
import Value from './Value';

export default function PreviousPeriod({ unit, scaleValues }) {
  PreviousPeriod.propTypes = {
    unit: PropTypes.string,
    scaleValues: PropTypes.any,
  };

  const [previous] = scaleValues.filter(v => v.type === 'prev');

  if (!previous) {
    return null;
  }

  const month = +(previous.period || '').split('-')[1];
  const label = MONTH_LABELS.length <= month ? MONTH_LABELS[month - 1] : '';

  return (
    <div className="prev_data">
      <div className="value_container">
        <Value value={previous.value} unit={unit} />
      </div>
      <div className="month">{label}</div>
    </div>
  );
}
