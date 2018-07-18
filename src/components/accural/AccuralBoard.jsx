import React from 'react';
import PropTypes from 'prop-types';

import Accural from './Accural';

export default function AccuralBoard({ periods }) {
  AccuralBoard.propTypes = {
    periods: PropTypes.object,
  };

  return (
    <div className="accurals">
      {periods.map(i => <Accural key={i.period} accural={i} />)}
    </div>
  );
}
