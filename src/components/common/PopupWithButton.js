import React, { Component } from 'react';

import Popup from '../common/Popup';

export default class PopupWithButton extends Component {

    static defaultProps = {
        btn: {
            label: '',
            className: ''
        },
        popup: {
            title: '',
            content: ''
        }
    };

    state = {
        opened: false
    };

    constructor(props) {
        super(props);

        this.onClickHandler = this.onClickHandler.bind(this);
        this.onCloseHandler = this.onCloseHandler.bind(this);
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
    }

    render() {
        let { btn, popup } = this.props;
        let { opened } = this.state;

        return (
            <div className="sub_container_relative">
                <button className={btn.className} onClick={this.onClickHandler}>{btn.label}</button>
                <Popup title={popup.title}
                       content={popup.content}
                       opened={opened}
                       onClose={this.onCloseHandler}/>
            </div>
        );
    }

}
