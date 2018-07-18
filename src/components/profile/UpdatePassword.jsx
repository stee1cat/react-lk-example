import React, { Component, Fragment } from 'react';

import PopupWithButton from '../common/PopupWithButton';

export default class UpdatePassword extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  state = {
    updated: false,
  };

  onSubmit(e) {
    this.setState({
      updated: true,
    });

    e.preventDefault();
  }

  onClose() {
    this.setState({
      updated: false,
    });
  }

  render() {
    const { updated } = this.state;

    return (
      <div className="content_with_description">
        <div className="cwd_description bold">Пароль</div>
        <div className="cwd_content">
          <div className="inlineblock input_with_icon lock">
            <input type="text" disabled placeholder="******" />
          </div>
          <PopupWithButton btnClass="active" label="Сгенерировать новый" onClose={this.onClose} opened={updated}>
            {
              updated && (
                <div className="content_with_icon">
                  <div className="cwi_icon icon_p_good" />
                  <div className="cwi_content">
                    Пароль успешно отправлен
                  </div>
                </div>
              )
            }
            {
              !updated && (
                <Fragment>
                  <div className="text">Пароль будет отправлен на ваш почтовый ящик</div>
                  <button type="submit" className="submit" onClick={this.onSubmit}>Получить</button>
                </Fragment>
              )
            }
          </PopupWithButton>
          <PopupWithButton label="Восстановить пароль">
            <div className="content_with_icon">
              <div className="cwi_icon icon_p_info" />
              <div className="cwi_content">
                Вы можете в вашей УК
              </div>
            </div>
          </PopupWithButton>
        </div>
      </div>
    );
  }
}
