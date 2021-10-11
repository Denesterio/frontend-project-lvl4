import { io } from 'socket.io-client';
import LSHandler from '../utils/LSHandler.js';

const PROXY = 'https://hexlet-allorigins.herokuapp.com/';
const RECONNECTION_DELAY = 10000;
const SOCKET_URL = 'ws://localhost:8080/sockjs-node/217/0ftof2wj/websocket';

const getUrl = (url, path = 'get') => {
  const requestUrl = new URL(PROXY);
  requestUrl.pathname = path;
  requestUrl.searchParams.append('disableCache', true);
  requestUrl.searchParams.append('url', url);
  return requestUrl;
};

// prettier-ignore
const createSocket = () => io(getUrl(SOCKET_URL), {
  reconnectionDelayMax: RECONNECTION_DELAY,
  auth: {
    token: new LSHandler().get('token'),
  },
});

export default createSocket;
