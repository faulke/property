import * as actions from '../actions';

export const initialState = {
  properties: []
};

export const testReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.GET_PROPERTIES_REQUEST:
      return { ...state };
    case actions.GET_PROPERTIES_SUCCESS:
      return { ...state, properties: payload };
    default:
      return { ...state };
  }
};
