import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Dashboard } from "components/app/dashboard";
import { Todos } from "components/app/todos";
import { Files } from "components/app/files";
import { Settings } from "components/app/settings";
import { Layout } from "components/layout";

export function RouterApp() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/todos">
            <Todos />
          </Route>
          <Route exact path="/files">
            <Files />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}
