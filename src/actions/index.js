import { CALL_API } from 'redux-api-middleware';
import querystring from 'query-string';

export const UPDATE_INPUT = 'UPDATE_INPUT';
export const updateInput = (id, value) => ({
  type: UPDATE_INPUT,
  source: id,
  value
});

const ACCEPT_JSON_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const headers = () => ({
  ...ACCEPT_JSON_HEADERS,
  Authorization: `Bearer ${localStorage.getItem('jwt')}`
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
