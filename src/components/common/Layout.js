import { inject } from 'mobx-react';
import React, { Component } from 'react';
import AppLayout from './AppLayout';

import AuthLayout from './AuthLayout';

@inject('store')
export default class Layout extends Component {

    render() {
        const {
            children,
            store: {
                appState
            }
        } = this.props;

        return appState.authenticated ? <AppLayout children={children}/> : <AuthLayout children={children}/>;
    }

}
