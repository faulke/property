import { browserHistory } from 'react-router';
import * as actions from '../actions';

export const initialState = {
  email: '',
  password: '',
  name: null
};

export const auth = (state = initialState, action) => {
  const { type, payload, source, value } = action;
  switch (type) {
    case actions.UPDATE_INPUT:
      return { ...state, [source]: value };
    case actions.GET_AUTH_REQUEST:
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
      return { ...state, name: null };
    case actions.GET_AUTH_SUCCESS:
      localStorage.setItem('jwt', payload.token);
      localStorage.setItem('user', payload.user);
      return { ...state, name: payload.user };
    case actions.GET_AUTH_FAILURE:
      browserHistory.push('/account/login');
      return { ...state };
    case actions.CLEAR_LOCAL_USER:
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
      return { ...state, name: null };
    default:
      return { ...state };
  }
};
