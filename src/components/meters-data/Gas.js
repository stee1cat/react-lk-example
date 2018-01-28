import React, { Component } from 'react';

import ScaleField from './ScaleField';
import MeterRow from './MeterRow';
import PreviousPeriod from './PreviousPeriod';

export default class Gas extends Component {

    render() {
        let { item, onChange } = this.props;

        return (
            <MeterRow icon="gas" title="Газ" item={item}>
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
