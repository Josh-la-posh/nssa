// import { store } from '@/providers/AuthProvider';
// import { router } from '@/routes';

import storage from '../storage';

export const clearStorageValues = () => {
  storage.clearValue('token');
  storage.session.clearValue('token');

  storage.clearValue('refresh-token');
  storage.session.clearValue('refresh-token');

  storage.clearValue('redirect-path');
  storage.session.clearValue('redirect-path');

  storage.clearValue('active-role');

  // router.navigate('/auth/login');
  // store.dispatch({ type: 'LOGOUT_SUCCESS' });
};
