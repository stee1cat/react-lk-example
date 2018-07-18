import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

export default function DataWrapper(DataWrappedComponent) {
  @inject('store')
  @observer
  class DataFetcher extends Component {
    static propTypes = {
      store: PropTypes.object,
      match: PropTypes.shape({
        id: PropTypes.number,
        url: PropTypes.string,
      }),
    };

    constructor(props) {
      super(props);

      this.appStore = props.store.appStore;
    }

    componentDidMount() {
      const { match } = this.props;
      const id = match.id ? match.id : null;

      this.appStore.fetchData(match.url, id);
    }

    render() {
      return <DataWrappedComponent {...this.props} />;
    }
  }

  return DataFetcher;
}
