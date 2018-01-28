import React, { Component, Fragment } from 'react';

import History from './History';

let componentId = 0;

export default class MeterRow extends Component {

    constructor(props) {
        super(props);

        componentId++;

        this.state = {
            componentId
        }
    }

    render() {
        let { children, title, icon, rates, item } = this.props;
        let id = `meter-row-${this.state.componentId}`;

        return (
            <Fragment>
                <input className="not_visible" type="checkbox" id={id}/>
                <div className="row">
                    <div className="cell">
                        <div className="meter">
                            <div className={`icon icon_meter_${icon}`}/>
                            <div className="info">
                                <div className="title">{title}</div>
                                <div className="sub_title">{item.serial}</div>
                            </div>
                            {rates}
                        </div>
                    </div>
                    {children}
                    <div className="cell">
                        <div className="history_toggler">
                            <div className="text">История</div>
                            <div className="divider"/>
                            <label htmlFor={id} className="trigger"/>
                        </div>
                    </div>
                    <History scales={item.scales}/>
                </div>
            </Fragment>
        );
    }

}
