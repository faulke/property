import { CALL_API, getJSON } from 'redux-api-middleware';
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

export const createProperty = ({ address, city, state, zipcode, rent, storageKey }) => ({
  [CALL_API]: {
    endpoint: `/api/properties/add`,
    method: 'POST',
    headers,
    body: JSON.stringify({
      address,
      city,
      state,
      zipcode,
      rent,
      storageKey
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


export const PRESIGNED_URL_REQUEST = 'PRESIGNED_URL_REQUEST';
export const PRESIGNED_URL_SUCCESS = 'PRESIGNED_URL_SUCCESS';
export const PRESIGNED_URL_FAILURE = 'PRESIGNED_URL_FAILURE';
export const getPresignedUrl = (file, uuid) => dispatch => {
  const data = new FormData();
  data.append('files', file);
  data.append('guid', uuid);
  data.append('Content-Type', file.type);

  return dispatch({
    [CALL_API]: {
      endpoint: `/api/files`,
      method: 'POST',
      body: data,
      types: [
        'PRESIGNED_URL_REQUEST',
        {
          type: 'PRESIGNED_URL_SUCCESS',
          payload: (action, state, res) => {
            getJSON(res).then((json) => {
              dispatch(uploadFile(json.urls, file));
              return json;
            });
          }
        },
        'PRESIGNED_URL_FAILURE'
      ]
    }
  });
};

export const FILE_UPLOAD_REQUEST = 'FILE_UPLOAD_REQUEST';
export const FILE_UPLOAD_SUCCESS = 'FILE_UPLOAD_SUCCESS';
export const FILE_UPLOAD_FAILURE = 'FILE_UPLOAD_FAILURE';
export const uploadFile = (urls, file) => dispatch => {
  dispatch({ type: FILE_UPLOAD_REQUEST, payload: { file } });
  fetch(urls[0], {
    method: 'put',
    headers: {
      'Content-type': file.type
    },
    body: file
  }).then(res => {
    dispatch({ type: FILE_UPLOAD_SUCCESS });
  });
};
