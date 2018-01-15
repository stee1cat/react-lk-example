import React, { Component } from 'react';

import Water from './Water';

export default class HotWater extends Component {

    render() {
        let { item } = this.props;

        return (
            <Water icon="hot_water" title="Горячая вода" subtitle={item.serial}/>
        );
    }

}
