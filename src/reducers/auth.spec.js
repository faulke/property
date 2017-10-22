import deepFreeze from 'deep-freeze';
import * as actions from '../actions';
import auth, { initialState } from './auth';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

describe('auth reducer', () => {
  it('should provide the initial state', () => {
    expect(auth(undefined, {})).toEqual(initialState);
  });
  
  it('should handle GET_AUTH_REQUEST action', () => {
    const action = {
      type: actions.GET_AUTH_REQUEST
    };
  
    const stateAfter = { ...initialState, isPosting: true };
    
    deepFreeze(initialState);
    deepFreeze(stateAfter);
  
    expect(auth(initialState, action)).toEqual(stateAfter);
  });
  
  it('should handle login/register success', () => {
    const user = 'user name';
    const action = {
      type: actions.GET_AUTH_SUCCESS,
      payload: { user, token: 'token123456' }
    };
  
    const stateBefore = { ...initialState, isPosting: true };
    const stateAfter = { ...stateBefore, isPosting: false, name: user, isLoggedIn: true };
  
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
  
    expect(auth(stateBefore, action)).toEqual(stateAfter);
  });
  
  it('should handle login auth failure', () => {
    const action = {
      type: actions.GET_AUTH_FAILURE
    };
  
    const stateBefore = { ...initialState, isPosting: true };
    const stateAfter = { ...stateBefore, isPosting: false, loginError: 'Email or password is invalid.' };
    
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
  
    expect(auth(stateBefore, action)).toEqual(stateAfter);
  });
  
  it('should handle register auth failure', () => {
    const error = 'Duplicate user name.';
    const action = {
      type: actions.GET_AUTH_FAILURE,
      payload: { errors: [{ statusCode: 401, description: error }] }
    };
  
    const stateBefore = { ...initialState, isPosting: true };
    const stateAfter = { ...stateBefore, isPosting: false, registerError: error };
  
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
  
    expect(auth(stateBefore, action)).toEqual(stateAfter);
  });
});

