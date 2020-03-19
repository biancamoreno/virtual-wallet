import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from '@pages/login/Login';
import Home from '@pages/home/Home';

const routes = (
  <Router>
    <Route path='/' component={Home} />
    <Route path='/login' component={Login} />
  </Router>
);

export default routes;