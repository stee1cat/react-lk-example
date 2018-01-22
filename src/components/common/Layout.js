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
        let { appStore } = this.props.store;

        if (!this.state.authenticated && appStore.authenticated) {
            await this.loadAccountInfo();
        }

        this.setState({
            authenticated: appStore.authenticated
        });
    }

    async loadAccountInfo() {
        let { appStore, accountStore } = this.props.store;

        if (appStore.token) {
            this.setState({
                loading: true
            });

            try {
                await accountStore.loadInfo();

                appStore.authenticated = true;
            } catch (error) {
                console.error(error);
            }
        }

        this.setState({
            authenticated: appStore.authenticated,
            loading: false
        });
    }

    render() {
        let {
            children,
            store: {
                appStore
            }
        } = this.props;
        let { loading } = this.state;

        return (
            <Fragment>
                {loading ? 'loading' : (appStore.authenticated ? <AppLayout children={children}/> : <AuthLayout children={children}/>)}
            </Fragment>
        );
    }

}
