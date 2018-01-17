import { observable, action } from 'mobx';

import { RestApi } from '../utils/api';

export default class MetersStore {

    @observable items = [];

    async load() {
        let { meters } = await RestApi.getMeters();

        this.set(meters);
    }

    @action set(items) {
        this.items = items;
    }

    @action clear() {
        this.items = [];
    }

}
