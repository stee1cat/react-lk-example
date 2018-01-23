import { observable, action } from 'mobx';

import { RestApi } from '../utils/api';

export default class MetersStore {

    @observable items = [];

    async load() {
        let { meters } = await RestApi.getMeters();

        this.set(meters);
    }

    @action set(items) {
        this.items = items.map(meter => ({
                ...meter,
                id: +meter.id,
                scales: meter.scales.map(scale => ({
                    ...scale,
                    id: +scale.id
                }))
            }));
    }

    @action async update(meter) {
        return RestApi.setMeter(meter.meterId, meter.scaleId, meter.value);
    }

    @action clear() {
        this.items = [];
    }

}
