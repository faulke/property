import { combineReducers } from 'redux';
import { properties } from './properties';
import { auth } from './auth';
import { create } from './createProperty';

const rootReducer = combineReducers({
  properties,
  auth,
  create
});

export default rootReducer;
