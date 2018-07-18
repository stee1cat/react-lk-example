import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { createRanges } from '../../utils/history';
import { classnames } from '../../utils/styles';
import HistoryScale from './HistoryScale';

function isSelected({ length }, selected) {
  return length > 0 && (selected === -1 || selected > length - 1) ? length - 1 : selected;
}

export default class History extends Component {
  static propTypes = {
    scales: PropTypes.object,
  };

  state = {
    ranges: [],
    selected: -1,
  };

  componentDidMount() {
    this.handleProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.scales !== this.props.scales) {
      this.handleProps(nextProps);
    }
  }

  handleProps({ scales }) {
    const ranges = createRanges(scales);

    this.setState(({ selected }) => ({
      ranges,
      selected: isSelected(ranges, selected),
    }));
  }

  handleClick(value) {
    this.setState(({ selected, ranges }) => ({
      selected: Math.min(ranges.length - 1, Math.max(0, selected + value)),
    }));
  }

  render() {
    const { ranges, selected } = this.state;
    const range = ranges[selected];
    const arrowLeftClasses = classnames({
      'arrow left': true,
      inactive: selected === 0,
    });
    const arrowRightClasses = classnames({
      'arrow right': true,
      inactive: (ranges.length - 1) === selected,
    });
    const rs = [];

    if (range) {
      range.data.forEach((scale) => {
        scale.forEach((s, i) => {
          let r = rs[i];

          if (!r) {
            r = {
              label: s.label,
              values: [],
              unit: s.unit,
            };

            rs[i] = r;
          }

          r.values.push(s.value);
        });
      });
    }

    // @todo: Сделать дивы кнопками
    return (
      <div className="history_container">
        {range && (
          <Fragment>
            <div className="year_container">
              <div
                role="button"
                tabIndex="-1"
                className={arrowLeftClasses}
                onClick={() => this.handleClick(-1)}
                onKeyUp={() => this.handleClick(-1)}
              />

              <div className="year">{range.label}</div>

              <div
                role="button"
                tabIndex="-1"
                className={arrowRightClasses}
                onClick={() => this.handleClick(1)}
                onKeyUp={() => this.handleClick(1)}
              />
            </div>
            {/*
              {range.data.map((scale, idx) => <HistoryScale
                                                key={idx}
                                                values={scale}
                                                showLabel={!idx}
                                              />
              )}
            */}
            <HistoryScale values={rs} />
          </Fragment>
        )}
      </div>
    );
  }
}
