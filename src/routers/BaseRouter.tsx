import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Register } from "../components/Register";
import { NewEmail } from "../components/NewEmail";
import { PasswordForgot } from "../components/PasswordForgot";
import { PasswordSet } from "../components/PasswordSet";

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

          <Route
            path="/password-forgot/"
            render={(props) => <PasswordForgot {...props} />}
          />

          <Route
            path="/password-set/:ticket"
            render={(props) => <PasswordSet {...props} />}
          />

          <Route
            path="/new-email/:ticket"
            render={(props) => <NewEmail {...props} />}
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
