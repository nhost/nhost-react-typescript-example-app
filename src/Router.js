import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import AuthGate from './Components/AuthGate';
import Dashboard from './Components/Dashboard'
import Register from './Components/Register';

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Switch>

          <Route
            exact
            path="/"
            render={(props) => (
              <AuthGate {...props}>
                <Dashboard {...props} />
              </AuthGate>
            )}
          />

          <Route
            exact
            path="/register"
            render={(props) => (
              <Register {...props} />
            )}
          />

        </Switch>
      </Router>
    );
  }
}
export default RouterComponent;
