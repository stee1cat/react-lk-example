import React, { Component } from 'react';

import Value from './Value';

export default class HistoryScale extends Component {

    static defaultProps = {
        showLabel: true,
        values: []
    };

    render() {
        let { values, showLabel } = this.props;

        return (
            <div className="table_container">
                {values.map(month => (
                    <div className="column" key={month.label}>
                        {showLabel && <div className="month">{month.label}</div>}
                        <div className="value">
                            <Value value={month.value} unit={month.unit}/>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

}
