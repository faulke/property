import { isRSAA, CALL_API } from 'redux-api-middleware';
import { browserHistory } from 'react-router';

export default store => next => action => {
  if (isRSAA(action)) {
    const actionCopy = { ...action[CALL_API] };

    const headers = actionCopy.headers();

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

    actionCopy.types = [
      actionCopy.types[0],
      {
        type: actionCopy.types[1],
        meta: (act, state, res) => {
          const header = res.headers.get('Authorization');
          if (header) {
            const jwt = header.split('Bearer ')[1];
            localStorage.setItem('jwt', jwt);
          }
        }
      },
      {
        type: actionCopy.types[2],
        meta: () => {
          // for now, assume only 401 on failure
          localStorage.removeItem('jwt');
          browserHistory.push('/account/login');
        }
      }
    ];

    return next({ [CALL_API]: actionCopy });
  }
  return next(action);
};
