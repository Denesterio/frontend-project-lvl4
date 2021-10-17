import React, { useState, useContext } from 'react';
import axios from 'axios';
import LSHandler from '../utils/LSHandler.js';
import routes from '../routes.js';

const AuthContext = React.createContext();

const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const lshandler = new LSHandler();

  const getUser = () => user ?? lshandler.get('user');

  // prettier-ignore
  const login = (params) => axios.post(routes.login(), params).then((response) => {
    setUser(response.data.username);
    lshandler.set('token', response.data.token);
    lshandler.set('user', response.data.username);
    return new Promise((resolve) => resolve(response.data.username));
  });

  const signup = (params) => axios.post(routes.signup(), params).then((response) => {
    setUser(response.data.username);
    lshandler.set('token', response.data.token);
    lshandler.set('user', response.data.username);
    return new Promise((resolve) => resolve(response.data.username));
  });

  const logout = () => {
    lshandler.remove('token');
    lshandler.remove('user');
  };

  return {
    getUser, login, signup, logout,
  };
};

const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => useContext(AuthContext);

export { useAuthProvider, useAuthContext, AuthProvider };
