import React, { Component, Fragment } from 'react';

import { createRanges } from '../../utils/history';
import { classnames } from '../../utils/styles';
import HistoryScale from './HistoryScale';

export default class History extends Component {

    state = {
        ranges: [],
        selected: -1
    };

    componentDidMount() {
        this.handleProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.scales !== this.props.scales) {
            this.handleProps(nextProps);
        }
    }

    handleProps({scales}) {
        let ranges = createRanges(scales);

        this.setState(({selected}) => ({
            ranges,
            selected: ranges.length > 0 && (selected === -1 || selected > ranges.length - 1) ? ranges.length - 1 : selected
        }));
    }

    handleClick(value) {
        this.setState(({selected, ranges}) => ({
            selected: Math.min(ranges.length - 1, Math.max(0, selected + value))
        }));
    }

    render() {
        let { ranges, selected } = this.state;
        let range = ranges[selected];
        let arrowLeft = classnames({
            'arrow left': true,
            'inactive': 0 === selected
        });
        let arrowRight = classnames({
            'arrow right': true,
            'inactive': (ranges.length - 1) === selected
        });

        return (
            <div className="history_container">
            {range && (
                <Fragment>
                    <div className="year_container">
                        <div className={arrowLeft} onClick={() => this.handleClick(-1)}/>
                        <div className="year">{range.label}</div>
                        <div className={arrowRight} onClick={() => this.handleClick(1)}/>
                    </div>
                    {range.data.map((scale, idx) => <HistoryScale key={idx} values={scale} showLabel={!idx}/>)}
                </Fragment>
            )}
            </div>
        );
    }

}
