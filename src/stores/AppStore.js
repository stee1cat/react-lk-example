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

    @action authenticate(login, password) {
        this.authenticating = true;

        return RestApi.login(login, password)
            .then(data => {
                this.localStorage.set(LocalStorageKeys.Token, data.tokenId);

                this.authenticated = true;
                this.authenticating = false;
            })
            .catch(response => {
                this.authenticated = false;
                this.authenticating = false;

                return response;
            });
    }

    @action logout() {
        this.authenticated = false;
        this.authenticating = false;

        this.localStorage.remove(LocalStorageKeys.Token);
    }

}
