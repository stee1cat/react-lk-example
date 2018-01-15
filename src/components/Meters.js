import React, { Component } from 'react';

import Protected from './common/Protected';
import MetersTable from './meters-data/MetersTable';

class Meters extends Component {

    render() {
        return (
            <div className="main_container">
                <div className="headline">
                    <div className="text">Показания счётчиков</div>
                </div>
                <div className="meters_data_page">
                    <div className="content_block">
                        <MetersTable/>
                    </div>
                </div>
            </div>
        );
    }

}

export default Protected(Meters);
