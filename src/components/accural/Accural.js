import {inject, observer} from 'mobx-react/index';
import React, {Component, Fragment} from 'react';
import {classnames} from '../../utils/styles';
import {observable} from 'mobx';
import AccuralExtInfo from './AccuralExtInfo';

@inject('store')
@observer
export default class Accural extends Component
{

    @observable extInfo = [];

    constructor(p)
    {
        super(p);
    }

    moneyToHTML(money, success)
    {
        let str = money.toFixed(2);

        let arr = str.split('.');

        let cents = arr[1];
        let midNums = arr[0];

        if (midNums.length > 3)
        {
            midNums = midNums.slice(0, -3) + ' ' + midNums.slice(-3);
        }

        return (
            <Fragment>
                <div className={classnames({
                    value: true,
                    success
                })}>
                    <div className="big_sum">{midNums}</div>
                    <div className="cents">{cents}</div>
                </div>
            </Fragment>
        );
    }

    fineToHTML(fine)
    {
        if (fine > 0)
            return (
                <div className="sub_info">Включая задолженность: {fine.toFixed(2)} ₽</div>
            );

        return (
            <Fragment></Fragment>
        );
    }

    async componentWillMount()
    {
        let x = await this.props.store.accuralStore.loadPeriod(this.props.accural.period);
        console.log(x);
        this.extInfo = x.items;
    }

    render()
    {
        let {accural} = this.props;

        let date = new Date(accural.period);

        let periodName = date.toLocaleString('ru', {
            month: 'long'
        });

        periodName = periodName[0].toUpperCase() + periodName.slice(1);

        let periodYear = date.getFullYear();

        return (
            <Fragment>
                <input className="not_visible" type="checkbox" id={accural.period}/>
                <div className="item">
                    <div className="header">
                        <div className="month_name">{periodName}, {periodYear}</div>
                        <div className="history_toggler">
                            <div className="text">Подробнее</div>
                            <div className="divider"></div>
                            <label htmlFor={accural.period} className="trigger"></label>
                        </div>
                    </div>
                    <div className="accural_info">
                        <div className="element">
                            <div className="title">Сумма</div>
                            {this.moneyToHTML(accural.amount)}
                        </div>
                        <div className="element">
                            <div className="title">Пени</div>
                            {this.moneyToHTML(accural.fine)}
                        </div>
                        <div className="element">
                            <div className="title">К оплате</div>
                            {this.moneyToHTML(accural.toPay)}
                            {this.fineToHTML(accural.fine)}
                        </div>
                        <div className="element">
                            <div className="title">Оплачено</div>
                            {this.moneyToHTML(accural.paid, accural.paid === accural.toPay)}
                        </div>
                    </div>
                    <AccuralExtInfo info={this.extInfo} id={accural.period}/>
                </div>
            </Fragment>
        );
    }
}
