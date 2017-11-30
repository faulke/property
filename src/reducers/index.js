import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import properties from './properties';
import auth from './auth';
import create from './createProperty';
import fileUpload from './fileUpload';
import propertyDetail from './propertyDetail';

const rootReducer = combineReducers({
  properties,
  auth,
  create,
  form,
  fileUpload,
  propertyDetail
});

export default rootReducer;
