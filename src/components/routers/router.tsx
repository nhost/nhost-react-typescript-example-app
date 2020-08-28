import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Register } from "components/register";
import { Login } from "components/login";

import { RouterApp } from "components/routers/router-app";
import { AuthGate } from "components/auth-gate";

export function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>

        {/* <Route
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
        /> */}

        <Route path="/">
          <AuthGate>
            <RouterApp />
          </AuthGate>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
