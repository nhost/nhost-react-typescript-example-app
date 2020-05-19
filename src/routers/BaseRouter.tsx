import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Register } from "../components/Register";
import PrivateRoute from "./PrivateRouter";
import AppRouter from "./AppRouter";

class BaseRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/register"
            render={(props) => <Register {...props} />}
          />

          <PrivateRoute path="/">
            <AppRouter />
          </PrivateRoute>
        </Switch>
      </Router>
    );
  }
}
export default BaseRouter;
