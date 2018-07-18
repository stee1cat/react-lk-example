import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import validator from 'validator';
import MobxReactForm from 'mobx-react-form';
import PropTypes from 'prop-types';

import { updateTitle } from '../utils/app';
import { classnames } from '../utils/styles';
import { required } from '../utils/validators';
import PopupWithButton from './common/PopupWithButton';

function FieldError({ error, isDirty }) {
  FieldError.propTypes = {
    error: PropTypes.string,
    isDirty: PropTypes.bool,
  };

  if (error && !isDirty) {
    return (
      <p className="error-message">{error}</p>
    );
  }

  return null;
}

@inject('store')
@observer
export default class Login extends Component {
  usernameInput = null;

  static propTypes = {
    store: PropTypes.object,
  };

  constructor(props) {
    super(props);

    updateTitle('Вход');

    this.appStore = props.store.appStore;
    this.createForm();

    this.setUsernameInput = this.setUsernameInput.bind(this);
  }

  state = {
    disabled: false,
  };

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
          required,
        ],
      },
      {
        name: 'password',
        type: 'password',
        validators: [
          required,
        ],
      },
    ];
    let hooks = {
      onSuccess: this.authenticate.bind(this),
    };
    let plugins = {
      vjf: validator,
    };

    this.form = new MobxReactForm({ fields }, {
      hooks,
      plugins,
    });
  }

  async authenticate(form) {
    try {
      if (form.isValid) {
        let values = form.values();

        this.setState({
          disabled: true,
        });

        await this.appStore.authenticate(values.username, values.password);
      }
    } catch (error) {
      form.invalidate(error.message);

      this.setState({
        disabled: false,
      });
    }
  }

  render() {
    const { form } = this;
    const username = form.$('username');
    const usernameClasses = classnames({
      'full_width inlineblock': true,
      'has-error': username.error,
    });
    const password = form.$('password');
    const passwordClasses = classnames({
      'full_width inlineblock': true,
      'has-error': password.error,
    });
    const { disabled } = this.state;

    return (
      <form onSubmit={form.onSubmit}>
        <div className="header">Личный кабинет</div>
        {(form.error) && <p className="form-error">{form.error}</p>}
        <div className="content_with_description">
          <div className="cwd_description">Ваш лицевой счёт</div>
          <div className="cwd_content">
            <input
              className={usernameClasses}
              {...username.bind()}
              ref={this.setUsernameInput}
            />
            <FieldError error={username.error} isDirty={username.isDirty} />
          </div>
        </div>
        <div className="content_with_description">
          <div className="cwd_description">Пароль</div>
          <div className="cwd_content">
            <div className="input_with_link">
              <input
                className={passwordClasses}
                {...password.bind()}
              />
              <div className="link">Забыли?</div>
            </div>
            <FieldError error={password.error} isDirty={password.isDirty} />
          </div>
        </div>
        <button type="submit" className="active full_width" disabled={disabled}>Войти</button>
        <div className="border_bottom_divider" />
        <PopupWithButton btnClass="full_width" label="Где получить пароль?">
          <div className="content_with_icon">
            <div className="cwi_icon icon_p_info" />
            <div className="cwi_content">
              Пароль вы можете получить в вашей управляющей компании
            </div>
          </div>
        </PopupWithButton>
      </form>
    );
  }
}
