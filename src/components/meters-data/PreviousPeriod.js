import React, { Component } from 'react';

import { MONTH_LABELS } from '../../utils/constants';
import Value from './Value';

export default class PreviousPeriod extends Component {

    render() {
        let { scale } = this.props;
        let { unit, scaleValues } = scale;
        let previous = scaleValues.filter(v => v.type === 'prev');
        let month = +(previous[0].period || '').split('-')[1];
        let label = MONTH_LABELS.length <= month ? MONTH_LABELS[month - 1] : '';

        return (
            <div className="prev_data">
                <div className="value_container">
                    <Value value={previous[0].value} unit={unit}/>
                </div>
                <div className="month">{label}</div>
            </div>
        );
    }

}
