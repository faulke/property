import { CALL_API } from 'redux-api-middleware';
import querystring from 'query-string';

const ACCEPT_JSON_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const headers = {
  ...ACCEPT_JSON_HEADERS,
};

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
