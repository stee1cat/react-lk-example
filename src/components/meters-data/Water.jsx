import React from 'react';
import PropTypes from 'prop-types';

import ScaleField from './ScaleField';
import MeterRow from './MeterRow';
import PreviousPeriod from './PreviousPeriod';

export default function Water(props) {
  Water.propTypes = {
    item: PropTypes.shape({
      scales: PropTypes.object,
      id: PropTypes.number,
    }),
    onChange: PropTypes.func,
  };

  const { item: { scales, id }, onChange } = props;

  return (
    <MeterRow {...props}>
      <div className="cell">
        {scales.map(s => <PreviousPeriod key={s.id} scaleValues={s.scaleValues} unit={s.unit} />)}
      </div>
      <div className="cell">
        {scales.map(s => (
          <ScaleField key={s.id} precision={1} meterId={id} scale={s} onChange={onChange} />
        ))}
      </div>
    </MeterRow>
  );
}
