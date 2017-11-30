import * as actions from '../actions';

export const initialState = {
  isFetching: false,
  properties: []
};

const properties = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.GET_PROPERTIES_REQUEST:
      return { ...state, isFetching: true };
    case actions.GET_PROPERTIES_SUCCESS:
      return { ...state, properties: payload, isFetching: false };
    case actions.GET_PROPERTIES_FAILURE:
      return { ...state, isFetching: false };
    default:
      return { ...state };
  }
};

export default properties;
