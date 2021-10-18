import React, { useState, useContext } from 'react';
import LSHandler from '../utils/LSHandler.js';
import { userLogin, userSignup } from '../api/auth.js';

const AuthContext = React.createContext();

const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const lshandler = new LSHandler();

  const getUser = () => user || lshandler.get('user');

  const logout = () => {
    lshandler.remove('token');
    lshandler.remove('user');
  };

  // prettier-ignore
  const login = (params) => userLogin(params).then(({ username, token }) => {
    setUser(username);
    lshandler.set('token', token);
    lshandler.set('user', username);
    return new Promise((resolve) => resolve(username));
  });

  const signup = (params) => userSignup(params).then(({ username, token }) => {
    setUser(username);
    lshandler.set('token', token);
    lshandler.set('user', username);
    return new Promise((resolve) => resolve(username));
  });

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
