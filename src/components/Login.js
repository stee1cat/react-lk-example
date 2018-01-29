import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import MobxReactForm from 'mobx-react-form';

@inject('store')
@observer
export default class Login extends Component {

    constructor(props) {
        super(props);

        this.appStore = this.props.store.appStore;
        this.createForm();
    }

    createForm() {
        let fields = [
            {
                name: 'username',
                type: 'text'
            },
            {
                name: 'password',
                type: 'password'
            }
        ];
        let hooks = {
            onSuccess: this.authenticate.bind(this)
        };

        this.form = new MobxReactForm({fields}, {hooks});
    }

    async authenticate(form) {
        try {
            let values = form.values();

            await this.appStore.authenticate(values.username, values.password);
        } catch (error) {
            alert(error.message);
        }
    }

    render() {
        return (
            <form onSubmit={this.form.onSubmit}>
                <div className="header">Личный кабинет</div>
                <div className="content_with_description">
                    <div className="cwd_description">Ваш лицевой счёт</div>
                    <div className="cwd_content">
                        <input className="full_width inlineblock" {...this.form.$('username').bind()}/>
                    </div>
                </div>
                <div className="content_with_description">
                    <div className="cwd_description">Пароль</div>
                    <div className="cwd_content">
                        <div className="input_with_link">
                            <input className="full_width inlineblock" {...this.form.$('password').bind()}/>
                            <div className="link">Забыли?</div>
                        </div>
                    </div>
                </div>
                <button className="active full_width">Войти</button>
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
            </form>
        );
    }

}
