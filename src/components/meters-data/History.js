import React, { Component } from 'react';

export default class History extends Component {

    render() {
        return (
            <div className="history_container">
                <div className="year_container">
                    <div className="arrow left"/>
                    <div className="year">2017</div>
                    <div className="arrow right"/>
                </div>
                <div className="table_container">
                    <div className="column">
                        <div className="month">Январь</div>
                        <div className="value">
                            <span className="bold">8</span>
                            <span className="units">м<sup>3</sup></span>
                        </div>
                    </div>
                    <div className="column">
                        <div className="month">Февраль</div>
                        <div className="value">
                            <span className="bold">8</span>
                            <span className="units">м<sup>3</sup></span>
                        </div>
                    </div>
                    <div className="column">
                        <div className="month">Март</div>
                        <div className="value">
                            <span className="bold">8</span>
                            <span className="units">м<sup>3</sup></span>
                        </div>
                    </div>
                    <div className="column">
                        <div className="month">Апрель</div>
                        <div className="value">
                            <span className="bold">8</span>
                            <span className="units">м<sup>3</sup></span>
                        </div>
                    </div>
                    <div className="column">
                        <div className="month">Май</div>
                        <div className="value">
                            <span className="bold">8</span>
                            <span className="units">м<sup>3</sup></span>
                        </div>
                    </div>
                    <div className="column">
                        <div className="month">Июнь</div>
                        <div className="value">
                            <span className="bold">8</span>
                            <span className="units">м<sup>3</sup></span>
                        </div>
                    </div>
                    <div className="column">
                        <div className="month">Июль</div>
                        <div className="value">
                            <span className="bold">8</span>
                            <span className="units">м<sup>3</sup></span>
                        </div>
                    </div>
                    <div className="column">
                        <div className="month">Август</div>
                        <div className="value">
                            <span className="bold">8</span>
                            <span className="units">м<sup>3</sup></span>
                        </div>
                    </div>
                    <div className="column">
                        <div className="month">Сентябрь</div>
                        <div className="value">
                            <span className="bold">8</span>
                            <span className="units">м<sup>3</sup></span>
                        </div>
                    </div>
                    <div className="column">
                        <div className="month">Октябрь</div>
                        <div className="value">
                            <span className="bold">8</span>
                            <span className="units">м<sup>3</sup></span>
                        </div>
                    </div>
                    <div className="column">
                        <div className="month">Ноябрь</div>
                        <div className="value">
                            <span className="bold">8</span>
                            <span className="units">м<sup>3</sup></span>
                        </div>
                    </div>
                    <div className="column">
                        <div className="month">Декабрь</div>
                        <div className="value">
                            <span className="bold">8</span>
                            <span className="units">м<sup>3</sup></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
