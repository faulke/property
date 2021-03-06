import { isRSAA, RSAA, getJSON } from 'redux-api-middleware';
import { browserHistory } from 'react-router';

// add auth meta handlers to rsaa actions
// handle failure payload
// allow custom meta/payload handlers for success/failure
const copyActionTypes = (copiedTypes) => {
  const successMeta = (act, state, res) => {
    const header = res.headers.get('Authorization');
    if (header) {
      const jwt = header.split('Bearer ')[1];
      localStorage.setItem('jwt', jwt);
    }

    if (res.status === 401) {
      localStorage.removeItem('jwt');
      browserHistory.push('/account/login');
    }
  };

  const failureMeta = (act, state, res) => {
    if (res.status === 401) {
      localStorage.removeItem('jwt');
      browserHistory.push('/account/login');
    }
    if (res.status === 500) {
      browserHistory.push('/error/500');
    }
    if (res.status === 404) {
      browserHistory.push('/error/404');
    }
  };

  const failurePayload = (act, state, res) => getJSON(res);

  const request = copiedTypes[0];
  const success = {
    type: copiedTypes[1].type || copiedTypes[1],
    meta: successMeta,
  };

  if (copiedTypes[1].payload) {
    success.payload = copiedTypes[1].payload;
  }

  const failure = {
    type: copiedTypes[2].type || copiedTypes[2],
    meta: failureMeta,
    payload: copiedTypes[2].payload || failurePayload // allow to be overwritten
  };

  return [request, success, failure];
};

export default store => next => action => {
  // check if it's a thunk
  const actionTest = typeof action === 'function' ? action() : action;

  if (isRSAA(actionTest)) {
    const actionCopy = { ...actionTest[RSAA] };
    let headers;

    if (actionCopy.headers) {
      headers = actionCopy.headers();
    }

    const token = localStorage.getItem('jwt');

    actionCopy.headers = () => {
      if (token) {
        return {
          ...headers,
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        };
      }
      return { ...headers };
    };

    if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_API) {
      actionCopy.endpoint = process.env.REACT_APP_API + actionCopy.endpoint;
    }

    actionCopy.types = copyActionTypes(actionCopy.types);

    return next({ [RSAA]: actionCopy });
  }

  return next(action);
};
