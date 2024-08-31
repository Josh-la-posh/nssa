// import { TokenResponse } from '@/features/auth';

import storage from '../storage';

export const persistToken = (token: any, isLocal?: boolean) => {
  if (isLocal) {
    storage.setValue('refresh-token', token.refreshToken, 30 * 24 * 60 * 60 * 1000);
    storage.setValue('token', token.accessToken, token.expires);
  } else {
    storage.session.setValue('refresh-token', token.refreshToken);
    storage.session.setValue('token', token.accessToken);
  }
};

export const getToken = () => {
  const token: string = storage.session.getValue('token') || storage.getValue('token');
  const refresh_token: string =
    storage.session.getValue('refresh-token') || storage.getValue('refresh-token');

  return {
    token,
    refresh_token,
  };
};
