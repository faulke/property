import deepFreeze from 'deep-freeze';
import * as actions from '../actions';
import properties, { initialState } from './properties';

describe('properties reducer', () => {
  it('should provide the initial state', () => {
    expect(properties(undefined, {})).toEqual(initialState);
  });
  
  it('should handle GET_PROPERTIES_REQUEST action', () => {
    const action = {
      type: actions.GET_PROPERTIES_REQUEST
    };
  
    const stateAfter = { ...initialState, isFetching: true };
    
    deepFreeze(initialState);
    deepFreeze(stateAfter);
  
    expect(properties(initialState, action)).toEqual(stateAfter);
  });
  
  it('should handle GET_PROPERTIES_SUCCESS action', () => {
    const payload = [{ id: 1, address: 'address test' }];
    const action = {
      type: actions.GET_PROPERTIES_SUCCESS,
      payload
    };
  
    const stateBefore = { ...initialState, isFetching: true };
    const stateAfter = { ...stateBefore, isFetching: false, properties: payload };
  
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
  
    expect(properties(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle GET_PROPERTIES_FAILURE action', () => {
    const action = {
      type: actions.GET_PROPERTIES_FAILURE
    };
  
    const stateBefore = { ...initialState, isFetching: true };
    const stateAfter = { ...stateBefore, isFetching: false };
  
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
  
    expect(properties(stateBefore, action)).toEqual(stateAfter);
  });
});
