import uuid from 'uuid/v4';
import * as actions from '../actions';

export const initialState = {
  isPosting: false,
  isUploading: false,
  urls: null,
  files: [],
  storageKey: uuid()
};

const fileUpload = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.PRESIGNED_URL_REQUEST:
      return { ...state, isUploading: true, isPosting: true };
    case actions.UPDATE_FILE_PREVIEW:
      return { ...state, files: [...state.files, payload.file] };
    case actions.PRESIGNED_URL_SUCCESS:
      return { ...state, isPosting: false, isUploading: true };
    case actions.FILE_UPLOAD_SUCCESS:
      return { ...state, isUploading: false };
    case actions.DELETE_FILE:
      state.files.splice(payload.index, 1);
      return { ...state, files: [...state.files] };
    case actions.RESET_FORM:
      return { ...initialState, storageKey: uuid() };
    default:
      return { ...state };
  }
};

export default fileUpload;
