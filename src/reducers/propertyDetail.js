import * as actions from '../actions';

export const initialState = {
  details: null,
  isFetching: false
};

const propertyDetail = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.PROPERTY_DETAIL_REQUEST:
      return { ...state, isFetching: true };
    case actions.PROPERTY_DETAIL_SUCCESS:
      return { ...state, details: { ...payload }, isFetching: false };
    case actions.PROPERTY_DETAIL_FAILURE:
      return { ...state, isFetching: false };
    default:
      return { ...state };
  }
};

export default propertyDetail;
