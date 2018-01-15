import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
export default class Login extends Component {

    constructor(props) {
        super(props);

        this.store = this.props.store.appState;
    }

    authenticate(e) {
        if (e) {
            e.preventDefault();
        }

        this.store.authenticate();
    }

    render() {
        return (
            <Fragment>
                <div className="header">Личный кабинет</div>
                <div className="content_with_description">
                    <div className="cwd_description">Ваш лицевой счёт</div>
                    <div className="cwd_content">
                        <input className="full_width inlineblock" type="text" value="4600 4582 6633"/>
                    </div>
                </div>
                <div className="content_with_description">
                    <div className="cwd_description">Пароль</div>
                    <div className="cwd_content">
                        <div className="input_with_link">
                            <input className="full_width inlineblock" type="password" value="4600 4582 6633"/>
                                <div className="link">Забыли?</div>
                        </div>
                    </div>
                </div>
                <button className="active full_width" onClick={this.authenticate.bind(this)}>Войти</button>
                <div className="border_bottom_divider"/>
                <div className="sub_container_relative">
                    <button className="full_width">Где получить пароль?</button>
                    <div className="popup not_visible">
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
            </Fragment>
        );
    }

}
