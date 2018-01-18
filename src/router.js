
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home.js';
import Login from './components/Login/Login.js';


export default (
    <Switch>
        
        <Route component={ Home } path='/' exact />
        <Route component={ Login } path='/login' exact />

    </Switch>
)
