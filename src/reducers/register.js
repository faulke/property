import { browserHistory } from 'react-router';
import * as actions from '../actions';

export const initialState = {
  email: '',
  password: ''
};

export const register = (state = initialState, action) => {
  const { type, payload, source, value } = action;
  switch (type) {
    case actions.UPDATE_INPUT:
      return { ...state, [source]: value };
    case actions.GET_REGISTER_REQUEST:
      localStorage.removeItem('jwt');
      return { ...state };
    case actions.GET_REGISTER_SUCCESS:
      localStorage.setItem('jwt', payload.token);
      browserHistory.push('/properties');
      return { ...state };
    default:
      return { ...state };
  }
};
