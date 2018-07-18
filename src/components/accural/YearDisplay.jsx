import React from 'react';
import PropTypes from 'prop-types';

export default function YearDisplay({ value }) {
  YearDisplay.propTypes = {
    value: PropTypes.shape({
      selectedYear: PropTypes.number,
    }),
  };

  const { selectedYear } = value;

  return (
    <span className="year-text">{selectedYear} году</span>
  );
}
