import React, { Component } from 'react';

import Water from './Water';

export default class HotWater extends Component {

    render() {
        let { item, onChange } = this.props;

        return (
            <Water icon="hot_water" title="Горячая вода" item={item} onChange={onChange}/>
        );
    }

}
