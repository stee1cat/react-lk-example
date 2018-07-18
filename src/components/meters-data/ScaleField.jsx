import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NumericInput from '../common/NumericInput';
import Unit from './Unit';

export default class ScaleField extends Component {
  static propTypes = {
    precision: PropTypes.number,
    scale: PropTypes.shape({
      scaleValues: PropTypes.object,
    }),
    meterId: PropTypes.number,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    precision: 0,
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  state = {
    value: '',
  };

  componentDidMount() {
    const { scale } = this.props;

    this.setState({
      value: ScaleField.getCurrentValue(scale.scaleValues),
    });
  }

  onChange(value) {
    this.setState({
      value,
    });

    this.emitChange(value);
  }

  static getCurrentValue(scaleValues) {
    let item = scaleValues.slice(0)
      .reverse()
      .find(v => v.type === 'current');

    return item ? item.value : '';
  }

  emitChange(value) {
    const { meterId, scale, onChange } = this.props;

    if (typeof onChange === 'function') {
      onChange({
        meterId,
        scaleId: scale.id,
        value,
      });
    }
  }

  render() {
    let { value } = this.state;
    let { scale, precision } = this.props;

    return (
      <div className="input_container">
        <div className="input_with_units">
          <NumericInput
            value={value}
            min={0}
            max={999999}
            strict
            precision={precision}
            onChange={this.onChange}
            placeholder={scale.title}
          />
          <div className="units">
            <Unit value={scale.unit} />
          </div>
        </div>
      </div>
    );
  }
}
