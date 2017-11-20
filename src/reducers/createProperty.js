import * as actions from '../actions';

export const initialState = {
  isPosting: false,
  success: false
};

const create = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.CREATE_PROPERTY_REQUEST:
      return { ...state, isPosting: true };
    case actions.CREATE_PROPERTY_SUCCESS:
      return { ...state, isPosting: false, success: true };
    case actions.CREATE_PROPERTY_FAILURE:
      return { ...state, isPosting: false };
    case actions.RESET_FORM:
      return { ...initialState };
    default:
      return { ...state };
  }
};

export default create;
