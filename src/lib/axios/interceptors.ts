import { InternalAxiosRequestConfig } from 'axios';

import { logoutUser, refreshToken } from '@/features/auth';
import { clearStorageValues, getToken } from '@/utils/helpers';

import { axios } from '.';

interface Error {
  response: {
    status: number;
    data: {
      message: string;
    };
  };
  config: any;
}

export const rejectErrorInterceptor = (error: any) => {
  return Promise.reject(error);
};

export const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = getToken().token;

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
};

export const refreshTokenInterceptor = async (error: Error) => {
  const blackListedUrls = ['/auth/logout', '/auth/token'];

  const originalRequest = error.config;

  if (blackListedUrls.some((url) => originalRequest.url?.includes(url))) {
    return rejectErrorInterceptor(error);
  }

  if (error.response) {
    const errorStatusCode = error.response?.status;

    if (errorStatusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await refreshToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        logoutUser()
          .then()
          .catch()
          .finally(() => {
            clearStorageValues();
            // storage.session.setValue('redirect-path', window.location);
            window.location.assign(window.location.origin);
            rejectErrorInterceptor(error);
          });
      }
    }
  }

  return rejectErrorInterceptor(error);
};
