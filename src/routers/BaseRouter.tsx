import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Register } from "../components/Register";
import { NewEmail } from "../components/NewEmail";
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
