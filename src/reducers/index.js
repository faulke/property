import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import properties from './properties';
import auth from './auth';
import create from './createProperty';
import fileUpload from './fileUpload';
import propertyDetail from './propertyDetail';
import addListing from './addListing';

const rootReducer = combineReducers({
  properties,
  auth,
  create,
  form,
  fileUpload,
  propertyDetail,
  addListing
});

export default rootReducer;
