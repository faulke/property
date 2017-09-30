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
    case actions.GET_AUTH_REQUEST:
      clearLocalUser();
      return { ...state, name: null };
    case actions.GET_AUTH_SUCCESS:
      localStorage.setItem('jwt', payload.token);
      localStorage.setItem('name', payload.user);
      return { ...state, name: payload.user };
    case actions.GET_AUTH_FAILURE:
      clearLocalUser();
      return { ...state, name: null };
    default:
      return { ...state };
  }
};
