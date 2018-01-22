import axios from 'axios';
import querystring from 'querystring';
import merge from 'deepmerge';

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

    static async onSuccess(response) {
        let data = response.data;

        return !data.code ? Promise.resolve(data.data) : Promise.reject(data);
    }

    static async onFailure(response) {
        localStorageService.remove(LocalStorageKeys.Token);

        return Promise.reject(response);
    }

    static async get(action, params = {}) {
        try {
            let data = await axios.get(method(action), {
                    params,
                    ...RestApi.config
                });

            return RestApi.onSuccess(data);
        } catch (error) {
            return RestApi.onFailure(error);
        }
    }

    static async post(action, params) {
        try {
            let data = await axios.post(method(action), querystring.stringify(params), merge(RestApi.config, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }));

            return RestApi.onSuccess(data);
        } catch (error) {
            return RestApi.onFailure(error);
        }
    }

    static async login(username, password) {
        return RestApi.post('AuthService/login', {
            ls: username,
            pass: password
        });
    }

    static async logout() {
        // @todo: GET для логаута?
        return RestApi.get('AuthService/logout');
    }

    static async getAccount() {
        return RestApi.get('Ls/info');
    }

    static async getMeters() {
        return RestApi.get('Meter/info');
    }

    static async setPhone(phone) {
        return RestApi.post('Ls/set/phone', {
            value: phone
        });
    }

    static async setEmail(email) {
        return RestApi.post('Ls/set/email', {
            value: email
        });
    }

}
