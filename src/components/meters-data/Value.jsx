import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Unit from './Unit';

export default function Value({ value, unit }) {
  Value.propTypes = {
    value: PropTypes.number,
    unit: PropTypes.string,
  };

  if (!value) {
    return (
      <Fragment>
        { '-' }
      </Fragment>
    );
  }

  return (
    <Fragment>
      <span className="bold">{value}</span>
      <span className="units">
        <Unit value={unit} />
      </span>
    </Fragment>
  );
}
