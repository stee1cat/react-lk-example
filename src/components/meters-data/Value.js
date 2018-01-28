import React, { Component, Fragment } from 'react';

import Unit from './Unit';

export default class Value extends Component {

    render() {
        let { value, unit } = this.props;

        return (
            <Fragment>
                {value ? (<Fragment><span className="bold">{value}</span> <span className="units"><Unit value={unit}/></span></Fragment>) : '-'}
            </Fragment>
        );
    }

}
