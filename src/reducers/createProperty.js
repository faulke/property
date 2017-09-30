import * as actions from '../actions';

export const initialState = {
  address: '',
  city: '',
  state: '',
  zipcode: '',
  rent: ''
};

export const create = (state = initialState, action) => {
  const { type, payload, source, value } = action;
  switch (type) {
    case actions.CREATE_PROPERTY_REQUEST:
      return { ...state };
    case actions.CREATE_PROPERTY_SUCCESS:
      return { ...state };
    default:
      return { ...state };
  }
};