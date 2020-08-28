import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Register } from "components/register";
import { Login } from "components/login";
import { NewEmail } from "components/new-email";
import { PasswordSet } from "components/password-set";
import { PasswordForgot } from "components/password-forgot";

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
        <Route path="/password-forgot/">
          <PasswordForgot />
        </Route>

        <Route path="/password-set/:ticket">
          <PasswordSet />
        </Route>
        <Route path="/new-email/:ticket">
          <NewEmail />
        </Route>

        <Route path="/">
          <AuthGate>
            <RouterApp />
          </AuthGate>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
