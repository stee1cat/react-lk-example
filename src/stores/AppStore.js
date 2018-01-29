import { observable, action } from 'mobx';

import { RestApi } from '../utils/api';
import { LocalStorageKeys, localStorageService } from '../utils/local-storage';

export default class AppStore {

    @observable authenticated;
    @observable authenticating;

    constructor() {
        this.authenticated = false;
        this.authenticating = false;

        this.localStorage = localStorageService;
    }

    get token() {
        return this.localStorage.get(LocalStorageKeys.Token);
    }

    @action async authenticate(login, password) {
        this.authenticating = true;

        try {
            let data = await RestApi.login(login, password);
            this.localStorage.set(LocalStorageKeys.Token, data.tokenId);

            this.authenticated = true;
            this.authenticating = false;
        } catch (error) {
            this.authenticated = false;
            this.authenticating = false;

            return Promise.reject(error);
        }
    }

    @action logout() {
        this.authenticated = false;
        this.authenticating = false;

        this.localStorage.remove(LocalStorageKeys.Token);
    }

}
