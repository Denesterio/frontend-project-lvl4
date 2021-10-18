import routes from '../routes.js';
import makeRequest from './makeRequest.js';

const makeAuthRequest = (path, options) => makeRequest('post', path, options);

// prettier-ignore
const userLogin = (params) => makeAuthRequest(routes.login(), params)
  .then(({ data }) => ({
    username: data.username,
    token: data.token,
  }));

// prettier-ignore
const userSignup = (params) => makeAuthRequest(routes.signup(), params)
  .then(({ data }) => ({
    username: data.username,
    token: data.token,
  }));

export { userLogin, userSignup };
