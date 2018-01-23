import React, { Component, Fragment } from 'react';

import ScaleField from './ScaleField';
import MeterRow from './MeterRow';
import PreviousPeriod from './PreviousPeriod';

export default class Electric extends Component {

    get rates() {
        let { item } = this.props;

        return (
            <div className="rate_container">
                {item.scales.map((scale, index) => <div key={index} className="rate">{scale.title} (Т{index + 1})</div>)}
            </div>
        );
    }

    render() {
        let { item, onChange } = this.props;

        return (
            <MeterRow icon="electric" title="Электричество" item={item} rates={this.rates}>
                <div className="cell">
                    {item.scales.map(scale => <PreviousPeriod key={scale.id} scale={scale}/>)}
                </div>
                <div className="cell">
                    {item.scales.map(scale => <ScaleField key={scale.id} meterId={item.id} scale={scale} onChange={onChange}/>)}
                </div>
            </MeterRow>
        );
    }

}
