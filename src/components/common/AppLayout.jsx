import { inject } from 'mobx-react/index';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Footer from './Footer';
import Header from './Header';

@inject('routing', 'store')
export default class AppLayout extends Component {
  static propTypes = {
    store: PropTypes.object,
    children: PropTypes.any,
    routing: PropTypes.object,
  };

  componentWillUnmount() {
    let { metersStore, accountStore } = this.props.store;

    accountStore.reset();
    metersStore.reset();
  }

  render() {
    const {
      children,
      routing,
    } = this.props;

    return (
      <Fragment>
        <Header location={routing.location} />
        { children }
        <Footer />
      </Fragment>
    );
  }
}
