export const getProperties = state => state.properties;
export const getAuth = state => state.auth;
export const createProperty = state => state.create;
export const isLoggedIn = state => getAuth(state).name !== null;
