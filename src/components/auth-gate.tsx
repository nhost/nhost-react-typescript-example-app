import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "react-nhost";

type AuthGateProps = {
  children: JSX.Element;
};

export function AuthGate({ children }: AuthGateProps): JSX.Element {
  const { signedIn } = useAuth();

  if (signedIn === null) {
    return <div>Loading...</div>;
  }

  if (!signedIn) {
    return <Redirect to="/login" />;
  }

  // user is logged in
  return children;
}
