import { observer } from 'mobx-react/index';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { classnames } from '../../utils/styles';

@observer
export default class YearSelectorElement extends Component {
  static propTypes = {
    year: PropTypes.shape({
      active: PropTypes.bool,
    }),
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    let { year, onChange } = this.props;

    if (year.active === false) {
      year.active = true;

      onChange(year);
    }
  }

  render() {
    const { year } = this.props;
    const classes = classnames({
      year: true,
      active: year.active,
    });

    return (
      <div role="button" tabIndex="-1" className={classes} onClick={this.onClick} onKeyUp={this.onClick}>
        {year.year}
      </div>
    );
  }
}
