import axios from 'axios';

import {API_URL, JWT_TOKEN} from '../constants';
import {
  getAsyncStorage,
  setAsyncStorage,
  clearAsyncStorage,
} from './storageUtil';
import {navigate} from './navigationUtil';

export const httpBase = (isDownloadable = false) => {
  const api = axios.create({
    baseURL: `${API_URL}`,
    responseType: 'json',
  });

  api.interceptors.request.use(
    async config => {
      let token = await getAsyncStorage(JWT_TOKEN);
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      config.headers['Accept'] = 'application/json';
      if (isDownloadable) {
        config.headers['Content-Type'] = 'multipart/form-data';
      } else {
        config.headers['Content-Type'] = 'application/json';
      }

      return config;
    },
    error => Promise.reject(error),
  );

  api.interceptors.response.use(
    async response => {
      if (response.headers && response.headers['x-xsrf-token']) {
        await setAsyncStorage(JWT_TOKEN, response.headers['x-xsrf-token']);
      }
      return response;
    },
    async error => {
      if (401 === error?.response?.status) {
        await clearAsyncStorage(JWT_TOKEN);
        navigate('SignIn');
      }
      if (404 === error?.response?.status) {
        // TODO
      }
      if (500 === error?.response?.status) {
        // TODO
      }
      return Promise.reject(error);
    },
  );

  return api;
};
