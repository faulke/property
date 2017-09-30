import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import routes from './routes';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore({
  auth: { name: localStorage.getItem('name'), isPosting: false } 
});

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
registerServiceWorker();
