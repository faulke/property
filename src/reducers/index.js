import { combineReducers } from 'redux';
import { properties } from './properties';
import { auth } from './auth';

const rootReducer = combineReducers({
  properties,
  auth
});

export default rootReducer;
