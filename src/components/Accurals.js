import {inject, observer} from 'mobx-react/index';
import {observable} from 'mobx';
import React, {Component} from 'react';

import {updateTitle} from '../utils/app';
import YearSelector from './accural/yearSelector';
import Protected from './common/Protected';

@inject('store')
@observer
class Accurals extends Component {

    @observable state = {
        selectedYear: (() => {
            let date = new Date();
            return date.getFullYear();
        })()
    };
    @observable periods = [];

    constructor(props) {
        super(props);

        updateTitle('Начисления');
        this.store = this.props.store.accuralStore;
    }

    async componentWillMount() {
        await this.store.load(this.state.selectedYear);
    }

    async onChange(year)
    {
        console.log(year.year);
        this.state.selectedYear = year.year;
    }

    render() {

        return (
            <div className="main_container">
                <div className="headline">
                    <YearSelector years={this.store.years} state={this.state} changeCb={this.onChange.bind(this)}/>
                </div>
                <div className="accurals_page">
                    <div className="content_block">
                        <div className="accurals">
                            <input className="not_visible" type="checkbox" id="item-1"/>
                            <div className="item">
                                <div className="header">
                                    <div className="month_name">Октябрь, 2017</div>
                                    <div className="history_toggler">
                                        <div className="text">Подробнее</div>
                                        <div className="divider"></div>
                                        <label htmlFor="item-1" className="trigger"></label>
                                    </div>
                                </div>
                                <div className="accural_info">
                                    <div className="element">
                                        <div className="title">Сумма</div>
                                        <div className="value">
                                            <div className="big_sum">1 398</div>
                                        </div>
                                    </div>
                                    <div className="element">
                                        <div className="title">Пени</div>
                                        <div className="value">
                                            <div className="big_sum">0</div>
                                        </div>
                                    </div>
                                    <div className="element">
                                        <div className="title">К оплате</div>
                                        <div className="value">
                                            <div className="big_sum">2 421</div>
                                            <div className="cents">56</div>
                                        </div>
                                        <div className="sub_info">Включая задолженность: 1 023, 56 ₽</div>
                                    </div>
                                    <div className="element">
                                        <div className="title">Оплачено</div>
                                        <div className="value success">
                                            <div className="big_sum">2 421</div>
                                            <div className="cents">56</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="details_container">
                                    <div className="details_table">
                                        <div className="row header">
                                            <div className="cell">Услуга ЖКХ</div>
                                            <div className="cell">Тариф</div>
                                            <div className="cell">Расход</div>
                                            <div className="cell">Начислено</div>
                                            <div className="cell">Льгота</div>
                                            <div className="cell">Перерасчёт</div>
                                            <div className="cell">Итого</div>
                                        </div>
                                        <div className="row">
                                            <div className="cell">ХВС ОДН</div>
                                            <div className="cell">12,00</div>
                                            <div className="cell">0</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                        </div>
                                        <div className="row">
                                            <div className="cell">ХВС ОДН</div>
                                            <div className="cell">12,00</div>
                                            <div className="cell">0</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                        </div>
                                        <div className="row">
                                            <div className="cell">ХВС ОДН</div>
                                            <div className="cell">12,00</div>
                                            <div className="cell">0</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                        </div>
                                        <div className="row">
                                            <div className="cell">ХВС ОДН</div>
                                            <div className="cell">12,00</div>
                                            <div className="cell">0</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                        </div>
                                        <div className="row">
                                            <div className="cell">ХВС ОДН</div>
                                            <div className="cell">12,00</div>
                                            <div className="cell">0</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                        </div>
                                        <div className="row">
                                            <div className="cell">ХВС ОДН</div>
                                            <div className="cell">12,00</div>
                                            <div className="cell">0</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                        </div>
                                        <div className="row">
                                            <div className="cell">ХВС ОДН</div>
                                            <div className="cell">12,00</div>
                                            <div className="cell">0</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                        </div>
                                        <div className="row">
                                            <div className="cell">ХВС ОДН</div>
                                            <div className="cell">12,00</div>
                                            <div className="cell">0</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input className="not_visible" type="checkbox" id="item-2"/>
                            <div className="item">
                                <div className="header">
                                    <div className="month_name">Сентябрь, 2017</div>
                                    <div className="history_toggler">
                                        <div className="text">Подробнее</div>
                                        <div className="divider"></div>
                                        <label htmlFor="item-2" className="trigger"></label>
                                    </div>
                                </div>
                                <div className="accural_info">
                                    <div className="element">
                                        <div className="title">Сумма</div>
                                        <div className="value">
                                            <div className="big_sum">1 398</div>
                                            <div className="cents">24</div>
                                        </div>
                                    </div>
                                    <div className="element">
                                        <div className="title">Пени</div>
                                        <div className="value">
                                            <div className="big_sum">13</div>
                                            <div className="cents">74</div>
                                        </div>
                                    </div>
                                    <div className="element">
                                        <div className="title">К оплате</div>
                                        <div className="value">
                                            <div className="big_sum">1 411</div>
                                            <div className="cents">98</div>
                                        </div>
                                    </div>
                                    <div className="element">
                                        <div className="title">Оплачено</div>
                                        <div className="value">
                                            <div className="big_sum">388</div>
                                            <div className="cents">42</div>
                                        </div>
                                        <div className="sub_info error">Еще оплатить: 1 023, 56 ₽</div>
                                    </div>
                                </div>
                                <div className="details_container">
                                    <div className="details_table">
                                        <div className="row header">
                                            <div className="cell">Услуга ЖКХ</div>
                                            <div className="cell">Тариф</div>
                                            <div className="cell">Расход</div>
                                            <div className="cell">Начислено</div>
                                            <div className="cell">Льгота</div>
                                            <div className="cell">Перерасчёт</div>
                                            <div className="cell">Итого</div>
                                        </div>
                                        <div className="row">
                                            <div className="cell">ХВС ОДН</div>
                                            <div className="cell">12,00</div>
                                            <div className="cell">0</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                        </div>
                                        <div className="row">
                                            <div className="cell">ХВС ОДН</div>
                                            <div className="cell">12,00</div>
                                            <div className="cell">0</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                        </div>
                                        <div className="row">
                                            <div className="cell">ХВС ОДН</div>
                                            <div className="cell">12,00</div>
                                            <div className="cell">0</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                        </div>
                                        <div className="row">
                                            <div className="cell">ХВС ОДН</div>
                                            <div className="cell">12,00</div>
                                            <div className="cell">0</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                        </div>
                                        <div className="row">
                                            <div className="cell">ХВС ОДН</div>
                                            <div className="cell">12,00</div>
                                            <div className="cell">0</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                        </div>
                                        <div className="row">
                                            <div className="cell">ХВС ОДН</div>
                                            <div className="cell">12,00</div>
                                            <div className="cell">0</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                        </div>
                                        <div className="row">
                                            <div className="cell">ХВС ОДН</div>
                                            <div className="cell">12,00</div>
                                            <div className="cell">0</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                        </div>
                                        <div className="row">
                                            <div className="cell">ХВС ОДН</div>
                                            <div className="cell">12,00</div>
                                            <div className="cell">0</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                            <div className="cell">0,00</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Protected(Accurals);
