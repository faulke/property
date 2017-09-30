import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import EmptyLayout from './components/EmptyLayout';
import MainLayout from './components/MainLayout';
import Properties from './containers/Properties';
import AddPropertyPage from './containers/AddPropertyPage';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';

export default (
  <Router>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Properties} />
      <Route path="/properties">
        <IndexRoute component={Properties} />
        <Route path="/properties/add" component={AddPropertyPage} />
      </Route>
    </Route>
    <Route component={EmptyLayout}>
      <IndexRoute component={LoginPage} />
      <Route path="/account/register" component={RegisterPage} />
      <Route path="/account/login" component={LoginPage} />
    </Route>
  </Router>
);
