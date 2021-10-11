import routes from '../routes.js';
import makeRequest from './makeRequest.js';

const makeGetRequest = (path, options) => makeRequest('get', path, options);

const getChannels = () => {
  const path = routes.data();
  return makeGetRequest(path);
};

const getMessages = (channelId) => {
  const path = routes.channelMessagesPath(channelId);
  return makeGetRequest(path);
};

export { getChannels, getMessages };
