import React, { Component } from 'react';

import MeterRow from './MeterRow';

export default class Gas extends Component {

    render() {
        let { item } = this.props;

        return (
            <MeterRow icon="gas" title="Газ" subtitle={item.serial}>
                <div className="cell">
                    <div className="prev_data">
                        <div className="value_container">
                            <span className="bold">5</span>
                            <span className="units">м<sup>3</sup></span>
                        </div>
                        <div className="month">Сентябрь</div>
                    </div>
                </div>
                <div className="cell">
                    <div className="input_container">
                        <div className="input_with_units">
                            <input type="text"/>
                            <div className="units">м<sup>3</sup></div>
                        </div>
                    </div>
                </div>
            </MeterRow>
        );
    }

}
