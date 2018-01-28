import React, { Component } from 'react';

import Unit from './Unit';

export default class ScaleField extends Component {

    state = {
        value: ''
    };

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        let item = this.props.scale.scaleValues.find(v => v.type === 'current');
        let value = item ? item.value : '';

        this.setState({
            value
        });
    }

    onChange(e) {
        let { value } = e.target;

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
        let { unit } = this.props.scale;

        return (
            <div className="input_container">
                <div className="input_with_units">
                    <input type="text" value={value} onChange={this.onChange}/>
                    <div className="units">
                        <Unit value={unit}/>
                    </div>
                </div>
            </div>
        );
    }

}
