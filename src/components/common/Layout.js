import { inject } from 'mobx-react';
import React, { Component, Fragment } from 'react';

import AppLayout from './AppLayout';
import AuthLayout from './AuthLayout';

@inject('store')
export default class Layout extends Component {

    state = {
        loading: true,
        authenticated: false
    };

    async componentDidMount() {
        await this.loadAccountInfo();
    }

    async componentWillReceiveProps(nextProps) {
        let { app } = this.props.store;

        if (!this.state.authenticated && app.authenticated) {
            await this.loadAccountInfo();
        }

        this.setState({
            authenticated: app.authenticated
        });
    }

    async loadAccountInfo() {
        let { app, account } = this.props.store;

        if (app.token) {
            this.setState({
                loading: true
            });

            try {
                await account.loadInfo();

                app.authenticated = true;
            } catch (error) {
                console.error(error);
            }
        }

        this.setState({
            authenticated: app.authenticated,
            loading: false
        });
    }

    render() {
        let {
            children,
            store: {
                app
            }
        } = this.props;
        let { loading } = this.state;

        return (
            <Fragment>
                {loading ? 'loading' : (app.authenticated ? <AppLayout children={children}/> : <AuthLayout children={children}/>)}
            </Fragment>
        );
    }

}
