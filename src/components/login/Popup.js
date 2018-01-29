import React, { Component } from 'react';
import { classnames } from '../../utils/styles';

export default class Popup extends Component {

    state = {
        opened: false
    };

    constructor(props) {
        super(props);

        this.onClickHandler = this.onClickHandler.bind(this);
        this.onBodyClickHandler = this.onBodyClickHandler.bind(this);
    }

    onClickHandler(event) {
        let { opened } = this.state;

        this.setState(({opened}) => ({
            opened: !opened
        }));

        event.preventDefault();
    }

    onBodyClickHandler() {
        this.setState({
            opened: false
        });
    }

    componentDidMount() {
        document.body.addEventListener('click', this.onBodyClickHandler);
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.onBodyClickHandler);
    }

    render() {
        let { opened } = this.state;
        let classes = classnames({
            'popup': true,
            'not_visible': !opened
        });

        return (
            <div className="sub_container_relative">
                <button className="full_width" onClick={this.onClickHandler}>Где получить пароль?</button>
                <div className={classes}>
                    <div className="p_title center">Где получить пароль?</div>
                    <div className="p_content">
                        <div className="content_with_icon">
                            <div className="cwi_icon icon_p_info"/>
                            <div className="cwi_content">
                                Пароль вы можете получить в вашей управляющей компании
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
