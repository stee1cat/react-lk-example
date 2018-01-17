import React, { Component } from 'react';

import MeterRow from './MeterRow';
import Unit from './Unit';

export default class Gas extends Component {

    render() {
        let { item } = this.props;

        return (
            <MeterRow icon="gas" title="Газ" item={item}>
                <div className="cell">
                    <div className="prev_data">
                        <div className="value_container">
                            <span className="bold">5</span>
                            <span className="units">
                                <Unit item={item}/>
                            </span>
                        </div>
                        <div className="month">Сентябрь</div>
                    </div>
                </div>
                <div className="cell">
                    <div className="input_container">
                        <div className="input_with_units">
                            <input type="text"/>
                            <div className="units">
                                <Unit item={item}/>
                            </div>
                        </div>
                    </div>
                </div>
            </MeterRow>
        );
    }

}
