import { CALL_API } from 'redux-api-middleware';
import querystring from 'query-string';

const headers = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json'
});

export const GET_AUTH_REQUEST = 'GET_AUTH_REQUEST';
export const GET_AUTH_SUCCESS = 'GET_AUTH_SUCCESS';
export const GET_AUTH_FAILURE = 'GET_AUTH_FAILURE';

export const login = (email, password) => ({
  [CALL_API]: {
    endpoint: `/api/account/login`,
    method: 'POST',
    headers,
    body: JSON.stringify({
      email,
      password
    }),
    types: [
      'GET_AUTH_REQUEST',
      'GET_AUTH_SUCCESS',
      'GET_AUTH_FAILURE'
    ]
  }
});

export const register = ({
  firstName,
  lastName,
  email, 
  password, 
  confirmPassword
}) => ({
  [CALL_API]: {
    endpoint: `/api/account/register`,
    method: 'POST',
    headers,
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    }),
    types: [
      'GET_AUTH_REQUEST',
      'GET_AUTH_SUCCESS',
      'GET_AUTH_FAILURE'
    ]
  }
});

export const GET_PROPERTIES_REQUEST = 'GET_PROPERTIES_REQUEST';
export const GET_PROPERTIES_SUCCESS = 'GET_PROPERTIES_SUCCESS';
export const GET_PROPERTIES_FAILURE = 'GET_PROPERTIES_FAILURE';

export const fetchProperties = ({ pets, min_sqft }) => ({
  [CALL_API]: {
    endpoint: `/api/properties?${querystring.stringify({ pets, min_sqft })}`,
    method: 'GET',
    headers,
    types: [
      'GET_PROPERTIES_REQUEST',
      'GET_PROPERTIES_SUCCESS',
      'GET_PROPERTIES_FAILURE'
    ]
  }
});

export const CREATE_PROPERTY_REQUEST = 'CREATE_PROPERTY_REQUEST';
export const CREATE_PROPERTY_SUCCESS = 'CREATE_PROPERTY_SUCCESS';
export const CREATE_PROPERTY_FAILURE = 'CREATE_PROPERTY_FAILURE';

export const createProperty = ({ address, city, state, zipcode, rent }) => ({
  [CALL_API]: {
    endpoint: `/api/properties/add`,
    method: 'POST',
    headers,
    body: JSON.stringify({
      address,
      city,
      state,
      zipcode,
      rent
    }),
    types: [
      'CREATE_PROPERTY_REQUEST',
      'CREATE_PROPERTY_SUCCESS',
      'CREATE_PROPERTY_FAILURE'
    ]
  }
});

export const LOGOUT = 'LOGOUT';
export const logout = () => ({
  type: LOGOUT
});
