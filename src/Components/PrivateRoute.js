import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { client } from '../apollo/client';
import Login from './Login';
import nhost from '../nhost';

class PrivateRoute extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Route
        {...this.props}
        render={props => {

          if (!nhost.isAuthenticated()) {
            return (
              <Login />
            );
          }

          return (
            <ApolloProvider client={client}>
              {this.props.render()}
            </ApolloProvider>
          );

        }}
      />
    );
  }
}

export default PrivateRoute;
