import {inject, observer} from 'mobx-react/index';
import {observable} from 'mobx';
import React, {Component} from 'react';

import {updateTitle} from '../utils/app';
import AccuralBoard from './accural/AccuralBoard';
import YearSelector from './accural/yearSelector';
import Protected from './common/Protected';

@inject('store')
@observer
class Accurals extends Component
{

    @observable state = {
        selectedYear: (() => {
            let date = new Date();
            return date.getFullYear();
        })()
    };
    @observable periods = [];

    constructor(props)
    {
        super(props);

        updateTitle('Начисления');
        this.store = this.props.store.accuralStore;
    }

    async componentWillMount()
    {
        await this.store.load(this.state.selectedYear);
    }

    async componentDidMount()
    {
        await this.loadPeriods();
        console.log(this.periods);
    }

    async onChange(year)
    {
        console.log(year.year);
        this.state.selectedYear = year.year;
        await this.loadPeriods();
    }

    async loadPeriods()
    {
        this.periods = await this.store.loadYear(this.state.selectedYear);
    }

    render()
    {

        return (
            <div className="main_container">
                <div className="headline">
                    <YearSelector years={this.store.years} state={this.state} changeCb={this.onChange.bind(this)}/>
                </div>
                <div className="accurals_page">
                    <div className="content_block">
                        <AccuralBoard periods={this.periods}/>
                    </div>
                </div>
            </div>
        );
    }

}

export default Protected(Accurals);
