import { browserHistory } from 'react-router';
import * as actions from '../actions';

export const initialState = {
  properties: []
};

export const properties = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.GET_PROPERTIES_REQUEST:
      return { ...state };
    case actions.GET_PROPERTIES_SUCCESS:
      return { ...state, properties: payload };
    case actions.GET_PROPERTIES_FAILURE:
      browserHistory.push('account/login');
      return { ...state };
    default:
      return { ...state };
  }
};
