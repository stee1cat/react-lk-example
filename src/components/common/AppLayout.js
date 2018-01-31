import { inject } from 'mobx-react/index';
import React, { Component, Fragment } from 'react';

import Footer from './Footer';
import Header from './Header';

@inject('routing', 'store')
export default class AppLayout extends Component {

    componentWillUnmount() {
        let { metersStore, accountStore } = this.props.store;

        accountStore.reset();
        metersStore.reset();
    }

    render() {
        let {
            children,
            routing
        } = this.props;

        return (
            <Fragment>
                <Header location={routing.location}/>
                {children}
                <Footer/>
            </Fragment>
        );
    }

}
