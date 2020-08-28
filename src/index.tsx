import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { NhostAuthProvider, NhostApolloProvider } from "react-nhost";
import { auth } from "utils/nhost";
import { Router } from "components/routers/router";
import { GRAPHQL_ENDPOINT } from "utils/config";
import "styles/app.css";

ReactDOM.render(
  <React.StrictMode>
    <NhostAuthProvider auth={auth}>
      <NhostApolloProvider auth={auth} gql_endpoint={GRAPHQL_ENDPOINT}>
        <Router />
      </NhostApolloProvider>
    </NhostAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
