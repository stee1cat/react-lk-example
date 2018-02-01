import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import PopupWithButton from './common/PopupWithButton';
import Protected from './common/Protected';
import EmailField from './profile/EmailField';
import PhoneField from './profile/PhoneField';
import Room from './profile/Room';

@inject('store')
@observer
class Profile extends Component {

    constructor(props) {
        super(props);

        this.accountStore = this.props.store.accountStore;
    }

    render() {
        const { personalData, myRoom } = this.accountStore.info;

        return (
            <div className="main_container">
                <div className="headline">
                    <div className="text">{personalData.fio}</div>
                </div>
                <div className="personal_information">
                    <div className="content_block">
                        <div className="cb_description uppercase">Личные данные</div>
                        <div className="cb_content">
                            <div className="content_with_description">
                                <div className="cwd_description bold">УК</div>
                                <div className="cwd_content bold">{personalData.uk}</div>
                            </div>
                            <div className="content_with_description">
                                <div className="cwd_description bold">Л/С</div>
                                <div className="cwd_content bold">{personalData.ls}</div>
                            </div>
                            <PhoneField/>
                            <EmailField/>
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
                                    <PopupWithButton btn={{
                                                        label: 'Восстановить пароль'
                                                     }}
                                                     popup={{
                                                         title: 'Восстановить пароль',
                                                         content: 'Вы можете в вашей УК'}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Room data={myRoom}/>
                </div>
            </div>
        );
    }

}

export default Protected(Profile);
