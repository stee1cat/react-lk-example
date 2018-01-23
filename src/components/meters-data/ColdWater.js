import React, { Component } from 'react';

import Water from './Water';

export default class ColdWater extends Component {

    render() {
        let { item, onChange } = this.props;

        return (
            <Water icon="cold_water" title="Холодная вода" item={item} onChange={onChange}/>
        );
    }

}
