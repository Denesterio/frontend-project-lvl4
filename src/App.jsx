import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import Page404 from './pages/Page404.jsx';
import LoginForm from './pages/LoginForm.jsx';
import { AuthProvider } from './hooks/useAuthContext.jsx';
import PrivateRoute from './router/PrivateRoute.jsx';

const App = () => (
  <AuthProvider>
    <Router>
      <Switch>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/404">
          <Page404 />
        </Route>
        <PrivateRoute path="/">
          <HomePage />
        </PrivateRoute>
        <Redirect to="/404" />
      </Switch>
    </Router>
  </AuthProvider>
);

export default App;
