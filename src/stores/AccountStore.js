import { observable, action } from 'mobx';

import { RestApi } from '../utils/api';

export default class AccountStore {

    @observable info;

    @action setInfo(info) {
        this.info = info;
    }

    @action loadInfo() {
        return RestApi.getAccount()
            .then(account => {
                this.setInfo(account);

                return account;
            });
    }

}
