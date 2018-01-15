import React, { Component } from 'react';

import MeterRow from './MeterRow';

const info = (
    <div className="rate_container">
        <div className="rate">День (Т1)</div>
        <div className="rate">Ночь (Т2)</div>
    </div>
);

export default class Electric extends Component {

    render() {
        let { item } = this.props;

        return (
            <MeterRow icon="electric" title="Электричество" subtitle={item.serial} info={info}>
                <div className="cell">
                    <div className="prev_data">
                        <div className="value_container">
                            <span className="bold">56</span>
                            <span className="units">кВт*ч</span>
                        </div>
                        <div className="month">Сентябрь</div>
                    </div>
                    <div className="prev_data">
                        <div className="value_container">
                            <span className="bold">42</span>
                            <span className="units">кВт*ч</span>
                        </div>
                        <div className="month">Сентябрь</div>
                    </div>
                </div>
                <div className="cell">
                    <div className="input_container">
                        <div className="input_with_units">
                            <input type="text" />
                            <div className="units">кВт*ч</div>
                        </div>
                    </div>
                    <div className="input_container">
                        <div className="input_with_units">
                            <input type="text"/>
                            <div className="units">кВт*ч</div>
                        </div>
                    </div>
                </div>
            </MeterRow>
        );
    }

}
