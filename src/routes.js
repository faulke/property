import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Property from './components/property/Property';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Property} />
    {
    /* 
    <Route path="home" component={HomePage} />}
    {<Route path="weather" component={WeatherPage} /> 
    */
    }
  </Route>
);
