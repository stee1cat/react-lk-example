import React, { Component } from 'react';

import Popup from '../common/Popup';

export default class PopupWithButton extends Component {

    static defaultProps = {
        btnClass: '',
        label: '',
        onClose: () => null,
        opened: false
    };

    state = {
        opened: false
    };

    constructor(props) {
        super(props);

        this.onClickHandler = this.onClickHandler.bind(this);
        this.onCloseHandler = this.onCloseHandler.bind(this);
    }

    componentDidMount() {
        this.setState({
            opened: this.props.opened
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.opened !== this.props.opened) {
            this.setState({
                opened: nextProps.opened
            });
        }
    }

    onClickHandler(e) {
        this.setState({
            opened: true
        });

        e.preventDefault();
    }

    onCloseHandler() {
        this.setState({
            opened: false
        });

        this.props.onClose();
    }

    render() {
        let { btnClass, label, children } = this.props;
        let { opened } = this.state;

        return (
            <div className="sub_container_relative">
                <button className={btnClass} onClick={this.onClickHandler}>{label}</button>
                <Popup title={label} opened={opened} onClose={this.onCloseHandler}>
                    {children}
                </Popup>
            </div>
        );
    }

}
