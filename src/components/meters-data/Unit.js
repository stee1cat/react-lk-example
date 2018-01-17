import React, { Component, Fragment } from 'react';

export default class Unit extends Component {

    render() {
        let { scales } = this.props.item;

        if (scales.length) {
            let unit = scales[0].unit;

            if (unit === 'м3') {
                return (
                    <Fragment>
                        м<sup>3</sup>
                    </Fragment>
                );
            } else {
                return unit;
            }
        } else {
            return '';
        }
    }

}
