import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Properties from './containers/Properties';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Properties} />
    {
    /* 
    <Route path="home" component={HomePage} />}
    {<Route path="weather" component={WeatherPage} /> 
    */
    }
  </Route>
);
