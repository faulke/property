import deepFreeze from 'deep-freeze';
import * as actions from '../actions';
import create, { initialState } from './createProperty';

describe('createProperty reducer', () => {
  it('should provide the initial state', () => {
    expect(create(undefined, {})).toEqual(initialState);
  });
  
  it('should handle CREATE_PROPERTY_REQUEST action', () => {
    const action = {
      type: actions.CREATE_PROPERTY_REQUEST
    };
  
    const stateAfter = { ...initialState, isPosting: true };
    
    deepFreeze(initialState);
    deepFreeze(stateAfter);
  
    expect(create(initialState, action)).toEqual(stateAfter);
  });
  
  it('should handle CREATE_PROPERTY_SUCCESS action', () => {
    const action = {
      type: actions.CREATE_PROPERTY_SUCCESS
    };
  
    const stateBefore = { ...initialState, isPosting: true };
    const stateAfter = { ...stateBefore, isPosting: false };
  
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
  
    expect(create(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle CREATE_PROPERTY_FAILURE action', () => {
    const action = {
      type: actions.CREATE_PROPERTY_FAILURE
    };
  
    const stateBefore = { ...initialState, isPosting: true };
    const stateAfter = { ...stateBefore, isPosting: false };
  
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
  
    expect(create(stateBefore, action)).toEqual(stateAfter);
  });
});
