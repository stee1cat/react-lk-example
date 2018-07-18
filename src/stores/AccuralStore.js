import { observable, action } from 'mobx';

import { RestApi } from '../utils/api';

export default class AccuralStore {
  @observable years = [];

  constructor() {
    this.api = RestApi;
  }

  async load(sYear) {
    this.setYears(await this.api.getAccrualYears(), sYear);
  }

  @action setYears(years, sYear) {
    this.years = years.map((year, id) => observable({
      id,
      year,
      active: sYear === year,
    }));
  }

  async loadYear(year) {
    return this.api.getAccrualPeriodsForYear(year);
  }

  async loadPeriod(period) {
    return this.api.getExtendAccuralInfoForYearPeriod(period.split('-')[0], period);
  }
}
