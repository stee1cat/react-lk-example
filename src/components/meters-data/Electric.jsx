import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ScaleField from './ScaleField';
import MeterRow from './MeterRow';
import PreviousPeriod from './PreviousPeriod';

export default class Electric extends Component {
  static propTypes = {
    item: PropTypes.shape({
      scales: PropTypes.object,
    }),
    onChange: PropTypes.func,
  } ;

  get rates() {
    const { item } = this.props;

    return (
      <div className="rate_container">
        {item.scales.map((scale, index) => (
          <div key={scale.id} className="rate">{scale.title ? `${scale.title} (Т${index + 1})` : ''}</div>
        ))}
      </div>
    );
  }

  render() {
    const { item, onChange } = this.props;

    return (
      <MeterRow icon="electric" title="Электричество" item={item} rates={this.rates}>
        <div className="cell">
          {item.scales.map(scale => (
            <PreviousPeriod key={scale.id} scaleValues={scale.scaleValues} unit={scale.unit} />
          ))}
        </div>
        <div className="cell">
          {item.scales.map(scale => (
            <ScaleField
              key={scale.id}
              meterId={item.id}
              scale={scale}
              onChange={onChange}
            />
          ))}
        </div>
      </MeterRow>
    );
  }
}
