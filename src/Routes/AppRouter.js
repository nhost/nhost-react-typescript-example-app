import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Dashboard from '../Components/Dashboard';

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
            path="/other"
            render={(props) => (
              <div>Other</div>
            )}
          />

        </Switch>
      </Router>
    );
  }
}
export default RouterComponent;
