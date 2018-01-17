import React, { Component, Fragment } from 'react';

import History from './History';

let componentId = 0;

export default class MeterRow extends Component {

    constructor() {
        super();

        componentId++;
    }

    render() {
        let { children, title, icon, info, item } = this.props;
        let id = `meter-row-${componentId}`;

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
                            {info}
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
                    <History item={item}/>
                </div>
            </Fragment>
        );
    }

}
