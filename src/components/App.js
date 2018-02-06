import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import DevTools from 'mobx-react-devtools';

import Layout from './common/Layout';
import Accurals from './Accurals';
import MetersData from './Meters';
import Profile from './Profile';
import Login from './Login';

export default class App extends Component {

    render() {
        return (
            <Layout>
                <Switch>
                    <Route exact path='/' component={Profile}/>
                    <Route exact path='/meters-data' component={MetersData}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/accurals' component={Accurals}/>
                    <Redirect to='/'/>
                </Switch>
            </Layout>
        );
    }

}
