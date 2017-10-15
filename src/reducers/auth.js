import * as actions from '../actions';

export const initialState = {
  name: null,
  isPosting: false,
  isLoggedIn: false,
  loginError: null,
  registerError: null
};

const clearLocalUser = () => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('name');
};

export const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_AUTH_REQUEST:
      clearLocalUser();
      return { ...state, name: null, isPosting: true, loginError: null };
    case actions.GET_AUTH_SUCCESS:
      localStorage.setItem('jwt', payload.token);
      localStorage.setItem('name', payload.user);
      return { ...state, name: payload.user, isPosting: false, isLoggedIn: true };
    case actions.GET_AUTH_FAILURE:
      clearLocalUser();
      if (payload && payload.errors) {
        return { ...state, isPosting: false, registerError: payload.errors[0].description };
      }
      return { ...state, name: null, isPosting: false, loginError: 'Email or password is invalid.' };
    case actions.LOGOUT:
      clearLocalUser();
      return { ...state, name: null, isLoggedIn: false };
    default:
      return { ...state };
  }
};
