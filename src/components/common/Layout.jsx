import { inject } from 'mobx-react';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import AppLayout from './AppLayout';
import AuthLayout from './AuthLayout';

@inject('store')
export default class Layout extends Component {
  static propTypes = {
    store: PropTypes.object,
    children: PropTypes.any,
  };

  state = {
    loading: true,
    authenticated: false,
  };

  async componentDidMount() {
    await this.loadAccountInfo();
  }

  async componentWillReceiveProps() {
    const { appStore } = this.props.store;

    if (!this.state.authenticated && appStore.authenticated) {
      await this.loadAccountInfo();
    }

    this.setState({
      authenticated: appStore.authenticated,
    });
  }

  async loadAccountInfo() {
    let { appStore, accountStore } = this.props.store;

    if (appStore.token) {
      this.setState({
        loading: true,
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
      loading: false,
    });
  }

  render() {
    const {
      children,
      store: {
        appStore,
      },
    } = this.props;
    const { loading } = this.state;

    if (loading) {
      return (
        <Fragment>
          loading
        </Fragment>
      );
    }

    if (appStore.authenticated) {
      return (
        <AppLayout>
          {children}
        </AppLayout>
      );
    }

    return (
      <AuthLayout>
        {children}
      </AuthLayout>
    );
  }
}
