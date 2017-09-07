import { combineReducers } from 'redux';
import { properties } from './properties';
import { auth } from './auth';
import { register } from './register';
import { create } from './createProperty';

const rootReducer = combineReducers({
  properties,
  auth,
  register,
  create
});

export default rootReducer;
