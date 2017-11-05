import * as actions from '../actions';

export const initialState = {
  isPosting: false,
  isUploading: false,
  urls: null
};

const fileUpload = (state = initialState, action) => {
  const { type, res, payload } = action;
  switch (type) {
    case actions.PRESIGNED_URL_REQUEST:
      console.log('fetching pre-signed url');
      return { ...state, isPosting: true };
    case actions.PRESIGNED_URL_SUCCESS:
      console.log('retrieved url');
      return { ...state, isPosting: false, isUploading: true };
    case actions.FILE_UPLOAD_REQUEST:
      console.log('uploading to s3');
      return { ...state, isUploading: true };
    case actions.FILE_UPLOAD_SUCCESS:
      console.log('SUCCESS!');
      return { ...state, isUploading: false };
    default:
      return { ...state };
  }
};

export default fileUpload;
