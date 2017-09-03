import { browserHistory } from 'react-router';
import * as actions from '../actions';

export const initialState = {
  email: '',
  password: ''
};

export const auth = (state = initialState, action) => {
  const { type, payload, source, value } = action;
  switch (type) {
    case actions.UPDATE_INPUT:
      if (source === 'email') {
        return { ...state, email: value };
      }
      return { ...state, password: value };
    case actions.GET_AUTH_REQUEST:
      return { ...state };
    case actions.GET_AUTH_SUCCESS:
      localStorage.setItem('jwt', payload.token);
      browserHistory.push('/properties');
      return { ...state };
    case actions.GET_AUTH_FAILURE:
      browserHistory.push('/account/login');
      return { ...state };
    default:
      return { ...state };
  }
};
