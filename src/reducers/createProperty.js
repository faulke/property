import { browserHistory } from 'react-router';
import * as actions from '../actions';

export const initialState = {
  address: '',
  city: '',
  state: '',
  zipcode: '',
  rent: ''
};

export const create = (state = initialState, action) => {
  const { type, payload, source, value } = action;
  switch (type) {
    case actions.UPDATE_INPUT:
      return { ...state, [source]: value };
    case actions.CREATE_PROPERTY_REQUEST:
      return { ...state };
    case actions.CREATE_PROPERTY_SUCCESS:
      browserHistory.push('/properties');
      return { ...state };
    default:
      return { ...state };
  }
};