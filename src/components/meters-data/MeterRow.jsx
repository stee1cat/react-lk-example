import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import History from './History';

let componentId = 0;

export default class MeterRow extends Component {
  static propTypes = {
    children: PropTypes.any,
    title: PropTypes.string,
    icon: PropTypes.string,
    rates: PropTypes.object,
    item: PropTypes.shape({
      serial: PropTypes.string,
      scales: PropTypes.object,
    }),
  };

  constructor(props) {
    super(props);

    componentId += 1;

    this.state = {
      componentId,
    };
  }

  render() {
    const {
      children,
      title,
      icon,
      rates,
      item,
    } = this.props;
    const id = `meter-row-${this.state.componentId}`;

    return (
      <Fragment> <input className="not_visible" type="checkbox" id={id} />
        <div className="row">
          <div className="cell">
            <div className="meter">
              <div className={`icon icon_meter_${icon}`} />
              <div className="info">
                <div className="title">{title}</div>
                <div className="sub_title">{item.serial}</div>
              </div>
              {rates}
            </div>
          </div>
          {children}
          <div className="cell">
            <div className="history_toggler">
              <div className="text">История</div>
              <div className="divider" />
              <label htmlFor={id} className="trigger" />
            </div>
          </div>
          <History scales={item.scales} />
        </div>
      </Fragment>
    );
  }
}
