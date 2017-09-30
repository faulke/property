import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { properties } from './properties';
import { auth } from './auth';
import { create } from './createProperty';

const rootReducer = combineReducers({
  properties,
  auth,
  create,
  form
});

export default rootReducer;
