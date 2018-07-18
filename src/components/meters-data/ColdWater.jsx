import React from 'react';
import PropTypes from 'prop-types';

import Water from './Water';

export default function ColdWater({ item, onChange }) {
  ColdWater.propTypes = {
    item: PropTypes.object,
    onChange: PropTypes.func,
  };

  return (
    <Water icon="cold_water" title="Холодная вода" item={item} onChange={onChange} />
  );
}
