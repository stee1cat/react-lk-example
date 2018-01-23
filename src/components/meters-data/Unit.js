import React, { Component, Fragment } from 'react';

export default class Unit extends Component {

    render() {
        let { unit } = this.props;

        if (unit === 'м3') {
            return (
                <Fragment>
                    м<sup>3</sup>
                </Fragment>
            );
        } else {
            return unit;
        }
    }

}
