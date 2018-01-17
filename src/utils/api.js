import axios from 'axios';

import { LocalStorageKeys, localStorageService } from './local-storage';

const ENDPOINT = '/lkServiceApi/';
const AUTHORIZATION_HEADER = 'X-Rest-Token';

let method = action => ENDPOINT + action.trim('/');

export class RestApi {

    static get config() {
        return {
            headers: {
                [AUTHORIZATION_HEADER]: localStorageService.get(LocalStorageKeys.Token)
            }
        };
    }

    static get onSuccess() {
        return async function (response) {
            let data = response.data;

            return !data.code ? Promise.resolve(data.data) : Promise.reject(data);
        }
    }

    static get onFailure() {
        return async function (response) {
            localStorageService.remove(LocalStorageKeys.Token);

            return Promise.reject(response);
        }
    }

    static async get(action, params = {}) {
        return axios.get(method(action), {
                params,
                ...RestApi.config
            })
            .then(RestApi.onSuccess)
            .catch(RestApi.onFailure);
    }

    static async post(action, params) {
        return axios.post(method(action), params, RestApi.config)
            .then(RestApi.onSuccess)
            .catch(RestApi.onFailure);
    }

    static async login(username, password) {
        // @todo: GET для авторизации?
        return RestApi.get('AuthService/login', {
            ls: username,
            pass: password
        })
    }

    static async logout() {
        // @todo: GET для логаута?
        return RestApi.get('AuthService/logout')
    }

    static async getAccount() {
        return RestApi.get('Ls/info')
    }

    static async getMeters() {
        return RestApi.get('Meter/info')
    }

}
