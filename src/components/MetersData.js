import React, { Component } from 'react';

import Protected from './common/Protected';
import History from './meters-data/History';

class MetersData extends Component {

    render() {
        return (
            <div className="main_container">
                <div className="headline">
                    <div className="text">Показания счётчиков</div>
                </div>
                <div className="meters_data_page">
                    <div className="content_block">
                        <div className="meters_table">
                            <div className="row header">
                                <div className="cell">Счётчик</div>
                                <div className="cell">Предыдущие</div>
                                <div className="cell">Текущие</div>
                                <div className="cell"/>
                            </div>
                            <input className="not_visible" type="checkbox" id="row-1"/>
                            <div className="row">
                                <div className="cell">
                                    <div className="meter">
                                        <div className="icon icon_meter_cold_water"/>
                                        <div className="info">
                                            <div className="title">Холодная вода</div>
                                            <div className="sub_title">№ 508208-2013</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="cell">
                                    <div className="prev_data">
                                        <div className="value_container">
                                            <span className="bold">8</span>
                                            <span className="units">м<sup>3</sup></span>
                                        </div>
                                        <div className="month">Сентябрь</div>
                                    </div>
                                </div>
                                <div className="cell">
                                    <div className="input_container">
                                        <div className="input_with_units">
                                            <input type="text" />
                                            <div className="units">м<sup>3</sup></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="cell">
                                    <div className="history_toggler">
                                        <div className="text">История</div>
                                        <div className="divider"/>
                                        <label htmlFor="row-1" className="trigger"/>
                                    </div>
                                </div>
                                <History/>
                            </div>
                            <input className="not_visible" type="checkbox" id="row-2"/>
                            <div className="row">
                                <div className="cell">
                                    <div className="meter">
                                        <div className="icon icon_meter_hot_water"/>
                                        <div className="info">
                                            <div className="title">Горячая вода</div>
                                            <div className="sub_title">№ 508208-2013</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="cell">
                                    <div className="prev_data">
                                        <div className="value_container">
                                            <span className="bold">5</span>
                                            <span className="units">м<sup>3</sup></span>
                                        </div>
                                        <div className="month">Сентябрь</div>
                                    </div>
                                </div>
                                <div className="cell">
                                    <div className="input_with_units">
                                        <input type="text" />
                                        <div className="units">м<sup>3</sup></div>
                                    </div>
                                </div>
                                <div className="cell">
                                    <div className="history_toggler">
                                        <div className="text">История</div>
                                        <div className="divider"/>
                                        <label htmlFor="row-2" className="trigger"/>
                                    </div>
                                </div>
                                <History/>
                            </div>
                            <input className="not_visible" type="checkbox" id="row-3"/>
                            <div className="row">
                                <div className="cell">
                                    <div className="meter">
                                        <div className="icon icon_meter_electric"/>
                                        <div className="info">
                                            <div className="title">Электричество</div>
                                            <div className="sub_title">№ 508208-2013</div>
                                        </div>
                                        <div className="rate_container">
                                            <div className="rate">День (Т1)</div>
                                            <div className="rate">Ночь (Т2)</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="cell">
                                    <div className="prev_data">
                                        <div className="value_container">
                                            <span className="bold">56</span>
                                            <span className="units">кВт*ч</span>
                                        </div>
                                        <div className="month">Сентябрь</div>
                                    </div>
                                    <div className="prev_data">
                                        <div className="value_container">
                                            <span className="bold">42</span>
                                            <span className="units">кВт*ч</span>
                                        </div>
                                        <div className="month">Сентябрь</div>
                                    </div>
                                </div>
                                <div className="cell">
                                    <div className="input_container">
                                        <div className="input_with_units">
                                            <input type="text" />
                                            <div className="units">кВт*ч</div>
                                        </div>
                                    </div>
                                    <div className="input_container">
                                        <div className="input_with_units">
                                            <input type="text"/>
                                            <div className="units">кВт*ч</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="cell">
                                    <div className="history_toggler">
                                        <div className="text">История</div>
                                        <div className="divider"/>
                                        <label htmlFor="row-3" className="trigger"/>
                                    </div>
                                </div>
                                <History/>
                            </div>
                            <input className="not_visible" type="checkbox" id="row-4"/>
                            <div className="row">
                                <div className="cell">
                                    <div className="meter">
                                        <div className="icon icon_meter_gas"/>
                                        <div className="info">
                                            <div className="title">Газ</div>
                                            <div className="sub_title">№ 508208-2013</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="cell">
                                    <div className="prev_data">
                                        <div className="value_container">
                                            <span className="bold">5</span>
                                            <span className="units">м<sup>3</sup></span>
                                        </div>
                                        <div className="month">Сентябрь</div>
                                    </div>
                                </div>
                                <div className="cell">
                                    <div className="input_container">
                                        <div className="input_with_units">
                                            <input type="text"/>
                                            <div className="units">м<sup>3</sup></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="cell">
                                    <div className="history_toggler">
                                        <div className="text">История</div>
                                        <div className="divider"/>
                                        <label htmlFor="row-4" className="trigger"/>
                                    </div>
                                </div>
                                <History/>
                            </div>
                        </div>
                        <div className="footer">
                            <button className="autowidth float_right submit">Отправить</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Protected(MetersData);
