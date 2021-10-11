import axios from 'axios';
import LSHandler from '../utils/LSHandler.js';

const buildRequest = (client, type, path, options) => client[type](path, options);
// prettier-ignore
const makeRequest = (type, path, options = {}) => buildRequest(
  axios,
  type,
  path,
  {
    ...options,
    headers: {
      Authorization: `Bearer ${new LSHandler().get('token', '')}`,
      'Content-Type': 'application/json',
    },
  },
);

export default makeRequest;
