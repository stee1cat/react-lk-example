import React from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { rehydrate, hotRehydrate } from 'rfx-core';

import '../static/styles/index.scss';
import { IS_PRODUCTION } from './utils/constants';
import App from './components/App';
import './stores/stores';

const store = rehydrate();

const renderApp = () => {
  const browserHistory = createBrowserHistory();
  const routeStore = new RouterStore();
  const history = syncHistoryWithStore(browserHistory, routeStore);

  render(
    <Router history={history}>
      <Provider store={IS_PRODUCTION ? store : hotRehydrate()} routing={routeStore}>
        <App />
      </Provider>
    </Router>,
    document.getElementById('root'),
  );
};

renderApp(App);
