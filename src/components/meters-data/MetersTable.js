import { inject, observer } from 'mobx-react';
import React, { Component, Fragment } from 'react';

import ColdWater from './ColdWater';
import Electric from './Electric';
import Gas from './Gas';
import HotWater from './HotWater';

@inject('store')
@observer
export default class MetersTable extends Component {

    state = {
        meters: []
    };

    constructor(props) {
        super(props);

        this.metersStore = this.props.store.metersStore;

        this.send = this.send.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    async componentDidMount() {
        await this.metersStore.load();
    }

    onChange(data) {
        let { meters } = this.state;
        let index = meters.findIndex(m => m.meterId === data.meterId && m.scaleId === data.scaleId);

        if (index > -1) {
            let meter = meters[index];

            meter.value = data.value;
        } else {
            meters.push(data);
        }

        this.setState({
            meters: [
                ...meters
            ]
        });
    }

    async send() {
        try {
            let promises = this.state.meters.filter(m => !!m.value)
                .map(meter => this.metersStore.update(meter));

            await Promise.all(promises);
            await this.metersStore.load();
        } catch (e) {
            console.error('Save error', e);
        }
    }

    render() {
        let { items } = this.metersStore;
        let { meters } = this.state;

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
                                return <ColdWater item={item} key={key} onChange={this.onChange}/>;
                            case 'горячая вода':
                                return <HotWater item={item} key={key} onChange={this.onChange}/>;
                            case 'электричество':
                                return <Electric item={item} key={key} onChange={this.onChange}/>;
                            case 'газ':
                                return <Gas item={item} key={key} onChange={this.onChange}/>;
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
