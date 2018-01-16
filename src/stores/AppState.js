import { observable, action } from 'mobx';

import { RestApi } from '../utils/api';
import { LocalStorageKeys, localStorageService } from '../utils/local-storage';

export default class AppState {

    @observable authenticated;
    @observable authenticating;

    constructor() {
        this.authenticated = false;
        this.authenticating = false;
    }

    @action authenticate(login, password) {
        this.authenticating = true;

        return RestApi.login(login, password)
            .then(data => {
                this.authenticated = true;
                this.authenticating = false;

                localStorageService.set(LocalStorageKeys.Token, data.tokenId);
            })
            .catch(response => {
                this.authenticated = false;
                this.authenticating = false;

                return Promise.reject(response);
            });
    }

    @action logout() {
        this.authenticated = false;
        this.authenticating = false;

        localStorageService.remove(LocalStorageKeys.Token);
    }

}
