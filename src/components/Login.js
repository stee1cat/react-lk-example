import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import validator from 'validator';
import MobxReactForm from 'mobx-react-form';

import { updateTitle } from '../utils/app';
import { classnames } from '../utils/styles';
import { required } from '../utils/validators';
import PopupWithButton from './common/PopupWithButton';

@inject('store')
@observer
export default class Login extends Component {

    state = {
        disabled: false
    };

    usernameInput = null;

    constructor(props) {
        super(props);

        updateTitle('Вход');

        this.appStore = this.props.store.appStore;
        this.createForm();

        this.setUsernameInput = this.setUsernameInput.bind(this);
    }

    componentDidMount() {
        if (this.usernameInput) {
            this.usernameInput.focus();
        }
    }

    setUsernameInput(input) {
        this.usernameInput = input;
    }

    createForm() {
        let fields = [
            {
                name: 'username',
                type: 'text',
                validators: [
                    required
                ]
            },
            {
                name: 'password',
                type: 'password',
                validators: [
                    required
                ]
            }
        ];
        let hooks = {
            onSuccess: this.authenticate.bind(this)
        };
        let plugins = {
            vjf: validator
        };

        this.form = new MobxReactForm({fields}, {hooks, plugins});
    }

    async authenticate(form) {
        try {
            if (form.isValid) {
                let values = form.values();

                this.setState({
                    disabled: true
                });

                await this.appStore.authenticate(values.username, values.password);
            }
        } catch (error) {
            form.invalidate(error.message);

            this.setState({
                disabled: false
            });
        }
    }

    render() {
        let form = this.form;
        let username = form.$('username');
        let usernameClasses = classnames({
            'full_width inlineblock': true,
            'has-error': username.error
        });
        let password = form.$('password');
        let passwordClasses = classnames({
            'full_width inlineblock': true,
            'has-error': password.error
        });
        let { disabled } = this.state;

        return (
            <form onSubmit={form.onSubmit}>
                <div className="header">Личный кабинет</div>
                {(form.error) && <p className="form-error">{form.error}</p>}
                <div className="content_with_description">
                    <div className="cwd_description">Ваш лицевой счёт</div>
                    <div className="cwd_content">
                        <input className={usernameClasses} {...username.bind()} ref={this.setUsernameInput}/>
                        {(username.error && !username.isDirty) && <p className="error-message">{username.error}</p>}
                    </div>
                </div>
                <div className="content_with_description">
                    <div className="cwd_description">Пароль</div>
                    <div className="cwd_content">
                        <div className="input_with_link">
                            <input className={passwordClasses} {...password.bind()}/>
                            <div className="link">Забыли?</div>
                        </div>
                        {(password.error && !password.isDirty) && <p className="error-message">{password.error}</p>}
                    </div>
                </div>
                <button className="active full_width" disabled={disabled}>Войти</button>
                <div className="border_bottom_divider"/>
                <PopupWithButton btnClass="full_width" label="Где получить пароль?">
                    <div className="content_with_icon">
                        <div className="cwi_icon icon_p_info"/>
                        <div className="cwi_content">
                            Пароль вы можете получить в вашей управляющей компании
                        </div>
                    </div>
                </PopupWithButton>
            </form>
        );
    }

}
