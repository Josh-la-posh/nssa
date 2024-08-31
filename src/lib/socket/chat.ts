import { io } from 'socket.io-client';

import { env } from '@/config';
import { getToken } from '@/utils/helpers';

const { token } = getToken();

export const chatSocket = io(env.SOCKET_API_BASE_URL, {
  extraHeaders: {
    authorization: `Bearer ${token}`,
  },
  auth: {
    token: `Bearer ${token}`,
  },
  path: '/api/chat/socket/socket.io',
  transports: ['websocket'],
});
