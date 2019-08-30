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
import ListingsPage from './containers/ListingsPage';
import PaymentsPage from './containers/PaymentsPage';
import ApplicationsPage from './containers/ApplicationsPage';
import MaintenancePage from './containers/MaintenancePage';
import ReportsPage from './containers/ReportsPage';
import SettingsPage from './containers/SettingsPage';


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
        <IndexRoute component={ListingsPage} />
        <Route path="/listings/:id/new" component={AddListingPage} />
      </Route>
      <Route path="/payments">
        <IndexRoute component={PaymentsPage} />
      </Route>
      <Route path="/applications">
        <IndexRoute component={ApplicationsPage} />
      </Route>
      <Route path="/maintenance">
        <IndexRoute component={MaintenancePage} />
      </Route>
      <Route path="/reports">
        <IndexRoute component={ReportsPage} />
      </Route>
      <Route path="/settings">
        <IndexRoute component={SettingsPage} />
      </Route>
    </Route>
    <Route component={EmptyLayout}>
      <IndexRoute component={LoginPage} />
      <Route path="/account/register" component={RegisterPage} />
      <Route path="/account/login" component={LoginPage} />
    </Route>
  </Router>
);
