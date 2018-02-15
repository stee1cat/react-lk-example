import React, { Component } from 'react';

import Value from './Value';

export default class HistoryScale extends Component {

    static defaultProps = {
        showLabel: true,
        values: []
    };

    render() {
        let { values} = this.props;

        return (
            <div className="table_container">
                {values.map(month => (
                    <div className="column" key={month.label}>
                        <div className="month">{month.label}</div>
                        {month.values.map(val => (
                            <div className="value">
                                <Value value={val} unit={month.unit}/>
                            </div>
                            ))}
                    </div>
                ))}
            </div>
        );
    }

}
