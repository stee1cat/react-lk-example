import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Protected from './common/Protected';

@inject('store')
@observer
class Profile extends Component {

    constructor(props) {
        super(props);

        this.store = this.props.store;
    }

    render() {
        const store = this.store;

        return (
            <div className="main_container">
                <div className="headline">
                    <div className="text">Иванов Иван Иванович</div>
                </div>
                <div className="personal_information">
                    <div className="content_block">
                        <div className="cb_description uppercase">Личные данные</div>
                        <div className="cb_content">
                            <div className="content_with_description">
                                <div className="cwd_description bold">УК</div>
                                <div className="cwd_content bold">Тёплый дом</div>
                            </div>
                            <div className="content_with_description">
                                <div className="cwd_description bold">Л/С</div>
                                <div className="cwd_content bold">4600 4582 6633</div>
                            </div>
                            <div className="content_with_description">
                                <div className="cwd_description bold">Номер телефона</div>
                                <div className="cwd_content bold">
                                    <span className="inlineblock">+7 912 733-23-51</span>
                                    <button className="only_icon icon_b_plus inlineblock float_right"/>
                                    <button className="only_icon icon_b_edit inlineblock float_right"/>
                                </div>
                            </div>
                            <div className="content_with_description">
                                <div className="cwd_description bold">E-mail</div>
                                <div className="cwd_content bold">
                                    <span className="inlineblock">ivanov.ii@mail.ru</span>
                                    <button className="only_icon icon_b_edit inlineblock float_right"/>
                                </div>
                            </div>
                            <div className="content_with_description">
                                <div className="cwd_description bold">Пароль</div>
                                <div className="cwd_content">
                                    <div className="inlineblock input_with_icon lock">
                                        <input type="text" disabled placeholder="******"/>
                                    </div>
                                    <div className="sub_container_relative">
                                        <button className="active">Сгенерировать новый</button>
                                        <div className="popup not_visible">
                                            <div className="p_title">Сгенерировать новый</div>
                                            <div className="p_content">
                                                <div className="content_with_icon">
                                                    <div className="cwi_icon icon_p_good"/>
                                                    <div className="cwi_content">
                                                        Пароль успешно отправлен
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="popup not_visible">
                                            <div className="p_title">Сгенерировать новый</div>
                                            <div className="p_content">
                                                <div className="text">Пароль будет отправлен на ваш почтовый ящик</div>
                                                <button className="submit">Получить</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sub_container_relative">
                                        <button>Восстановить пароль</button>
                                        <div className="popup not_visible">
                                            <div className="p_title">Восстановить пароль</div>
                                            <div className="p_content">
                                                <div className="content_with_icon">
                                                    <div className="cwi_icon icon_p_info"/>
                                                    <div className="cwi_content">
                                                        Вы можете в вашей УК
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content_block">
                        <div className="cb_description uppercase">Мои помещения</div>
                        <div className="cb_content">
                            <div className="content_with_description">
                                <div className="cwd_description bold">Адрес</div>
                                <div className="cwd_content bold">Пермь, Пермская 1, 1</div>
                            </div>
                            <div className="content_with_description">
                                <div className="cwd_description bold">Площадь</div>
                                <div className="cwd_content bold">182 м</div>
                            </div>
                            <div className="content_with_description">
                                <div className="cwd_description bold">Зарегистрировано</div>
                                <div className="cwd_content bold">3 человека</div>
                            </div>
                            <div className="content_with_icon">
                                <div className="cwi_icon icon_p_info"/>
                                <div className="cwi_content">
                                    Для изменения информации раздела <span className="bold">Мои помещения</span> обратитесь в свою УК
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Protected(Profile);
