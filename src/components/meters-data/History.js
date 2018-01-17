import React, { Component } from 'react';

import Unit from './Unit';

const MONTH_LABELS = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];

export default class History extends Component {

    state = {
        items: []
    };

    componentDidMount() {
        let { scales } = this.props.item;

        this.createPeriod(scales);
    }

    createPeriod(scales) {
        if (scales.length) {
            let values = scales[0].scaleValues.filter(v => v.type === 'history');
            let items = [];

            for (let i = 0; i < 12; i++) {
                items.push({
                    period: MONTH_LABELS[i],
                    value: i
                });
            }

            this.setState({
                items
            });
        }
    }

    render() {
        let { items } = this.state;
        let unit = <Unit item={this.props.item}/>;

        return (
            <div className="history_container">
                <div className="year_container">
                    <div className="arrow left"/>
                    <div className="year">2017</div>
                    <div className="arrow right"/>
                </div>
                <div className="table_container">
                    {items.map((item, index) => (
                        <div className="column" key={index}>
                            <div className="month">{item.period}</div>
                            <div className="value">
                                <span className="bold">{item.value}</span>
                                <span className="units">{unit}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

}
