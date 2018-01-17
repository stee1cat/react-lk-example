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
                app
            }
        } = this.props;

        return (
            <div className="login_screen_container">
                <div className="main">
                    {children}
                </div>
                {app.authenticated && !app.authenticating && <Redirect to='/'/>}
            </div>
        );
    }

}
