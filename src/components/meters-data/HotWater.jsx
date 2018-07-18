import React from 'react';
import PropTypes from 'prop-types';

import Water from './Water';

export default function HotWater({ item, onChange }) {
  HotWater.propTypes = {
    item: PropTypes.object,
    onChange: PropTypes.func,
  };

  return (
    <Water icon="hot_water" title="Горячая вода" item={item} onChange={onChange} />
  );
}
