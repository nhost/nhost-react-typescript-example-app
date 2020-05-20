import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Dashboard } from "../components/app/Dashboard";
import { Todos } from "../components/app/Todos";
import { Files } from "../components/app/Files";

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <Dashboard {...props} />} />
          <Route exact path="/todos" render={(props) => <Todos />} />
          <Route exact path="/files" render={(props) => <Files {...props} />} />
        </Switch>
      </Router>
    );
  }
}
export default RouterComponent;
