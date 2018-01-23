import React, { Component } from 'react';

import ScaleField from './ScaleField';
import MeterRow from './MeterRow';
import PreviousPeriod from './PreviousPeriod';

export default class Water extends Component {

    render() {
        let { item, onChange } = this.props;

        return (
            <MeterRow {...this.props}>
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
