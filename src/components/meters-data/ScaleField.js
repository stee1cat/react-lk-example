import React, { Component } from 'react';
import NumericInput from '../common/NumericInput';

import Unit from './Unit';

export default class ScaleField extends Component {

    static defaultProps = {
        precision: 0
    };

    state = {
        value: ''
    };

    static getCurrentValue(scaleValues) {
        let item = scaleValues.slice(0)
            .reverse()
            .find(v => v.type === 'current');

        return item ? item.value : '';
    }

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        this.setState({
            value: ScaleField.getCurrentValue(this.props.scale.scaleValues)
        });
    }

    onChange(value) {
        this.setState({
            value
        });

        this.emitChange(value);
    }

    emitChange(value) {
        let { meterId, scale, onChange } = this.props;

        if (typeof onChange === 'function') {
            onChange({
                meterId,
                scaleId: scale.id,
                value
            });
        }
    }

    render() {
        let { value } = this.state;
        let { scale, precision } = this.props;

        return (
            <div className="input_container">
                <div className="input_with_units">
                    <NumericInput value={value} min={0} max={999999} strict={true} precision={precision} onChange={this.onChange} placeholder={scale.title}/>
                    <div className="units">
                        <Unit value={scale.unit}/>
                    </div>
                </div>
            </div>
        );
    }

}
