import React, { Component } from 'react';

import { MONTH_LABELS } from '../../utils/constants';
import Value from './Value';

export default class PreviousPeriod extends Component {

    render() {
        let { unit, scaleValues } = this.props;
        let [previous] = scaleValues.filter(v => v.type === 'prev');

        if (!previous) {
            return null;
        } else {
            let month = +(previous.period || '').split('-')[1];
            let label = MONTH_LABELS.length <= month ? MONTH_LABELS[month - 1] : '';

            return (
                <div className="prev_data">
                    <div className="value_container">
                        <Value value={previous.value} unit={unit}/>
                    </div>
                    <div className="month">{label}</div>
                </div>
            );
        }
    }

}
