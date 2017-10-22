import * as actions from '../actions';

export const initialState = {
  isPosting: false
};

const create = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.CREATE_PROPERTY_REQUEST:
      return { ...state, isPosting: true };
    case actions.CREATE_PROPERTY_SUCCESS:
      return { ...state, isPosting: false };
    default:
      return { ...state };
  }
};

export default create;