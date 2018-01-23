import './styles/index.scss';
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { rehydrate, hotRehydrate } from 'rfx-core';

import { IS_PRODUCTION } from './utils/constants';
import App from './components/App';
import stores from './stores/stores';

import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import createBrowserHistory from 'history/createBrowserHistory';

const store = rehydrate();

const renderApp = Component => {
    const browserHistory = createBrowserHistory();
    const routeStore = new RouterStore();
    const history = syncHistoryWithStore(browserHistory, routeStore);

    render(
        <Router history={history}>
            <Provider store={IS_PRODUCTION ? store : hotRehydrate()} routing={routeStore}>
                <App/>
            </Provider>
        </Router>,
        document.getElementById('root')
    );
};

renderApp(App);
