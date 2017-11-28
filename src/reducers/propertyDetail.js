import * as actions from '../actions';

export const initialState = {
  details: null,
  isFetching: false,
  showModal: false
};

const propertyDetail = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.PROPERTY_DETAIL_REQUEST:
      return { ...state, isFetching: true };
    case actions.PROPERTY_DETAIL_SUCCESS:
      return { ...state, details: { ...payload }, isFetching: false };
    case actions.PROPERTY_DETAIL_FAILURE:
      return { ...state, isFetching: false };
    case actions.SHOW_PROPERTY_MODAL:
      return { ...state, showModal: true };
    case actions.CLOSE_MODAL:
      return { ...state, showModal: false };
    default:
      return { ...state };
  }
};

export default propertyDetail;
