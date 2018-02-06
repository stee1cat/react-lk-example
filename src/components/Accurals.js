import React, { Component } from 'react';

import { updateTitle } from '../utils/app';
import Protected from './common/Protected';

class Accurals extends Component {

    constructor(props) {
        super(props);

        updateTitle('Начисления');
    }

    render() {
        return (
            <div className="main_container">
                <div className="headline">
                    <input className="not_visible" type="checkbox" id="year-selector"/>
                    <div className="text">Начисления в
                        <label className="trigger" htmlFor="year-selector">
                            <span className="year-text">2017 году </span>
                            <div className="icon"></div>
                            <div className="years_container">
                                <div className="year">2015</div>
                                <div className="year">2016</div>
                                <div className="year active">2017</div>
                            </div>
                        </label>
                    </div>
                </div>
                <div className="accurals_page">
                    <div className="content_block">
                    </div>
                </div>
            </div>
        );
    }

}

export default Protected(Accurals);
