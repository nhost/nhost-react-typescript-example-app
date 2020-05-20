import React, { Component } from "react";
import { auth } from "../nhost";
import { AuthContext } from "../contexts/auth";
import { ApolloProvider } from "@apollo/react-hooks";
import { createApolloClient } from "../apollo/client";
import { Login } from "../components/Login";

interface PrivateRouteState {
  client: any;
}

class PrivateRoute extends Component<any, PrivateRouteState> {
  private client: any;
  constructor(props: any) {
    super(props);

    this.client = false;
  }

  render() {
    return (
      <AuthContext.Consumer>
        {(user) => {
          if (auth.isAuthenticated() === null) {
            return <div>Loading...</div>;
          }
          if (!auth.isAuthenticated()) {
            return <Login />;
          }

          if (!this.client) {
            const headers = {
              Authorization: `Bearer ${auth.getJWTToken()}`,
            };

            this.client = createApolloClient(headers);
          }
          return (
            <ApolloProvider client={this.client}>
              {this.props.children}
            </ApolloProvider>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default PrivateRoute;
