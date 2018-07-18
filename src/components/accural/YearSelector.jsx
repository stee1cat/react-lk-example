import { observer } from 'mobx-react/index';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import YearDisplay from './YearDisplay';
import YearSelectorElement from './YearSelectorElement';

@observer
export default class YearSelector extends Component {
  static propTypes = {
    years: PropTypes.object,
    onChange: PropTypes.func,
    state: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(year) {
    const { years, onChange } = this.props;

    years.forEach((it) => {
      if (it !== year && it.active === true) {
        /* eslint-disable no-param-reassign */
        it.active = false;
        /* eslint-enable no-param-reassign */
      }
    });

    onChange(year);
  }

  render() {
    const { state, years } = this.props;
    const elements = years.map(it => (
      <YearSelectorElement
        key={it.id}
        year={it}
        onChange={this.onChange}
      />
    ));

    return (
      <Fragment>
        <input className="not_visible" type="checkbox" id="year-selector" />
        <div className="text">
          <span className="title_text">Начисления в</span>
          <label className="trigger" htmlFor="year-selector">
            <YearDisplay value={state} />
            <div className="icon" />
            <div className="years_container">
              {elements}
            </div>
          </label>
        </div>
      </Fragment>
    );
  }
}
