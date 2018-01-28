import React, { Component, Fragment } from 'react';

export default class Unit extends Component {

    render() {
        let { value } = this.props;
        let exp;

        if (exp = /^м([23])$/i.exec(value)) {
            return (
                <Fragment>
                    м<sup>{exp[1]}</sup>
                </Fragment>
            );
        } else {
            return value;
        }
    }

}
