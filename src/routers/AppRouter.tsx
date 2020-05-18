import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "../components/Dashboard";

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <Dashboard {...props} />} />
        </Switch>
      </Router>
    );
  }
}
export default RouterComponent;
