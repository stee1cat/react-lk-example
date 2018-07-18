import React from 'react';
import PropTypes from 'prop-types';

import ScaleField from './ScaleField';
import MeterRow from './MeterRow';
import PreviousPeriod from './PreviousPeriod';

export default function Gas({ item, onChange }) {
  Gas.propTypes = {
    item: PropTypes.shape({
      scales: PropTypes.any,
    }),
    onChange: PropTypes.func,
  };

  return (
    <MeterRow icon="gas" title="Газ" item={item}>
      <div className="cell">
        {item.scales.map(scale => (
          <PreviousPeriod key={scale.id} scaleValues={scale.scaleValues} unit={scale.unit} />
        ))}
      </div>
      <div className="cell">
        {item.scales.map(scale => (
          <ScaleField
            key={scale.id}
            precision={1}
            meterId={item.id}
            scale={scale}
            onChange={onChange}
          />
        ))}
      </div>
    </MeterRow>
  );
}
