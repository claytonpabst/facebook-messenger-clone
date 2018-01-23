
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home.js';
import Login from './components/Login/Login.js';


export default (
    <Switch>
        
        <Route component={ Login } path='/' exact />
        <Route component={ Home } path='/messages' exact />

    </Switch>
)
