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
                    {item.scales.map(scale => (
                        <PreviousPeriod key={scale.id} scaleValues={scale.scaleValues} unit={scale.unit}/>
                    ))}
                </div>
                <div className="cell">
                    {item.scales.map(scale => (
                        <ScaleField key={scale.id} precision={1} meterId={item.id} scale={scale} onChange={onChange}/>
                    ))}
                </div>
            </MeterRow>
        );
    }

}
