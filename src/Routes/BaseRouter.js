import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Register from '../Components/Register';
import ActivateAccount from '../Components/ActivateAccount';
import NewPassword from '../Components/NewPassword';
import Login from '../Components/Login';
import PrivateRoute from '../Components/PrivateRoute';
import AppRouter from './AppRouter';

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Switch>

          <Route
            exact
            path="/register"
            render={(props) => (
              <Register {...props} />
            )}
          />

          <Route
            exact
            path="/activate-account/:secret_token"
            render={(props) => (
              <ActivateAccount {...props} />
            )}
          />

          <Route
            exact
            path="/login"
            render={(props) => (
              <Login {...props} />
            )}
          />

          <Route
            exact
            path="/new-password/:secret_token"
            render={(props) => (
              <NewPassword {...props} />
            )}
          />

          <PrivateRoute
            path="/"
            render={(props) => (
              <AppRouter />
            )}
          />

        </Switch>
      </Router>
    );
  }
}
export default RouterComponent;
