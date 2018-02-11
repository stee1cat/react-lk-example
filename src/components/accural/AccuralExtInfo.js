import {observer} from 'mobx-react/index';
import React, {Component} from 'react';

@observer
export default class AccuralExtInfo extends Component
{
    constructor(p)
    {
        super(p);
    }

    render()
    {
        let info = this.props.info;

        return (
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
                    {info.map((it) => {
                        return (
                            <div key={it.zkhService} className="row">
                                <div className="cell">{it.zkhService}</div>
                                <div className="cell">{it.tariff}</div>
                                <div className="cell">{it.rate}</div>
                                <div className="cell">{it.accrued}</div>
                                <div className="cell">{it.exemption}</div>
                                <div className="cell">{it.recalculation}</div>
                                <div className="cell">{it.total}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
