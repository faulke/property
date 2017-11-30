import { CALL_API, getJSON } from 'redux-api-middleware';
import querystring from 'query-string';
import { reset } from 'redux-form';
import { browserHistory } from 'react-router';

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
export const SHOW_PROPERTY_MODAL = 'SHOW_PROPERTY_MODAL';

export const createProperty = 
({ address, city, state, zipcode, rent }, storageKey, files) => dispatch => {
  const actionResponse = dispatch({
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
        storageKey,
        files: files.map((x) => ({
          filename: x.name,
          type: x.type,
          fileindex: x.index
        }))
      }),
      types: [
        'CREATE_PROPERTY_REQUEST',
        'CREATE_PROPERTY_SUCCESS',
        'CREATE_PROPERTY_FAILURE'
      ]
    }
  });

  return actionResponse.then((res) => {
    if (!res.error) {
      const id = res.payload.id;
      browserHistory.push(`/properties/${id}`);
      dispatch({ type: SHOW_PROPERTY_MODAL });
    }
  });
};

export const CLOSE_MODAL = 'CLOSE MODAL';
export const closeModal = () => dispatch => {
  dispatch({ type: CLOSE_MODAL });
};

export const RESET_FORM = 'RESET_FORM';
export const resetForm = form => dispatch => {
  dispatch(reset(form));
  dispatch({ type: RESET_FORM });
};

export const LOGOUT = 'LOGOUT';
export const logout = () => ({
  type: LOGOUT
});

export const PRESIGNED_URL_REQUEST = 'PRESIGNED_URL_REQUEST';
export const PRESIGNED_URL_SUCCESS = 'PRESIGNED_URL_SUCCESS';
export const PRESIGNED_URL_FAILURE = 'PRESIGNED_URL_FAILURE';
export const UPDATE_FILE_PREVIEW = 'UPDATE_FILE_PREVIEW';
export const getPresignedUrl = (file, uuid) => dispatch => {
  dispatch({ type: UPDATE_FILE_PREVIEW, payload: { file } });
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
  dispatch({ type: FILE_UPLOAD_REQUEST });
  fetch(urls[0], {
    method: 'put',
    headers: {
      'Content-type': file.type,
      'Cache-Control': 'max-age=229000'
    },
    body: file
  }).then(res => {
    dispatch({ type: FILE_UPLOAD_SUCCESS });
  });
};

export const DELETE_FILE = 'DELETE_FILE';
export const deleteFile = (index) => dispatch => {
  dispatch({ type: DELETE_FILE, payload: { index } });
};

export const PROPERTY_DETAIL_REQUEST = 'PROPERTY_DETAIL_REQUEST';
export const PROPERTY_DETAIL_SUCCESS = 'PROPERTY_DETAIL_SUCCESS';
export const PROPERTY_DETAIL_FAILURE = 'PROPERTY_DETAIL_FAILURE';
export const fetchPropertyDetail = id => ({
  [CALL_API]: {
    endpoint: `/api/properties/${id}`,
    method: 'GET',
    types: [
      'PROPERTY_DETAIL_REQUEST',
      'PROPERTY_DETAIL_SUCCESS',
      'PROPERTY_DETAIL_FAILURE'
    ]
  }
});
