import { observable, action } from 'mobx';
import axios from 'axios';

const meters = require('./meters.json');

export default class MetersState {

    @observable items;

    constructor() {
        this.items = meters.data.meters;
    }

    async fetchData(pathname, id) {
        let {data} = await axios.get(
            `https://jsonplaceholder.typicode.com${pathname}`
        );

        this.setData(data);
    }

    @action setData(data) {
        this.items = data;
    }

    @action clear() {
        this.items = [];
    }

}
