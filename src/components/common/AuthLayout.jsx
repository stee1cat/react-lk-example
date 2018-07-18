import { inject, observer } from 'mobx-react/index';
import React, { Component } from 'react';
import Redirect from 'react-router-dom/es/Redirect';
import PropTypes from 'prop-types';

@inject('store', 'routing')
@observer
export default class AuthLayout extends Component {
  static propTypes = {
    children: PropTypes.any,
    store: PropTypes.object,
  };

  render() {
    const {
      children,
      store: {
        appStore,
      },
    } = this.props;

    return (
      <div className="login_screen_container">
        <div className="main">
          { children }
        </div>
        {appStore.authenticated && !appStore.authenticating && <Redirect to="/" />}
      </div>
    );
  }
}
