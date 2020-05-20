import React, { Component } from "react";
import { auth } from "../nhost";

interface AuthContextProviderState {
  signed_in: null;
}
interface AuthContextProviderProps {}

const AUTH_DEFAULT_CONTEXT = {
  signed_in: null,
};

export const AuthContext = React.createContext(AUTH_DEFAULT_CONTEXT);

export class AuthContextProvider extends Component<
  AuthContextProviderProps,
  AuthContextProviderState
> {
  constructor(props: AuthContextProviderProps) {
    super(props);
    this.state = AUTH_DEFAULT_CONTEXT;
  }

  componentDidMount() {
    auth.onAuthStateChanged((data: any) => {
      this.setState({
        signed_in: data,
      });
    });
  }

  render() {
    const { signed_in } = this.state;

    return (
      <AuthContext.Provider
        value={{
          signed_in,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
