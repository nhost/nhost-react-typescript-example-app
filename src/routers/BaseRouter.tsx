import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Register } from "../components/Register";
import { Login } from "../components/Login";
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

          <Route exact path="/login" render={(props) => <Login {...props} />} />

          <PrivateRoute path="/">
            <AppRouter />
          </PrivateRoute>
        </Switch>
      </Router>
    );
  }
}
export default BaseRouter;
