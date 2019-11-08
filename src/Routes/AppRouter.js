import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Dashboard from '../Components/Dashboard';
import Files from '../Components/Files';

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Switch>

          <Route
            exact
            path="/"
            render={(props) => (
              <Dashboard {...props} />
            )}
          />

          <Route
            exact
            path="/files"
            render={(props) => (
              <Files />
            )}
          />

        </Switch>
      </Router>
    );
  }
}
export default RouterComponent;
