import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Protected from './common/Protected';
import EmailField from './profile/EmailField';
import PhoneField from './profile/PhoneField';
import Room from './profile/Room';
import UpdatePassword from './profile/UpdatePassword';

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
                            <UpdatePassword/>
                        </div>
                    </div>
                    <Room data={myRoom}/>
                </div>
            </div>
        );
    }

}

export default Protected(Profile);
