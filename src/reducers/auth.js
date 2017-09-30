import { browserHistory } from 'react-router';
import * as actions from '../actions';

export const initialState = {
  email: '',
  password: '',
  name: null
};

const clearLocalUser = () => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('name');
};

export const auth = (state = initialState, action) => {
  const { type, payload, source, value } = action;
  switch (type) {
    case actions.UPDATE_INPUT:
      return { ...state, [source]: value };
    case actions.GET_AUTH_REQUEST:
      clearLocalUser();
      return { ...state, name: null };
    case actions.GET_AUTH_SUCCESS:
      localStorage.setItem('jwt', payload.token);
      localStorage.setItem('name', payload.user);
      return { ...state, name: payload.user };
    case actions.GET_AUTH_FAILURE:
      clearLocalUser();
      browserHistory.push('/account/login');
      return { ...state };
    case actions.CLEAR_LOCAL_USER:
      clearLocalUser();
      return { ...state, name: null };
    default:
      return { ...state };
  }
};
