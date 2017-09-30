import * as actions from '../actions';

export const initialState = {
  name: null,
  isPosting: false
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
      return { ...state, name: null, isPosting: true };
    case actions.GET_AUTH_SUCCESS:
      localStorage.setItem('jwt', payload.token);
      localStorage.setItem('name', payload.user);
      return { ...state, name: payload.user, isPosting: false };
    case actions.GET_AUTH_FAILURE:
      clearLocalUser();
      return { ...state, name: null, isPosting: false };
    case actions.LOGOUT:
      clearLocalUser();
      return { ...state, name: null };
    default:
      return { ...state };
  }
};
