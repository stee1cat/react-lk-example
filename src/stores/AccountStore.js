import { observable, action } from 'mobx';

import { RestApi } from '../utils/api';

export default class AccountStore {

    @observable info;

    @action setInfo(info) {
        this.info = info;
    }

    @action async updatePhone(phone) {
        await RestApi.setPhone(phone);

        this.setInfo({
            ...this.info,
            personalData: {
                ...this.info.personalData,
                phone
            }
        });
    }

    @action async updateEmail(email) {
        await RestApi.setEmail(email);

        this.setInfo({
            ...this.info,
            personalData: {
                ...this.info.personalData,
                email
            }
        });
    }

    @action async loadInfo() {
        let account = await RestApi.getAccount();

        this.setInfo(account);

        return account;
    }

}
