import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

export default function DataWrapper(Component) {

    @inject('store')
    @observer
    class DataFetcher extends Component {

        constructor(props) {
            super(props);

            this.store = this.props.store.app;
        }

        componentDidMount() {
            let pathname = this.props.match.url;
            let id = this.props.match.id ? this.props.match.id : null;
            this.store.fetchData(pathname, id);
        }

        render() {
            return <Component {...this.props}/>;
        }
    }

    return DataFetcher;
}
