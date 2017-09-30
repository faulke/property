import { ApiError } from 'redux-api-middleware';
import { browserHistory } from 'react-router';

// redirect to /login if api returns 401
export default store => next => action => {
  if (action.payload && action.payload.status === 401) {
    browserHistory.replace('/account/login');
  }
  return (next(action));
};
