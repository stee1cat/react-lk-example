import { inject, observer } from 'mobx-react/index';
import React, { Component } from 'react';
import Redirect from 'react-router-dom/es/Redirect';

@inject('store', 'routing')
@observer
export default class AuthLayout extends Component {

    render() {
        let {
            children,
            store: {
                appState
            }
        } = this.props;

        return (
            <div className="login_screen_container">
                <div className="main">
                    {children}
                </div>
                {appState.authenticated && !appState.authenticating && <Redirect to='/'/>}
            </div>
        );
    }

}
