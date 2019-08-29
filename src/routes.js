import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import EmptyLayout from './components/EmptyLayout';
import MainLayout from './components/MainLayout';
import Properties from './containers/Properties';
import AddPropertyPage from './containers/AddPropertyPage';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';
import PropertyDetailPage from './containers/PropertyDetailPage';
import AddListingPage from './containers/AddListingPage';

export default (
  <Router>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Properties} />
      <Route path="/properties">
        <IndexRoute component={Properties} />
        <Route path="/properties/add" component={AddPropertyPage} />
        <Route path="/properties/:id(/:tab)" component={PropertyDetailPage} />
      </Route>
      <Route path="/listings">
        <Route path="/listings/:id/new" component={AddListingPage} />
      </Route>
    </Route>
    <Route component={EmptyLayout}>
      <IndexRoute component={LoginPage} />
      <Route path="/account/register" component={RegisterPage} />
      <Route path="/account/login" component={LoginPage} />
    </Route>
  </Router>
);
