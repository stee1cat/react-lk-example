import { observable, action } from 'mobx';

import { RestApi } from '../utils/api';

export default class MetersStore {
  @observable items = [];

  constructor() {
    this.api = RestApi;
  }

  async load() {
    const { meters } = await this.api.getMeters();

    this.set(meters);
  }

  @action set(items) {
    this.items = items.map(meter => ({
      ...meter,
      id: +meter.id,
      scales: meter.scales.map(scale => ({
        ...scale,
        id: +scale.id,
      })),
    }));
  }

  @action
  async update({ meterId, scaleId, value }) {
    return this.api.setMeter(meterId, scaleId, value);
  }

  @action reset() {
    this.items = [];
  }
}
