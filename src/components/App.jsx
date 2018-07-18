import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './common/Layout';
import Accurals from './Accurals';
import MetersData from './Meters';
import Profile from './Profile';
import Login from './Login';

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Profile} />
        <Route exact path="/meters-data" component={MetersData} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/accurals" component={Accurals} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
}
