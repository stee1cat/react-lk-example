import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

export default function Protected(Component) {

    @inject('store')
    @observer
    class AuthenticatedComponent extends Component {

        constructor(props) {
            super(props);

            this.appStore = this.props.store.appStore;
        }

        render() {
            const {
                authenticated,
                authenticating
            } = this.appStore;

            return (
                <Fragment>
                    {
                        authenticated
                        ? <Component {...this.props} />
                        : !authenticating && !authenticated
                            ? <Redirect to={{
                                pathname: '/login',
                                state: {from: this.props.location}
                            }}/>
                            : null
                    }
                </Fragment>
            );
        }
    }

    return AuthenticatedComponent;
}
