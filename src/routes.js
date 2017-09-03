import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Properties from './containers/Properties';
import Login from './containers/Login';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Login} />
    {<Route path="properties" component={Properties} />},
    {<Route path="account/login" component={Login} />}
  </Route>
);
