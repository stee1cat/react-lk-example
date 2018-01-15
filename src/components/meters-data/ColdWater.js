import React, { Component } from 'react';

import Water from './Water';

export default class ColdWater extends Component {

    render() {
        let { item } = this.props;

        return (
            <Water icon="cold_water" title="Холодная вода" subtitle={item.serial}/>
        );
    }

}
