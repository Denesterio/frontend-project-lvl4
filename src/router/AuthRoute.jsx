import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import LSHandler from '../utils/LSHandler.js';

const AuthRoute = ({ children, ...rest }) => {
  const lshandler = new LSHandler();
  const renderFunc = ({ location }) => (!lshandler.hasToken() ? children : (
    <Redirect
      to={{
        pathname: '/',
        state: { from: location },
      }}
    />
  ));

  return (
    <Route
      {...rest}
      render={renderFunc}
    />
  );
};

export default AuthRoute;
