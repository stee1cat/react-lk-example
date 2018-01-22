import React, { Component } from 'react';

const Mode = {
    View: 0,
    Edit: 1
};

export default class Field extends Component {

    state = {
        mode: Mode.View,
        value: ''
    };

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onClick() {
        this.setState(({mode}) => {
            return {
                mode: mode === Mode.View ? Mode.Edit : Mode.View
            };
        });
    }

    onChange({ nativeEvent }) {
        this.setState({
            value: nativeEvent.target.value
        });
    }

    onBlur() {
        let { mode, value } = this.state;

        if (mode === Mode.Edit) {
            this.emitChange(value);

            this.setState({
                mode: Mode.View
            });
        }
    }

    emitChange(value) {
        let { onChange } = this.props;

        if (typeof onChange === 'function') {
            onChange(value);
        }
    }

    componentDidMount() {
        this.setState({
            value: this.props.value
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({
                value: nextProps.value
            });
        }
    }

    render() {
        let { mode, value } = this.state;

        return (
            <div className="cwd_content bold">
                {
                    mode === Mode.View ? <span className="inlineblock">{value}</span> :
                        <input className="inlineblock" value={value} onChange={this.onChange} onBlur={this.onBlur}/>
                }
                <button className="only_icon icon_b_edit inlineblock float_right" onClick={this.onClick}/>
            </div>
        );
    }

}
