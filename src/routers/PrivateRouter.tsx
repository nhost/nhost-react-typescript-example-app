import React, { Component } from "react";
import { auth } from "../nhost";
import { AuthContext } from "../contexts/auth";
import Login from "../components/Login";

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
    console.log("render privateRouter");
    return (
      <AuthContext.Consumer>
        {(user) => {
          console.log("user in PrivateRoute:");
          console.log(user);
          console.log(auth.isAuthenticated());

          if (auth.isAuthenticated() === null) {
            console.log("loading...");
            return <div>Loading...</div>;
          }
          if (!auth.isAuthenticated()) {
            console.log("false, login...");
            return <Login />;
          }

          console.log("user logged in, render child");
          return <div>{this.props.children}</div>;
          // if (!this.client) {
          //   this.client = generateApolloProviderClient();
          // }
        }}
      </AuthContext.Consumer>
    );
  }
}

export default PrivateRoute;
