export const getProperties = state => state.properties;
export const getAuth = state => state.auth;
export const createProperty = state => state.create;
export const isLoggedIn = state => getAuth(state).isLoggedIn === true;
export const fileUpload = state => state.fileUpload;
export const propertyDetail = state => state.propertyDetail;
export const addListing = state => state.addListing;
