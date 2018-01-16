import { inject } from 'mobx-react';
import React, { Component, Fragment } from 'react';

import ColdWater from './ColdWater';
import Electric from './Electric';
import Gas from './Gas';
import HotWater from './HotWater';

@inject('store')
export default class MetersTable extends Component {

    constructor(props) {
        super(props);

        this.store = this.props.store.metersState;

        this.send = this.send.bind(this);
    }

    send() {
        // nope
    }

    render() {
        let { items } = this.store;

        return (
            <Fragment>
                <div className="meters_table">
                    <div className="row header">
                        <div className="cell">Счётчик</div>
                        <div className="cell">Предыдущие</div>
                        <div className="cell">Текущие</div>
                        <div className="cell"/>
                    </div>
                    {items.map((item, key) => {
                        // @todo: Нужен enum/константы по типам счётчиков
                        switch (item.title.toLowerCase()) {
                            case 'холодная вода':
                                return <ColdWater item={item} key={key}/>;
                            case 'горячая вода':
                                return <HotWater item={item} key={key}/>;
                            case 'электричество':
                                return <Electric item={item} key={key}/>;
                            case 'газ':
                                return <Gas item={item} key={key}/>;
                        }
                    })}
                </div>
                <div className="footer">
                    <button className="autowidth float_right submit" onClick={this.send}>Отправить</button>
                </div>
            </Fragment>
        );
    }

}
