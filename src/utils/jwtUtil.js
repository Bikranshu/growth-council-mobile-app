import jwt_decode from 'jwt-decode';

import {getAsyncStorage} from './storageUtil';
import {JWT_TOKEN} from '../constants';

export const isTokenExpired = token => {
  try {
    const decoded = jwt_decode(token);
    if (decoded.exp < Date.now() / 1000) {
      // Checking if token is expired.
      return true;
	
    }
  } catch (e) {
    return false;
	
  }
};

export const getToken = () => {
  return getAsyncStorage(JWT_TOKEN);
};

export const isAuthenticated = () => {
  return !!getToken() && !isTokenExpired(getToken());
};

export let decodeUserID = token => {
  try {
    const decoded = jwt_decode(token);
    return decoded?.data?.user?.id;
  } catch (e) {
    return null;
  }
};
