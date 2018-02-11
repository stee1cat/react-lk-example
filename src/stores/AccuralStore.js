import { observable, action } from 'mobx';

import { RestApi } from '../utils/api';

export default class AccuralStore
{
    @observable years = [];

    async load(sYear) {

        this.setYears(await RestApi.getAccrualYears(), sYear);
    }

    @action setYears(years, sYear)
    {
        this.years = years.map((year, id) => {
            return observable({
                id,
                year,
                active: sYear === year
            })
        });

        window.test = this.years;

    }
}
