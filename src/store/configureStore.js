import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import apiAuth from '../middleware/apiAuth';
import rootReducer from '../reducers/index';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, apiAuth, apiMiddleware)
  );
}
