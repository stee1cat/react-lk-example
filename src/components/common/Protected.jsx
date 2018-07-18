import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Protected(ProtectedComponent) {
  @inject('store')
  @observer
  class AuthenticatedComponent extends Component {
    static propTypes = {
      store: PropTypes.object,
      location: PropTypes.object,
    };

    constructor(props) {
      super(props);

      this.appStore = props.store.appStore;
    }

    render() {
      const { location } = this.props;
      const { authenticated, authenticating } = this.appStore;

      if (authenticated) {
        return <ProtectedComponent {...this.props} />;
      }

      if (!authenticating && !authenticated) {
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: location,
              },
            }}
          />
        );
      }

      return <Fragment />;
    }
  }

  return AuthenticatedComponent;
}
