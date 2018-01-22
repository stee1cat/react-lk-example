import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Nav from './Nav';

@inject('store')
@observer
export default class Header extends Component {

    constructor(props) {
        super(props);

        this.appStore = this.props.store.appStore;
    }

    render() {
        const { authenticated } = this.appStore;

        return (
            <Nav location={this.props.location}/>
        );
    }
}

