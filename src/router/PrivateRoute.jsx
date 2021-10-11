import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import LSHandler from '../utils/LSHandler.js';

const PrivateRoute = ({ children, ...rest }) => {
  const lshandler = new LSHandler();
  const renderFunc = ({ location }) => (lshandler.hasToken() ? children : (
    <Redirect
      to={{
        pathname: '/login',
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

export default PrivateRoute;
