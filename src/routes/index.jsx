import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from '../pages/login';

const routes = (
  <Router>
    <Route path='/' component={Login} />
    <Route path='/login' component={Login} />
  </Router>
);

export default routes;