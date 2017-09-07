import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Properties from './containers/Properties';
import AddPropertyPage from './containers/AddPropertyPage';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Properties} />
    {<Route path="properties" component={Properties} />},
    {<Route path="properties/add" component={AddPropertyPage} />},
    {<Route path="account/register" component={RegisterPage} />},
    {<Route path="account/login" component={LoginPage} />}
  </Route>
);
