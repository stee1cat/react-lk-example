import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import DevTools from 'mobx-react-devtools';

import Layout from './common/Layout';
import MetersData from './MetersData';
import Profile from './Profile';
import Login from './Login';

export default class App extends Component {

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Profile}/>
                <Route exact path='/meters-data' component={MetersData}/>
                <Route exact path='/login' component={Login}/>
            </Layout>
        );
    }

}
