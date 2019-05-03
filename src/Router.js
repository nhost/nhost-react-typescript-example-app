import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import PrivateRoute from './Components/PrivateRoute';
import Dashboard from './Components/Dashboard';
import Register from './Components/Register';
import ActivateAccount from './Components/ActivateAccount';
import NewPassword from './Components/NewPassword';
import Login from './Components/Login';

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Switch>

          <PrivateRoute
            exact
            path="/"
            render={(props) => (
              <Dashboard {...props} />
            )}
          />

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



        </Switch>
      </Router>
    );
  }
}
export default RouterComponent;
